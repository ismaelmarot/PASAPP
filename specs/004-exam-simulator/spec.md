# Feature Specification: Exam Simulator

**Feature Branch**: `004-exam-simulator`

**Created**: 2026-11-02

**Status**: Draft

**Input**: User description: "Exam simulator that lets the user select a theme, practice questions one at a time (A/B/C/D), confirm answer, get feedback (correct/incorrect), show correct answer, consult complementary information from PDFs, record hits/misses, and re-practice incorrect questions. Shows statistics: answered, correct, incorrect, percentage, progress by theme."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Select theme and practice questions (Priority: P1)

The user chooses a theme and the app presents questions one at a time from that theme.

**Why this priority**: Core requirement - the exam simulator is the main feature of PASAPP.

**Independent Test**: Can be verified by selecting a theme and asserting questions shown belong to that theme.

**Acceptance Scenarios**:

1. **Given** questions exist for multiple themes, **When** selecting a theme, **Then** only questions from that theme are presented.
2. **Given** a theme is selected, **When** practicing, **Then** one question is shown at a time.

### User Story 2 - Answer and get feedback (Priority: P1)

The user selects A, B, C, or D, confirms, and the app shows whether it is correct, the correct answer, and complementary information from PDFs.

**Why this priority**: Core requirement - immediate feedback is essential for learning.

**Independent Test**: Can be verified by answering a question and asserting feedback and correct answer are shown.

**Acceptance Scenarios**:

1. **Given** a question with a known correct answer, **When** selecting the correct option and confirming, **Then** feedback shows "correct".
2. **Given** a question, **When** selecting an incorrect option and confirming, **Then** feedback shows "incorrect" and the correct answer.
3. **Given** a question answered, **When** complementary info exists in PDFs, **Then** relevant fragments are shown with document name and page.

### User Story 3 - Record results and statistics (Priority: P2)

The app records correct/incorrect answers and shows statistics: answered, correct, incorrect, percentage, progress by theme.

**Why this priority**: User needs to track their study progress.

**Independent Test**: Can be verified by answering several questions and checking statistics update.

**Acceptance Scenarios**:

1. **Given** questions answered, **When** viewing statistics, **Then** answered, correct, incorrect, and percentage are shown.
2. **Given** questions per theme, **When** viewing progress by theme, **Then** each theme shows its completion percentage.

### User Story 4 - Re-practice incorrect questions (Priority: P2)

The user can choose to practice only questions they previously answered incorrectly.

**Why this priority**: Helps focus study on weak areas.

**Independent Test**: Can be verified by marking questions incorrect and then filtering to practice only those.

**Acceptance Scenarios**:

1. **Given** some questions answered incorrectly, **When** selecting "practice incorrect", **Then** only those questions are presented.

### Edge Cases

- What happens when there are no questions for a selected theme?
- What happens when all questions in a theme have been answered?
- What happens when no complementary info is found for a question?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST let the user select a theme.
- **FR-002**: System MUST present one question at a time.
- **FR-003**: System MUST let the user select A, B, C, or D.
- **FR-004**: System MUST confirm the answer and show correct/incorrect feedback.
- **FR-005**: System MUST show the correct answer after answering.
- **FR-006**: System MUST show complementary information from PDFs (fragment, document name, page, category).
- **FR-007**: System MUST distinguish official correct answer (from Excel) from complementary info (from PDFs).
- **FR-008**: System MUST record correct and incorrect answers.
- **FR-009**: System MUST show statistics: answered, correct, incorrect, percentage, progress by theme.
- **FR-010**: System MUST let the user re-practice incorrect questions.
- **FR-011**: System MUST indicate clearly when no complementary info is found.

### Key Entities

- **ExamSession**: theme, current question index, answers, score.
- **AnswerRecord**: questionId, selectedOption, isCorrect, answeredAt.
- **ThemeProgress**: theme, total, answered, correct, percentage.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: One question presented at a time, user selects A-D and confirms.
- **SC-002**: Feedback shows correct/incorrect and the official correct answer.
- **SC-003**: Complementary info from PDFs shown with document name, page, category.
- **SC-004**: Statistics update after each answer.
- **SC-005**: Simulator logic covered by Vitest tests.

## Assumptions

- Questions are already imported from Excel before simulation starts.
- Complementary info search is text-based (no AI in v1).
- If no complementary info is found, a clear message is shown.
