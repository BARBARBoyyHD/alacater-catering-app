## ADDED Requirements

### Requirement: Quantity Selector
The system SHALL provide a quantity selector (stepper) to allow users to set the number of packages for the order.

#### Scenario: Change quantity
- **WHEN** user taps plus or minus button on the quantity selector
- **THEN** system updates the quantity and recalculates the total price

### Requirement: Start Date Picker
The system SHALL provide a date picker for users to select the start date of their subscription.

#### Scenario: Select start date
- **WHEN** user selects a date from the calendar picker
- **THEN** system displays the selected date as the start of the subscription

### Requirement: Duration Selection
The system SHALL allow users to select from available subscription durations (e.g., 5, 10, 20, or 60 days).

#### Scenario: Select duration
- **WHEN** user selects a duration option
- **THEN** system updates the end date and total price based on the selection

### Requirement: Savings Badges
The system SHALL display visual savings badges for longer durations if a discount is applicable.

#### Scenario: Display savings badge
- **WHEN** a duration with a discount is selected or viewed
- **THEN** system displays a "Save X%" or "Promo" badge next to the duration option

### Requirement: Meal Plan Selection
The system SHALL allow users to select their meal plan (e.g., Lunch, Dinner, or Both).

#### Scenario: Select meal plan
- **WHEN** user selects a meal plan option
- **THEN** system updates the total price based on the meal plan's pricing
