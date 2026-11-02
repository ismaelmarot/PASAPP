import { describe, it, expect } from 'vitest';
import * as XLSX from 'xlsx';
import { importExcelFromWorkbook, type ImportResult } from '@/services';

function makeWorkbook(sheets: Record<string, string[][]>): XLSX.WorkBook {
  const wb = XLSX.utils.book_new();
  for (const [name, rows] of Object.entries(sheets)) {
    const ws = XLSX.utils.aoa_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, name);
  }
  return wb;
}

describe('excelService', () => {
  it('imports questions from a multi-tab Excel with standard columns', () => {
    const wb = makeWorkbook({
      'Responsabilidad Civil': [
        ['Pregunta', 'A', 'B', 'C', 'D', 'Respuesta Correcta'],
        ['¿Qué es un seguro?', 'Contrato', 'Ley', 'Póliza', 'Prima', 'A'],
        ['¿Quién asegura?', 'Asegurado', 'Aseguradora', 'Corredor', 'Productor', 'B'],
      ],
      'Contratos': [
        ['Pregunta', 'A', 'B', 'C', 'D', 'Respuesta Correcta'],
        ['¿Qué es la póliza?', 'Documento', 'Ley', 'Contrato', 'Factura', 'A'],
      ],
    });

    const result = importExcelFromWorkbook(wb) as ImportResult;

    expect(result.imported).toBe(3);
    expect(result.errors.length).toBe(0);
    expect(result.questions[0].theme).toBe('Responsabilidad Civil');
    expect(result.questions[0].tabName).toBe('Responsabilidad Civil');
    expect(result.questions[0].text).toBe('¿Qué es un seguro?');
    expect(result.questions[0].correctOption).toBe('A');
    expect(result.questions[0].options.length).toBe(4);
    expect(result.questions[1].theme).toBe('Responsabilidad Civil');
    expect(result.questions[2].theme).toBe('Contratos');
  });

  it('detects duplicate questions', () => {
    const wb = makeWorkbook({
      Seguros: [
        ['Pregunta', 'A', 'B', 'C', 'D', 'Respuesta Correcta'],
        ['¿Qué es un seguro?', 'A', 'B', 'C', 'D', 'A'],
        ['¿Qué es un seguro?', 'A', 'B', 'C', 'D', 'A'],
      ],
    });

    const result = importExcelFromWorkbook(wb) as ImportResult;

    expect(result.imported).toBe(1);
    expect(result.errors.length).toBe(1);
    expect(result.errors[0].message).toBe('Pregunta duplicada');
  });

  it('reports missing options without aborting', () => {
    const wb = makeWorkbook({
      Seguros: [
        ['Pregunta', 'A', 'B', 'C', 'D', 'Respuesta Correcta'],
        ['¿Falta la D?', 'A', 'B', 'C', '', 'A'],
        ['¿Opción completa?', 'A', 'B', 'C', 'D', 'A'],
      ],
    });

    const result = importExcelFromWorkbook(wb) as ImportResult;

    expect(result.imported).toBe(1);
    expect(result.errors.length).toBe(1);
    expect(result.errors[0].message).toContain('Faltan opciones');
  });

  it('reports missing correct answer', () => {
    const wb = makeWorkbook({
      Seguros: [
        ['Pregunta', 'A', 'B', 'C', 'D'],
        ['¿Sin respuesta?', 'A', 'B', 'C', 'D'],
      ],
    });

    const result = importExcelFromWorkbook(wb) as ImportResult;

    expect(result.imported).toBe(0);
    expect(result.errors.length).toBe(1);
    expect(result.errors[0].message).toContain('correcta');
  });

  it('returns empty result for empty workbook', () => {
    const wb = XLSX.utils.book_new();
    const result = importExcelFromWorkbook(wb) as ImportResult;

    expect(result.imported).toBe(0);
    expect(result.questions.length).toBe(0);
  });
});
