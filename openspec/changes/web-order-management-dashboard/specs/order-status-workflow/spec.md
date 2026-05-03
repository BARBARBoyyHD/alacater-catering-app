## ADDED Requirements

### Requirement: Order Status Transitions
The system SHALL allow providers to update the status of an order through its lifecycle (PAID -> PREPARING -> SHIPPING -> DELIVERED).

#### Scenario: Update Order to Preparing
- **WHEN** a provider marks a "PAID" order as "Preparing"
- **THEN** the order status is updated to "PREPARING" in the database

### Requirement: Bulk Status Updates
The system SHALL allow providers to select multiple orders and update their status simultaneously.

#### Scenario: Bulk Ship Orders
- **WHEN** a provider selects 5 "PREPARING" orders and clicks "Ship"
- **THEN** all 5 orders have their status updated to "SHIPPING"

### Requirement: Status Update Validation
The system SHALL ensure that status transitions follow the defined sequence and prevent invalid transitions (e.g., DELIVERED -> PREPARING).

#### Scenario: Invalid Transition Attempt
- **WHEN** a provider tries to move a "DELIVERED" order back to "PREPARING"
- **THEN** the system prevents the update and displays an error message
