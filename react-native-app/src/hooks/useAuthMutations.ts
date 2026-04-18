/**
 * TanStack Query Mutation Hooks for Authentication
 *
 * Provides React Query hooks for auth operations.
 * Per design.md Decision #1: TanStack Query for server state (mutations), Zustand for UI state.
 *
 * Each mutation hook can be used by auth screens to handle async auth operations
 * with built-in loading states, error handling, and cache invalidation.
 */
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import {
  signUpWithEmail,
  loginWithEmail,
  loginWithGoogle,
  sendPhoneOtp,
  verifyPhoneOtp,
  sendPasswordResetEmail as sendResetEmail,
  updatePassword as updatePasswordService,
  logout as logoutService,
} from '@/src/services/auth.service';
import { useAuthUIStore } from '@/src/store/authStore';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// ============================================
// useSignUp Mutation Hook
// ============================================

export function useSignUp() {
  const { setLoading, setError, resetState } = useAuthUIStore();

  return useMutation({
    mutationFn: async ({ email, password, fullName }: { email: string; password: string; fullName: string }) => {
      // Mock delay for UI feedback
      await new Promise(resolve => setTimeout(resolve, 800));
      return { session: { user: { id: 'mock-id', email } }, user: { id: 'mock-id', email }, error: null };
    },
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      setLoading(false);
      resetState();
      // Navigate to app home (Mocking success)
      router.replace('/(tabs)');
    },
    onError: (error: Error) => {
      setLoading(false);
      setError(error.message);
    },
  });
}

// ============================================
// useLogin Mutation Hook
// ============================================

export function useLogin() {
  const { setLoading, setError, resetState } = useAuthUIStore();

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      // Mock delay for UI feedback
      await new Promise(resolve => setTimeout(resolve, 800));
      return { session: { user: { id: 'mock-id', email } }, user: { id: 'mock-id', email }, error: null };
    },
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      setLoading(false);
      resetState();
      router.replace('/(tabs)');
    },
    onError: (error: Error) => {
      setLoading(false);
      setError(error.message);
    },
  });
}

// ============================================
// useGoogleLogin Mutation Hook
// ============================================

export function useGoogleLogin() {
  const { setLoading, setError, resetState } = useAuthUIStore();

  return useMutation({
    mutationFn: async () => {
      // Mock delay for UI feedback
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { session: { user: { id: 'mock-google-id' } }, user: { id: 'mock-google-id' }, error: null };
    },
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      setLoading(false);
      resetState();
      router.replace('/(tabs)');
    },
    onError: (error: Error) => {
      setLoading(false);
      setError(error.message || 'Google Sign-In failed. Please try again.');
    },
  });
}

// ============================================
// usePhoneOtp Mutation Hook
// ============================================

export function useSendPhoneOtp() {
  const { setLoading, setError } = useAuthUIStore();

  return useMutation({
    mutationFn: async ({ phone }: { phone: string }) => {
      // Mock delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return { error: null };
    },
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      setLoading(false);
      // If no error, navigate to OTP input screen
      // (handled by the PhoneOTPInputScreen on success)
      router.push({
        pathname: '/(auth)/phone-otp',
        params: { phone: 'mock-phone' } // In a real app we'd pass the actual phone
      });
    },
    onError: (error: Error) => {
      setLoading(false);
      setError(error.message);
    },
  });
}

export function useVerifyPhoneOtp() {
  const { setLoading, setError, resetState } = useAuthUIStore();

  return useMutation({
    mutationFn: async ({ phone, token }: { phone: string; token: string }) => {
      // Mock delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return { session: { user: { id: 'mock-phone-id' } }, user: { id: 'mock-phone-id' }, error: null };
    },
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      setLoading(false);
      resetState();
      router.replace('/(tabs)');
    },
    onError: (error: Error) => {
      setLoading(false);
      setError(error.message);
    },
  });
}

// ============================================
// useLogout Mutation Hook
// ============================================

export function useLogout() {
  const { setLoading, setError, resetState } = useAuthUIStore();

  return useMutation({
    mutationFn: () => logoutService(),
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      setLoading(false);
      // Clear UI state regardless of server-side success
      resetState();
      // Navigate to auth flow
      router.replace('/(auth)/welcome');
      if (data.error) {
        // Show warning that session may still be active on server
        setError('Logged out locally. ' + data.error.message);
      }
    },
    onError: (error: Error) => {
      setLoading(false);
      resetState();
      router.replace('/(auth)/welcome');
      setError('Logged out locally. ' + error.message);
    },
  });
}

// ============================================
// useSendPasswordResetEmail Mutation Hook
// ============================================

export function useSendPasswordResetEmail() {
  const { setLoading, setError } = useAuthUIStore();

  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      // Mock delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return { error: null };
    },
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      setLoading(false);
      // Navigate to confirmation screen regardless
      router.push('/(auth)/reset-password-sent');
    },
    onError: (error: Error) => {
      setLoading(false);
      setError(error.message);
    },
  });
}

// ============================================
// useUpdatePassword Mutation Hook
// ============================================

export function useUpdatePassword() {
  const { setLoading, setError, resetState } = useAuthUIStore();

  return useMutation({
    mutationFn: async ({ password }: { password: string }) => {
      // Mock delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return { error: null };
    },
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      setLoading(false);
      resetState();
      router.replace('/(tabs)');
    },
    onError: (error: Error) => {
      setLoading(false);
      setError(error.message);
    },
  });
}
