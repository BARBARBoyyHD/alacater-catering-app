## Why

The Alacater mobile app (React Native) requires a complete authentication system to enable customer signup, login, and secure session management. Without authentication, users cannot access core features like browsing caterers, placing orders, or managing subscriptions. This change implements the full auth flow as defined in Epic 2 of the Product Backlog (MOB-2.1 through MOB-2.8), leveraging Supabase Auth as the authentication provider per the ITA specification.

## What Changes

- **Email/password signup screen** with form validation (React Hook Form + Zod)
- **Email/password login screen** with error handling
- **Google OAuth integration** for one-tap signup/login
- **Phone OTP authentication** with SMS verification flow
- **Forgot password flow** with email-based password reset
- **Session management** with persistent auth state (secure storage)
- **Biometric authentication** (FaceID/TouchID) for quick re-login
- **Logout functionality** with session cleanup
- **Navigation guards** to protect authenticated routes
- **User onboarding flow** (first-time user prompts)

## Capabilities

### New Capabilities
- `mobile-auth`: Complete authentication system for React Native app including email/password, Google OAuth, phone OTP, forgot password, session persistence, biometric login, and logout. Creates `specs/mobile-auth/spec.md`.
- `mobile-session-management`: Persistent session handling, secure token storage, auto-refresh logic, and biometric unlock. Creates `specs/mobile-session-management/spec.md`.

### Modified Capabilities
<!-- No existing specs to modify - this is a greenfield change -->

## Impact

- **Mobile App (React Native)**: New screens (`AuthScreen`, `LoginScreen`, `SignupScreen`, `ForgotPasswordScreen`, `PhoneOTPInputScreen`), Supabase client integration, secure storage setup, biometric module, navigation route guards
- **State Management**: New Zustand stores for auth state, TanStack Query hooks for auth mutations
- **Services**: New auth service layer wrapping Supabase Auth methods
- **Navigation**: Auth flow becomes the entry point; app will have auth stack + main app stack
- **Dependencies**: `@supabase/supabase-js`, `@react-native-async-storage/async-storage`, `expo-local-authentication` (biometrics), `react-native-keychain` (secure storage)
- **Backend**: Relies on Supabase Auth configuration (email, Google OAuth, phone OTP providers) - no custom backend code needed
- **Design System**: Auth screens must follow Color Guidelines (`projects/02.Color-Guidelines.md`) - Primary Orange `#FF7B00` for CTAs, proper text hierarchy, input states
