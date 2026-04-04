/**
 * Root Layout - App entry point with auth state management.
 *
 * Responsibilities:
 * - Initialize Supabase auth state listener (task 3.9)
 * - Provide QueryClient for TanStack Query
 * - Route between auth flow and app based on session state
 * - Initialize Google Sign-In
 * - Handle deep linking for password reset
 *
 * Per design.md Decision #3: Auth Stack + App Stack with root navigator.
 */
import { useEffect, useState, useCallback } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { supabase } from '@/src/config/supabase';
import { useAuthUIStore } from '@/src/store/authStore';
import { Colors } from '@/constants/theme';

// Create QueryClient instance (stable across re-renders)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [isReady, setIsReady] = useState(false);

  /**
   * Task 3.9: Supabase auth state listener
   * Listens to session changes and syncs with Zustand store.
   * Handles: login, logout, token refresh, server-side session invalidation.
   */
  const setupAuthListener = useCallback(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[Auth] State change:', event, session?.user?.id ?? 'no user');

      switch (event) {
        case 'SIGNED_IN':
          // User logged in - store biometric state if enabled
          if (session?.refresh_token) {
            // Note: Biometric enrollment would be triggered by user action, not here
          }
          break;

        case 'SIGNED_OUT':
          // User logged out - reset auth UI state
          useAuthUIStore.getState().resetState();
          break;

        case 'TOKEN_REFRESHED':
          // Token was refreshed automatically by Supabase
          // Session is still valid, no action needed
          break;

        case 'USER_UPDATED':
          // User profile was updated
          break;

        case 'PASSWORD_RECOVERY':
          // Password recovery initiated
          break;

        default:
          break;
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /**
   * Initialize Google Sign-In on app start.
   * Configuration uses environment-specific client IDs.
   */
  const setupGoogleSignIn = useCallback(() => {
    const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
    const androidClientId = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;

    const config: { iosClientId?: string; androidClientId?: string } = {};

    if (Platform.OS === 'ios' && iosClientId) {
      config.iosClientId = iosClientId;
    } else if (Platform.OS === 'android' && androidClientId) {
      config.androidClientId = androidClientId;
    }

    // Only configure if client IDs are available
    if (Object.keys(config).length > 0) {
      GoogleSignin.configure(config);
    }
  }, []);

  /**
   * Initial session check on app cold start.
   * Restores session from secure storage (handled automatically by Supabase
   * since we configured secure storage adapter).
   */
  const checkInitialSession = useCallback(async () => {
    try {
      // Supabase automatically restores session from secure storage
      // We just need to check if a session exists
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        // User has an active session - stay on app stack
        console.log('[Auth] Session restored:', data.session.user.id);
      } else {
        // No session - user will see auth flow
        console.log('[Auth] No session found');
      }
    } catch (error) {
      console.error('[Auth] Session check error:', error);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    // Set up auth listener and Google Sign-In
    const cleanup = setupAuthListener();
    setupGoogleSignIn();

    // Check initial session
    checkInitialSession();

    return cleanup;
  }, [setupAuthListener, setupGoogleSignIn, checkInitialSession]);

  // Show blank screen while initializing (very brief)
  if (!isReady) {
    return null;
  }

  // Custom themes using Alacater colors
  const alacaterLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
    },
  };

  const alacaterDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? alacaterDarkTheme : alacaterLightTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
