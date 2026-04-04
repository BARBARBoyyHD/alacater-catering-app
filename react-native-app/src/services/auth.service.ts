/**
 * Auth Service - Supabase Auth wrapper functions.
 *
 * Provides a clean interface for authentication operations while handling
 * error mapping and response normalization.
 *
 * Per design.md Decision #6: Uses native Google Sign-In package, not web OAuth flow.
 * Per design.md Decision #7: Uses Supabase native phone OTP flow.
 */
import { supabase } from '@/src/config/supabase';
import type { Session, User } from '@supabase/supabase-js';
import { mapAuthError } from '@/src/utils/errorMapper';

// ============================================
// Email/Password Authentication
// ============================================

/**
 * Sign up with email and password.
 * Creates a new user account and automatically logs them in.
 *
 * @param email - User's email address
 * @param password - User's password (min 6 characters)
 * @param fullName - User's display name
 * @returns Object with user, session, and error
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  fullName: string,
): Promise<{ session: Session | null; user: User | null; error: Error | null }> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      return { session: null, user: null, error: mapAuthError(error) };
    }

    return { session: data.session, user: data.user, error: null };
  } catch {
    return {
      session: null,
      user: null,
      error: new Error('Network error. Please check your connection.'),
    };
  }
}

/**
 * Log in with email and password.
 *
 * @param email - User's email address
 * @param password - User's password
 * @returns Object with session, user, and error
 */
export async function loginWithEmail(
  email: string,
  password: string,
): Promise<{ session: Session | null; user: User | null; error: Error | null }> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Use generic message to prevent email enumeration
      return { session: null, user: null, error: mapAuthError(error) };
    }

    return { session: data.session, user: data.user, error: null };
  } catch {
    return {
      session: null,
      user: null,
      error: new Error('Network error. Please check your connection.'),
    };
  }
}

// ============================================
// Google OAuth Authentication
// ============================================

/**
 * Log in with Google using native Google Sign-In.
 *
 * Flow (per design.md Decision #6):
 * 1. User signs in with native Google SDK
 * 2. Receive idToken from Google
 * 3. Exchange idToken with Supabase for session
 *
 * NOTE: The Google Sign-In initialization and idToken retrieval happens in the
 * mutation hook (useAuthMutations.ts) because it requires UI interaction.
 * This function only handles the Supabase exchange.
 *
 * @param idToken - Google ID token from native Google Sign-In
 * @returns Object with session, user, and error
 */
export async function loginWithGoogle(
  idToken: string,
): Promise<{ session: Session | null; user: User | null; error: Error | null }> {
  try {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: idToken,
    });

    if (error) {
      return { session: null, user: null, error: mapAuthError(error) };
    }

    return { session: data.session, user: data.user, error: null };
  } catch {
    return {
      session: null,
      user: null,
      error: new Error('Network error. Please check your connection.'),
    };
  }
}

// ============================================
// Phone OTP Authentication
// ============================================

/**
 * Send OTP to phone number.
 * Uses Supabase's native phone OTP flow (design.md Decision #7).
 *
 * @param phone - Indonesian phone number (+62 format)
 * @returns Object with error (success is implied if no error)
 */
export async function sendPhoneOtp(
  phone: string,
): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.auth.signInWithOtp({
      phone,
    });

    if (error) {
      return { error: mapAuthError(error) };
    }

    return { error: null };
  } catch {
    return {
      error: new Error('Network error. Please check your connection.'),
    };
  }
}

/**
 * Verify OTP code for phone authentication.
 *
 * @param phone - Phone number that received the OTP
 * @param token - 6-digit OTP code
 * @returns Object with session, user, and error
 */
export async function verifyPhoneOtp(
  phone: string,
  token: string,
): Promise<{ session: Session | null; user: User | null; error: Error | null }> {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms',
    });

    if (error) {
      return { session: null, user: null, error: mapAuthError(error) };
    }

    return { session: data.session, user: data.user, error: null };
  } catch {
    return {
      session: null,
      user: null,
      error: new Error('Network error. Please check your connection.'),
    };
  }
}

// ============================================
// Password Reset
// ============================================

/**
 * Send password reset email.
 * User receives a link that opens the app's password reset screen via deep link.
 *
 * @param email - User's registered email
 * @returns Object with error (success is implied if no error)
 */
export async function sendPasswordResetEmail(
  email: string,
): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'alacater://reset-password', // Deep link for password reset
    });

    if (error) {
      return { error: mapAuthError(error) };
    }

    return { error: null };
  } catch {
    return {
      error: new Error('Network error. Please check your connection.'),
    };
  }
}

/**
 * Update password (used after clicking reset link).
 *
 * @param newPassword - New password (min 6 characters)
 * @returns Object with error
 */
export async function updatePassword(
  newPassword: string,
): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return { error: mapAuthError(error) };
    }

    return { error: null };
  } catch {
    return {
      error: new Error('Network error. Please check your connection.'),
    };
  }
}

// ============================================
// Session Management
// ============================================

/**
 * Log out the current user.
 * Revokes the session server-side and clears local state.
 *
 * @returns Object with error
 */
export async function logout(): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { error: mapAuthError(error) };
    }

    return { error: null };
  } catch {
    return {
      error: new Error('Network error. Session may still be active on server.'),
    };
  }
}

/**
 * Get the current session.
 * Useful for checking auth state on app launch.
 *
 * @returns Current session or null
 */
export async function getCurrentSession(): Promise<Session | null> {
  try {
    const { data } = await supabase.auth.getSession();
    return data.session;
  } catch {
    return null;
  }
}

/**
 * Get the current user.
 *
 * @returns Current user or null
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data } = await supabase.auth.getUser();
    return data.user;
  } catch {
    return null;
  }
}
