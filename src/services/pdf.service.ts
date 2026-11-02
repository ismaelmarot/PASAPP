import * as pdfjsLib from 'pdfjs-dist';
import type { Document } from '@/interfaces';
import { storageService } from '@/services';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url,
).toString();

export interface ProcessedDocument {
  document: Document;
  pages: { pageNumber: number; text: string }[];
}

export interface SearchResult {
  fragment: string;
  documentName: string;
  pageNumber: number;
  category: Document['category'];
}

export class PdfService {
  private storage: typeof storageService;

  constructor(storage?: typeof storageService) {
    this.storage = storage ?? storageService;
  }

  async processPdf(file: File, category: Document['category']): Promise<ProcessedDocument> {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    const pageCount = pdf.numPages;
    const hasExtractableText = await this.checkHasExtractableText(pdf);

    const document: Document = {
      id: `${file.name}-${Date.now()}`,
      name: file.name,
      category,
      fileName: file.name,
      filePath: URL.createObjectURL(file),
      pageCount,
      processedAt: new Date().toISOString(),
      hasExtractableText,
    };

    await storageService.save('documents', document);

    const pages: { pageNumber: number; text: string }[] = [];
    if (hasExtractableText) {
      for (let i = 1; i <= pageCount; i++) {
        const page = await pdf.getPage(i);
        const rawContent = await page.getTextContent();
        const items = (rawContent as unknown as { str: string }[]);
        const text = items
          .map((item) => item.str)
          .filter((t) => t.length > 0)
          .join(' ');
        pages.push({ pageNumber: i, text });
        await storageService.save('documentContents', {
          documentId: document.id,
          pageNumber: i,
          text,
        });
      }
    }

    return { document, pages };
  }

  private async checkHasExtractableText(pdf: pdfjsLib.PDFDocumentProxy): Promise<boolean> {
    const maxPages = Math.min(pdf.numPages, 3);
    for (let i = 1; i <= maxPages; i++) {
      const page = await pdf.getPage(i);
      const rawContent = await page.getTextContent();
      if ((rawContent as unknown as { items: unknown[] }).items.length > 0) return true;
    }
    return false;
  }

  async search(term: string): Promise<SearchResult[]> {
    const results: SearchResult[] = [];
    const contents = await this.storage.getAll<{ documentId: string; pageNumber: number; text: string }>('documentContents');
    const documents = await this.storage.getAll<Document>('documents');
    const docMap = new Map(documents.map((d) => [d.id, d]));

    const lowerTerm = term.toLowerCase();
    for (const content of contents) {
      if (content.text.toLowerCase().includes(lowerTerm)) {
        const doc = docMap.get(content.documentId);
        if (doc) {
          results.push({
            fragment: content.text,
            documentName: doc.name,
            pageNumber: content.pageNumber,
            category: doc.category,
          });
        }
      }
    }
    return results;
  }

  async getProcessedDocuments(): Promise<Document[]> {
    return this.storage.getAll<Document>('documents');
  }
}

export const pdfService = new PdfService();
