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

interface RawQuestionRow {
  [key: string]: unknown;
}

const QUESTION_COLUMNS = ['pregunta', 'question', 'texto', 'enunciado'];
const OPTIONS_COLUMNS = ['opciones', 'option', 'options', 'alternativas'];
const CORRECT_COLUMNS = ['respuesta_correcta', 'correcta', 'correct_answer', 'answer', 'solucion', 'solución'];

function normalizeKey(key: string): string {
  return key.toString().trim().toLowerCase().replace(/[_\s-]/g, '');
}

function findColumn(headers: string[], candidates: string[]): string | undefined {
  const normalizedHeaders = headers.map(normalizeKey);
  for (const candidate of candidates) {
    const norm = normalizeKey(candidate);
    const idx = normalizedHeaders.indexOf(norm);
    if (idx !== -1) return headers[idx];
  }
  return undefined;
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

function normalizeCorrect(raw: unknown): AnswerOption | undefined {
  const v = String(raw ?? '').trim().toUpperCase();
  if (['A', 'B', 'C', 'D'].includes(v)) return v as AnswerOption;
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
    const ws = workbook.Sheets[tabName];
    const json = XLSX.utils.sheet_to_json<RawQuestionRow>(ws) as RawQuestionRow[];
    if (!json || json.length === 0) continue;

    const firstRow = json[0];
    const headers = Object.keys(firstRow).filter((h) => h.trim() !== '');
    const questionCol = findColumn(headers, QUESTION_COLUMNS);
    const optionsCol = findColumn(headers, OPTIONS_COLUMNS);
    const correctCol = findColumn(headers, CORRECT_COLUMNS);

    if (!questionCol) {
      errors.push({ row: 0, tab: tabName, message: 'No se encontró columna de pregunta' });
      continue;
    }
    if (!optionsCol) {
      errors.push({ row: 0, tab: tabName, message: 'No se encontró columna de opciones' });
      continue;
    }
    if (!correctCol) {
      errors.push({ row: 0, tab: tabName, message: 'No se encontró columna de respuesta correcta' });
      continue;
    }

    for (let i = 0; i < json.length; i++) {
      const row = json[i];
      if (!row) continue;
      const rowNum = i + 1;
      const questionText = String(row[questionCol] ?? '').trim();
      if (!questionText) {
        errors.push({ row: rowNum, tab: tabName, message: 'Pregunta vacía' });
        continue;
      }
      if (seenTexts.has(questionText)) {
        errors.push({ row: rowNum, tab: tabName, message: 'Pregunta duplicada' });
        continue;
      }
      const options = parseOptionsFromCell(row[optionsCol]);
      if (!options) {
        errors.push({ row: rowNum, tab: tabName, message: 'Faltan opciones A, B, C o D' });
        continue;
      }
      const correctOption = normalizeCorrect(row[correctCol]);
      if (!correctOption) {
        errors.push({ row: rowNum, tab: tabName, message: 'Respuesta correcta no encontrada o inválida' });
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
