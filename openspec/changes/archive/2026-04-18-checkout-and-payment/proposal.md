## Why

Customers need a seamless way to customize their catering packages (quantity, duration, meal plans) and complete payments securely within the app. Implementing the checkout and payment flow is essential to convert discovery into transactions.

## What Changes

- Create a new Product Order screen for package customization.
- Implement quantity, start date, duration, and meal plan selectors.
- Display visual savings badges for longer subscription durations.
- Build a Checkout screen for order summary and delivery configuration.
- Integrate Midtrans/Xendit payment gateways for secure transactions.
- Implement an order confirmation screen to finalize the user journey.

## Capabilities

### New Capabilities
- `product-order-customization`: Handles selection of quantity, duration, meal plans, and start date.
- `checkout-summary`: Provides a final overview of the order, including delivery schedules and total costs.
- `payment-integration`: Manages payment method selection and integration with external gateways (Midtrans/Xendit).
- `order-confirmation`: Displays the success/failure status of a transaction and next steps.

### Modified Capabilities
- `product-order-init`: Update "Pesan Sekarang" button logic to navigate to the new `ProductOrderScreen`.

## Impact

- `ProductDetailScreen`: Updated navigation logic.
- New Screens: `ProductOrderScreen`, `CheckoutScreen`, `PaymentScreen`, `ConfirmationScreen`.
- Navigation: Updated root navigation stack for the checkout flow.
- API: New endpoints for order creation and payment status webhooks.
- Dependencies: Addition of payment gateway SDKs (Midtrans/Xendit).
