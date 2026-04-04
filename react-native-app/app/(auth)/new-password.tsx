/**
 * New Password Screen - Set new password after clicking reset link.
 *
 * Features:
 * - New password + confirm password form with resetPasswordSchema validation
 * - Wired to useUpdatePassword mutation hook
 * - Handles deep link with recovery token from Supabase (auto-detected by Supabase client)
 * - Color Guidelines: Primary Orange for CTA, error states in #FF3B30
 *
 * Spec requirements: 8.5-8.7
 */
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { supabase } from '@/src/config/supabase';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/src/hooks/useAuth';
import { resetPasswordSchema, type ResetPasswordFormData } from '@/src/utils/validation';
import { AuthError } from '@/src/components/auth/AuthError';
import { LoadingOverlay } from '@/src/components/auth/LoadingOverlay';

export default function NewPasswordScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { uiState, mutations } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Handle deep link: Supabase auto-detects recovery token from URL
  // When user clicks reset link in email, Supabase session enters recovery mode
  // We just need to call updateUser with the new password
  useEffect(() => {
    // Check if we're in a recovery session (from password reset link)
    const checkRecoverySession = async () => {
      const { data } = await supabase.auth.getSession();
      // If no session exists, the reset link may have expired
      if (!data.session) {
        Alert.alert(
          'Invalid or Expired Link',
          'This password reset link has expired or is invalid. Please request a new one.',
          [{ text: 'OK', onPress: () => router.replace('/(auth)/forgot-password') }],
        );
      }
    };

    checkRecoverySession();
  }, []);

  const onSubmit = (data: ResetPasswordFormData) => {
    mutations.updatePassword.mutate({ password: data.password });
  };

  const isSubmitting = mutations.updatePassword.isPending;

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={styles.content}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🔒</Text>
        </View>

        <Text style={[styles.title, { color: colors.text }]}>Set New Password</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Create a strong password for your account
        </Text>

        <AuthError message={uiState.error} />

        {/* New Password Field */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>New Password</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: errors.password ? colors.inputBorderError : colors.inputBorder,
                    color: colors.text,
                  },
                ]}
                placeholder="At least 6 characters"
                placeholderTextColor={colors.textTertiary}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                secureTextEntry
                editable={!isSubmitting}
                testID="new-password-input"
              />
              {errors.password && (
                <Text style={[styles.errorText, { color: colors.error }]}>
                  {errors.password.message}
                </Text>
              )}
            </View>
          )}
        />

        {/* Confirm Password Field */}
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Confirm Password
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: errors.confirmPassword
                      ? colors.inputBorderError
                      : colors.inputBorder,
                    color: colors.text,
                  },
                ]}
                placeholder="Re-enter your new password"
                placeholderTextColor={colors.textTertiary}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                secureTextEntry
                editable={!isSubmitting}
                testID="confirm-password-input"
              />
              {errors.confirmPassword && (
                <Text style={[styles.errorText, { color: colors.error }]}>
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>
          )}
        />

        {/* Update Password Button */}
        <TouchableOpacity
          style={[
            styles.primaryButton,
            { backgroundColor: colors.primary, opacity: isSubmitting ? 0.7 : 1 },
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          activeOpacity={0.8}
          testID="update-password-button"
        >
          <Text style={[styles.primaryButtonText, { color: colors.onPrimary }]}>
            Update Password
          </Text>
        </TouchableOpacity>

        {/* Back to Login */}
        <TouchableOpacity
          style={styles.backLink}
          onPress={() => router.replace('/(auth)/login')}
          disabled={isSubmitting}
        >
          <Text style={[styles.backLinkText, { color: colors.primary }]}>
            ← Back to Login
          </Text>
        </TouchableOpacity>
      </View>

      <LoadingOverlay visible={isSubmitting} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF5EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  backLink: {
    marginTop: 24,
  },
  backLinkText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
