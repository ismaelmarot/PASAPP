import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { storageService } from '@/services';

const mockStores = new Map<string, Map<string, unknown>>();

function createMockRequest<T>(result: T): IDBRequest<T> {
  const req = {
    result,
    error: null,
    onsuccess: null as unknown as (ev: Event) => void,
    onerror: null as unknown as (ev: Event) => void,
  } as unknown as IDBRequest<T>;
  setTimeout(() => {
    if (req.onsuccess) req.onsuccess(new Event('success'));
  }, 0);
  return req;
}

function mockIDBObjectStore(store: Map<string, unknown>): IDBObjectStore {
  return {
    put: (item: unknown) => {
      const id = (item as { id?: string }).id || String(Math.random());
      store.set(id, item);
      return createMockRequest(id);
    },
    get: (id: string) => createMockRequest(store.get(id)),
    getAll: () => createMockRequest(Array.from(store.values())),
    delete: (id: string) => {
      store.delete(id);
      return createMockRequest(undefined);
    },
    clear: () => {
      store.clear();
      return createMockRequest(undefined);
    },
  } as unknown as IDBObjectStore;
}

function mockIDBTransaction(_storeName: string): IDBTransaction {
  if (!mockStores.has(_storeName)) mockStores.set(_storeName, new Map());
  const store = mockStores.get(_storeName)!;
  return {
    objectStore: () => mockIDBObjectStore(store),
    onerror: null,
    oncomplete: null,
  } as unknown as IDBTransaction;
}

function mockIndexedDB(): IDBFactory {
  return {
    open: () => {
      const db = {
        transaction: (storeName: string, _mode: string) => mockIDBTransaction(storeName),
        objectStoreNames: {
          contains: (name: string) => mockStores.has(name),
        },
        createObjectStore: () => {},
        close: () => {},
      } as unknown as IDBDatabase;
      const req = {
        result: db,
        error: null,
        onerror: null,
        onsuccess: null as unknown as (ev: Event) => void,
        onupgradeneeded: null,
      } as unknown as IDBOpenDBRequest;
      setTimeout(() => {
        if (req.onsuccess) req.onsuccess(new Event('success'));
      }, 0);
      return req;
    },
  } as unknown as IDBFactory;
}

beforeEach(() => {
  mockStores.clear();
  vi.stubGlobal('indexedDB', mockIndexedDB());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('storageService', () => {
  it('saves and gets a question by ID', async () => {
    const question = {
      id: 'q1',
      theme: 'seguros',
      tabName: 'Tab1',
      text: 'Pregunta de prueba',
      options: [{ id: 'o1', questionId: 'q1', text: 'Opción A', option: 'A', isCorrect: true }],
      correctOption: 'A',
      sourceFile: 'test.xlsx',
      importedAt: '2026-01-01',
    };

    await storageService.save('questions', question);
    const retrieved = await storageService.get<typeof question>('questions', 'q1');
    expect(retrieved?.id).toBe('q1');
    expect(retrieved?.text).toBe('Pregunta de prueba');
  });

  it('gets all questions', async () => {
    await storageService.save('questions', {
      id: 'q1', theme: 't', tabName: 't', text: 'a',
      options: [], correctOption: 'A', sourceFile: 'f', importedAt: 'd',
    });
    await storageService.save('questions', {
      id: 'q2', theme: 't', tabName: 't', text: 'b',
      options: [], correctOption: 'A', sourceFile: 'f', importedAt: 'd',
    });
    const all = await storageService.getAll('questions');
    expect(all.length).toBe(2);
  });

  it('deletes a question', async () => {
    await storageService.save('questions', {
      id: 'q1', theme: 't', tabName: 't', text: 'a',
      options: [], correctOption: 'A', sourceFile: 'f', importedAt: 'd',
    });
    await storageService.delete('questions', 'q1');
    const all = await storageService.getAll('questions');
    expect(all.length).toBe(0);
  });

  it('exports and imports all data', async () => {
    await storageService.save('questions', {
      id: 'q1', theme: 't', tabName: 't', text: 'a',
      options: [], correctOption: 'A', sourceFile: 'f', importedAt: 'd',
    });
    const exported = await storageService.exportAll();
    expect(exported.questions.length).toBe(1);

    await storageService.clearStore('questions');
    expect((await storageService.getAll('questions')).length).toBe(0);

    await storageService.importAll(exported);
    const afterImport = await storageService.getAll('questions');
    expect(afterImport.length).toBe(1);
  });
});
