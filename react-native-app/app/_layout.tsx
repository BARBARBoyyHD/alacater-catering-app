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
  initialRouteName: '(auth)/welcome',
};

function RootLayoutContent() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [isReady, setIsReady] = useState(false);

  /**
   * Task 3.9: Supabase auth state listener - DISABLED FOR MOCKUP
   */
  const setupAuthListener = useCallback(() => {
    return () => {};
  }, []);

  /**
   * Initialize Google Sign-In on app start.
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

    if (Object.keys(config).length > 0) {
      GoogleSignin.configure(config);
    }
  }, []);

  /**
   * Initial session check - BYPASSED FOR MOCKUP
   */
  const checkInitialSession = useCallback(async () => {
    try {
      // Mocked delay
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('[Auth] Mocking session check - starting at welcome');
    } catch (error) {
      console.error('[Auth] Session check error:', error);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    const cleanup = setupAuthListener();
    setupGoogleSignIn();
    checkInitialSession();
    return cleanup;
  }, [setupAuthListener, setupGoogleSignIn, checkInitialSession]);

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
    <ThemeProvider value={colorScheme === 'dark' ? alacaterDarkTheme : alacaterLightTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="(auth)/welcome"
      >
        {/* Auth first for mockup flow */}
        <Stack.Screen name="(auth)" options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayoutContent />
    </QueryClientProvider>
  );
}
