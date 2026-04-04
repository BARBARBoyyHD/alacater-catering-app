## 1. Web App Dependencies & Setup

- [ ] 1.1 Install Supabase dependencies: `@supabase/supabase-js`, `@supabase/ssr`
- [ ] 1.2 Install state management: `@tanstack/react-query`, `zustand`
- [ ] 1.3 Install form dependencies: `react-hook-form`, `@hookform/resolvers`, `zod`
- [ ] 1.4 Install utility packages: `clsx`, `tailwind-merge`, `lucide-react` (icons)
- [ ] 1.5 Configure `src/` directory structure (components, hooks, store, services, utils, config, types)
- [ ] 1.6 Set up `.env.local` from `.env.example` with Supabase credentials

## 2. Supabase SSR Client

- [ ] 2.1 Create `src/config/supabase.ts` with browser client (`createBrowserClient`)
- [ ] 2.2 Create `src/lib/supabase/server.ts` with server client (`createServerClient` + cookie helpers)
- [ ] 2.3 Create `src/lib/supabase/middleware.ts` with middleware client
- [ ] 2.4 Create `src/lib/supabase/auth-helpers.ts` with `getSession()`, `getUser()`, `signOut()` helpers
- [ ] 2.5 Add TypeScript types for Supabase generated schema

## 3. Auth Flow (Web)

- [ ] 3.1 Create `middleware.ts` at project root for auth guards
- [ ] 3.2 Configure middleware to check session cookie on `/dashboard/*` routes
- [ ] 3.3 Redirect unauthenticated users to `/login` with `?redirect` param
- [ ] 3.4 Create `app/(auth)/login/page.tsx` with email/password + Google OAuth
- [ ] 3.5 Create `app/(auth)/signup/page.tsx` with provider registration form
- [ ] 3.6 Create `app/(auth)/forgot-password/page.tsx` with email reset request
- [ ] 3.7 Create `app/(auth)/reset-password/page.tsx` for password reset flow
- [ ] 3.8 Implement server-side auth check in dashboard layout
- [ ] 3.9 Wire Google OAuth flow via Supabase SSR redirect endpoints
- [ ] 3.10 Apply Alacater Color Guidelines: Primary Orange (`#FF7B00`) for auth CTAs

## 4. TanStack Query Setup

- [ ] 4.1 Create `src/providers/query-provider.tsx` with QueryClientProvider
- [ ] 4.2 Configure QueryClient defaults (staleTime: 5min, retry: 1)
- [ ] 4.3 Add QueryClientProvider to root layout
- [ ] 4.4 Create `src/hooks/useQuery.ts` barrel export for TanStack Query hooks

## 5. Zustand Stores

- [ ] 5.1 Create `src/store/uiStore.ts` for global UI state (sidebar toggle, theme)
- [ ] 5.2 Create `src/store/authStore.ts` for auth UI state (loading, error)
- [ ] 5.3 Create `src/hooks/useStore.ts` barrel export for Zustand hooks

## 6. UI Component Library

- [ ] 6.1 Create `src/components/ui/Button.tsx` with variants (primary, secondary, ghost) and sizes
- [ ] 6.2 Create `src/components/ui/Card.tsx` with elevation and selected states
- [ ] 6.3 Create `src/components/ui/Input.tsx` with focused, error, disabled states
- [ ] 6.4 Create `src/components/ui/Modal.tsx` with title, body, close, backdrop dismiss
- [ ] 6.5 Create `src/components/ui/index.ts` barrel export for all UI components
- [ ] 6.6 Configure Tailwind CSS theme extension with Alacater color tokens
- [ ] 6.7 Verify all components follow Color Guidelines (`projects/02.Color-Guidelines.md`)

## 7. Form Validation

- [ ] 7.1 Create `src/utils/validation.ts` with shared Zod schemas (login, signup, forgot password)
- [ ] 7.2 Export TypeScript types from Zod schemas using `z.infer`
- [ ] 7.3 Create `src/components/auth/AuthForm.tsx` reusable form wrapper with error display
- [ ] 7.4 Wire login form to React Hook Form + loginSchema
- [ ] 7.5 Wire signup form to React Hook Form + signupSchema

## 8. Layout Components

- [ ] 8.1 Create `src/components/layout/Header.tsx` with logo, nav links, auth buttons
- [ ] 8.2 Create `src/components/layout/Footer.tsx` with copyright, links
- [ ] 8.3 Create `src/components/layout/DashboardLayout.tsx` with sidebar, header, content area
- [ ] 8.4 Create `src/components/layout/Sidebar.tsx` with dashboard nav items
- [ ] 8.5 Update root `app/layout.tsx` with providers (QueryClient, theme) and base layout

## 9. Dashboard Pages

- [ ] 9.1 Create `app/(dashboard)/layout.tsx` with auth check and DashboardLayout wrapper
- [ ] 9.2 Create `app/(dashboard)/dashboard/page.tsx` as main dashboard overview (placeholder)
- [ ] 9.3 Create `app/(dashboard)/dashboard/profile/page.tsx` provider profile page (placeholder)
- [ ] 9.4 Create `app/(dashboard)/dashboard/products/page.tsx` products list page (placeholder)
- [ ] 9.5 Create `app/(dashboard)/dashboard/orders/page.tsx` orders list page (placeholder)
- [ ] 9.6 Add logout button to dashboard header

## 10. Landing Page

- [ ] 10.1 Create `app/(landing)/page.tsx` as landing page (hero, features, CTA)
- [ ] 10.2 Create `app/(landing)/layout.tsx` with Header + Footer (no sidebar)
- [ ] 10.3 Add "Get Started" CTA linking to signup
- [ ] 10.4 Apply Alacater branding: logo, Primary Orange, tagline

## 11. Prisma & Database Setup

- [x] 11.1 Install Prisma: `prisma`, `@prisma/client`
- [x] 11.2 Initialize Prisma: `npx prisma init`
- [x] 11.3 Configure `prisma/schema.prisma` with Supabase PostgreSQL connection
- [ ] 11.4 Add DATABASE_URL to `.env.local` with Supabase pooler endpoint — **USER ACTION**: Copy `.env.example` to `.env.local` and fill in your Supabase DATABASE_URL
- [x] 11.5 Define User model in Prisma schema
- [x] 11.6 Define Customer model in Prisma schema
- [x] 11.7 Define Provider model with subscription tier, stats, relations
- [x] 11.8 Define Product model with category, diet tags, relations
- [x] 11.9 Define DurationOption, MealPlanOption, AdditionalMenu models
- [x] 11.10 Define Order, OrderItem models with status enum
- [x] 11.11 Define Review model with rating, verified flag
- [x] 11.12 Define DeliveryArea, OperatingHours, ProviderHoliday models
- [x] 11.13 Define Notification model
- [x] 11.14 Define enum types: SubscriptionTier, ProductCategory, OrderStatus, UserRole, NotificationType
- [ ] 11.15 Run initial migration: `npx prisma migrate dev --name init` — **USER ACTION**: Run after setting DATABASE_URL
- [ ] 11.16 Generate Prisma client: `npx prisma generate` — **USER ACTION**: Run after migration
- [x] 11.17 Create Prisma singleton client in `src/lib/prisma.ts`

## 12. Row Level Security (RLS)

- [ ] 12.1 Create `prisma/rls/users.sql` with RLS policies for users table
- [ ] 12.2 Create `prisma/rls/providers.sql` with RLS policies for providers table
- [ ] 12.3 Create `prisma/rls/orders.sql` with RLS policies for orders table
- [ ] 12.4 Create `prisma/rls/reviews.sql` with RLS policies for reviews table
- [ ] 12.5 Create `prisma/rls/products.sql` with RLS policies for products table
- [ ] 12.6 Apply all RLS policies to Supabase
- [ ] 12.7 Test RLS: verify users can only access own data

## 13. Database Seed

- [ ] 13.1 Create `prisma/seed.ts` with sample data
- [ ] 13.2 Seed sample providers (3-5 with varied categories)
- [ ] 13.3 Seed sample products (with duration options, meal plans)
- [ ] 13.4 Seed sample test orders
- [ ] 13.5 Configure `package.json` prisma seed script
- [ ] 13.6 Run seed: `npx prisma db seed`

## 14. Supabase Storage

- [ ] 14.1 Create `provider-images` bucket (public)
- [ ] 14.2 Create `product-images` bucket (public)
- [ ] 14.3 Create `documents` bucket (private)
- [ ] 14.4 Configure storage policies (public read for images, authenticated for documents)
- [ ] 14.5 Create `src/services/storage.ts` with upload/download helpers
- [ ] 14.6 Add image upload component to provider product form

## 15. Code Quality & Documentation

- [ ] 15.1 Configure ESLint rules for Next.js App Router
- [ ] 15.2 Configure Prettier (if not already configured)
- [ ] 15.3 Run ESLint + TypeScript type check, fix all errors
- [ ] 15.4 Add inline code comments for complex auth/database logic
- [ ] 15.5 Update README with setup instructions (env vars, Supabase, Prisma)
- [ ] 15.6 Document project structure in README
