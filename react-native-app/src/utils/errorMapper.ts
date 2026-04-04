/**
 * Auth Error Mapper
 *
 * Maps Supabase Auth errors to user-friendly messages.
 * Prevents email enumeration by using generic messages where appropriate.
 *
 * Per spec: Login errors MUST use generic "Invalid email or password" to prevent email enumeration.
 */
import type { AuthError } from '@supabase/supabase-js';

/**
 * Map Supabase auth error to user-friendly message.
 *
 * @param error - Raw AuthError from Supabase
 * @returns User-friendly Error object
 */
export function mapAuthError(error: AuthError | Error): Error {
  const message = error.message.toLowerCase();

  // Login errors - use generic message to prevent email enumeration
  if (message.includes('invalid login credentials')) {
    return new Error('Invalid email or password');
  }

  // Signup errors
  if (message.includes('user already registered')) {
    return new Error('An account with this email already exists');
  }

  if (message.includes('email address') && message.includes('already')) {
    return new Error('An account with this email already exists');
  }

  // Phone OTP errors
  if (message.includes('invalid phone number')) {
    return new Error('Please enter a valid Indonesian phone number (+62...)');
  }

  if (message.includes('invalid otp') || message.includes('invalid code')) {
    return new Error('Invalid verification code. Please try again.');
  }

  if (message.includes('expired') && message.includes('otp')) {
    return new Error('Code expired. Please request a new one.');
  }

  if (message.includes('max retries') || message.includes('too many attempts')) {
    return new Error('Too many attempts. Please try again later.');
  }

  // Password reset
  if (message.includes('not found') || message.includes('no user')) {
    // Generic message to prevent email enumeration
    return new Error('If this email is registered, you\'ll receive a reset link');
  }

  // Session errors
  if (message.includes('session') || message.includes('token')) {
    return new Error('Session expired. Please log in again.');
  }

  // Network/timeout errors
  if (message.includes('network') || message.includes('timeout') || message.includes('fetch')) {
    return new Error('Unable to connect. Check your internet connection.');
  }

  // Google OAuth errors
  if (message.includes('google') || message.includes('id_token')) {
    return new Error('Google Sign-In failed. Please try again.');
  }

  // Default: return original error message if not mapped
  return new Error(error.message || 'An unexpected error occurred. Please try again.');
}
