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
    mutationFn: ({ email, password, fullName }: { email: string; password: string; fullName: string }) =>
      signUpWithEmail(email, password, fullName),
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      setLoading(false);
      if (data.error) {
        setError(data.error.message);
      } else {
        resetState();
        // Navigate to app home (Expo Router will handle auth guard)
        router.replace('/(tabs)');
      }
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
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginWithEmail(email, password),
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      setLoading(false);
      if (data.error) {
        setError(data.error.message);
      } else {
        resetState();
        router.replace('/(tabs)');
      }
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
      // Initialize Google Sign-In
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const signInResult = await GoogleSignin.signIn();

      // Get ID token from result
      const idToken = signInResult.data?.idToken;
      if (!idToken) {
        throw new Error('Google Sign-In failed: No ID token received');
      }

      // Exchange ID token with Supabase
      return loginWithGoogle(idToken);
    },
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      setLoading(false);
      if (data.error) {
        setError(data.error.message);
      } else {
        resetState();
        router.replace('/(tabs)');
      }
    },
    onError: (error: Error) => {
      setLoading(false);
      // Handle specific Google Sign-In errors
      if (error.message === statusCodes.SIGN_IN_CANCELLED) {
        setError(null); // User cancelled, no error shown
      } else if (error.message === statusCodes.IN_PROGRESS) {
        setError(null); // Operation in progress, ignore
      } else if (error.message === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError('Google Play Services not available. Please use email/password.');
      } else {
        setError(error.message || 'Google Sign-In failed. Please try again.');
      }
    },
  });
}

// ============================================
// usePhoneOtp Mutation Hook
// ============================================

export function useSendPhoneOtp() {
  const { setLoading, setError } = useAuthUIStore();

  return useMutation({
    mutationFn: ({ phone }: { phone: string }) => sendPhoneOtp(phone),
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      setLoading(false);
      if (data.error) {
        setError(data.error.message);
      }
      // If no error, navigate to OTP input screen
      // (handled by the PhoneOTPInputScreen on success)
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
    mutationFn: ({ phone, token }: { phone: string; token: string }) =>
      verifyPhoneOtp(phone, token),
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      setLoading(false);
      if (data.error) {
        setError(data.error.message);
      } else {
        resetState();
        router.replace('/(tabs)');
      }
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
    mutationFn: ({ email }: { email: string }) => sendResetEmail(email),
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      setLoading(false);
      if (data.error) {
        setError(data.error.message);
      }
      // Navigate to confirmation screen regardless (prevents email enumeration)
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
    mutationFn: ({ password }: { password: string }) => updatePasswordService(password),
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      setLoading(false);
      if (data.error) {
        setError(data.error.message);
      } else {
        resetState();
        router.replace('/(tabs)');
      }
    },
    onError: (error: Error) => {
      setLoading(false);
      setError(error.message);
    },
  });
}
