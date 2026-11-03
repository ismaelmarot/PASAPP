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

const optionCellA = 'a.\nSeguro de responsabilidad civil terceros en superficie.\nb.\nSeguro de accidentes personales aeronáuticos.\nc.\nSeguro de casco.\nd.\nSeguro de responsabilidad civil texto Ariel.';

describe('excelService', () => {
  it('imports questions from a multi-tab Excel with 3-column format', () => {
    const wb = makeWorkbook({
      'Responsabilidad Civil': [
        ['Pregunta', 'Opciones', 'Respuesta Correcta'],
        ['¿Qué es un seguro?', optionCellA, 'A'],
        ['¿Quién es el asegurado?', 'a.\nUn individuo.\nb.\nUna empresa.\nc.\nUn banco.\nd.\nUn gobierno.', 'B'],
      ],
      'Contratos': [
        ['Pregunta', 'Opciones', 'Respuesta Correcta'],
        ['¿Qué es la póliza?', 'a.\nUn contrato.\nb.\nUna ley.\nc.\nUn seguro.\nd.\nUna factura.', 'A'],
      ],
    });

    const result = importExcelFromWorkbook(wb) as ImportResult;

    expect(result.imported).toBe(3);
    expect(result.errors.length).toBe(0);
    expect(result.questions[0].theme).toBe('Responsabilidad Civil');
    expect(result.questions[0].text).toBe('¿Qué es un seguro?');
    expect(result.questions[0].correctOption).toBe('A');
    expect(result.questions[0].options.length).toBe(4);
    expect(result.questions[1].theme).toBe('Responsabilidad Civil');
    expect(result.questions[2].theme).toBe('Contratos');
  });

  it('detects duplicate questions', () => {
    const wb = makeWorkbook({
      Seguros: [
        ['Pregunta', 'Opciones', 'Respuesta Correcta'],
        ['¿Qué es un seguro?', optionCellA, 'A'],
        ['¿Qué es un seguro?', optionCellA, 'A'],
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
        ['Pregunta', 'Opciones', 'Respuesta Correcta'],
        ['¿Falta la D?', 'a.\nOpción A.\nb.\nOpción B.\nc.\nOpción C.', 'A'],
        ['¿Opción completa?', 'a.\nOpción A.\nb.\nOpción B.\nc.\nOpción C.\nd.\nOpción D.', 'A'],
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
        ['Pregunta', 'Opciones', 'Respuesta Correcta'],
        ['¿Sin respuesta?', 'a.\nOpción A.\nb.\nOpción B.\nc.\nOpción C.\nd.\nOpción D.', 'X'],
      ],
    });

    const result = importExcelFromWorkbook(wb) as ImportResult;

    expect(result.imported).toBe(0);
    expect(result.errors.length).toBe(1);
    expect(result.errors[0].message).toContain('Respuesta correcta');
  });

  it('returns empty result for empty workbook', () => {
    const wb = XLSX.utils.book_new();
    const result = importExcelFromWorkbook(wb) as ImportResult;

    expect(result.imported).toBe(0);
    expect(result.questions.length).toBe(0);
  });

  it('imports from a sheet without header row using positional columns', () => {
    const wb = makeWorkbook({
      'A1 - Intro al Seguro': [['¿Qué es un seguro?', optionCellA, 'A']],
    });

    const result = importExcelFromWorkbook(wb) as ImportResult;

    expect(result.imported).toBe(1);
    expect(result.errors.length).toBe(0);
    expect(result.questions[0].theme).toBe('A1 - Intro al Seguro');
    expect(result.questions[0].correctOption).toBe('A');
    expect(result.questions[0].options.length).toBe(4);
  });

  it('resolves correct answer from text when a letter is not present', () => {
    const textAnswer = 'El resultado obtenido y las causas.';
    const wb = makeWorkbook({
      Seguros: [
        ['Pregunta', 'Opciones', 'Respuesta Correcta'],
        ['¿La respuesta?', 'a.\nOpcion A.\nb.\nEl resultado obtenido y las causas.\nc.\nOpcion C.\nd.\nOpcion D.', textAnswer],
      ],
    });

    const result = importExcelFromWorkbook(wb) as ImportResult;

    expect(result.imported).toBe(1);
    expect(result.errors.length).toBe(0);
    expect(result.questions[0].correctOption).toBe('B');
  });

  it('skips metadata export summary sheet', () => {
    const wb = makeWorkbook({
      'Export Summary': [['This document was exported from Numbers.']],
      Seguros: [
        ['Pregunta', 'Opciones', 'Respuesta Correcta'],
        ['¿Qué es un seguro?', optionCellA, 'A'],
      ],
    });

    const result = importExcelFromWorkbook(wb) as ImportResult;

    expect(result.imported).toBe(1);
    expect(result.errors.length).toBe(0);
  });
});
