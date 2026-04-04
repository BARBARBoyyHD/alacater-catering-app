/**
 * Supabase client configuration for React Native.
 *
 * Uses expo-secure-store for persistent session storage (keychain-backed security).
 * This is more secure than AsyncStorage as it uses iOS Keychain / Android Keystore.
 *
 * Per ITA §9.1: "Session persisted securely via React Native secure storage"
 */
import { createClient, SupportedStorage } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

// SecureStore adapter for Supabase
// Supabase requires a storage object with getItem/setItem/removeItem methods
const secureStorage: SupportedStorage = {
  getItem: async (key: string) => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.warn('SecureStore getItem error:', error);
      return null;
    }
  },
  setItem: async (key: string, value: string) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.warn('SecureStore setItem error:', error);
    }
  },
  removeItem: async (key: string) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.warn('SecureStore removeItem error:', error);
    }
  },
};

// Validate environment variables
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in .env.local',
  );
}

// Create Supabase client with secure storage for session persistence
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: secureStorage,
    autoRefreshToken: true, // Automatically refresh tokens before expiry
    persistSession: true, // Persist session across app restarts
    detectSessionInUrl: false, // Not needed for native OAuth flows
  },
});

// Export types for reuse
export type { SupabaseClient } from '@supabase/supabase-js';
export type { Session, User, AuthError } from '@supabase/supabase-js';
