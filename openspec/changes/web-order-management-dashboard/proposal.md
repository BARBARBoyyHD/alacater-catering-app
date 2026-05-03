## Why

Catering providers currently lack a centralized, real-time dashboard to manage their B2B orders, schedules, and status updates within the Next.js web application. This leads to operational inefficiencies and manual coordination. This change introduces a robust order management system to streamline provider workflows and enhance the partner experience.

## What Changes

- **Provider Dashboard**: A new management interface for catering providers.
- **Order Management Workflow**: Real-time order tracking, filtering, and status updates (Pending -> Preparing -> Shipping -> Delivered).
- **Delivery Schedule Management**: Tools to view and manage delivery dates and schedules for subscription-based orders.
- **Real-time Notifications**: Integration with Supabase Realtime for instant order updates.
- **API Enhancements**: New endpoints for order details, status transitions, and history.

## Capabilities

### New Capabilities
- `web-order-dashboard`: The primary interface for providers to view and manage orders.
- `order-status-workflow`: Logic for state transitions and bulk status updates.
- `delivery-schedule-management`: Managing specific delivery days for subscription packages.
- `order-realtime-sync`: Implementation of Supabase Realtime for order list and detail updates.
- `order-notifications`: System for email and push notifications triggered by order events.

### Modified Capabilities
- `database-schema`: Potential minor additions to support more granular status logging or schedule overrides.

## Impact

- **Frontend**: New dashboard screens and components in `next-app/src/app`.
- **Backend**: New API routes in `next-app/src/app/api/orders`.
- **Database**: Updates to `Order` and related tables in Prisma schema.
- **External**: Integration with Supabase for Realtime.
