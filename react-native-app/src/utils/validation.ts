/**
 * Zod Validation Schemas for Auth Forms
 *
 * Type-safe form validation following spec requirements:
 * - loginSchema: email + password min 6 chars
 * - signupSchema: extends login + fullName min 2 chars + confirmPassword match
 * - forgotPasswordSchema: email validation
 * - phoneOtpSchema: Indonesian +62 phone format
 * - resetPasswordSchema: password min 6 chars + confirmation
 *
 * Per ITA §2.1: React Hook Form 8+ + Zod 3.24+ for form validation
 */
import { z } from 'zod';

// ============================================
// Login Schema
// ============================================

/**
 * Email/password login validation schema.
 * Spec: email must be valid format, password min 6 characters.
 */
export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// ============================================
// Signup Schema
// ============================================

/**
 * Email/password signup validation schema.
 * Extends login schema with fullName (min 2 chars) and confirmPassword matching.
 */
export const signupSchema = z
  .object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

// ============================================
// Forgot Password Schema
// ============================================

/**
 * Forgot password email validation.
 * Same email validation as login for consistency.
 */
export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// ============================================
// Phone OTP Schema
// ============================================

/**
 * Indonesian phone number validation.
 * Must start with +62 and have 9-13 digits after the country code.
 */
export const phoneOtpSchema = z.object({
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+62\d{9,13}$/, 'Please enter a valid Indonesian phone number (+62...)'),
});

export type PhoneOtpFormData = z.infer<typeof phoneOtpSchema>;

/**
 * OTP code validation (6 digits).
 */
export const otpCodeSchema = z
  .string()
  .length(6, 'OTP must be 6 digits')
  .regex(/^\d{6}$/, 'OTP must contain only numbers');

export type OTPCode = z.infer<typeof otpCodeSchema>;

// ============================================
// Reset Password Schema
// ============================================

/**
 * New password validation after password reset.
 * Password min 6 chars + confirmation must match.
 */
export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
