/**
 * Forgot Password Screen - Email-based password reset request.
 *
 * Features:
 * - Email input form with forgotPasswordSchema validation
 * - Submits to sendPasswordResetEmail service
 * - Navigates to confirmation screen on submit
 * - Color Guidelines: Primary Orange for CTA, error states in #FF3B30
 *
 * Spec requirements: 8.1-8.3
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/src/hooks/useAuth';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/src/utils/validation';
import { AuthError } from '@/src/components/auth/AuthError';
import { LoadingOverlay } from '@/src/components/auth/LoadingOverlay';

export default function ForgotPasswordScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { uiState, mutations } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
    defaultValues: { email: '' },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    mutations.sendPasswordReset.mutate(data, {
      onSuccess: () => {
        // Always navigate to confirmation (prevents email enumeration)
        router.push('/(auth)/reset-password-sent');
      },
    });
  };

  const isSubmitting = mutations.sendPasswordReset.isPending;

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={styles.content}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🔑</Text>
        </View>

        <Text style={[styles.title, { color: colors.text }]}>Forgot Password?</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Enter your email and we will send you a link to reset your password
        </Text>

        <AuthError message={uiState.error} />

        {/* Email Field */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: errors.email ? colors.inputBorderError : colors.inputBorder,
                    color: colors.text,
                  },
                ]}
                placeholder="your@email.com"
                placeholderTextColor={colors.textTertiary}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!isSubmitting}
                testID="email-input"
              />
              {errors.email && (
                <Text style={[styles.errorText, { color: colors.error }]}>
                  {errors.email.message}
                </Text>
              )}
            </View>
          )}
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.primaryButton,
            { backgroundColor: colors.primary, opacity: isSubmitting ? 0.7 : 1 },
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          activeOpacity={0.8}
          testID="send-reset-link-button"
        >
          <Text style={[styles.primaryButtonText, { color: colors.onPrimary }]}>
            Send Reset Link
          </Text>
        </TouchableOpacity>

        {/* Back to login */}
        <TouchableOpacity
          style={styles.backLink}
          onPress={() => router.back()}
          disabled={isSubmitting}
        >
          <Text style={[styles.backLinkText, { color: colors.primary }]}>
            ← Back to login
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
    paddingTop: 60,
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
    marginBottom: 24,
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
