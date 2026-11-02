# Feature Specification: Material Library

**Feature Branch**: `005-material-library`

**Created**: 2026-11-02

**Status**: Draft

**Input**: User description: "Library organizing study materials in three categories: laws, notes, and questions. Allows incorporating PDFs of laws, PDFs of notes, and the Excel file. Shows available files with name and category. Initial load done once. No multi-user sync."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View available materials (Priority: P1)

The user opens the library and sees the available files organized by category (laws, notes, questions) with name and category identified.

**Why this priority**: The library is the entry point for materials.

**Independent Test**: Can be verified by opening the library and asserting files are grouped by category.

**Acceptance Scenarios**:

1. **Given** materials exist in /public/data, **When** opening the library, **Then** files are shown grouped by category (laws, notes, questions).
2. **Given** a file, **When** viewing the library, **Then** its name and category are identified.

### User Story 2 - Incorporate PDFs and Excel (Priority: P2)

The user can add PDFs of laws, PDFs of notes, and the Excel file to the library. Initial load done once.

**Why this priority**: Materials must be loadable into the app.

**Independent Test**: Can be verified by adding a file and seeing it appear in the library.

**Acceptance Scenarios**:

1. **Given** a PDF in /public/data/laws, **When** refreshing the library, **Then** it appears under "Leyes".
2. **Given** a PDF in /public/data/notes, **When** refreshing the library, **Then** it appears under "Apuntes".
3. **Given** an Excel in /public/data/questions, **When** refreshing the library, **Then** it appears under "Preguntas".

### Edge Cases

- What happens when /public/data folders are empty?
- What happens when a file is not a valid PDF or Excel?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST organize materials in three categories: laws, notes, questions.
- **FR-002**: System MUST show available files with name and category.
- **FR-003**: System MUST allow incorporating PDFs of laws and notes.
- **FR-004**: System MUST allow incorporating the Excel file.
- **FR-005**: System MUST identify name and category for each file.
- **FR-006**: System MUST NOT modify original documents.
- **FR-007**: System MUST NOT store documents inside /src.
- **FR-008**: Initial load done once, no frequent updates needed.

### Key Entities

- **MaterialFile**: name, category (ley|apunte|preguntas), filePath, fileType.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Files grouped by category in the library view.
- **SC-002**: Each file shows name and category.
- **SC-003**: Library covered by Vitest tests (category grouping logic).

## Assumptions

- Materials are placed in /public/data/{laws,notes,questions} by the user.
- Original documents are not modified.
- No synchronization or multi-user administration.
