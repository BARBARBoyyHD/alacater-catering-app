## ADDED Requirements

### Requirement: Provider Email/Password Authentication
The web app SHALL allow providers to sign up and log in using email and password via Supabase SSR auth. Sessions SHALL be stored in HTTP-only cookies. The provider dashboard SHALL require authentication.

#### Scenario: Successful provider signup
- **WHEN** a new user submits a valid email, password (min 6 chars), and provider details
- **THEN** a Supabase user record is created, a provider record is created, and the user is redirected to the dashboard

#### Scenario: Successful provider login
- **WHEN** a registered provider enters valid email and password
- **THEN** session cookie is set and user is redirected to the dashboard

#### Scenario: Login with invalid credentials
- **WHEN** a user enters incorrect email or password
- **THEN** error "Invalid email or password" is displayed (generic message to prevent email enumeration)

#### Scenario: Session cookie persistence across page refresh
- **WHEN** a logged-in provider refreshes the page
- **THEN** the session cookie is read, authentication is restored, and dashboard remains accessible

### Requirement: Google OAuth Authentication
The web app SHALL allow providers to sign up and log in using Google OAuth. The OAuth flow SHALL work in server components via Supabase SSR.

#### Scenario: Successful Google signup (new provider)
- **WHEN** a user clicks "Continue with Google" and authorizes
- **THEN** a Supabase user and provider record are created, session cookie is set, and user is redirected to dashboard

#### Scenario: Successful Google login (existing provider)
- **WHEN** an existing provider clicks "Continue with Google" and authorizes
- **THEN** session cookie is set and user is redirected to dashboard

### Requirement: Route Protection via Middleware
The web app SHALL protect dashboard routes using Next.js middleware that checks for a valid Supabase session cookie. Unauthenticated users SHALL be redirected to the login page.

#### Scenario: Unauthenticated user accesses dashboard
- **WHEN** a user without a valid session navigates to `/dashboard`
- **THEN** the user is redirected to `/login` with a `?redirect` query parameter

#### Scenario: Authenticated user accesses dashboard
- **WHEN** a user with a valid session navigates to `/dashboard`
- **THEN** the dashboard page is rendered normally

#### Scenario: Session expires during dashboard use
- **WHEN** a provider's session cookie expires while on the dashboard
- **THEN** the next page navigation redirects to login

### Requirement: Logout
The web app SHALL allow providers to log out by clearing the session cookie and redirecting to the landing page.

#### Scenario: Successful logout
- **WHEN** a provider clicks "Log Out"
- **THEN** session cookie is cleared and user is redirected to the landing page

#### Scenario: Logout from any page
- **WHEN** a provider logs out from any authenticated page
- **THEN** session is cleared and user is redirected to landing page

### Requirement: Password Reset
The web app SHALL allow providers to reset their password via email. A reset link SHALL be sent to the provider's email, opening the password reset page via deep link.

#### Scenario: Password reset request
- **WHEN** a provider enters their email on the forgot password page
- **THEN** a password reset email is sent and a confirmation message is displayed

#### Scenario: Password reset via email link
- **WHEN** a provider clicks the reset link in their email
- **THEN** they are taken to the new password page where they can set a new password
