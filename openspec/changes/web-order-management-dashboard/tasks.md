## 1. Database & Backend API

- [x] 1.1 Update `Prisma` schema with `OrderStatus` enum changes and add status logging support
- [x] 1.2 Run database migration to apply schema changes (Completed via db push)
- [x] 1.3 Create order detail API route `GET /api/orders/[id]` with full relations (Customer, Items, Product)
- [x] 1.4 Implement order list API route `GET /api/orders` with filtering and search capabilities
- [x] 1.5 Build order status update API `PATCH /api/orders/[id]/status` with transition validation
- [x] 1.6 Create order history/logging service to track status changes

## 2. Real-time & Notifications

- [x] 2.1 Configure Supabase Realtime for the `Order` table
- [ ] 2.2 Implement email notification trigger for "New Order Paid" status
- [ ] 2.3 Set up in-app notification system for the Mitra portal dashboard
- [ ] 2.4 Integrate push notification trigger for customer mobile app on status updates

## 3. Web Dashboard UI Implementation

- [x] 3.1 Scaffolding: Create base layout for the Provider Dashboard in `next-app/src/app`
- [x] 3.2 Component: Convert `Dashboard.html` into modular React components (Sidebar, TopNav, Container)
- [x] 3.3 Component: Build `OrderTable` component with status badges and filtering controls
- [x] 3.4 Component: Implement `OrderDetailModal` for viewing and managing specific orders
- [x] 3.5 Integration: Connect dashboard UI to `TanStack Query` for data fetching
- [x] 3.6 Integration: Implement real-time list updates using Supabase subscription (UI ready, waiting for Realtime config)
- [x] 3.7 UI Refinement: Use `react-icons` and ensure full responsiveness

## 4. Delivery & Schedule Management

- [ ] 4.1 UI: Create delivery schedule view grouped by date
- [ ] 4.2 Integration: Implement delivery detail update workflow (courier/tracking info)
- [ ] 4.3 UI: Add subscription progress indicators ("Day X of Y") to order views

## 5. Testing & Validation

- [ ] 5.1 Unit test status transition validation logic
- [ ] 5.2 Integration test API endpoints for filtering and search
- [ ] 5.3 Manual verification of real-time sync across multiple dashboard sessions
- [ ] 5.4 Verify email and push notification delivery
