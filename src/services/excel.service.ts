import * as XLSX from 'xlsx';
import type { Question, AnswerOption } from '@/interfaces';

export interface ImportError {
  row: number;
  tab: string;
  message: string;
}

export interface ImportResult {
  imported: number;
  errors: ImportError[];
  questions: Question[];
}

const QUESTION_COLUMNS = ['pregunta', 'question', 'texto', 'enunciado'];
const OPTIONS_COLUMNS = ['opciones', 'option', 'options', 'alternativas'];
const CORRECT_COLUMNS = ['respuesta_correcta', 'correcta', 'correct_answer', 'answer', 'solucion', 'solución'];

function normalizeKey(key: string): string {
  return key.toString().trim().toLowerCase().replace(/[_\s-]/g, '');
}

function findColumnIndex(headers: string[], candidates: string[]): number {
  const normalizedHeaders = headers.map((h) => normalizeKey(String(h ?? '')));
  for (const candidate of candidates) {
    const norm = normalizeKey(candidate);
    const idx = normalizedHeaders.indexOf(norm);
    if (idx !== -1) return idx;
  }
  return -1;
}

function isHeaderRow(row: unknown[]): boolean {
  const cells = (Array.isArray(row) ? row : []).map((c) => String(c ?? '').trim()).filter((c) => c !== '');
  if (cells.length === 0) return false;
  const norm = cells.map(normalizeKey);
  const isQuestion = QUESTION_COLUMNS.some((c) => norm.includes(normalizeKey(c)));
  const isOptions = OPTIONS_COLUMNS.some((c) => norm.includes(normalizeKey(c)));
  const isCorrect = CORRECT_COLUMNS.some((c) => norm.includes(normalizeKey(c)));
  return isQuestion || isOptions || isCorrect;
}

function parseOptionsFromCell(raw: unknown): { option: AnswerOption; text: string }[] | undefined {
  const text = String(raw ?? '').trim();
  if (!text) return undefined;
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
  const parsed: { option: AnswerOption; text: string }[] = [];
  let current: { option: AnswerOption; text: string } | null = null;
  for (const line of lines) {
    const m = line.match(/^([a-dA-D])\.\s*([\s\S]*)$/);
    if (m) {
      if (current) parsed.push(current);
      current = { option: m[1].toUpperCase() as AnswerOption, text: (m[2] ?? '').trim() };
    } else if (current) {
      current.text = `${current.text} ${line}`.trim();
    }
  }
  if (current) parsed.push(current);
  const byLetter = new Map<string, { option: AnswerOption; text: string }>();
  for (const o of parsed) {
    if (o.option === 'A' || o.option === 'B' || o.option === 'C' || o.option === 'D') {
      byLetter.set(o.option, o);
    }
  }
  const all: { option: AnswerOption; text: string }[] = [];
  for (const letter of ['A', 'B', 'C', 'D'] as AnswerOption[]) {
    const o = byLetter.get(letter);
    if (!o) return undefined;
    all.push(o);
  }
  return all;
}

function normalizeCorrect(raw: unknown, options: { option: AnswerOption; text: string }[]): AnswerOption | undefined {
  const v = String(raw ?? '').trim().toUpperCase();
  if (['A', 'B', 'C', 'D'].includes(v)) return v as AnswerOption;
  const clean = (s: string) => s.toString().trim().toLowerCase().replace(/[_\s-]/g, '');
  const target = clean(String(raw ?? ''));
  const matched = options.find(
    (o) => clean(o.text) === target || clean(o.text).includes(target) || target.includes(clean(o.text)),
  );
  if (matched) return matched.option;
  return undefined;
}

export function importExcelFromFile(file: File): Promise<ImportResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array((event.target as FileReader).result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        resolve(importExcelFromWorkbook(workbook));
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

export function importExcelFromWorkbook(workbook: XLSX.WorkBook): ImportResult {
  const errors: ImportError[] = [];
  const questions: Question[] = [];
  const seenTexts = new Set<string>();

  for (const tabName of workbook.SheetNames) {
    const normalizedTab = tabName.trim().toLowerCase();
    if (normalizedTab.startsWith('export') || normalizedTab.includes('resumen') || normalizedTab.includes('summary')) continue;

    const ws = workbook.Sheets[tabName];
    const rows = XLSX.utils.sheet_to_json<unknown[]>(ws, { header: 1 }) as unknown[][];
    if (!rows || rows.length === 0) continue;

    let headerIdx = -1;
    for (let i = 0; i < rows.length; i++) {
      if (isHeaderRow(rows[i])) {
        headerIdx = i;
        break;
      }
    }

    const hasHeader = headerIdx >= 0;
    const questionColIdx = hasHeader ? findColumnIndex((rows[headerIdx] as string[]).map((c) => String(c ?? '')), QUESTION_COLUMNS) : 0;
    const optionsColIdx = hasHeader ? findColumnIndex((rows[headerIdx] as string[]).map((c) => String(c ?? '')), OPTIONS_COLUMNS) : 1;
    const correctColIdx = hasHeader ? findColumnIndex((rows[headerIdx] as string[]).map((c) => String(c ?? '')), CORRECT_COLUMNS) : 2;
    const dataStart = hasHeader ? headerIdx + 1 : 0;

    if (hasHeader && (questionColIdx === -1 || optionsColIdx === -1 || correctColIdx === -1)) {
      errors.push({ row: 0, tab: tabName, message: 'No se encontró columna de pregunta' });
      continue;
    }

    for (let i = dataStart; i < rows.length; i++) {
      const row = rows[i];
      if (!Array.isArray(row)) continue;
      const questionText = String(row[questionColIdx] ?? '').trim();
      if (!questionText) continue;
      if (seenTexts.has(questionText)) {
        errors.push({ row: i + 1, tab: tabName, message: 'Pregunta duplicada' });
        continue;
      }
      const options = parseOptionsFromCell(row[optionsColIdx]);
      if (!options) {
        errors.push({ row: i + 1, tab: tabName, message: 'Faltan opciones A, B, C o D' });
        continue;
      }
      const correctOption = normalizeCorrect(row[correctColIdx], options);
      if (!correctOption) {
        errors.push({ row: i + 1, tab: tabName, message: 'Respuesta correcta no encontrada o inválida' });
        continue;
      }
      const answerObjs: Question['options'] = [];
      for (const opt of options) {
        answerObjs.push({
          id: `${questionText.slice(0, 10)}-${opt.option}-${Date.now()}`,
          questionId: questionText.slice(0, 20),
          text: opt.text,
          option: opt.option,
          isCorrect: opt.option === correctOption,
        });
      }
      const question: Question = {
        id: `${questionText.slice(0, 15)}-${tabName.slice(0, 10)}-${Date.now()}`,
        theme: tabName.trim() || 'Sin tema',
        tabName,
        text: questionText,
        options: answerObjs,
        correctOption,
        sourceFile: 'excel-import',
        importedAt: new Date().toISOString(),
      };
      seenTexts.add(questionText);
      questions.push(question);
    }
  }

  return { imported: questions.length, errors, questions };
}

export { importExcelFromFile as importExcel };
