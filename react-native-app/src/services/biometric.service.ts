/**
 * Biometric Authentication Service
 *
 * Wraps expo-local-authentication for biometric prompts (FaceID/TouchID).
 * Per design.md Decision #5: Uses expo-local-authentication + keychain.
 *
 * Flow:
 * 1. Check device biometric capability
 * 2. Prompt user for biometric enrollment
 * 3. Store credentials with biometric protection
 * 4. Authenticate via biometric for quick login
 */
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

const BIOMETRIC_CREDENTIAL_KEY = 'biometric_auth_enabled';
const BIOMETRIC_REFRESH_TOKEN_KEY = 'biometric_refresh_token';

/**
 * Check if biometric authentication is available on this device.
 * Checks both hardware support and whether user has enrolled biometrics.
 */
export async function isBiometricAvailable(): Promise<boolean> {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    return hasHardware && isEnrolled;
  } catch {
    return false;
  }
}

/**
 * Get the type of biometric hardware available.
 * Returns 'faceId', 'fingerprint', 'iris', or 'unknown'.
 */
export async function getBiometricType(): Promise<string> {
  try {
    const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

    if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
      return 'faceId';
    }
    if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
      return 'fingerprint';
    }
    return 'unknown';
  } catch {
    return 'unknown';
  }
}

/**
 * Enable biometric login by storing the refresh token securely.
 * The token is stored in SecureStore (keychain-backed on iOS, keystore on Android).
 *
 * @param refreshToken - Supabase refresh token to store
 */
export async function enableBiometricLogin(refreshToken: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Check biometric availability first
    const available = await isBiometricAvailable();
    if (!available) {
      return { success: false, error: 'Biometric authentication is not available on this device.' };
    }

    // Store refresh token in secure store
    await SecureStore.setItemAsync(BIOMETRIC_REFRESH_TOKEN_KEY, refreshToken);

    // Mark biometric login as enabled
    await SecureStore.setItemAsync(BIOMETRIC_CREDENTIAL_KEY, 'true');

    return { success: true };
  } catch {
    return { success: false, error: 'Failed to enable biometric login. Please try again.' };
  }
}

/**
 * Authenticate user with biometrics and retrieve stored refresh token.
 * Shows the biometric prompt (FaceID/TouchID) and returns the stored token on success.
 *
 * @returns Object with refreshToken on success, or error message on failure
 */
export async function authenticateWithBiometrics(): Promise<{
  refreshToken: string | null;
  error?: string;
  cancelled?: boolean;
}> {
  try {
    // Check if biometrics are available
    const available = await isBiometricAvailable();
    if (!available) {
      return { refreshToken: null, error: 'Biometric authentication is not available.' };
    }

    // Check if biometric login was enabled
    const isEnabled = await SecureStore.getItemAsync(BIOMETRIC_CREDENTIAL_KEY);
    if (isEnabled !== 'true') {
      return { refreshToken: null, error: 'Biometric login is not enabled.' };
    }

    // Get biometric type for prompt label
    const bioType = await getBiometricType();
    const promptMessage = bioType === 'faceId' ? 'Authenticate with Face ID' : 'Authenticate with Fingerprint';

    // Show biometric prompt
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage,
      fallbackLabel: 'Use Passcode',
      cancelLabel: 'Cancel',
      disableDeviceFallback: true, // Don't fall back to device passcode
    });

    if (result.success) {
      // Retrieve stored refresh token
      const refreshToken = await SecureStore.getItemAsync(BIOMETRIC_REFRESH_TOKEN_KEY);
      return { refreshToken };
    }

    if (result.error === 'user_cancel') {
      return { refreshToken: null, cancelled: true };
    }

    return {
      refreshToken: null,
      error: result.error === 'not_enrolled'
        ? 'No biometrics enrolled. Please set up Face ID or Fingerprint in Settings.'
        : 'Biometric authentication failed. Please try again or use your password.',
    };
  } catch {
    return {
      refreshToken: null,
      error: 'Biometric authentication encountered an error. Please try again.',
    };
  }
}

/**
 * Disable biometric login by removing stored credentials.
 * This deletes both the refresh token and the enabled flag from secure storage.
 */
export async function disableBiometricLogin(): Promise<{ success: boolean }> {
  try {
    await SecureStore.deleteItemAsync(BIOMETRIC_CREDENTIAL_KEY);
    await SecureStore.deleteItemAsync(BIOMETRIC_REFRESH_TOKEN_KEY);
    return { success: true };
  } catch {
    // If keys don't exist, that's fine
    return { success: true };
  }
}

/**
 * Check if biometric login is currently enabled for this user.
 */
export async function isBiometricLoginEnabled(): Promise<boolean> {
  try {
    const isEnabled = await SecureStore.getItemAsync(BIOMETRIC_CREDENTIAL_KEY);
    return isEnabled === 'true';
  } catch {
    return false;
  }
}

/**
 * Store refresh token for biometric use (called after successful email/password login).
 */
export async function storeBiometricToken(refreshToken: string): Promise<void> {
  await SecureStore.setItemAsync(BIOMETRIC_REFRESH_TOKEN_KEY, refreshToken);
  await SecureStore.setItemAsync(BIOMETRIC_CREDENTIAL_KEY, 'true');
}
