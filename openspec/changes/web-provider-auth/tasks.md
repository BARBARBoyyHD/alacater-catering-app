## 1. Setup and Infrastructure

- [x] 1.1 Install dependencies: `@supabase/ssr`, `@supabase/supabase-js`, `zod`, `react-hook-form`, `@hookform/resolvers`
- [x] 1.2 Configure environment variables for Supabase (URL and Anon Key)
- [x] 1.3 Create Supabase client factory for Browser, Server, and Middleware in `src/lib/supabase/`

## 2. Authentication UI Components

- [x] 2.1 Create Zod schemas for login and signup forms
- [x] 2.2 Implement Login Page at `src/app/(auth)/login/page.tsx`
- [x] 2.3 Implement Signup Page at `src/app/(auth)/signup/page.tsx`
- [x] 2.4 Implement Forgot Password Page at `src/app/(auth)/forgot-password/page.tsx`
- [x] 2.5 Integrate register and login in navbar landingpage to redirected to /login and /register that we have created

## 3. Server Actions and Logic

- [x] 3.1 Implement `login` Server Action
- [x] 3.2 Implement `signup` Server Action (setting `role: 'catering_owner'` in user metadata)
- [x] 3.3 Create Supabase SQL migration for user synchronization trigger (Auth to `public.User`)
- [x] 3.4 Implement `logout` Server Action
- [x] 3.5 Implement `resetPassword` Server Action

## 4. Middleware and Route Protection

- [x] 4.1 Create `src/middleware.ts` to sync Supabase session and protect `/dashboard` routes
- [x] 4.2 Add redirection logic for authenticated users trying to access login/signup pages

## 5. Verification

- [ ] 5.1 Verify signup creates record in Supabase Auth and Public schema
- [ ] 5.2 Verify login/logout flow persists session correctly
- [ ] 5.3 Verify unauthorized access to `/dashboard` redirects to `/login`
