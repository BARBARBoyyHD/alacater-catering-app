## ADDED Requirements

### Requirement: Payment Method Selection
The system SHALL provide a selection of payment methods (e.g., Virtual Account, E-Wallet, Credit Card).

#### Scenario: Select payment method
- **WHEN** user selects a payment method
- **THEN** system highlights the selection and prepares the transaction for the chosen method

### Requirement: Payment Gateway Integration
The system SHALL integrate with Midtrans or Xendit to process transactions securely.

#### Scenario: Initiate payment
- **WHEN** user clicks "Bayar" on the checkout screen
- **THEN** system opens the payment gateway's interface or processes the transaction via API
