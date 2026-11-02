import * as XLSX from 'xlsx';
import type { Question, AnswerOption } from '@/interfaces';

export type AnswerOptionMap = Record<AnswerOption, string>;

interface RawQuestionRow {
  [key: string]: unknown;
}

export interface ImportResult {
  imported: number;
  errors: ImportError[];
  questions: Question[];
}

export interface ImportError {
  row: number;
  tab: string;
  message: string;
}

const COMMON_QUESTION_COLUMNS = ['pregunta', 'question', 'texto', 'enunciado'];
const COMMON_OPTION_COLUMNS: Record<AnswerOption, string[]> = {
  A: ['a', 'opcion_a', 'opción_a', 'option_a', 'respuesta_a'],
  B: ['b', 'opcion_b', 'opción_b', 'option_b', 'respuesta_b'],
  C: ['c', 'opcion_c', 'opción_c', 'option_c', 'respuesta_c'],
  D: ['d', 'opcion_d', 'opción_d', 'option_d', 'respuesta_d'],
};
const COMMON_CORRECT_COLUMNS = ['respuesta_correcta', 'correcta', 'correct_answer', 'answer', 'solucion', 'solución'];

function normalizeKey(key: string): string {
  return key.toString().trim().toLowerCase().replace(/[_\s-]/g, '');
}

function findColumn(
  headers: string[],
  candidates: string[],
): string | undefined {
  const normalizedHeaders = headers.map(normalizeKey);
  for (const candidate of candidates) {
    const norm = normalizeKey(candidate);
    const idx = normalizedHeaders.indexOf(norm);
    if (idx !== -1) return headers[idx];
  }
  return undefined;
}

function extractOptions(
  row: RawQuestionRow,
  headers: string[],
): AnswerOptionMap | undefined {
  const options: Partial<AnswerOptionMap> = {};
  for (const opt of ['A', 'B', 'C', 'D'] as const) {
    const col = findColumn(headers, COMMON_OPTION_COLUMNS[opt]);
    if (!col) return undefined;
    const value = row[col];
    if (value === undefined || value === null || String(value).trim() === '') return undefined;
    options[opt] = String(value).trim();
  }
  return options as AnswerOptionMap;
}

function extractCorrectOption(
  row: RawQuestionRow,
  headers: string[],
): AnswerOption | undefined {
  const col = findColumn(headers, COMMON_CORRECT_COLUMNS);
  if (!col) return undefined;
  const value = String(row[col] ?? '').trim().toUpperCase();
  if (['A', 'B', 'C', 'D'].includes(value)) return value as AnswerOption;
  return undefined;
}

function extractTheme(tabName: string): string {
  return tabName.trim() || 'Sin tema';
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

    const questionCol = findColumn(headers, COMMON_QUESTION_COLUMNS);
    if (!questionCol) {
      errors.push({ row: 0, tab: tabName, message: 'No se encontró columna de pregunta' });
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

      const options = extractOptions(row, headers);
      if (!options) {
        errors.push({ row: rowNum, tab: tabName, message: 'Faltan opciones A, B, C o D' });
        continue;
      }

      const correctOption = extractCorrectOption(row, headers);
      if (!correctOption) {
        errors.push({ row: rowNum, tab: tabName, message: 'Respuesta correcta no encontrada o inválida' });
        continue;
      }

      const answerObjs: Array<{ id: string; questionId: string; text: string; option: AnswerOption; isCorrect: boolean }> = [];
      for (const opt of ['A', 'B', 'C', 'D'] as const) {
        answerObjs.push({
          id: `${questionText.slice(0, 10)}-${opt}-${Date.now()}`,
          questionId: questionText.slice(0, 20),
          text: options[opt],
          option: opt,
          isCorrect: opt === correctOption,
        });
      }

      const question: Question = {
        id: `${questionText.slice(0, 15)}-${tabName.slice(0, 10)}-${Date.now()}`,
        theme: extractTheme(tabName),
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
