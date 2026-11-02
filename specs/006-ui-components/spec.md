# Feature Specification: UI Components

**Feature Branch**: `006-ui-components`

**Created**: 2026-11-02

**Status**: Draft

**Input**: User description: "Build reusable UI components following PASAPP conventions: each component in its own folder with .tsx, .styles.ts, use*.ts hook (when logic justifies it), .test.tsx, and index.ts. Apple-inspired design: clean, minimal, system typography, subtle borders/shadows, responsive, prefers-reduced-motion. Internal imports use @/ alias and barrel exports."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reusable Button component (Priority: P1)

A Button component following the component convention, styled with Styled Components, used across the app.

**Why this priority**: Base component needed by all other components.

**Independent Test**: Can be verified by rendering the Button and asserting it displays label and calls onClick.

**Acceptance Scenarios**:

1. **Given** a Button with label and onClick, **When** rendered and clicked, **Then** onClick is called.

### User Story 2 - QuestionCard component (Priority: P1)

A card showing one question with its four options (A-D), used by the exam simulator.

**Why this priority**: Core visual component of the main feature (exam simulator).

**Independent Test**: Can be verified by rendering with a question and asserting options are shown.

**Acceptance Scenarios**:

1. **Given** a question with 4 options, **When** QuestionCard renders, **Then** all 4 options are displayed.

### User Story 3 - Design system consistency (Priority: P2)

All components follow Apple-inspired design: clean, minimal, system fonts, subtle shadows, responsive, respects prefers-reduced-motion.

**Why this priority**: Consistent user experience per specification.

**Independent Test**: Can be verified by inspecting component styles and structure.

**Acceptance Scenarios**:

1. **Given** any component, **When** inspected, **Then** it uses the shared theme and GlobalStyles.

### Edge Cases

- What happens when a component receives no children?
- What happens when a component is used without required props?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Each component follows the folder convention: NombreComponente.tsx, NombreComponente.styles.ts, useNombreComponente.ts (when logic justifies), NombreComponente.test.tsx, index.ts.
- **FR-002**: Styles use Styled Components.
- **FR-003**: Internal imports use @/ alias and barrel exports.
- **FR-004**: No empty hooks, tests, or files created without purpose.
- **FR-005**: Design follows Apple-inspired minimal aesthetic.
- **FR-006**: Components are responsive.
- **FR-007**: Components respect prefers-reduced-motion.

### Key Entities

- No data entities; this is a UI structure feature.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Button and QuestionCard components exist and pass their tests.
- **SC-002**: All components use @/ alias and barrel exports.
- **SC-003**: ESLint passes with no warnings.

## Assumptions

- Simpler components may skip the hook separation if logic is trivial.
- Theme and GlobalStyles already exist in /src/styles.
