import { useState, useEffect } from 'react';
import { storageService } from '@/services';
import type { Document } from '@/interfaces';

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const d = await storageService.getAll<Document>('documents');
      if (!cancelled) {
        setDocuments(d);
        setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { documents, loading };
}
