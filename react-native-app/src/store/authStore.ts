/**
 * Auth Store - Zustand store for auth UI state.
 *
 * Manages transient UI state (loading, errors, screen navigation) separate from
 * server state managed by TanStack Query. Per design.md Decision #1.
 */
import { create } from 'zustand';

export type AuthScreenName =
  | 'welcome'
  | 'login'
  | 'signup'
  | 'forgotPassword'
  | 'resetPasswordSent'
  | 'phoneOTP'
  | 'newPassword';

interface AuthUIState {
  // UI State
  isLoading: boolean;
  error: string | null;
  currentScreen: AuthScreenName;

  // Biometric
  isBiometricEnabled: boolean;
  biometricPromptShown: boolean;

  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  navigateToScreen: (screen: AuthScreenName) => void;
  resetState: () => void;
  setBiometricEnabled: (enabled: boolean) => void;
  setBiometricPromptShown: (shown: boolean) => void;
}

export const useAuthUIStore = create<AuthUIState>()((set) => ({
  // Initial state
  isLoading: false,
  error: null,
  currentScreen: 'welcome',
  isBiometricEnabled: false,
  biometricPromptShown: false,

  // Actions
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
  navigateToScreen: (screen: AuthScreenName) => set({ currentScreen: screen, error: null }),
  resetState: () =>
    set({
      isLoading: false,
      error: null,
      currentScreen: 'welcome',
    }),
  setBiometricEnabled: (enabled: boolean) => set({ isBiometricEnabled: enabled }),
  setBiometricPromptShown: (shown: boolean) => set({ biometricPromptShown: shown }),
}));
