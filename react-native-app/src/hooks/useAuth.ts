/**
 * useAuth Hook - Convenience hook exposing auth state + actions.
 *
 * Combines Zustand UI state with TanStack Query mutation hooks
 * for easy consumption by auth screens.
 */
import { useAuthUIStore } from '@/src/store/authStore';
import {
  useSignUp,
  useLogin,
  useGoogleLogin,
  useSendPhoneOtp,
  useVerifyPhoneOtp,
  useLogout,
  useSendPasswordResetEmail,
  useUpdatePassword,
} from '@/src/hooks/useAuthMutations';

/**
 * Centralized auth hook for use in auth screens.
 * Provides UI state, loading states, errors, and all mutation functions.
 */
export function useAuth() {
  // UI State from Zustand
  const {
    isLoading: uiLoading,
    error,
    currentScreen,
    isBiometricEnabled,
    setLoading,
    setError,
    navigateToScreen,
    resetState,
    setBiometricEnabled,
  } = useAuthUIStore();

  // Mutation hooks from TanStack Query
  const signUp = useSignUp();
  const login = useLogin();
  const googleLogin = useGoogleLogin();
  const sendPhoneOtp = useSendPhoneOtp();
  const verifyPhoneOtp = useVerifyPhoneOtp();
  const logout = useLogout();
  const sendPasswordReset = useSendPasswordResetEmail();
  const updatePassword = useUpdatePassword();

  // Combined loading state (any mutation in progress)
  const isLoading =
    uiLoading ||
    signUp.isPending ||
    login.isPending ||
    googleLogin.isPending ||
    sendPhoneOtp.isPending ||
    verifyPhoneOtp.isPending ||
    logout.isPending ||
    sendPasswordReset.isPending ||
    updatePassword.isPending;

  return {
    // UI State
    uiState: {
      isLoading,
      error,
      currentScreen,
      isBiometricEnabled,
    },

    // Actions
    actions: {
      setLoading,
      setError,
      navigateToScreen,
      resetState,
      setBiometricEnabled,
    },

    // Mutations
    mutations: {
      signUp,
      login,
      googleLogin,
      sendPhoneOtp,
      verifyPhoneOtp,
      logout,
      sendPasswordReset,
      updatePassword,
    },
  };
}
