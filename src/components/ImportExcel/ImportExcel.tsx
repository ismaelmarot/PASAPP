import type { ChangeEvent } from 'react';
import { Container, Title, Description, FileInput, Result, ResultError } from './ImportExcel.styles';
import { useImportExcel } from './useImportExcel';

export interface ImportExcelProps {
  onImported: () => void;
}

export function ImportExcel({ onImported }: ImportExcelProps) {
  const { result, loading, runImport } = useImportExcel();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      void runImport(file);
    }
  };

  const imported = result?.imported ?? 0;
  const errors = result?.errors ?? [];

  return (
    <Container>
      <Title>Importar preguntas</Title>
      <Description>Sube un archivo Excel (.xlsx) con preguntas.</Description>
      <label htmlFor="excel-input">Seleccionar archivo Excel (.xlsx)</label>
      <FileInput
        id="excel-input"
        type="file"
        accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onChange={onChange}
      />
      {loading && <p>Cargando...</p>}
      {result && (
        <Result>
          <p>Preguntas importadas: {imported}</p>
          {errors.length > 0 && (
            <ResultError>
              <p>Errores de importación: {errors.length}</p>
              <ul>
                {errors.map((e, i) => (
                  <li key={i}>{e.message}</li>
                ))}
              </ul>
            </ResultError>
          )}
          <button type="button" onClick={onImported}>Ir al simulador</button>
        </Result>
      )}
    </Container>
  );
}
