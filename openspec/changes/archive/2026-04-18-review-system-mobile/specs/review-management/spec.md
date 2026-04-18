## ADDED Requirements

### Requirement: 48-hour Edit Window
The system SHALL allow users to edit their submitted reviews within 48 hours of submission.

#### Scenario: Edit review
- **WHEN** user attempts to edit a review within 48 hours
- **THEN** system opens the review submission screen with previous data populated

### Requirement: Edit Window Expiry
The system SHALL disable editing functionality after 48 hours have passed since submission.

#### Scenario: Attempt edit after 48h
- **WHEN** user views a review submitted more than 48 hours ago
- **THEN** system hides or disables the "Edit" button
