# Feature Specification: Apple-Inspired UI/UX Redesign

**Feature Branch**: `007-ui-redesign`

**Created**: 2026-11-03

**Status**: Draft

**Input**: User description: "Build the PASAPP modern Apple-inspired UI/UX redesign: design direction, color palette (light/dark), typography, layout/navigation, dashboard, visual components, study experience, library, responsive, micro-interactions, technical implementation, restrictions. No functional changes."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Design tokens and global styles (Priority: P1)

As a user, I want the app to share a coherent Apple-inspired design system so the experience feels consistent across screens.

**Why this priority**: Foundation for all visual work; without tokens no other component can be restyled correctly.

**Independent Test**: Can be verified by rendering screens and asserting colors/fonts come from tokens/CSS variables.

**Acceptance Scenarios**:

1. **Given** the design tokens exist, **When** any component renders, **Then** colors, radii and shadows resolve through CSS custom properties.

2. **Given** the user prefers dark mode, **When** the OS uses dark scheme, **Then** surfaces/texts invert coherently.

### User Story 2 - Button hierarchy and states (Priority: P1)

As a user, I want clear, Apple-like buttons with primary/secondary/tertiary/destructive variants and full states.

**Why this priority**: Primary action affordance; base of interaction design.

**Independent Test**: Can be verified by rendering the Button and asserting variants/states.

**Acceptance Scenarios**:

1. **Given** a primary Button, **When** rendered, **Then** it uses the accent color with correct hover/active/focus/disabled/loading states.

### User Story 3 - QuestionCard study experience (Priority: P1)

As a user, I want questions presented as clean cards with intuitive selection and subtle feedback.

**Why this priority**: Core of the exam simulator; visual clarity drives study outcomes.

**Independent Test**: Can be verified by rendering the QuestionCard and asserting 4 options and feedback states.

**Acceptance Scenarios**:

1. **Given** a question with 4 options, **When** rendered, **Then** all 4 options are displayed.

2. **Given** an answer is confirmed, **When** feedback renders, **Then** correct/incorrect states use success/error tokens.

### User Story 4 - ExamSimulator polish (Priority: P1)

As a user, I want progress indication, stats and results presentation to feel Apple-like.

**Why this priority**: Practice flow must feel motivating and clear.

**Independent Test**: Can be verified by rendering the simulator states and asserting progress/stats/results markup.

**Acceptance Scenarios**:

1. **Given** a theme is selected, **When** answering, **Then** progress bar reflects position.

### User Story 5 - Dashboard, navigation and statistics screens (Priority: P2)

As a user, I want an Inicio dashboard, navigation shell and Estadísticas screen built on existing data.

**Why this priority**: Presentation of existing IndexedDB data; no new business logic.

**Independent Test**: Can be verified by rendering Dashboard/Statistics with fixture data and asserting content/empty states.

**Acceptance Scenarios**:

1. **Given** exam results exist, **When** Dashboard renders, **Then** it shows latest progress.

2. **Given** no exam results exist, **When** Dashboard renders, **Then** it shows an empty state.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Design tokens centralized in `/src/styles/theme.ts` (colors light/dark, spacing, radii, shadows, typography) exposed through CSS custom properties.
- **FR-002**: `GlobalStyles` sets the system font stack, surfaces and respects `prefers-reduced-motion`.
- **FR-003**: Components consume design tokens via CSS variables (no hard-coded colors in component styles).
- **FR-004**: Button supports variants `primary`, `secondary`, `tertiary`, `destructive` and states `disabled`, `loading`.
- **FR-005**: QuestionCard renders four options (A-D) with selection, correct and incorrect feedback states.
- **FR-006**: ExamSimulator exposes progress bar, stats row, feedback and results views.
- **FR-007**: Navigation shell renders items with icons and active state; navigates between Inicio, Estudiar/Simulacros, Biblioteca, Estadísticas, Importar.
- **FR-008**: Dashboard renders welcome, quick actions and latest progress (or empty state) from existing `ExamResult` data.
- **FR-009**: Statistics renders average and per-simulation history from existing `ExamResult` data.

### Design Requirements

- **DR-001**: Apple-inspired direction: minimal, whitespace, typography hierarchy, subtle borders/shadows, system fonts, responsive, respects reduced motion.
- **DR-002**: No new runtime dependencies introduced (inline SVG icons).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `tsc --noEmit` passes.
- **SC-002**: ESLint passes with no warnings.
- **SC-003**: Vitest suite passes.
- **SC-004**: `npm run build` passes.

## Assumptions

- No functional/business logic changes; presentation only.
- Dark mode driven by `prefers-color-scheme`.

## Edge Cases

- Dashboard/Statistics with empty `examResults` arrays must render empty states.
- Question feedback when no answer is selected must not render feedback.
