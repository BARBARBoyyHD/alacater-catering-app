/**
 * Signup Screen - Email/password registration with Google OAuth option.
 *
 * Features:
 * - Full name, email, password, confirm password form
 * - React Hook Form + Zod validation (signupSchema)
 * - Google Sign-In and Phone OTP alternatives
 * - Link to Log In screen
 * - Color Guidelines: Primary Orange (#FF7B00) for CTAs
 *
 * Spec requirements:
 * - MOB-2.1: Email/password signup screen
 * - 6.7-6.9: Form creation, RHF wiring, mutation submission
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/src/hooks/useAuth';
import { signupSchema, type SignupFormData } from '@/src/utils/validation';
import { AuthError } from '@/src/components/auth/AuthError';
import { LoadingOverlay } from '@/src/components/auth/LoadingOverlay';

export default function SignupScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { uiState, mutations } = useAuth();

  // React Hook Form setup with Zod validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Handle signup submission
  const onSubmit = (data: SignupFormData) => {
    mutations.signUp.mutate(data);
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = () => {
    mutations.googleLogin.mutate();
  };

  // Handle phone OTP navigation
  const handlePhoneSignIn = () => {
    router.push('/(auth)/phone-otp');
  };

  const isSubmitting =
    mutations.signUp.isPending || mutations.googleLogin.isPending;

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Sign up to discover and order amazing catering
        </Text>

        {/* Error Display */}
        <AuthError message={uiState.error} />

        {/* Form Fields */}
        <View style={styles.form}>
          {/* Full Name Field */}
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>Full Name</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.inputBackground,
                      borderColor: errors.fullName ? colors.inputBorderError : colors.inputBorder,
                      color: colors.text,
                    },
                  ]}
                  placeholder="John Doe"
                  placeholderTextColor={colors.textTertiary}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  autoCapitalize="words"
                  editable={!isSubmitting}
                  testID="fullname-input"
                />
                {errors.fullName && (
                  <Text style={[styles.errorText, { color: colors.error }]}>
                    {errors.fullName.message}
                  </Text>
                )}
              </View>
            )}
          />

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

          {/* Password Field */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>Password</Text>
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
                  testID="password-input"
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
                <Text style={[styles.label, { color: colors.textSecondary }]}>Confirm Password</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.inputBackground,
                      borderColor: errors.confirmPassword ? colors.inputBorderError : colors.inputBorder,
                      color: colors.text,
                    },
                  ]}
                  placeholder="Re-enter your password"
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

          {/* Sign Up Button */}
          <TouchableOpacity
            style={[
              styles.primaryButton,
              {
                backgroundColor: colors.primary,
                opacity: isSubmitting ? 0.7 : 1,
              },
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            activeOpacity={0.8}
            testID="signup-button"
          >
            <Text style={[styles.primaryButtonText, { color: colors.onPrimary }]}>
              Sign Up
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.textTertiary }]}>or continue with</Text>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          </View>

          {/* Google Sign-In Button */}
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={handleGoogleSignIn}
            disabled={isSubmitting}
            activeOpacity={0.8}
            testID="google-signin-button"
          >
            <Text style={styles.socialIcon}>🔵</Text>
            <Text style={[styles.socialButtonText, { color: colors.text }]}>
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* Phone OTP Button */}
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={handlePhoneSignIn}
            disabled={isSubmitting}
            activeOpacity={0.8}
            testID="phone-signin-button"
          >
            <Text style={styles.socialIcon}>📱</Text>
            <Text style={[styles.socialButtonText, { color: colors.text }]}>
              Continue with Phone
            </Text>
          </TouchableOpacity>

          {/* Log In Link */}
          <View style={styles.loginContainer}>
            <Text style={[styles.loginText, { color: colors.textSecondary }]}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/(auth)/login')}
              disabled={isSubmitting}
            >
              <Text style={[styles.loginLink, { color: colors.primary }]}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Loading Overlay */}
      <LoadingOverlay visible={isSubmitting} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  form: {
    gap: 4,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 13,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    marginBottom: 12,
  },
  socialIcon: {
    fontSize: 20,
  },
  socialButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
