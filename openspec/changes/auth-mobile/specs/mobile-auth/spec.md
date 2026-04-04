## ADDED Requirements

### Requirement: Email/Password Signup
The mobile app SHALL allow users to create an account using email and password. The signup form SHALL collect full name, email, and password with confirmation. All input SHALL be validated using Zod schema before submission. Upon success, the user SHALL be automatically logged in and redirected to the app home screen.

#### Scenario: Successful signup with valid credentials
- **WHEN** user enters valid full name, email, password (min 6 chars), and matching confirmation password
- **THEN** account is created, user is logged in, and navigated to home screen

#### Scenario: Signup with invalid email format
- **WHEN** user enters an email without `@` or valid domain
- **THEN** inline error "Invalid email address" is displayed below the email field

#### Scenario: Signup with weak password
- **WHEN** user enters a password shorter than 6 characters
- **THEN** inline error "Password must be at least 6 characters" is displayed below the password field

#### Scenario: Signup with mismatched passwords
- **WHEN** user enters different values in password and confirm password fields
- **THEN** inline error "Passwords don't match" is displayed below the confirm password field

#### Scenario: Signup with already registered email
- **WHEN** user submits signup form with an email already in the system
- **THEN** error "An account with this email already exists" is displayed

#### Scenario: Signup with empty required fields
- **WHEN** user taps "Sign Up" without filling required fields
- **THEN** validation errors appear for each empty required field

### Requirement: Email/Password Login
The mobile app SHALL allow registered users to log in using their email and password. The login form SHALL validate email format and password presence. Upon success, the user SHALL be navigated to the app home screen. Upon failure, a clear error message SHALL be displayed.

#### Scenario: Successful login with valid credentials
- **WHEN** user enters registered email and correct password
- **THEN** user is logged in and navigated to home screen

#### Scenario: Login with incorrect password
- **WHEN** user enters registered email with wrong password
- **THEN** error "Invalid email or password" is displayed

#### Scenario: Login with unregistered email
- **WHEN** user enters an email not associated with any account
- **THEN** error "Invalid email or password" is displayed (generic message to prevent email enumeration)

#### Scenario: Login with empty fields
- **WHEN** user taps "Log In" without entering email or password
- **THEN** validation errors appear for empty fields

### Requirement: Google OAuth Authentication
The mobile app SHALL allow users to sign up or log in using their Google account via native Google Sign-In. The app SHALL exchange the Google ID token for a Supabase session. If the Google account is new, a Supabase user record SHALL be created automatically.

#### Scenario: Successful Google Sign-In (existing user)
- **WHEN** user taps "Continue with Google" and selects an existing Google account linked to a Supabase user
- **THEN** user is logged in and navigated to home screen

#### Scenario: Successful Google Sign-In (new user)
- **WHEN** user taps "Continue with Google" with a Google account not yet in Supabase
- **THEN** new Supabase user is created, user is logged in, and navigated to home screen

#### Scenario: Google Sign-In cancelled by user
- **WHEN** user dismisses the Google account picker without selecting an account
- **THEN** user remains on the login screen, no error is shown

#### Scenario: Google Sign-In fails (network error)
- **WHEN** Google Sign-In fails due to network connectivity issues
- **THEN** error "Unable to connect to Google. Check your internet connection." is displayed

### Requirement: Phone OTP Authentication
The mobile app SHALL allow users to sign up or log in using their phone number with SMS OTP verification. The user SHALL enter their phone number, receive a 6-digit OTP via SMS, and enter it to verify their identity. OTP SHALL expire after 5 minutes.

#### Scenario: Successful OTP request
- **WHEN** user enters a valid Indonesian phone number (+62) and taps "Send OTP"
- **THEN** SMS with 6-digit OTP is sent, and user is taken to OTP input screen with 5:00 countdown timer

#### Scenario: Successful OTP verification
- **WHEN** user enters the correct 6-digit OTP within the 5-minute expiry window
- **THEN** user is logged in and navigated to home screen

#### Scenario: OTP verification with wrong code
- **WHEN** user enters an incorrect OTP
- **THEN** error "Invalid verification code. Please try again." is displayed

#### Scenario: OTP expiry
- **WHEN** user attempts to verify OTP after the 5-minute timer expires
- **THEN** error "Code expired. Please request a new one." is displayed, and resend button becomes active

#### Scenario: Resend OTP
- **WHEN** user taps "Resend OTP" after the countdown timer reaches 0 or after 30 seconds cooldown
- **THEN** new OTP is sent via SMS, and countdown timer resets to 5:00

#### Scenario: Invalid phone number format
- **WHEN** user enters a phone number not starting with +62 or with insufficient digits
- **THEN** error "Please enter a valid Indonesian phone number (+62...)" is displayed

### Requirement: Forgot Password Flow
The mobile app SHALL allow users to reset their forgotten password via email. The user SHALL enter their registered email, receive a password reset link, and be able to set a new password.

#### Scenario: Password reset email sent successfully
- **WHEN** user enters a registered email on the forgot password screen and taps "Send Reset Link"
- **THEN** password reset email is sent, and confirmation screen instructs user to check their inbox

#### Scenario: Password reset with unregistered email
- **WHEN** user enters an email not associated with any account
- **THEN** generic message "If this email is registered, you'll receive a reset link" is shown (prevents email enumeration)

#### Scenario: User clicks reset link in email
- **WHEN** user opens the reset email and clicks the link
- **THEN** user is redirected to the app's new password screen (via deep link)

#### Scenario: Set new password successfully
- **WHEN** user enters and confirms a new password (min 6 chars) via the deep link flow
- **THEN** password is updated, user is logged in, and navigated to home screen

#### Scenario: New password too weak
- **WHEN** user attempts to set a password shorter than 6 characters
- **THEN** error "Password must be at least 6 characters" is displayed

### Requirement: Biometric Authentication (FaceID/TouchID)
The mobile app SHALL offer biometric authentication as an optional quick-login method. Users SHALL be prompted to enable biometrics after their first successful email/password login. If enabled, subsequent app launches SHALL attempt biometric authentication before falling back to the login screen.

#### Scenario: Prompt to enable biometrics after first login
- **WHEN** user logs in successfully with email/password for the first time and device supports biometrics
- **THEN** dialog "Enable FaceID for quick login?" is shown with "Enable" and "Not Now" options

#### Scenario: Biometric login enabled and successful
- **WHEN** user previously enabled biometrics, opens the app, and successfully authenticates with FaceID/TouchID
- **THEN** user is automatically logged in and navigated to home screen

#### Scenario: Biometric login fails (biometric not recognized)
- **WHEN** user attempts biometric login but FaceID/TouchID doesn't match
- **THEN** error "Biometric not recognized" is displayed, with option to retry or use email/password

#### Scenario: Biometric login fallback (no biometric enrolled)
- **WHEN** user previously enabled biometrics but device no longer has biometrics enrolled
- **THEN** user is taken to the email/password login screen

#### Scenario: User disables biometrics
- **WHEN** user toggles off biometric login in settings
- **THEN** stored biometric credential is deleted from keychain, and app requires email/password on next launch

### Requirement: Logout Functionality
The mobile app SHALL allow users to log out from their account. Logout SHALL clear all local session data, revoke the Supabase session, and navigate the user back to the auth flow.

#### Scenario: Successful logout
- **WHEN** user taps "Log Out" in the profile/settings screen and confirms
- **THEN** session is revoked, local storage is cleared, and user is navigated to the login screen

#### Scenario: Logout with network error
- **WHEN** user attempts to log out but device has no internet connection
- **THEN** local session is cleared (best effort), user is navigated to login screen, and a warning "Session may still be active on server" is shown
