# Feature Specification: Excel Import Service

**Feature Branch**: `002-excel-import`

**Created**: 2026-11-02

**Status**: Draft

**Input**: User description: "Read an Excel file with multiple tabs, each containing multiple-choice questions (A, B, C, D) with correct answers, import them into PASAPP, identify theme per tab, validate data, detect duplicates, and report import errors."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Import questions from Excel (Priority: P1)

The user selects an Excel file with multiple tabs. The app reads all tabs, extracts questions with four options and correct answer, identifies theme from tab name, and stores them.

**Why this priority**: Core requirement - questions are the foundation of the exam simulator.

**Independent Test**: Can be verified by parsing a sample Excel file and asserting the resulting question list.

**Acceptance Scenarios**:

1. **Given** an Excel file with multiple tabs, **When** importing, **Then** all tabs are read and questions extracted.
2. **Given** a tab with questions, **When** importing, **Then** each question has 4 options (A-D) and one correct answer.
3. **Given** a tab name, **When** importing, **Then** the theme is set to the tab name.
4. **Given** duplicate questions, **When** importing, **Then** duplicates are detected and reported.

### User Story 2 - Validate import data (Priority: P2)

The app validates that each question has text, 4 options, and a correct answer. Invalid rows are reported as errors.

**Why this priority**: Prevents corrupt questions from entering the simulator.

**Independent Test**: Can be verified by importing an Excel with malformed rows and checking error report.

**Acceptance Scenarios**:

1. **Given** a row missing the correct answer, **When** importing, **Then** an import error is reported for that row.
2. **Given** a row with fewer than 4 options, **When** importing, **Then** an import error is reported.

### User Story 3 - Report import errors (Priority: P2)

The app informs the user which rows failed and why, without aborting the entire import.

**Why this priority**: User needs to know what was imported and what failed.

**Independent Test**: Can be verified by importing a mixed file and checking the error report lists specific rows.

**Acceptance Scenarios**:

1. **Given** some valid and some invalid rows, **When** importing, **Then** valid rows are imported and invalid rows are listed in errors.

### Edge Cases

- What happens when the Excel file has no tabs?
- What happens when a tab has no questions?
- What happens when columns differ between tabs (as warned in spec)?
- What happens when the file is not a valid Excel?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST read all tabs of an Excel file using SheetJS.
- **FR-002**: System MUST extract questions with 4 options (A, B, C, D) and correct answer.
- **FR-003**: System MUST identify theme from the originating tab name.
- **FR-004**: System MUST NOT assume all tabs have identical columns.
- **FR-005**: System MUST validate each question (text, 4 options, correct answer present).
- **FR-006**: System MUST detect duplicate questions.
- **FR-007**: System MUST report import errors per row without aborting the full import.
- **FR-008**: System MUST NOT modify the original Excel file.

### Key Entities

- **Question**: id, theme, tabName, text, options (A-D), correctOption, sourceFile, importedAt.
- **ImportResult**: imported count, error count, error details, source file name.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All tabs of a multi-tab Excel are read.
- **SC-002**: Each imported question has exactly 4 options and 1 correct answer.
- **SC-003**: Invalid rows produce errors but do not block valid rows.
- **SC-004**: Import logic covered by Vitest tests using a sample Excel file.

## Assumptions

- The Excel structure will be analyzed from a real sample before implementation (per spec requirement).
- The original Excel is not modified.
- Duplicate detection is based on question text similarity.
