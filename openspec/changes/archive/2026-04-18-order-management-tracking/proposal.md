## Why

Customers need a centralized place to track their active subscriptions, view delivery schedules, and contact merchants. This change introduces the "Detail Pesanan" screen and activity tracking to provide transparency and control over orders.

## What Changes

- Create a comprehensive Order Detail screen (`Detail Pesanan`).
- Implement an order status timeline to track progress (Paid, Preparing, Shipping, etc.).
- Build a delivery schedule view for subscription-based orders.
- Add an order activity list for granular updates.
- Implement "Hubungi Merchant" chat integration.
- Connect the "Pesanan Saya" bottom tab to the order management flow.

## Capabilities

### New Capabilities
- `order-detail-view`: Detailed overview of a specific order, including items, pricing, and status.
- `order-status-tracking`: Visual timeline and activity log for order lifecycle tracking.
- `subscription-schedule`: Calendar-like view of delivery dates for active subscriptions.
- `merchant-contact`: direct chat link or button to reach the provider.

### Modified Capabilities
- `bottom-navigation`: Connect "Pesanan Saya" tab to the orders list/management screen.

## Impact

- `OrderScreen` (Pesanan Saya): Transition from stub to active order list.
- New Screens: `OrderDetailScreen`, `TrackingScreen`.
- Navigation: Integration with the existing `(tabs)` and `checkout` flows.
