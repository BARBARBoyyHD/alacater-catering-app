# Order Confirmation

The order confirmation capability provides feedback after a transaction.

## Requirements

### Requirement: Order Status Feedback
The system SHALL display a confirmation screen showing the status of the order (Success, Pending, or Failed).

#### Scenario: Successful payment
- **WHEN** payment gateway returns a success status
- **THEN** system displays the "Order Successful" screen with order details and next steps

#### Scenario: Failed payment
- **WHEN** payment gateway returns a failure status
- **THEN** system displays an "Order Failed" screen with the reason and an option to retry
