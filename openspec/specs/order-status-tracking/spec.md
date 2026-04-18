# Order Status Tracking

The order status tracking capability provides visual feedback on order progress.

## Requirements

### Requirement: Order Status Timeline
The system SHALL display a visual timeline of the order lifecycle (e.g., Paid → Preparing → Shipping → Delivered).

#### Scenario: Track order status
- **WHEN** user views an active order
- **THEN** system shows the current status and completed stages in a vertical or horizontal timeline

### Requirement: Order Activity Log
The system SHALL display a list of recent activities related to the order, including status timestamps.

#### Scenario: View activity history
- **WHEN** user expands the activity section
- **THEN** system displays timestamps for every status change
