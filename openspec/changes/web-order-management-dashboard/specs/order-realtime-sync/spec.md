## ADDED Requirements

### Requirement: Real-time Order List Updates
The system SHALL use Supabase Realtime to update the provider dashboard list immediately when a new order is created or an existing order is updated.

#### Scenario: New Order Arrival
- **WHEN** a customer successfully pays for a new order
- **THEN** the order appears in the provider's "PAID" list without a page refresh

### Requirement: Real-time Status Sync
The system SHALL reflect status changes across all active provider sessions in real-time.

#### Scenario: Status Update Sync
- **WHEN** one staff member updates an order to "PREPARING"
- **THEN** other staff members viewing the same dashboard see the status change immediately
