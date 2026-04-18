## ADDED Requirements

### Requirement: Order Summary
The system SHALL display a detailed order summary including product name, quantity, duration, meal plan, and subtotal.

#### Scenario: View order summary
- **WHEN** user navigates to the checkout screen
- **THEN** system displays all selected options and the calculated subtotal

### Requirement: Delivery Schedule Configuration
The system SHALL allow users to configure or view the delivery schedule based on their selected duration and meal plan.

#### Scenario: View delivery schedule
- **WHEN** user is on the checkout screen
- **THEN** system displays the estimated delivery days and times for the subscription

### Requirement: Notes Input
The system SHALL provide an optional text input for users to add delivery or dietary notes.

#### Scenario: Add notes
- **WHEN** user enters text into the notes field
- **THEN** system saves the notes as part of the order metadata
