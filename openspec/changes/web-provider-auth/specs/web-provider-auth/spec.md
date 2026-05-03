## ADDED Requirements

### Requirement: Provider Signup
The system SHALL allow new providers to register using an email address, password, and basic business details. During registration, the user's metadata MUST include `role: 'catering_owner'`.

#### Scenario: Successful Registration
- **WHEN** the user provides a valid email, matching passwords, and business name
- **THEN** a new user is created in Supabase Auth with `role: 'catering_owner'` metadata, and a corresponding record is created in the application's `User` and `Provider` tables

### Requirement: User Synchronization
The system SHALL synchronize authenticated users from Supabase Auth to the application's `User` table.

#### Scenario: Metadata Sync
- **WHEN** a new user registers with `catering_owner` metadata
- **THEN** the application's `User` table is updated with a new record where `role` is set to `PROVIDER` (mapping `catering_owner` to `PROVIDER`)

### Requirement: Provider Login
The system SHALL authenticate registered providers using their email and password.

#### Scenario: Successful Login
- **WHEN** the user provides correct credentials
- **THEN** a session is established and the user is redirected to the dashboard

#### Scenario: Invalid Credentials
- **WHEN** the user provides an incorrect email or password
- **THEN** an error message is displayed and no session is created

### Requirement: Password Recovery
The system SHALL allow providers to request a password reset link via email.

#### Scenario: Request Reset Link
- **WHEN** the user enters their registered email address
- **THEN** an email is sent with a secure, time-limited reset link

### Requirement: Session Management
The system SHALL maintain the user's authentication state across page reloads and browser sessions.

#### Scenario: Persistent Session
- **WHEN** an authenticated user refreshes the page
- **THEN** they remain logged in and can access protected pages

### Requirement: Route Protection
The system SHALL restrict access to provider-only pages to authenticated users.

#### Scenario: Unauthorized Access Attempt
- **WHEN** an unauthenticated user attempts to access `/dashboard`
- **THEN** they are redirected to the login page

### Requirement: Logout
The system SHALL allow users to securely terminate their active session.

#### Scenario: Successful Logout
- **WHEN** the user clicks the logout button
- **THEN** the session is cleared and the user is redirected to the login page
