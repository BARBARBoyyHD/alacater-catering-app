## Why

To handle marketplace transactions reliably, we need a robust ledger system that tracks merchant balances, handles gateway webhooks securely, and manages the lifecycle of withdrawals with a state machine to prevent double-spending.

## What Changes

- Implement a Ledger system to track merchant balances (Available vs. Pending).
- Create secure webhook endpoints to handle payment confirmations from gateways.
- Implement a Withdrawal system with a state machine (Requested, Processing, Success, Failed).
- Ensure atomic database transactions for all financial movements.

## Capabilities

### New Capabilities
- `payment-ledger`: Manages the atomic recording of order payments and merchant balance updates.
- `merchant-withdrawal`: Handles the state machine for merchant payout requests and disbursement API integration.
- `financial-reporting`: Provides immutable transaction logs for auditing and merchant transparency.

### Modified Capabilities
- `payment-integration`: Update to include webhook handling and ledger triggering.

## Impact

- Database: New `Wallet`, `WalletTransaction`, and `Disbursement` models.
- API: New `/api/payments/webhook` and `/api/wallet/*` endpoints.
- Backend: Transition from simple status updates to a full ledger-based accounting system.
