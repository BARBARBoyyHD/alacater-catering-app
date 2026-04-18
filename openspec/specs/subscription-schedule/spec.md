# Subscription Schedule

The subscription schedule capability provides a calendar-based view of subscription deliveries.

## Requirements

### Requirement: Delivery Schedule Grid
The system SHALL display a grid or list of all delivery dates for a subscription, marking days as "Delivered", "Upcoming", or "Skipped".

#### Scenario: View subscription dates
- **WHEN** user views a subscription-based order
- **THEN** system shows a schedule of all planned delivery dates

### Requirement: Daily Menu Context
The system SHALL allow users to see the specific menu assigned to each delivery date in the schedule.

#### Scenario: View daily menu
- **WHEN** user taps on a delivery date in the schedule
- **THEN** system displays the menu for that specific day
