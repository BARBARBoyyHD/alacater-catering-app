# Web Authentication

The web authentication capability provides secure access for providers.

## Requirements

### REQ-1: Provider Email/Password Authentication
The web app SHALL allow providers to sign up and log in using email and password via Supabase SSR auth.

### REQ-2: Google OAuth Authentication
The web app SHALL allow providers to sign up and log in using Google OAuth.

### REQ-3: Route Protection via Middleware
The web app SHALL protect dashboard routes using Next.js middleware that checks for a valid Supabase session cookie.

### REQ-4: Logout
The web app SHALL allow providers to log out by clearing the session cookie.

### REQ-5: Password Reset
The web app SHALL allow providers to reset their password via email.
