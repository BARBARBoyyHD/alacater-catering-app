## 1. Project Setup & Dependencies

- [x] 1.1 Install auth dependencies: `@supabase/supabase-js`, `@react-native-google-signin/google-signin`, `expo-local-authentication`, `react-native-keychain`
- [x] 1.2 Install form dependencies: `react-hook-form`, `@hookform/resolvers`, `zod` (if not already installed)
- [x] 1.3 Install navigation dependencies: `@react-navigation/native-stack`, `@react-navigation/native` (already provided by Expo Router)
- [x] 1.4 Configure Supabase client for React Native with secure storage adapter
- [x] 1.5 Set up Google Sign-In configuration (GoogleService-Info.plist for iOS, google-services.json for Android)
- [x] 1.6 Configure deep linking for password reset flow (app.json scheme set to `alacater`)

## 2. Auth Service Layer

- [x] 2.1 Create `src/services/auth.service.ts` with Supabase Auth wrapper functions
- [x] 2.2 Implement `signUpWithEmail(email, password, fullName)` function
- [x] 2.3 Implement `loginWithEmail(email, password)` function
- [x] 2.4 Implement `loginWithGoogle()` function using `@react-native-google-signin/google-signin`
- [x] 2.5 Implement `sendPhoneOtp(phone)` function
- [x] 2.6 Implement `verifyPhoneOtp(phone, token)` function
- [x] 2.7 Implement `sendPasswordResetEmail(email)` function
- [x] 2.8 Implement `logout()` function with session revocation
- [x] 2.9 Implement `restoreSession()` function via `getCurrentSession()` (handled by Supabase auto-persistence)
- [ ] 2.10 Write unit tests for auth service (mock Supabase client)

## 3. Auth State Management

- [x] 3.1 Create `src/store/authStore.ts` Zustand store for auth UI state (loading, error, currentScreen)
- [x] 3.2 Create `src/hooks/useAuth.ts` custom hook exposing auth state + actions
- [x] 3.3 Create TanStack Query mutation hooks in `src/hooks/useAuthMutations.ts`
- [x] 3.4 Implement `useSignUp` mutation hook wrapping `signUpWithEmail`
- [x] 3.5 Implement `useLogin` mutation hook wrapping `loginWithEmail`
- [x] 3.6 Implement `useGoogleLogin` mutation hook wrapping `loginWithGoogle`
- [x] 3.7 Implement `usePhoneOtp` mutation hook wrapping phone OTP flow
- [x] 3.8 Implement `useLogout` mutation hook with query invalidation on success
- [x] 3.9 Set up Supabase auth state listener in app root (`app/_layout.tsx`), sync with Zustand store

## 4. Zod Validation Schemas

- [x] 4.1 Create `src/utils/validation.ts` with shared Zod schemas
- [x] 4.2 Define `loginSchema` (email + password min 6 chars)
- [x] 4.3 Define `signupSchema` (extends login + fullName min 2 chars + confirmPassword match)
- [x] 4.4 Define `forgotPasswordSchema` (email validation)
- [x] 4.5 Define `phoneOtpSchema` (Indonesian +62 phone format)
- [x] 4.6 Define `resetPasswordSchema` (password min 6 chars + confirmation)
- [x] 4.7 Export TypeScript types from Zod schemas using `z.infer`

## 5. Navigation Structure

- [x] 5.1 Create `src/navigation/AuthNavigator.tsx` with Native Stack for auth screens (adapted to Expo Router `(auth)` route group)
- [x] 5.2 Create `src/navigation/AppNavigator.tsx` with Native Stack for main app (placeholder screens) (existing `(tabs)` serves this purpose)
- [x] 5.3 Create `src/navigation/RootNavigator.tsx` that switches between Auth and App stacks based on auth state (adapted to Expo Router layout pattern)
- [x] 5.4 Implement auth state check in RootNavigator (use authStore to determine which stack to show)
- [x] 5.5 Configure navigation options to prevent back navigation into auth screens after login
- [x] 5.6 Set up deep linking configuration for password reset URLs (scheme `alacater://` configured in app.json)

## 6. Auth Screens - Email/Password

- [x] 6.1 Create `src/screens/auth/WelcomeScreen.tsx` as entry point (adapted: `app/(auth)/welcome.tsx`)
- [x] 6.2 Create `src/screens/auth/LoginScreen.tsx` with email/password form
- [x] 6.3 Wire LoginScreen to use React Hook Form + `loginSchema`
- [x] 6.4 Wire LoginScreen submit to `useLogin` mutation hook
- [x] 6.5 Add "Forgot Password?" link navigating to ForgotPasswordScreen
- [x] 6.6 Add "Sign Up" link navigating to SignupScreen
- [x] 6.7 Create `src/screens/auth/SignupScreen.tsx` with email/password/fullName form
- [x] 6.8 Wire SignupScreen to use React Hook Form + `signupSchema`
- [x] 6.9 Wire SignupScreen submit to `useSignUp` mutation hook
- [x] 6.10 Apply Color Guidelines: Primary Orange `#FF7B00` for CTA buttons, proper text hierarchy, input focus states

## 7. Auth Screens - Google OAuth & Phone OTP

- [x] 7.1 Add "Continue with Google" button to WelcomeScreen and LoginScreen
- [x] 7.2 Wire Google button to `useGoogleLogin` mutation hook
- [x] 7.3 Handle Google Sign-In errors (cancelled, network error) with appropriate UI feedback
- [x] 7.4 Create `src/screens/auth/PhoneOTPInputScreen.tsx` with phone number entry + OTP input (adapted: `app/(auth)/phone-otp.tsx`)
- [x] 7.5 Implement phone number input with +62 country code validation
- [x] 7.6 Implement 6-digit OTP input with auto-advance between digits
- [x] 7.7 Add 5:00 countdown timer component for OTP expiry
- [x] 7.8 Add "Resend OTP" button that activates after timer reaches 0 or 30s cooldown
- [x] 7.9 Wire PhoneOTPInputScreen to `usePhoneOtp` mutation hook
- [x] 7.10 Apply Color Guidelines consistently across all screens

## 8. Auth Screens - Forgot Password

- [x] 8.1 Create `src/screens/auth/ForgotPasswordScreen.tsx` with email input form (adapted: `app/(auth)/forgot-password.tsx`)
- [x] 8.2 Wire ForgotPasswordScreen to React Hook Form + `forgotPasswordSchema`
- [x] 8.3 Wire form submit to `sendPasswordResetEmail` service function
- [x] 8.4 Create `src/screens/auth/ResetPasswordSentScreen.tsx` with confirmation message (adapted: `app/(auth)/reset-password-sent.tsx`)
- [x] 8.5 Create `src/screens/auth/NewPasswordScreen.tsx` for deep link flow (adapted: `app/(auth)/new-password.tsx`)
- [x] 8.6 Wire NewPasswordScreen to React Hook Form + `resetPasswordSchema`
- [x] 8.7 Handle deep link from email → NewPasswordScreen with recovery token
- [x] 8.8 Apply Color Guidelines: Primary Orange for CTA, error states in `#FF3B30`

## 9. Session Management & Security

- [x] 9.1 Implement `react-native-keychain` integration for session persistence (adapted: using `expo-secure-store`)
- [x] 9.2 Create `src/utils/secureStorage.ts` with keychain read/write/delete functions (adapted: using `expo-secure-store` in `src/config/supabase.ts`)
- [x] 9.3 Update Supabase client to use keychain-based storage adapter (not AsyncStorage) — already done via `expo-secure-store` in supabase.ts
- [x] 9.4 Implement automatic token refresh logic (Supabase handles this via `autoRefreshToken: true` in supabase.ts)
- [x] 9.5 Implement session restoration on app cold start (restoreSession function) — handled by `checkInitialSession()` in `_layout.tsx`
- [ ] 9.6 Test session persistence: login → kill app → reopen → verify still logged in
- [ ] 9.7 Test session expiry: manually invalidate token → verify user is logged out

## 10. Biometric Authentication

- [x] 10.1 Create `src/services/biometric.service.ts` wrapping `expo-local-authentication`
- [x] 10.2 Implement `isBiometricAvailable()` function (checks hardware + enrollment)
- [x] 10.3 Implement `enableBiometricLogin()` function storing credential in keychain with biometric protection
- [x] 10.4 Implement `authenticateWithBiometrics()` function for quick login
- [x] 10.5 Implement `disableBiometricLogin()` function deleting biometric credential
- [ ] 10.6 Create biometric enablement prompt dialog (shown after first successful email/password login)
- [ ] 10.7 Integrate biometric auth into app launch flow (check → prompt → login or fallback)
- [ ] 10.8 Add biometric toggle in user settings/profile screen
- [ ] 10.9 Test biometric flow on iOS (FaceID) and Android (fingerprint)

## 11. Logout Functionality

- [ ] 11.1 Create logout button in ProfileScreen (or placeholder header)
- [ ] 11.2 Implement logout confirmation modal ("Are you sure you want to log out?")
- [ ] 11.3 Wire logout to `useLogout` mutation hook
- [ ] 11.4 Ensure logout clears: Supabase session, keychain tokens, biometric credentials, Zustand state, TanStack Query auth cache
- [ ] 11.5 Navigate to AuthNavigator after successful logout
- [ ] 11.6 Handle logout network failure: clear local session anyway, show warning toast

## 12. Error Handling & UX Polish

- [x] 12.1 Create shared `src/components/auth/AuthError.tsx` component for inline error messages
- [x] 12.2 Create `src/components/auth/LoadingOverlay.tsx` component for form submission states
- [x] 12.3 Add loading spinners to all auth CTA buttons during submission (done: buttons show opacity change + LoadingOverlay)
- [x] 12.4 Disable form inputs during submission to prevent double-submit (done: `editable={!isSubmitting}` on all inputs)
- [x] 12.5 Add network error handling with retry prompts (done: errorMapper maps network errors)
- [x] 12.6 Add supabase-specific error mapping (e.g., "User already registered" → friendly message) — already done via `src/utils/errorMapper.ts`
- [x] 12.7 Implement keyboard dismissing behavior on form submit (done: `keyboardShouldPersistTaps="handled"` on all scroll views)
- [x] 12.8 Add keyboard-aware scroll view for forms that overflow screen (done: KeyboardAvoidingView + ScrollView in all auth screens)

## 13. Testing

- [ ] 13.1 Write unit tests for Zod validation schemas (valid/invalid inputs)
- [ ] 13.2 Write unit tests for auth service functions (mocked Supabase)
- [ ] 13.3 Write unit tests for Zustand auth store (state transitions)
- [ ] 13.4 Write component tests for LoginScreen (form validation, error display)
- [ ] 13.5 Write component tests for SignupScreen (form validation, error display)
- [ ] 13.6 Write E2E test (Detox): email signup → login → logout flow
- [ ] 13.7 Write E2E test: Google Sign-In flow (mock Google SDK)
- [ ] 13.8 Write E2E test: Phone OTP request + verification flow
- [ ] 13.9 Write E2E test: Forgot password email → reset link → new password flow
- [ ] 13.10 Write E2E test: Biometric enable → logout → biometric quick-login flow

## 14. Documentation & Cleanup

- [ ] 14.1 Update README with auth setup instructions (Supabase provider config, Google Sign-In setup)
- [ ] 14.2 Document environment variables needed: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `IOS_CLIENT_ID`, `ANDROID_CLIENT_ID`
- [x] 14.3 Add inline code comments for complex auth logic (keychain integration, token refresh) — done in all files
- [x] 14.4 Verify all auth screens follow Color Guidelines (`projects/02.Color-Guidelines.md`) — all screens use `Colors` from constants/theme.ts
- [x] 14.5 Run ESLint + TypeScript type check, fix all errors
- [ ] 14.6 Run full test suite, ensure all tests pass
