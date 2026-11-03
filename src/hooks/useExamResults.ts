import { useState, useEffect } from 'react';
import { storageService } from '@/services';
import type { ExamResult } from '@/interfaces';

export function useExamResults() {
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const results = await storageService.getAll<ExamResult>('examResults');
      if (!cancelled) {
        setExamResults(results);
        setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { examResults, loading };
}
