## Why

Catering providers need a secure way to register and authenticate on the web platform to manage their catering services, profiles, and orders. Implementing a robust authentication system is the foundational step for the provider-facing web application.

## What Changes

- **Provider Signup**: New page and logic for email/password registration, including setting `catering_owner` role in JWT metadata.
- **User Synchronization**: Logic to automatically sync Supabase Auth users to the application's `User` table, mapping roles appropriately.
- **Provider Login**: New page and logic for email/password authentication.
- **Forgot Password**: Password recovery flow via email.
- **Session Management**: Secure handling of user sessions on both client and server sides using Next.js patterns.
- **Protected Routes**: Middleware to restrict access to authenticated providers only.
- **Logout**: Functionality to securely end a user session.

## Capabilities

### New Capabilities
- `web-provider-auth`: Handles registration, authentication, password recovery, and session management for catering providers on the web application.

### Modified Capabilities
- None.

## Impact

- **Routes**: New authentication pages in `next-app/src/app/(auth)`.
- **Middleware**: New `next-app/src/middleware.ts` for route protection.
- **Services/Lib**: Auth logic integrating with Supabase/Prisma in `next-app/src/lib/auth`.
- **Hooks**: New `useAuth` hook for client-side auth state in `next-app/src/hooks`.
- **Database**: Utilization of existing `User` and `Provider` tables in PostgreSQL via Prisma.
