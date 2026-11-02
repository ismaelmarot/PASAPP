# Feature Specification: PDF Processing Service

**Feature Branch**: `003-pdf-processing`

**Created**: 2026-11-02

**Status**: Draft

**Input**: User description: "Process PDFs locally with PDF.js, extract text, keep page references, save processed content to IndexedDB, allow search by words/concepts, associate results with laws and notes. If a PDF is scanned (no selectable text), inform that OCR is needed. No OCR in v1."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Extract text from PDF with page references (Priority: P1)

The user loads a PDF (law or notes). The app extracts text per page, saves it to IndexedDB with document name and page numbers.

**Why this priority**: Core requirement - PDF content is needed for complementary information after answering questions.

**Independent Test**: Can be verified by processing a sample PDF and asserting extracted text contains expected content with page numbers.

**Acceptance Scenarios**:

1. **Given** a PDF with selectable text, **When** processing, **Then** text is extracted per page with page numbers.
2. **Given** a processed PDF, **When** querying content, **Then** results include document name and page number.

### User Story 2 - Search words and concepts in processed PDFs (Priority: P2)

The user searches for a term. The app returns relevant fragments from laws and notes with document name, page, and category.

**Why this priority**: Needed for complementary information after answering exam questions.

**Independent Test**: Can be verified by searching a term and asserting results contain matching fragments.

**Acceptance Scenarios**:

1. **Given** processed PDF content, **When** searching for a term, **Then** matching fragments are returned with document name, page, and category.

### User Story 3 - Handle scanned PDFs without text (Priority: P2)

The app detects PDFs without selectable text and informs the user that OCR is needed.

**Why this priority**: Sets correct expectations when a PDF cannot be processed.

**Independent Test**: Can be verified by processing a scanned PDF and checking the appropriate message.

**Acceptance Scenarios**:

1. **Given** a scanned PDF with no extractable text, **When** processing, **Then** the user is informed that OCR is needed.

### Edge Cases

- What happens when a PDF is password protected?
- What happens when a PDF is very large?
- What happens when text extraction returns empty for some pages?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST process PDFs locally using PDF.js (no server).
- **FR-002**: System MUST extract text per page and keep page references.
- **FR-003**: System MUST save processed content to IndexedDB.
- **FR-004**: System MUST allow search by words/concepts across processed documents.
- **FR-005**: System MUST return results with document name, page number, and category (ley/apunte).
- **FR-006**: System MUST inform user when a PDF is scanned and needs OCR.
- **FR-007**: System MUST NOT implement OCR in v1.
- **FR-008**: System MUST NOT modify original PDF files.

### Key Entities

- **Document**: id, name, category (ley|apunte), fileName, filePath, pageCount, processedAt, hasExtractableText.
- **DocumentContent**: documentId, pageNumber, text.
- **SearchResult**: fragment, documentName, pageNumber, category.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Text extracted from a sample PDF with correct page numbers.
- **SC-002**: Search returns fragments with document name, page, and category.
- **SC-003**: Scanned PDF produces a clear "OCR needed" message.
- **SC-004**: PDF processing covered by Vitest tests.

## Assumptions

- PDFs have selectable text (scanned PDFs handled with a warning, no OCR).
- Original PDFs stored in /public/data/{laws,notes} are not modified.
- PDF.js runs entirely in the browser.
