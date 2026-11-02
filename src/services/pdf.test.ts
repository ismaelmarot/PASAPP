import { describe, it, expect, vi } from 'vitest';
import { PdfService } from '@/services/pdf.service';

interface MockStorage {
  getAll: (store: string) => Promise<unknown[]>;
}

const mockStorage: MockStorage = {
  getAll: vi.fn().mockImplementation((store: string) => {
    if (store === 'documents') {
      return Promise.resolve([
        {
          id: 'doc1',
          name: 'Ley 17.418.pdf',
          category: 'ley',
          fileName: 'Ley 17.418.pdf',
          filePath: 'blob:http://localhost/doc1',
          pageCount: 10,
          processedAt: '2026-01-01',
          hasExtractableText: true,
        },
        {
          id: 'doc2',
          name: 'Apuntes Riesgos.pdf',
          category: 'apunte',
          fileName: 'Apuntes Riesgos.pdf',
          filePath: 'blob:http://localhost/doc2',
          pageCount: 5,
          processedAt: '2026-01-01',
          hasExtractableText: true,
        },
      ]);
    }
    if (store === 'documentContents') {
      return Promise.resolve([
        { documentId: 'doc1', pageNumber: 1, text: 'El productor de seguros intermediar en la contratación de seguros.' },
        { documentId: 'doc1', pageNumber: 3, text: 'Responsabilidad civil cubre daños a terceros.' },
        { documentId: 'doc2', pageNumber: 1, text: 'Concepto de riesgo: probabilidad de siniestro.' },
      ]);
    }
    return Promise.resolve([]);
  }),
};

describe('pdfService', () => {
  it('search returns fragments with document name, page, and category', async () => {
    const service = new PdfService(mockStorage as unknown as typeof import('@/services').storageService);
    const results = await service.search('productor');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toHaveProperty('fragment');
    expect(results[0]).toHaveProperty('documentName');
    expect(results[0]).toHaveProperty('pageNumber');
    expect(results[0]).toHaveProperty('category');
  });

  it('search returns empty when no match', async () => {
    const service = new PdfService(mockStorage as unknown as typeof import('@/services').storageService);
    const results = await service.search('xyz123nope');
    expect(results.length).toBe(0);
  });

  it('getProcessedDocuments returns documents', async () => {
    const service = new PdfService(mockStorage as unknown as typeof import('@/services').storageService);
    const docs = await service.getProcessedDocuments();
    expect(docs.length).toBe(2);
    expect(docs[0].category).toBe('ley');
    expect(docs[1].category).toBe('apunte');
  });
});
