import { useState, useEffect, useCallback } from 'react';
import { storageService } from '@/services';
import type { Question } from '@/interfaces';

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const q = await storageService.getAll<Question>('questions');
      if (!cancelled) {
        setQuestions(q);
        setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const refresh = useCallback(async () => {
    const q = await storageService.getAll<Question>('questions');
    setQuestions(q);
  }, []);

  return { questions, loading, refresh };
}
