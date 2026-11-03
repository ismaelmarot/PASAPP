---
description: "Task list for PASAPP implementation"
---

# Tasks: PASAPP

**Input**: Design documents from /specs/
**Prerequisites**: plan.md (required), spec.md (required per feature)
**Tests**: Vitest tests included per feature specification.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Maps to user story from spec (e.g., US1, US2)

---

## Phase 1: Setup (Shared Infrastructure) ✅ COMPLETE

- [x] T001 Project structure created (src/, public/data/, configs)
- [x] T002 React + TypeScript + Vite initialized
- [x] T003 Styled Components, Vitest, ESLint configured
- [x] T004 Alias @/ configured in Vite and TypeScript
- [x] T005 Barrel exports (index.ts) in all folders
- [x] T006 .gitignore configured
- [x] T007 Constitution created (.specify/memory/constitution.md)
- [x] T008 Specifications created (specs/001-006/)
- [x] T009 Plan created (specs/plan.md)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before any user story.

**CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T010 [P] [US1-001] Create storage.service.ts with IndexedDB init (db name, version, stores)
- [ ] T011 [P] [US1-001] Implement save/get/update/delete for IndexedDB stores
- [ ] T012 [P] [US1-003] Implement exportToJson and importFromJson backup functions
- [ ] T013 [P] [US2-001] Create excel.service.ts with SheetJS tab reading
- [ ] T014 [P] [US2-001] Implement question extraction (4 options A-D, correct answer)
- [ ] T015 [P] [US2-002] Implement question validation (text, options, correct answer)
- [ ] T016 [P] [US2-003] Implement duplicate detection
- [ ] T017 [P] [US2-003] Implement import error reporting per row
- [ ] T018 [P] [US3-001] Create pdf.service.ts with PDF.js text extraction per page
- [ ] T019 [P] [US3-001] Implement scanned PDF detection (OCR needed message)
- [ ] T020 [P] [US3-002] Implement search by words/concepts across documents
- [ ] T021 [P] [US3-002] Implement search result with document name, page, category
- [ ] T022 [P] [US4-001] Create Button component (Button.tsx, .styles.ts, .test.tsx, index.ts)
- [ ] T023 [P] [US4-002] Create QuestionCard component (QuestionCard.tsx, .styles.ts, .test.tsx, index.ts)
- [ ] T024 [P] [US4-003] Apply GlobalStyles and theme to app

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Save/retrieve questions (P1) 🎯 MVP

**Goal**: Persist questions to IndexedDB and retrieve them.

**Independent Test**: Save questions, retrieve by ID and by theme, assert match.

### Tests for User Story 1

- [ ] T025 [P] [US1-001] storage.test.ts - save/get question by ID
- [ ] T026 [P] [US1-001] storage.test.ts - get questions by theme
- [ ] T027 [P] [US1-001] storage.test.ts - update and delete question

### Implementation for User Story 1

- [ ] T028 [US1-001] Wire storage.service.ts to IndexedDB stores
- [ ] T029 [US1-001] Export storage service from src/services/index.ts

**Checkpoint**: Questions can be saved and retrieved from IndexedDB.

---

## Phase 4: User Story 2 - Import Excel questions (P1) 🎯 MVP

**Goal**: Read Excel tabs, extract questions, validate, detect duplicates, report errors.

**Independent Test**: Parse sample Excel, assert question list with 4 options and correct answer.

### Tests for User Story 2

- [ ] T030 [P] [US2-001] excel.test.ts - read all tabs from sample Excel
- [ ] T031 [P] [US2-001] excel.test.ts - extract questions with 4 options + correct answer
- [ ] T032 [P] [US2-002] excel.test.ts - validate question rows, report invalid
- [ ] T033 [P] [US2-003] excel.test.ts - detect duplicate questions
- [ ] T034 [P] [US2-003] excel.test.ts - report errors per row without aborting

### Implementation for User Story 2

- [ ] T035 [US2-001] Implement tab reading and theme identification from tab name
- [ ] T036 [US2-002] Implement row validation logic
- [ ] T037 [US2-003] Implement duplicate detection and error reporting
- [ ] T038 [US2-001] Save imported questions via storage.service.ts
- [ ] T039 [US2-001] Export excel service from src/services/index.ts

**PENDING CLARIFICATION**: Need real Excel file structure (column names) to finalize extraction logic. Service will be built to handle dynamic columns.

**Checkpoint**: Excel questions imported, validated, deduplicated, stored.

---

## Phase 5: User Story 3 - PDF processing and search (P1/P2)

**Goal**: Extract PDF text per page, save to IndexedDB, search by terms.

**Independent Test**: Process sample PDF, assert text per page; search term, assert fragments with doc/page/category.

### Tests for User Story 3

- [ ] T040 [P] [US3-001] pdf.test.ts - extract text per page with page numbers
- [ ] T041 [P] [US3-001] pdf.test.ts - detect scanned PDF (no text)
- [ ] T042 [P] [US3-002] pdf.test.ts - search returns fragments with doc name, page, category

### Implementation for User Story 3

- [ ] T043 [US3-001] Implement PDF.js text extraction per page
- [ ] T044 [US3-001] Save Document and DocumentContent to IndexedDB
- [ ] T045 [US3-001] Implement scanned PDF warning
- [ ] T046 [US3-002] Implement search by words/concepts
- [ ] T047 [US3-002] Return results with document name, page, category (ley/apunte)
- [ ] T048 [US3-001] Export pdf service from src/services/index.ts

**Checkpoint**: PDFs processed, searchable, with page references.

---

## Phase 6: User Story 4 - Exam simulator (P1) 🎯 MVP

**Goal**: Select theme, practice one question at a time, A-D answer, feedback, complementary PDF info, statistics, re-practice incorrect.

**Independent Test**: Select theme, answer question, assert feedback + correct answer + stats update.

### Tests for User Story 4

- [ ] T049 [P] [US4-001] exam.test.ts - select theme filters questions
- [ ] T050 [P] [US4-001] exam.test.ts - one question at a time
- [ ] T051 [P] [US4-002] exam.test.ts - correct/incorrect feedback with correct answer
- [ ] T052 [P] [US4-006] exam.test.ts - complementary info from PDFs shown
- [ ] T053 [P] [US4-003] exam.test.ts - statistics update (answered, correct, incorrect, %)
- [ ] T054 [P] [US4-004] exam.test.ts - re-practice incorrect questions

### Implementation for User Story 4

- [ ] T055 [US4-001] Create ExamSimulator component (theme selection, question display)
- [ ] T056 [US4-002] Implement answer selection (A-D) and confirm
- [ ] T057 [US4-002] Implement correct/incorrect feedback + show correct answer
- [ ] T058 [US4-006] Integrate pdf.service search for complementary info
- [ ] T059 [US4-003] Implement answer recording and statistics
- [ ] T060 [US4-004] Implement re-practice incorrect questions filter
- [ ] T061 [US4-001] Export ExamSimulator from src/components/index.ts

**Checkpoint**: Exam simulator functional with stats and complementary info.

---

## Phase 7: User Story 5 - Material library (P1)

**Goal**: Show materials grouped by category (laws, notes, questions) with name and category.

**Independent Test**: Open library, assert files grouped by category.

### Tests for User Story 5

- [ ] T062 [P] [US5-001] materialLibrary.test.ts - group files by category
- [ ] T063 [P] [US5-001] materialLibrary.test.ts - show name and category

### Implementation for User Story 5

- [ ] T064 [US5-001] Create MaterialLibrary component
- [ ] T065 [US5-001] Read materials from public/data folders (laws, notes, questions)
- [ ] T066 [US5-001] Export MaterialLibrary from src/components/index.ts

**Checkpoint**: Material library displays files by category.

---

## Phase 8: User Story 6 - UI components (P1/P2)

**Goal**: Button and QuestionCard components following conventions, Apple-inspired design.

### Tests for User Story 6

- [ ] T067 [P] [US6-001] Button.test.ts - renders label, calls onClick
- [ ] T068 [P] [US6-002] QuestionCard.test.ts - renders 4 options

### Implementation for User Story 6

- [ ] T069 [US6-001] Create Button component
- [ ] T070 [US6-002] Create QuestionCard component

**Checkpoint**: Base UI components complete.

---

## Phase 9: Polish & Cross-Cutting ✅ COMPLETE

- [x] T071 [P] Run full test suite (vitest run)
- [x] T072 [P] Run ESLint (max-warnings 0)
- [x] T073 [P] Run TypeScript check (tsc --noEmit)
- [x] T074 [P] Build static site (npm run build)
- [x] T075 [P] Verify GitHub Pages compatibility

---

## Phase 10: UI/UX Redesign (Apple-Inspired) ✅ COMPLETE

**Goal**: Modernize visual layer per design spec 007 without functional changes.

- [x] T076 [P] Extend design tokens (colors light/dark, spacing, radii, shadows, typography) in src/styles/theme.ts + expose CSS vars
- [x] T077 [P] Update GlobalStyles to tokens + prefers-reduced-motion + system font stack
- [x] T078 [P] Rework Button styles (primary/secondary/tertiary/destructive, disabled/loading/focus/hover/active)
- [x] T079 [P] Rework QuestionCard styles (options list, selection, feedback)
- [x] T080 [P] Rework ExamSimulator styles (progress, stats, results)
- [x] T081 [P] Rework MaterialLibrary + ImportExcel styles
- [x] T082 [P] Create Icon component (inline SVG, no new deps)
- [x] T083 [P] Create Nav component (items, active, onNavigate)
- [x] T084 [P] Create Dashboard component (welcome, quick actions, progress/empty)
- [x] T085 [P] Create Statistics component (average + history)
- [x] T086 [P] Wire App shell (Layout/Sidebar/Main, views inicio/simulador/biblioteca/importar/estadisticas)
- [x] T087 [P] Add tests for Icon/Nav/Dashboard/Statistics and run full suite

---

## Dependencies & Execution Order

- **Phase 1**: Complete (setup done).
- **Phase 2 (Foundational)**: Blocks all user stories. T010-T024 must complete before Phase 3+.
- **User Stories (Phases 3-8)**: Can proceed in priority order after Foundational. Independent test per story.
- **Phase 9 (Polish)**: After all user stories complete.

## Parallel Opportunities

- T010-T024 (Foundational) marked [P] can run in parallel (different files).
- User stories can be implemented sequentially (P1 first) or in parallel by different members.
- Test tasks [P] can run in parallel with implementation.
