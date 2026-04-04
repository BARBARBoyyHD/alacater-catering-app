## Context

The Alacater web app is a Next.js 16 project using App Router with Turbopack, Tailwind CSS 4, and React Compiler. It serves two primary audiences:

1. **Landing page** — public-facing marketing site for Alacater (SEO-optimized, static)
2. **Provider dashboard** — authenticated catering partners managing menus, orders, subscriptions, reviews, and analytics

The mobile app (`react-native-app/`) handles customer ordering. The web app handles provider operations. Both share the same Supabase database.

**Current state:** Bare Next.js 16 scaffold with Tailwind 4 configured, no auth, no UI components, no database layer.

**Constraints:**
- Must follow ITA §2.1 tech stack: Next.js 15+, TypeScript 5.7+, TanStack Query 5.62+, Zustand 5.0+, React Hook Form 8+, Zod 3.24+
- Must use Supabase SSR (`@supabase/ssr`) for server-side auth with cookies
- Must follow Alacater Color Guidelines (`projects/02.Color-Guidelines.md`)
- Must use Prisma 6+ for database access
- Must implement RLS policies for data isolation

## Goals / Non-Goals

**Goals:**
- Complete auth flow for providers (email/password, Google OAuth) with cookie-based sessions
- Type-safe database access via Prisma with all core models defined
- Row Level Security policies enforcing data isolation per provider
- Base UI component library (Button, Card, Input, Modal) following design system
- Server state via TanStack Query, client state via Zustand
- Form validation via React Hook Form + Zod
- Storage buckets for provider/product images
- Protected routes — dashboard requires authentication
- Environment configuration documented and managed

**Non-Goals:**
- **No customer-facing pages** — Customers use the mobile app, not the web
- **No payment processing** — Midtrans integration is a future change
- **No analytics dashboard** — Charts, metrics are separate epics
- **No email/SMS sending** — Resend/Twilio integration is a future change
- **No admin panel** — Admin dashboard is a separate change
- **No API routes for mobile** — Mobile app calls Supabase directly, not through Next.js

## Decisions

### 1. Auth: Supabase SSR with Cookie-Based Sessions

**Decision:** Use `@supabase/ssr` with `createServerClient` for server components and `createBrowserClient` for client components. Sessions stored in HTTP-only cookies.

**Rationale:**
- Next.js App Router requires SSR-compatible auth
- Cookie-based sessions work across server and client components
- `@supabase/ssr` is the official Supabase pattern for Next.js App Router
- Secure HTTP-only cookies prevent XSS token theft

**Alternatives considered:**
- ~~Supabase client-only auth~~: Doesn't work with server components, breaks SSR
- ~~NextAuth.js~~: Adds another dependency, Supabase native is simpler

### 2. Styling: Tailwind CSS 4 + Custom Design Tokens

**Decision:** Use Tailwind CSS 4 with custom config extending Alacater color tokens as CSS custom properties.

**Rationale:**
- Already configured in the project (`@tailwindcss/postcss`, `tailwindcss: ^4`)
- Tailwind v4 has simplified config — uses CSS-based design tokens
- Design tokens from Color Guidelines map cleanly to Tailwind utility classes
- Consistent with ITA §2.1 which specifies Tailwind for web

**Color token mapping:**
```css
--color-primary: #FF7B00;
--color-primary-light: #FFF5EB;
--color-success: #1B5E3A;
--color-error: #FF3B30;
--color-text: #333333;
--color-text-secondary: #666666;
```

### 3. Database: Prisma with Supabase PostgreSQL

**Decision:** Use Prisma 6 ORM connecting to Supabase PostgreSQL via connection pooling (Supavisor).

**Rationale:**
- Type-safe queries, auto-generated TypeScript types
- ITA §2.2 specifies Prisma 6.x+
- Migration management via `prisma migrate`
- Works with Supabase's connection pooling out of the box

**Connection string:**
```
DATABASE_URL=postgresql://postgres.[project-ref].[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
```

### 4. State Management: TanStack Query + Zustand (Same as Mobile)

**Decision:** TanStack Query for server state (API data, caching), Zustand for client state (UI toggles, filters, form drafts).

**Rationale:**
- Consistent with mobile app (`react-native-app/`) — same patterns, easier code sharing
- ITA §2.1 specifies this exact stack
- Separation of concerns: server vs client state
- TanStack Query handles deduplication, caching, background refetch

### 5. Form Validation: React Hook Form + Zod

**Decision:** React Hook Form 8+ with Zod 3.24+ schemas via `@hookform/resolvers`.

**Rationale:**
- Same stack as mobile app — schemas can be shared between web and mobile
- Uncontrolled inputs minimize re-renders
- Type-safe validation with TypeScript inference from Zod schemas

### 6. UI Components: Custom Components (No UI Library)

**Decision:** Build custom UI components (Button, Card, Input, Modal) styled with Tailwind CSS, following Alacater Color Guidelines.

**Rationale:**
- ITA §2.1 specifies "Custom (per Color Guidelines)" for UI
- Full design system control — no fighting with library defaults
- Lightweight bundle — no unused component CSS
- Components match mobile app patterns for visual consistency

**Component approach:** Server components where possible, client components only when interactivity is needed.

### 7. Project Structure: `src/` Directory with Feature-Based Grouping

**Decision:** Use `src/` directory with feature-based organization inside components and hooks.

```
src/
├── app/                    # Next.js App Router (moved from root app/)
│   ├── (auth)/            # Auth routes (login, signup)
│   ├── (dashboard)/       # Protected dashboard routes
│   └── (landing)/         # Public landing pages
├── components/
│   ├── ui/                # Base components (Button, Card, Input, Modal)
│   ├── auth/              # Auth-specific components
│   └── layout/            # Header, Footer, Sidebar
├── hooks/                 # Custom hooks (useAuth, useProducts, etc.)
├── services/              # Supabase client, API helpers
├── store/                 # Zustand stores
├── utils/                 # Helpers, validators, formatters
├── config/                # Supabase config, constants
└── types/                 # Shared TypeScript types
```

**Rationale:**
- `src/` keeps project root clean
- Feature grouping scales better than type grouping as app grows
- Consistent with ITA §2.1 patterns

### 8. Middleware: Next.js Middleware for Auth Guards

**Decision:** Use `middleware.ts` to check Supabase session cookies and redirect unauthenticated users away from protected `/dashboard` routes.

**Rationale:**
- Runs before page render — no flash of unauthenticated content
- Works with Next.js App Router natively
- Simple cookie check, no complex logic
- Can be extended for role-based access later (provider vs admin)

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Supabase SSR cookie sync complexity** | Session may not sync between server and client components | Use official `@supabase/ssr` cookie helper pattern, test thoroughly |
| **Prisma + Supabase connection pooling** | Connection limits under high load | Use Supavisor (Supabase's built-in pooler), monitor connection count |
| **Tailwind CSS 4 beta/early adoption** | Breaking changes in future releases | Pin version, test upgrades, v4 is stable as of Next.js 16 era |
| **No component library** | Slower initial UI development, inconsistency risk | Create comprehensive base components first, use Storybook for documentation |
| **Middleware auth overhead** | Extra latency on every request | Middleware is edge-optimized, cookie check is O(1), negligible impact |
| **Server components vs client components** | Confusion about which to use | Default to server components, use `use client` only for interactivity |
| **Large initial schema** | Complex migrations, slow development | Schema follows ITA spec — implement in phases, test each model |

## Migration Plan

**Not applicable** — greenfield project with no existing web app to migrate.

**Deployment order:**
1. Setup Supabase project (if not done), configure RLS
2. Define Prisma schema, run migration to Supabase
3. Setup Next.js project with auth, UI components, state management
4. Connect to database via Prisma, build provider dashboard pages
5. Deploy to Vercel, run E2E tests
6. Configure custom domain, production environment variables

**Rollback strategy:**
- Next.js: Vercel supports instant rollback to previous deployment
- Database: Prisma migrations are tracked, can rollback via `prisma migrate reset` (dev) or manual SQL (prod)

## Open Questions

1. **Should the landing page be in this same Next.js app or a separate static site?** — Currently in-scope, but may be simpler as a separate marketing site. Leaning toward same app for simplicity.
2. **Provider role detection** — How does the system know a user is a provider vs customer? (Answer: separate `providers` table linked to `auth.users`, checked via middleware)
3. **Should we use Prisma Edge Client for edge middleware?** — Edge runtime has different Prisma client requirements. May need `@prisma/extension-accelerate` or serverless driver.
4. **Image optimization** — Should provider images be stored in Supabase Storage or external CDN? (Recommended: Supabase Storage for simplicity, optimized via Next.js `<Image>` component)
