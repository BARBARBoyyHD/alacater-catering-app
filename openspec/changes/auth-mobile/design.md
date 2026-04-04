## Context

The Alacater mobile app (React Native 0.76+) requires a complete authentication system as defined in Epic 2 of the Product Backlog. Currently, the app has no auth implementation - this is a greenfield change. The architecture must support:

- **Supabase Auth** as the authentication provider (per ITA §6)
- **Multiple auth methods**: email/password, Google OAuth, phone OTP
- **Persistent sessions** across app restarts
- **Biometric quick-login** as an optional convenience layer
- **Navigation guards** to protect authenticated routes

The design follows the ITA specification which mandates Supabase Auth with JWT tokens, secure session persistence, and integration with TanStack Query for server state management.

**Constraints:**
- Must follow Color Guidelines (`projects/02.Color-Guidelines.md`) for all UI
- Must use React Hook Form + Zod for form validation
- Must use Zustand for client state, TanStack Query for server state
- Must support secure storage for auth tokens (no plain AsyncStorage for sensitive data)
- Must be compatible with React Navigation 7+ (Native Stack)

## Goals / Non-Goals

**Goals:**
- Implement complete auth flow: signup → login → session → logout
- Support email/password, Google OAuth, and phone OTP methods
- Provide password reset via email
- Persist sessions securely across app restarts
- Enable biometric authentication (FaceID/TouchID) as optional quick-login
- Protect authenticated routes with navigation guards
- Follow Alacater design system (Primary Orange `#FF7B00`, text hierarchy, input states)

**Non-Goals:**
- **No custom backend auth** - Supabase Auth handles all server-side logic
- **No role-based access control** - That's a future change (provider vs customer roles)
- **No social features** - Profile editing, social links are separate epics
- **No multi-factor authentication (MFA)** - Not required for MVP per BRD
- **No account deletion flow** - Future privacy requirement

## Decisions

### 1. Auth State Management: Zustand + TanStack Query

**Decision:** Use Zustand for auth UI state (loading, errors, current screen) and TanStack Query for auth mutations (signup, login, logout).

**Rationale:**
- Zustand is lightweight and perfect for transient UI state
- TanStack Query provides caching, retries, and invalidation for server mutations
- Separation of concerns: UI state vs server state
- Consistent with ITA §2.1 which specifies this exact stack

**Alternatives considered:**
- ~~Redux Toolkit~~: Overkill for auth state, adds boilerplate
- ~~React Context only~~: Would cause unnecessary re-renders, no built-in caching

### 2. Secure Storage: `react-native-keychain` over `@react-native-async-storage`

**Decision:** Use `react-native-keychain` for storing auth tokens, not plain AsyncStorage.

**Rationale:**
- Keychain uses iOS Keychain and Android Keystore - hardware-backed security
- AsyncStorage is encrypted at rest but not as secure as platform keychains
- ITA §9.1 mandates "secure storage via React Native secure storage"
- Biometric integration requires keychain-backed storage

**Alternatives considered:**
- ~~AsyncStorage + encryption~~: Reinventing the wheel, keychain is battle-tested
- ~~MMKV with encryption~~: Faster but less secure than platform keychains

### 3. Navigation Structure: Auth Stack + App Stack

**Decision:** Use nested navigation stacks - an Auth Stack (unauthenticated) and an App Stack (authenticated), with a root navigator that switches based on auth state.

```
Root Navigator
├── Auth Stack (when not authenticated)
│   ├── WelcomeScreen (entry point)
│   ├── LoginScreen
│   ├── SignupScreen
│   ├── ForgotPasswordScreen
│   └── PhoneOTPInputScreen
└── App Stack (when authenticated)
    ├── HomeScreen
    ├── SearchScreen
    ├── OrdersScreen
    └── ProfileScreen
```

**Rationale:**
- Clean separation of auth vs app flows
- Easy to add onboarding screens later without affecting app navigation
- React Navigation 7 Native Stack supports this pattern natively
- Prevents authenticated users from accessing auth screens and vice versa

**Alternatives considered:**
- ~~Single stack with conditional rendering~~: Harder to manage back behavior, less scalable
- ~~Modal-based auth~~: Doesn't work well with deep linking, complex back navigation

### 4. Form Validation: React Hook Form + Zod Schema

**Decision:** Use React Hook Form 8+ with Zod 3.24+ for all auth forms.

**Rationale:**
- ITA §2.1 specifies this exact combination
- Zod provides type-safe schema validation (shared between forms and API types)
- React Hook Form minimizes re-renders via uncontrolled inputs
- Built-in error handling, async validation support

**Schema examples:**
```typescript
// Login schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Signup schema (extends login)
const signupSchema = loginSchema.extend({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
```

### 5. Biometric Auth: `expo-local-authentication` + Keychain

**Decision:** Use `expo-local-authentication` for biometric prompts, storing a keychain credential that enables auto-login.

**Rationale:**
- Expo modules are compatible with bare React Native (via expo-modules-core)
- Provides unified API for FaceID (iOS) and fingerprint (Android)
- Can check device capability before showing prompts
- Works with keychain for secure credential storage

**Flow:**
1. User logs in with email/password
2. App prompts: "Enable FaceID for quick login?"
3. If yes, store encrypted credential in keychain with biometric flag
4. On next app open, check biometric availability → prompt → auto-login

### 6. Google OAuth: `@react-native-google-signin/google-signin`

**Decision:** Use the official `@react-native-google-signin/google-signin` package, not Supabase's web OAuth flow.

**Rationale:**
- Native Google Sign-In provides better UX (one-tap, no webview)
- Returns ID token that Supabase Auth can exchange for a session
- Required for iOS Google Sign-In (web flow doesn't work well on iOS)
- Well-maintained, official package from React Native community

**Flow:**
1. User taps "Continue with Google"
2. Native Google Sign-In prompt appears
3. On success, receive `idToken`
4. Call `supabase.auth.signInWithIdToken({ provider: 'google', token: idToken })`
5. Supabase creates/returns session

### 7. Phone OTP: Supabase Auth Native Flow

**Decision:** Use Supabase Auth's native phone OTP flow (`signInWithOtp({ phone })` + `verifyOtp()`), not custom SMS integration.

**Rationale:**
- Supabase handles SMS delivery, rate limiting, and OTP generation
- No need for Twilio/Fonnte integration (per ITA §2.3, those are for order alerts, not auth)
- Simpler implementation, less surface area for bugs
- Built-in security (rate limits, OTP expiry)

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Supabase Auth rate limits** | Users blocked from login/signup after excessive attempts | Implement client-side debouncing, show clear error messages, retry-after countdown |
| **Google Sign-In configuration complexity** | Setup requires iOS/Android native config (GoogleService-Info.plist, google-services.json) | Document setup steps in README, use environment-specific configs |
| **Biometric not available on all devices** | Fallback needed for devices without biometrics | Always offer email/password fallback, check `isEnrolled()` before prompting |
| **Session expiry during active use** | User logged out unexpectedly | Implement silent token refresh via Supabase auth state listener |
| **Phone OTP delivery delays** | Users don't receive SMS in time | Show resend OTP button with countdown timer, fallback to email auth |
| **Keychain data lost on app reinstall** | Users must re-login after reinstall | Expected behavior, no workaround needed - sessions are server-side anyway |
| **Form validation UX** | Users frustrated by strict validation | Show inline errors, validate on blur (not on every keystroke), clear error messages |

## Migration Plan

**Not applicable** - this is a greenfield change with no existing auth to migrate.

**Deployment order:**
1. Setup Supabase Auth providers (email, Google, phone) in Supabase dashboard
2. Implement auth screens in React Native app
3. Test all auth flows locally with Supabase CLI
4. Deploy to staging, run E2E tests (Detox)
5. Deploy to production (App Store / Play Store)

**Rollback strategy:**
- If critical auth bugs found: disable affected auth method in Supabase dashboard (e.g., turn off phone OTP)
- Mobile app rollback requires app store update (no hotfix capability for JS code unless using CodePush)

## Open Questions

1. **Should we implement magic link auth?** - Currently not in backlog, but Supabase supports it. Could simplify email auth UX.
2. **Do we need social account linking?** - If user signs up with Google, can they later add email/password? (Deferred - not MVP)
3. **Should biometric login store refresh token or access token?** - Storing refresh token is safer (longer-lived), but access token is faster. Leaning toward refresh token for better UX.
4. **Phone OTP regional support** - Should we limit to Indonesian phone numbers (+62) initially? (Recommended: yes, per BRD focus on Indonesian market)
