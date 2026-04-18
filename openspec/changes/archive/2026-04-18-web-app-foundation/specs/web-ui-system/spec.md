## ADDED Requirements

### Requirement: Button Component
The web app SHALL provide a reusable Button component supporting variant (primary, secondary, ghost), size (sm, md, lg), loading state, and disabled state. The primary variant SHALL use the Alacater Primary Orange (`#FF7B00`).

#### Scenario: Render primary button
- **WHEN** a Button is rendered with `variant="primary"`
- **THEN** it displays with orange background (`#FF7B00`) and white text

#### Scenario: Render secondary button
- **WHEN** a Button is rendered with `variant="secondary"`
- **THEN** it displays with white background, orange border (`#FF7B00`), and orange text

#### Scenario: Loading state
- **WHEN** a Button is rendered with `loading={true}`
- **THEN** it displays a spinner, disables click interaction, and shows reduced opacity

#### Scenario: Disabled state
- **WHEN** a Button is rendered with `disabled={true}`
- **THEN** it displays with gray background (`#CCCCCC`), white text, and no click interaction

### Requirement: Card Component
The web app SHALL provide a Card component supporting elevation (flat, elevated), selected state, and custom padding. The selected state SHALL use light orange background (`#FFF5EB`) with orange border.

#### Scenario: Default flat card
- **WHEN** a Card is rendered with default props
- **THEN** it displays white background with no shadow

#### Scenario: Elevated card
- **WHEN** a Card is rendered with `elevation="raised"`
- **THEN** it displays with subtle shadow (elevation: 2)

#### Scenario: Selected card
- **WHEN** a Card is rendered with `selected={true}`
- **THEN** it displays light orange background (`#FFF5EB`) with orange border (`#FF7B00`)

### Requirement: Input Component
The web app SHALL provide an Input component supporting default, focused, error, and disabled states. The focused state SHALL use orange border (`#FF7B00`). The error state SHALL use red border (`#FF3B30`).

#### Scenario: Default input
- **WHEN** an Input is rendered with default props
- **THEN** it displays white background with gray border (`#CCCCCC`)

#### Scenario: Focused input
- **WHEN** an Input receives focus
- **THEN** the border color changes to orange (`#FF7B00`)

#### Scenario: Error input
- **WHEN** an Input is rendered with `error="message"`
- **THEN** it displays red border (`#FF3B30`) and the error message below the field

#### Scenario: Disabled input
- **WHEN** an Input is rendered with `disabled={true}`
- **THEN** it displays gray background (`#F5F5F5`) and light border (`#E5E5E5`)

### Requirement: Modal Component
The web app SHALL provide a Modal component supporting title, body content, close button, and backdrop click to dismiss. The modal SHALL be centered and accessible.

#### Scenario: Open modal
- **WHEN** a Modal is rendered with `open={true}`
- **THEN** it displays a centered dialog with backdrop overlay and close button

#### Scenario: Close modal via backdrop click
- **WHEN** a user clicks outside the modal content area
- **THEN** the modal closes

#### Scenario: Close modal via close button
- **WHEN** a user clicks the close button (X) in the modal header
- **THEN** the modal closes

### Requirement: Color Token Consistency
All UI components SHALL use the Alacater Color Guidelines tokens defined in `projects/02.Color-Guidelines.md`. Hardcoded hex values SHALL NOT be used in component styles.

#### Scenario: Primary color usage
- **WHEN** any component references the primary brand color
- **THEN** it uses the design token `#FF7B00` (not a different orange shade)

#### Scenario: Error color usage
- **WHEN** any component references the error color
- **THEN** it uses the design token `#FF3B30`

#### Scenario: Text hierarchy colors
- **WHEN** text colors are applied
- **THEN** headings use `#333333`, body uses `#666666`, meta uses `#999999`
