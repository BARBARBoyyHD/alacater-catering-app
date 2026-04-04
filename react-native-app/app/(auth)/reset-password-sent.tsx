/**
 * Reset Password Sent Screen - Confirmation that reset email was sent.
 *
 * Displays a confirmation message and instructs the user to check their inbox.
 * Provides a "Back to Login" button to return to the login screen.
 *
 * Spec requirements: 8.4
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ResetPasswordSentScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📧</Text>
        </View>

        <Text style={[styles.title, { color: colors.text }]}>Check Your Inbox</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          We have sent you a password reset link.{'\n'}
          Please check your email and click the link to set a new password.
        </Text>

        {/* Tips */}
        <View style={styles.tipsContainer}>
          <Text style={[styles.tipsTitle, { color: colors.text }]}>Have not received it?</Text>
          <Text style={[styles.tipText, { color: colors.textSecondary }]}>
            - Check your spam or junk folder{'\n'}
            - Make sure you entered the correct email{'\n'}
            - Try requesting another reset link
          </Text>
        </View>

        {/* Back to Login Button */}
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: colors.primary }]}
          onPress={() => {
            // Navigate back to login (replace entire auth stack)
            router.replace('/(auth)/login');
          }}
          activeOpacity={0.8}
          testID="back-to-login-button"
        >
          <Text style={[styles.primaryButtonText, { color: colors.onPrimary }]}>
            Back to Login
          </Text>
        </TouchableOpacity>

        {/* Resend Link */}
        <TouchableOpacity
          style={styles.resendLink}
          onPress={() => router.back()}
        >
          <Text style={[styles.resendLinkText, { color: colors.primary }]}>
            Try another email
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
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
    marginBottom: 32,
    textAlign: 'center',
  },
  tipsContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    width: '100%',
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  tipText: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
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
  resendLink: {
    marginTop: 16,
  },
  resendLinkText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
