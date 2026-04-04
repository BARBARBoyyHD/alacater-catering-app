/**
 * Secure Storage Utility
 *
 * Wrapper around expo-secure-store for general-purpose secure key-value storage.
 * Uses iOS Keychain / Android Keystore for hardware-backed security.
 *
 * Used for:
 * - Session persistence (Supabase client uses this via storage adapter)
 * - Biometric credential storage
 * - Any sensitive data that shouldn't be stored in plain AsyncStorage
 */
import * as SecureStore from 'expo-secure-store';

/**
 * Store a value securely.
 * The value is stored in the platform's secure keychain/keystore.
 *
 * @param key - Storage key
 * @param value - Value to store (will be serialized to string)
 */
export async function setSecureItem(key: string, value: string): Promise<void> {
  await SecureStore.setItemAsync(key, value);
}

/**
 * Retrieve a value securely.
 * Returns null if the key doesn't exist or on error.
 *
 * @param key - Storage key
 * @returns Stored value or null
 */
export async function getSecureItem(key: string): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(key);
  } catch {
    return null;
  }
}

/**
 * Delete a value securely.
 * Silently succeeds if the key doesn't exist.
 *
 * @param key - Storage key
 */
export async function deleteSecureItem(key: string): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch {
    // Key doesn't exist, ignore
  }
}

/**
 * Check if a key exists in secure storage.
 *
 * @param key - Storage key
 * @returns true if the key exists
 */
export async function hasSecureItem(key: string): Promise<boolean> {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value !== null;
  } catch {
    return false;
  }
}
