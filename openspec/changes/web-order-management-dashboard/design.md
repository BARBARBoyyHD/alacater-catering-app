## Context

The current Next.js application serves as the partner portal but lacks a dedicated order management interface. This design outlines the implementation of a real-time dashboard and supporting APIs to enable providers to manage their catering operations efficiently.

## Goals / Non-Goals

**Goals:**
- Implement a responsive, real-time order dashboard based on the provided design reference.
- Enable status transitions and bulk updates for orders.
- Provide clear visibility into delivery schedules.
- Ensure real-time synchronization between the database and the UI.
- Implement a notification system for order events.

**Non-Goals:**
- Automated courier dispatch (manual entry only).
- Financial reporting or complex analytics (out of scope for this change).
- Inventory management.

## Decisions

### 1. UI Implementation: Design Reference Conversion
We will convert `docs/ui/next/Dashboard.html` into a set of React components within the `next-app` project.
- **Rationale**: Maintain visual consistency with existing mockups.
- **Implementation**: Use Tailwind CSS as specified in the HTML reference. Replace static classes with dynamic `className` attributes. Use `Lucide React` or continue using `Material Symbols` as per the design.

### 2. State Management: TanStack Query + Supabase Realtime
Use TanStack Query for initial data fetching and caching, combined with Supabase Realtime for live updates.
- **Rationale**: TanStack Query provides robust caching and synchronization logic. Supabase Realtime ensures the UI is "live" without manual polling.
- **Alternative**: SWR was considered but TanStack Query is already established in the project (per GEMINI.md).

### 3. API Design
Implement RESTful endpoints in `next-app/src/app/api/orders`.
- `GET /api/orders`: Supports filtering by `status`, `providerId`, and date range.
- `GET /api/orders/[id]`: Returns detailed order information including relations (`OrderItem`, `Customer`, `Product`).
- `PATCH /api/orders/[id]/status`: Validates and updates order status. Triggers notifications.

### 4. Real-time Subscription Strategy
The dashboard will subscribe to the `Order` table using the Supabase client.
- **Scope**: Filter subscriptions by `providerId` to ensure data privacy and performance.
- **Action**: On `INSERT` or `UPDATE`, invalidate the relevant TanStack Query keys to trigger a re-fetch or update the local cache.

### 5. Notification System
Trigger notifications on status change.
- **Email**: Use a service like Resend or SendGrid (to be configured).
- **Push**: Send via Supabase Edge Functions or a dedicated hook to the mobile app's push service.

## Risks / Trade-offs

- **[Risk] Real-time Overload** → If a provider has hundreds of active orders, constant updates might impact performance.
  - *Mitigation*: Use optimistic updates and limit real-time subscriptions to the current view's active orders.
- **[Trade-off] Tailwind HTML Conversion** → Manually converting large HTML files can be error-prone.
  - *Mitigation*: Break down the HTML into small, reusable React components (`OrderCard`, `StatusBadge`, `FilterBar`).
