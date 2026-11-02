# Feature Specification: IndexedDB Storage Service

**Feature Branch**: `001-storage-indexeddb`

**Created**: 2026-11-02

**Status**: Draft

**Input**: User description: "Implement IndexedDB storage service for PASAPP to persist questions, answers, PDF content, exam results, and study history locally in the browser."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Save and retrieve questions (Priority: P1)

The user imports questions from Excel and the app saves them to IndexedDB. Later, the app can retrieve those questions to practice.

**Why this priority**: Core requirement - without persisted questions, the exam simulator cannot function.

**Independent Test**: Can be verified by calling save then get on the storage service and asserting the returned data matches.

**Acceptance Scenarios**:

1. **Given** an empty IndexedDB, **When** saving a batch of questions, **Then** the questions are retrievable by ID and by theme.
2. **Given** stored questions exist, **When** retrieving all questions, **Then** the full list is returned.

### User Story 2 - Save and retrieve exam results (Priority: P2)

The user completes an exam simulation and the app saves the result to IndexedDB for statistics.

**Why this priority**: Needed for the statistics functionality of the exam simulator.

**Independent Test**: Can be verified by saving an exam result and reading it back, checking score and date.

**Acceptance Scenarios**:

1. **Given** no results stored, **When** saving an exam result, **Then** it is retrievable with correct percentage.
2. **Given** multiple results stored, **When** querying by theme, **Then** only results for that theme are returned.

### User Story 3 - Export and import backup (Priority: P3)

The user can export all study data to a JSON file and import it back to restore progress.

**Why this priority**: User control over their data, required by the specification.

**Independent Test**: Can be verified by exporting data, modifying it, importing, and confirming restoration.

**Acceptance Scenarios**:

1. **Given** data stored in IndexedDB, **When** exporting, **Then** a valid JSON file with all entities is produced.
2. **Given** an exported JSON file, **When** importing, **Then** IndexedDB contains the imported entities.

### Edge Cases

- What happens when IndexedDB is blocked by the browser (private mode)?
- How does the system handle corrupt JSON on import?
- What happens when the same question ID is saved twice?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide save, get, update, and delete operations for IndexedDB.
- **FR-002**: System MUST store questions imported from Excel with theme and correct answer.
- **FR-003**: System MUST store extracted PDF text with page references.
- **FR-004**: System MUST store exam results with score, theme, and date.
- **FR-005**: System MUST provide export to JSON and import from JSON.
- **FR-006**: System MUST NOT use localStorage for PDF content or large data.
- **FR-007**: System MUST inform user that data is local to the browser/device.

### Key Entities

- **Question**: Imported from Excel, includes theme, text, options, correct option.
- **Document**: PDF metadata (name, category, path, page count, processed date).
- **DocumentContent**: Extracted text per page, associated with a document.
- **ExamResult**: Score, theme, date, correct/incorrect counts.
- **AnswerHistory**: Individual question answers during practice.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Save and retrieve a question in under 100ms.
- **SC-002**: Export produces a single JSON file containing all entities.
- **SC-003**: Import restores data so that previously saved questions are retrievable.
- **SC-004**: All storage operations are covered by Vitest tests.

## Assumptions

- IndexedDB is available in the target browsers.
- Data does not need to synchronize across devices.
- The user manages their own backups via export/import.
