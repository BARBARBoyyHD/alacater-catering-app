## ADDED Requirements

### Requirement: Delivery Schedule Visibility
The system SHALL provide a view of all scheduled deliveries for a provider, grouped by date.

#### Scenario: View Daily Delivery Schedule
- **WHEN** a provider selects a specific date on the dashboard calendar
- **THEN** they see all order items scheduled for delivery on that day

### Requirement: Subscription Day Management
The system SHALL track and display the current day and total days for subscription-based orders.

#### Scenario: View Subscription Progress
- **WHEN** viewing a subscription order
- **THEN** the system shows "Day X of Y" and highlights the current delivery day

### Requirement: Delivery Schedule Updates
The system SHALL allow providers to update delivery details (e.g., courier info, time slots) for specific delivery days.

#### Scenario: Add Courier Information
- **WHEN** a provider enters a courier name and tracking ID for a "SHIPPING" order
- **THEN** the delivery details are saved and made available to the customer
