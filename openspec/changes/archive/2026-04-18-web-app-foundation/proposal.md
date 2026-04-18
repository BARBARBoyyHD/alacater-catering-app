## Why

The Alacater web app (Next.js) serves as the provider dashboard and landing page — the operational hub for catering partners to manage menus, orders, subscriptions, and analytics. Currently it's a bare Next.js 16 scaffold with no auth, state management, UI system, or database layer. This change establishes the complete foundation for both the web app frontend (`next-app/`) and the shared database/backend infrastructure, as defined in Epic 1 of the Product Backlog (WEB-1.x, DB-1.x).

## What Changes

- **Next.js 16 project** — already initialized with App Router, Turbopack, Tailwind CSS 4, React Compiler
- **Supabase SSR client** — server-side and browser-side Supabase clients for authentication and data access
- **TanStack Query 5** — server state management, caching, and synchronization
- **Zustand 5** — client-side local state management
- **React Hook Form 8 + Zod 3** — form handling and validation
- **Base UI components** — reusable Button, Card, Input, Modal components following Alacater Color Guidelines
- **Root layout with auth guards** — protected routes for authenticated provider dashboard
- **Prisma 6 ORM** — type-safe database access with Supabase PostgreSQL
- **Database schema** — all core models: User, Customer, Provider, Product, Order, Review, etc.
- **Row Level Security (RLS) policies** — data isolation per user role
- **Supabase Storage buckets** — images, documents, media uploads
- **Environment configuration** — `.env` management for Supabase, Midtrans, Resend, Google OAuth

## Capabilities

### New Capabilities
- `web-auth`: Authentication system for the Next.js web app including email/password, Google OAuth, session management via Supabase SSR, and route protection. Creates `specs/web-auth/spec.md`.
- `web-ui-system`: Base UI component library (Button, Card, Input, Modal) and design system tokens following Alacater Color Guidelines (Primary Orange `#FF7B00`). Creates `specs/web-ui-system/spec.md`.
- `web-state-management`: TanStack Query for server state and Zustand for client state, integrated with Supabase SSR client. Creates `specs/web-state-management/spec.md`.
- `database-schema`: Prisma schema with all core models (User, Customer, Provider, Product, Order, OrderItem, Review, DeliveryArea, etc.) and migration setup. Creates `specs/database-schema/spec.md`.
- `supabase-storage`: Supabase Storage buckets for provider images, product photos, documents, and media. Creates `specs/supabase-storage/spec.md`.

### Modified Capabilities
<!-- No existing specs to modify - this is a greenfield change -->

## Impact

- **Web App (Next.js)**: `next-app/` directory — new `src/` structure with components, hooks, store, services, config; root layout with auth check; protected dashboard routes
- **Database/Backend**: Supabase project — Prisma schema, migrations, RLS policies, storage buckets
- **Environment**: `.env` configuration for Supabase (URL, anon key, service role), Midtrans, Resend, Google OAuth
- **Dependencies**: `@supabase/ssr`, `@supabase/supabase-js`, `@tanstack/react-query`, `zustand`, `react-hook-form`, `@hookform/resolvers`, `zod`, `prisma`, `@prisma/client`
- **Design System**: Tailwind CSS 4 config extended with Alacater color tokens from `projects/02.Color-Guidelines.md`
