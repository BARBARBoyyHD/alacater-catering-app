## Context

The Alacater web application needs a robust authentication system for catering providers. The backend uses Supabase, which provides a built-in authentication service. This design focuses on integrating Supabase Auth with the Next.js App Router.

## Goals / Non-Goals

**Goals:**
- Implement a secure, SSR-compatible authentication flow.
- Provide a seamless user experience for signup, login, and password recovery.
- Secure provider-specific routes using Next.js Middleware.

**Non-Goals:**
- Social OAuth integration (to be added in a future change).
- Multi-factor authentication (MFA).
- User profile editing (beyond basic registration).

## Decisions

### Auth Integration: Supabase Auth with SSR
- **Choice**: Use `@supabase/ssr` for managing sessions.
- **Rationale**: It provides the best integration with Next.js App Router, handling cookies automatically for Server Components, Server Actions, and Middleware.
- **Alternative**: NextAuth.js. Considered, but Supabase Auth is more deeply integrated with the existing database and Row Level Security (RLS) policies.

### User Metadata and Synchronization
- **Metadata**: Registration will set `data: { role: 'catering_owner' }` in Supabase Auth user metadata.
- **Synchronization**: Use a Supabase PostgreSQL Trigger to automatically insert a record into the `public.User` table whenever a new user is created in `auth.users`.
- **Role Mapping**: The trigger will map `catering_owner` from the metadata to the `PROVIDER` role in the `public.User` table.
- **Rationale**: Database triggers ensure atomicity and reliability, guaranteeing that the application's `User` record exists as soon as the Auth record is created.

### Form Handling: React Hook Form + Zod
- **Choice**: Use React Hook Form with Zod schema validation.
- **Rationale**: Industry standard for Type-safe form validation in React. Provides great UX with real-time error messages.

### Route Protection: Next.js Middleware
- **Choice**: Use a single `middleware.ts` file to check session state and redirect unauthenticated users from `/dashboard` and other protected paths.
- **Rationale**: Centralized, performant way to handle route protection before any page is rendered.

## Risks / Trade-offs

- **[Risk]**: Cookie sync issues between client and server.
- **[Mitigation]**: Follow the official Supabase SSR guide for Next.js to ensure cookies are correctly refreshed and handled in both environments.
- **[Risk]**: Sensitive data exposure in client-side state.
- **[Mitigation]**: Keep sensitive auth state in HTTP-only cookies and use Server Components for sensitive data fetching.
