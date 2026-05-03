## MODIFIED Requirements

### REQ-4: Enum Types
The database SHALL include enum types: SubscriptionTier (FREE, PREMIUM), ProductCategory (WEIGHT_LOSS, MUSCLE_GAIN, KETO, VEGAN, HALAL, BALANCED, CUSTOM), OrderStatus (PENDING, PAID, PREPARING, SHIPPING, DELIVERED, FAILED, CANCELLED).

#### Scenario: Using OrderStatus Enum
- **WHEN** a record is created in the Order table
- **THEN** the status field MUST be one of the defined OrderStatus enum values

## ADDED Requirements

### REQ-7: Order Status History
The system SHALL maintain a history of order status changes for auditing and tracking.

#### Scenario: Log Status Change
- **WHEN** an order status is updated
- **THEN** the system logs the old status, new status, timestamp, and the user who performed the action
