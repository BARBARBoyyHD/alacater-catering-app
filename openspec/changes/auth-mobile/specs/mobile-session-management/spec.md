## ADDED Requirements

### Requirement: Persistent Session Storage
The mobile app SHALL persist the user's Supabase session securely across app restarts using `react-native-keychain`. The session SHALL include the access token, refresh token, and token expiry timestamp. On app launch, the app SHALL attempt to restore the session from keychain storage.

#### Scenario: Session persists across app restart
- **WHEN** user logs in, closes the app completely, and reopens it
- **THEN** user remains logged in and is navigated to the home screen

#### Scenario: Session restored from keychain on cold start
- **WHEN** app launches and finds a valid session in keychain
- **THEN** session is loaded into Supabase client, and user bypasses the auth flow

#### Scenario: Session not found in keychain
- **WHEN** app launches and no session exists in keychain
- **THEN** user is presented with the auth flow (welcome/login screen)

### Requirement: Automatic Token Refresh
The mobile app SHALL automatically refresh the Supabase access token when it expires, using the stored refresh token. The refresh SHALL happen silently without user interaction. If the refresh token is also expired or invalid, the user SHALL be logged out and redirected to the login screen.

#### Scenario: Silent token refresh on expiry
- **WHEN** the access token expires but the refresh token is still valid
- **THEN** a new session is obtained via Supabase's refresh mechanism, and user continues using the app uninterrupted

#### Scenario: Token refresh fails (refresh token expired)
- **WHEN** the refresh token has expired or been revoked server-side
- **THEN** user is logged out, local session is cleared, and navigated to login screen

#### Scenario: Token refresh fails (network error)
- **WHEN** token refresh attempt fails due to network connectivity issues
- **THEN** error is logged, and user is shown a "Connection lost. Reconnecting..." toast with retry option

### Requirement: Auth State Listener
The mobile app SHALL register a Supabase auth state listener that responds to session changes in real-time. The listener SHALL update the app's auth state and trigger navigation when the session changes (e.g., user logged out from another device, token revoked).

#### Scenario: Session revoked server-side
- **WHEN** user's session is invalidated from the server (e.g., admin action, password change)
- **THEN** auth state listener detects the change, clears local session, and navigates user to login screen

#### Scenario: Active session on app launch
- **WHEN** app launches with an active, non-expired session in keychain
- **THEN** auth state listener confirms the session is valid, and user bypasses auth flow

### Requirement: Biometric Credential Management
When biometric authentication is enabled, the app SHALL store the user's refresh token in the device keychain with biometric protection. The biometric prompt SHALL be shown before accessing the stored credential. If biometric verification succeeds, the credential SHALL be used to restore the Supabase session.

#### Scenario: Store credential with biometric protection
- **WHEN** user enables biometric login after successful email/password login
- **THEN** refresh token is stored in keychain with biometric access control, and confirmation "FaceID enabled" is shown

#### Scenario: Retrieve credential via biometric
- **WHEN** user opens app with biometric login enabled
- **THEN** biometric prompt is shown, and on success, stored refresh token is retrieved and used to restore session

#### Scenario: Biometric access denied
- **WHEN** user fails biometric verification (wrong face/fingerprint) multiple times
- **THEN** biometric prompt falls back to email/password login screen

#### Scenario: Biometric credential cleanup on logout
- **WHEN** user logs out with biometric login enabled
- **THEN** biometric credential is deleted from keychain, and biometric login option is removed

### Requirement: Secure Session Cleanup on Logout
When a user logs out, the app SHALL clear all locally stored session data including: access token, refresh token, biometric credentials (if enabled), auth UI state in Zustand store, and any cached auth-related TanStack Query data.

#### Scenario: Complete session cleanup on logout
- **WHEN** user confirms logout
- **THEN** all tokens, biometric credentials, Zustand auth state, and TanStack Query auth cache are cleared

#### Scenario: Logout preserves non-auth cached data
- **WHEN** user logs out
- **THEN** only auth-related query cache is invalidated; non-sensitive cached data (e.g., public product listings) may remain
