# Product Order Initialization

The product order initialization capability enables users to start the ordering process.

## Requirements

### REQ-1: Bottom Action Bar
The system SHALL display a bottom action bar with Chat and "Pesan Sekarang" buttons.

### REQ-2: Initiate Order
The system SHALL allow the user to click "Pesan Sekarang" to start the order process.

#### Scenario: Initiate order
- **WHEN** user clicks "Pesan Sekarang"
- **THEN** system navigates the user to the `ProductOrderScreen` (Product Order Customization)
