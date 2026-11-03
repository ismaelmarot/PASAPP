import { useState, useCallback } from 'react';
import { importExcel, storageService } from '@/services';
import type { ImportResult } from '@/services';

export function useImportExcel() {
  const [result, setResult] = useState<ImportResult | null>(null);
  const [loading, setLoading] = useState(false);

  const runImport = useCallback(async (file: File) => {
    setLoading(true);
    const res = await importExcel(file);
    await storageService.saveBatch('questions', res.questions);
    setResult(res);
    setLoading(false);
    return res;
  }, []);

  return { result, loading, runImport };
}
