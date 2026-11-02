# Implementation Plan: PASAPP

**Branch**: `plan-initial` | **Date**: 2026-11-02 | **Specs**: specs/001-006/

## Summary

PASAPP is a 100% frontend static web app for studying the Argentine PAS (Productor Asesor de Seguros) exam. Core features: IndexedDB storage, Excel question import, PDF text extraction (PDF.js), exam simulator with complementary PDF info, and a material library. Tech: React + TypeScript + Vite + Styled Components + SheetJS + PDF.js + Vitest + ESLint. No backend, no IA, no external APIs.

## Technical Context

**Language/Version**: TypeScript 5.6, React 18, Vite 6
**Primary Dependencies**: react, react-dom, styled-components, xlsx, pdfjs-dist, vitest, eslint
**Storage**: IndexedDB (native browser API, no extra library)
**Testing**: Vitest + jsdom + @testing-library/react
**Target Platform**: Web browser (static site, GitHub Pages compatible)
**Project Type**: Frontend web application (single project)
**Performance Goals**: Storage ops <100ms, responsive UI
**Constraints**: No backend, no Tailwind, no Redux, no Yarn, no IA, no external APIs, minimal dependencies
**Scale/Scope**: Single user, local device, static materials in /public/data/

## Constitution Check

All specs comply with the PASAPP Constitution (KISS, YAGNI, frontend static, minimal deps, @/ alias, barrel exports, IndexedDB local storage, no IA in MVP, Apple-inspired design). No violations.

## Project Structure

### Documentation (this feature)

```
specs/
├── 001-storage-indexeddb/spec.md
├── 002-excel-import/spec.md
├── 003-pdf-processing/spec.md
├── 004-exam-simulator/spec.md
├── 005-material-library/spec.md
├── 006-ui-components/spec.md
├── plan.md              # This file
└── tasks.md             # Task breakdown
```

### Source Code (repository root)

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.styles.ts
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── QuestionCard/
│   │   ├── QuestionCard.tsx
│   │   ├── QuestionCard.styles.ts
│   │   ├── QuestionCard.test.tsx
│   │   └── index.ts
│   ├── ExamSimulator/
│   │   ├── ExamSimulator.tsx
│   │   ├── ExamSimulator.styles.ts
│   │   ├── useExamSimulator.ts
│   │   ├── ExamSimulator.test.tsx
│   │   └── index.ts
│   ├── MaterialLibrary/
│   │   ├── MaterialLibrary.tsx
│   │   ├── MaterialLibrary.styles.ts
│   │   ├── MaterialLibrary.test.tsx
│   │   └── index.ts
│   └── index.ts
├── hooks/
│   ├── useStorage.ts
│   └── index.ts
├── interfaces/
│   ├── Answer.interface.ts
│   ├── Question.interface.ts
│   ├── Document.interface.ts
│   ├── ExamResult.interface.ts
│   └── index.ts
├── services/
│   ├── storage.service.ts
│   ├── excel.service.ts
│   ├── pdf.service.ts
│   └── index.ts
├── constants/
│   ├── app.constants.ts
│   └── index.ts
├── utils/
│   ├── formatters.ts
│   └── index.ts
├── styles/
│   ├── globalStyles.ts
│   ├── theme.ts
│   └── index.ts
├── test/
│   └── setup.ts
├── App.tsx
├── main.tsx
└── index.ts
```

public/
├── data/
│   ├── laws/        (PDFs - user provides)
│   ├── notes/       (PDFs - user provides)
│   └── questions/   (Excel - user provides)
```

**Structure Decision**: Single project, all source under `src/`, materials under `public/data/`, alias `@/` configured in Vite and TypeScript, barrel `index.ts` in every folder.

## Complexity Tracking

No constitution violations. No complex architecture needed.
