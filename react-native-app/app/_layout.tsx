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
import { useAuthStore } from '@/src/store/authStore';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

import { useNotificationStore } from '@/src/store/notificationStore';

function RootLayoutContent() {
  const colorScheme = useColorScheme();
  const { setSession, setLoading, session } = useAuthStore();
  const { addNotification } = useNotificationStore();

  // Initialize Notification listeners (Mock)
  useEffect(() => {
    // Mock incoming notification after 5 seconds
    const timer = setTimeout(() => {
      addNotification({
        id: 'mock-1',
        title: 'Pesanan Diterima',
        body: 'Pesanan #ALA-982310 sedang disiapkan.',
        data: { screen: 'order-detail', id: 'ALA-982310' },
        read: false,
        timestamp: Date.now(),
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [addNotification]);


  // Initialize Supabase auth listener
  useEffect(() => {
    setLoading(true);
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession, setLoading]);

  // Initialize Google Sign-In
  useEffect(() => {
    if (Platform.OS !== 'web') {
      GoogleSignin.configure({
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
        iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
      });
    }
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="(auth)/welcome"
      >
        {/* Auth first for mockup flow */}
        <Stack.Screen name="(auth)" options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="checkout" options={{ headerShown: false }} />
        <Stack.Screen name="order-detail/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="provider/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="reviews/new" options={{ headerShown: false }} />
        <Stack.Screen name="reviews/list" options={{ headerShown: false }} />
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
