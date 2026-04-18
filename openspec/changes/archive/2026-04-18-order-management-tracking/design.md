## Context

Customers need to track their orders and manage their subscriptions. Currently, the "Pesanan Saya" tab is a placeholder. This design introduces the `OrderListScreen` and `OrderDetailScreen` to provide full visibility into active and past orders, including a visual status timeline and delivery schedule.

## Goals / Non-Goals

**Goals:**
- Provide a clear, actionable list of active and past orders.
- Implement a detailed view for each order with a status timeline (vertical).
- Display a delivery schedule for subscription orders.
- Resolve the double navbar issue in `HomeScreen`.
- Connect the bottom tab "Pesanan Saya" to the order list.

**Non-Goals:**
- Implementing the actual chat system (only providing the "Hubungi Merchant" link/button).
- Detailed order cancellation/refund flow (deferred).

## Decisions

- **Architecture**: Use `expo-router` for all navigation. The `OrderListScreen` will reside in `app/(tabs)/orders/index.tsx`.
- **State Management**: Use **TanStack Query** for fetching order data and status updates. Rationale: Consistent with project standards for server state.
- **UI Components**: 
  - **Timeline**: Custom vertical line with circles to represent status stages.
  - **Schedule**: Horizontal or grid list of dates.
  - **Alacater Theme**: Use `Colors.success` for completed stages and `Colors.primary` for current active stage.

## Risks / Trade-offs

- **[Risk]** Deep nesting in `(tabs)` stack → **Mitigation**: Keep the order detail as a separate screen outside the tab bar if necessary, or use `expo-router`'s standard nesting.
- **[Risk]** Redundant navigation code → **Mitigation**: Already addressed by removing custom `BottomNavigation` from `HomeScreen`.
