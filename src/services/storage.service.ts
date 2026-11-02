import type { Question } from '@/interfaces';
import type { Document } from '@/interfaces';
import type { ExamResult } from '@/interfaces';

const DB_NAME = 'pasapp';
const DB_VERSION = 1;

type StoreName = 'questions' | 'documents' | 'documentContents' | 'examResults' | 'answerHistory';

interface DBData {
  questions: Question[];
  documents: Document[];
  documentContents: { documentId: string; pageNumber: number; text: string }[];
  examResults: ExamResult[];
  answerHistory: { questionId: string; selectedOption: string; isCorrect: boolean; answeredAt: string }[];
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('questions')) db.createObjectStore('questions', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('documents')) db.createObjectStore('documents', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('documentContents')) {
        db.createObjectStore('documentContents', { keyPath: ['documentId', 'pageNumber'] });
      }
      if (!db.objectStoreNames.contains('examResults')) db.createObjectStore('examResults', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('answerHistory')) {
        db.createObjectStore('answerHistory', { keyPath: ['questionId', 'answeredAt'] });
      }
    };
  });
}

function run<T>(store: StoreName, mode: IDBTransactionMode, work: (os: IDBObjectStore) => IDBRequest): Promise<T> {
  return new Promise((resolve, reject) => {
    openDB().then((db) => {
      const tx = db.transaction(store, mode);
      tx.onerror = () => reject(tx.error);
      const result = work(tx.objectStore(store));
      result.onsuccess = () => resolve(result.result as T);
      result.onerror = () => reject(result.error);
    }).catch(reject);
  });
}

function runBatch<T>(store: StoreName, mode: IDBTransactionMode, items: T[]): Promise<void> {
  return new Promise((resolve, reject) => {
    openDB().then((db) => {
      const tx = db.transaction(store, mode);
      tx.onerror = () => reject(tx.error);
      const os = tx.objectStore(store);
      const requests = items.map((item) => {
        const req = os.put(item);
        return new Promise<void>((res, rej) => {
          req.onsuccess = () => res();
          req.onerror = () => rej(req.error);
        });
      });
      Promise.all(requests).then(() => resolve()).catch(reject);
    }).catch(reject);
  });
}

class StorageService {
  async save<T>(store: StoreName, item: T): Promise<void> {
    await run(store, 'readwrite', (os) => os.put(item));
  }

  async saveBatch<T>(store: StoreName, items: T[]): Promise<void> {
    await runBatch(store, 'readwrite', items);
  }

  async get<T>(store: StoreName, id: string): Promise<T | undefined> {
    return run(store, 'readonly', (os) => os.get(id));
  }

  async getAll<T>(store: StoreName): Promise<T[]> {
    return run(store, 'readonly', (os) => os.getAll());
  }

  async delete(store: StoreName, id: string): Promise<void> {
    await run(store, 'readwrite', (os) => os.delete(id));
  }

  async exportAll(): Promise<DBData> {
    return {
      questions: await this.getAll<Question>('questions'),
      documents: await this.getAll<Document>('documents'),
      documentContents: await this.getAll<{ documentId: string; pageNumber: number; text: string }>('documentContents'),
      examResults: await this.getAll<ExamResult>('examResults'),
      answerHistory: await this.getAll<{ questionId: string; selectedOption: string; isCorrect: boolean; answeredAt: string }>('answerHistory'),
    };
  }

  async importAll(data: DBData): Promise<void> {
    await this.saveBatch('questions', data.questions);
    await this.saveBatch('documents', data.documents);
    await this.saveBatch('documentContents', data.documentContents);
    await this.saveBatch('examResults', data.examResults);
    await this.saveBatch('answerHistory', data.answerHistory);
  }

  async clearStore(store: StoreName): Promise<void> {
    await run(store, 'readwrite', (os) => os.clear());
  }
}

export const storageService = new StorageService();
