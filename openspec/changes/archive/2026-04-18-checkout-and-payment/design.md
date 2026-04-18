## Context

Currently, the app allows users to browse products but lacks the capability to customize and complete orders. This design introduces the full checkout flow, including product customization, checkout summary, and payment gateway integration (Midtrans/Xendit).

## Goals / Non-Goals

**Goals:**
- Provide a smooth, step-by-step order flow: Product Customization → Checkout → Payment → Confirmation.
- Ensure type-safe state management for the order draft.
- Integrate a secure third-party payment gateway.
- Adhere to Alacater Color Guidelines for all new UI components.

**Non-Goals:**
- Handling order history or management (deferred to Epic 8).
- Implementing complex delivery tracking (deferred to Epic 9).

## Decisions

- **State Management**: Use **Zustand** for the order draft state. Rationale: Lightweight, easy to manage across multiple screens in the checkout flow without prop-drilling.
- **Form Handling**: Use **React Hook Form** for inputs like start date and notes. Rationale: Standardizes validation and integrates well with existing patterns.
- **Payment Gateway**: Integration with **Midtrans/Xendit** via their official React Native SDKs or WebView-based redirects. Rationale: Reliability and local Indonesian support.
- **Date Picking**: Use `@react-native-community/datetimepicker` for the start date selection. Rationale: Native look and feel on both iOS and Android.

## Risks / Trade-offs

- **[Risk]** Payment callback latency → **Mitigation**: Implement robust polling or webhook listeners to update order status.
- **[Risk]** Complex state synchronization → **Mitigation**: Clear the Zustand store only after a successful order confirmation or explicit cancellation.
- **[Risk]** Third-party SDK size → **Mitigation**: Evaluate weight of Midtrans vs Xendit SDKs and prefer the lighter or WebView-based approach if bundle size is an issue.
