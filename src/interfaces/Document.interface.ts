export type DocumentCategory = 'ley' | 'apunte';

export interface Document {
  id: string;
  name: string;
  category: DocumentCategory;
  fileName: string;
  filePath: string;
  pageCount?: number;
  processedAt: string;
  hasExtractableText: boolean;
}
