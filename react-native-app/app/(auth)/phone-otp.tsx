/**
 * Phone OTP Input Screen - Phone number entry + OTP verification.
 *
 * Features:
 * - Phone number input with +62 country code validation
 * - 6-digit OTP input with auto-advance between digits
 * - 5:00 countdown timer for OTP expiry
 * - Resend OTP button with 30-second cooldown
 * - Wired to useSendPhoneOtp and useVerifyPhoneOtp mutation hooks
 * - Color Guidelines: Primary Orange (#FF7B00) for CTAs
 *
 * Spec requirements:
 * - MOB-2.4: Phone OTP authentication
 * - 7.4-7.9: Screen creation, phone validation, OTP input, timer, resend, mutation wiring
 */
import React, { useState, useRef, useEffect, useCallback } from 'react';
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
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/src/hooks/useAuth';
import { phoneOtpSchema, type PhoneOtpFormData } from '@/src/utils/validation';
import { AuthError } from '@/src/components/auth/AuthError';
import { LoadingOverlay } from '@/src/components/auth/LoadingOverlay';

const OTP_LENGTH = 6;
const OTP_EXPIRY_SECONDS = 300; // 5:00
const RESEND_COOLDOWN = 30; // seconds

type ScreenMode = 'phone' | 'otp';

export default function PhoneOTPInputScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { uiState, mutations } = useAuth();

  const [mode, setMode] = useState<ScreenMode>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [countdown, setCountdown] = useState(OTP_EXPIRY_SECONDS);
  const [resendCooldown, setResendCooldown] = useState(0);

  const otpRefs = useRef<(TextInput | null)[]>([]);

  // Countdown timer for OTP expiry
  useEffect(() => {
    if (mode !== 'otp' || countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, countdown]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Phone form validation
  const {
    control: phoneControl,
    handleSubmit: handlePhoneSubmit,
    formState: { errors: phoneErrors },
  } = useForm<PhoneOtpFormData>({
    resolver: zodResolver(phoneOtpSchema),
    mode: 'onBlur',
    defaultValues: { phone: '' },
  });

  // Handle sending OTP to phone
  const onPhoneSubmit = (data: PhoneOtpFormData) => {
    setPhoneNumber(data.phone);
    mutations.sendPhoneOtp.mutate(
      { phone: data.phone },
      {
        onSuccess: () => {
          setMode('otp');
          setCountdown(OTP_EXPIRY_SECONDS);
          setResendCooldown(RESEND_COOLDOWN);
        },
      },
    );
  };

  // Handle OTP verification
  const handleVerifyOTP = useCallback(() => {
    const code = otpCode.join('');
    if (code.length !== OTP_LENGTH) return;

    mutations.verifyPhoneOtp.mutate({
      phone: phoneNumber,
      token: code,
    });
  }, [otpCode, phoneNumber, mutations.verifyPhoneOtp]);

  // Handle OTP input change with auto-advance
  const handleOTPChange = (value: string, index: number) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto-advance to next field
    if (value && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits entered
    if (value && index === OTP_LENGTH - 1 && newOtp.every((d) => d !== '')) {
      // Small delay to let state update
      setTimeout(() => handleVerifyOTP(), 100);
    }
  };

  // Handle OTP input key events (backspace goes to previous field)
  const handleOTPKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otpCode[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
      const newOtp = [...otpCode];
      newOtp[index - 1] = '';
      setOtpCode(newOtp);
    }
  };

  // Handle resend OTP
  const handleResendOTP = () => {
    if (resendCooldown > 0) return;

    mutations.sendPhoneOtp.mutate(
      { phone: phoneNumber },
      {
        onSuccess: () => {
          setCountdown(OTP_EXPIRY_SECONDS);
          setResendCooldown(RESEND_COOLDOWN);
          setOtpCode(Array(OTP_LENGTH).fill(''));
          otpRefs.current[0]?.focus();
        },
      },
    );
  };

  // Handle back to phone input
  const handleBackToPhone = () => {
    setMode('phone');
    setOtpCode(Array(OTP_LENGTH).fill(''));
  };

  const isSubmitting =
    mutations.sendPhoneOtp.isPending || mutations.verifyPhoneOtp.isPending;
  const isOTPComplete = otpCode.every((d) => d !== '');

  // ==================== PHONE INPUT MODE ====================
  if (mode === 'phone') {
    return (
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: colors.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>Phone Verification</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Enter your phone number to receive a verification code via SMS
          </Text>

          <AuthError message={uiState.error} />

          <Controller
            control={phoneControl}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  Phone Number
                </Text>
                <View style={styles.phoneInputRow}>
                  <View style={[styles.countryCode, { borderColor: colors.border }]}>
                    <Text style={[styles.countryCodeText, { color: colors.text }]}>+62</Text>
                  </View>
                  <TextInput
                    style={[
                      styles.phoneInput,
                      {
                        backgroundColor: colors.inputBackground,
                        borderColor: phoneErrors.phone ? colors.inputBorderError : colors.inputBorder,
                        color: colors.text,
                      },
                    ]}
                    placeholder="81234567890"
                    placeholderTextColor={colors.textTertiary}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value.replace('+62', '')}
                    keyboardType="phone-pad"
                    editable={!isSubmitting}
                    testID="phone-input"
                  />
                </View>
                {phoneErrors.phone && (
                  <Text style={[styles.errorText, { color: colors.error }]}>
                    {phoneErrors.phone.message}
                  </Text>
                )}
              </View>
            )}
          />

          <TouchableOpacity
            style={[
              styles.primaryButton,
              { backgroundColor: colors.primary, opacity: isSubmitting ? 0.7 : 1 },
            ]}
            onPress={handlePhoneSubmit(onPhoneSubmit)}
            disabled={isSubmitting}
            activeOpacity={0.8}
            testID="send-otp-button"
          >
            <Text style={[styles.primaryButtonText, { color: colors.onPrimary }]}>
              Send OTP
            </Text>
          </TouchableOpacity>

          {/* Back link */}
          <TouchableOpacity
            style={styles.backLink}
            onPress={() => {}} // Expo Router handles back via header
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

  // ==================== OTP INPUT MODE ====================
  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Enter Verification Code</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          We sent a 6-digit code to {phoneNumber}
        </Text>

        <AuthError message={uiState.error} />

        {/* OTP Input Fields */}
        <View style={styles.otpContainer}>
          {Array.from({ length: OTP_LENGTH }).map((_, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                otpRefs.current[index] = ref;
              }}
              style={[
                styles.otpInput,
                {
                  backgroundColor: colors.inputBackground,
                  borderColor: colors.primary,
                  color: colors.text,
                },
              ]}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(value) => handleOTPChange(value, index)}
              onKeyPress={(e) => handleOTPKeyPress(e, index)}
              value={otpCode[index]}
              selectTextOnFocus
              autoFocus={index === 0}
              editable={!isSubmitting}
              testID={`otp-input-${index}`}
            />
          ))}
        </View>

        {/* Timer */}
        <Text style={[styles.timerText, { color: countdown > 0 ? colors.textTertiary : colors.error }]}>
          {countdown > 0
            ? `Code expires in ${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, '0')}`
            : 'Code expired'}
        </Text>

        {/* Verify Button */}
        <TouchableOpacity
          style={[
            styles.primaryButton,
            {
              backgroundColor: colors.primary,
              opacity: isSubmitting || !isOTPComplete || countdown === 0 ? 0.7 : 1,
            },
          ]}
          onPress={handleVerifyOTP}
          disabled={isSubmitting || !isOTPComplete || countdown === 0}
          activeOpacity={0.8}
          testID="verify-otp-button"
        >
          <Text style={[styles.primaryButtonText, { color: colors.onPrimary }]}>
            Verify
          </Text>
        </TouchableOpacity>

        {/* Resend OTP */}
        <View style={styles.resendContainer}>
          <Text style={[styles.resendText, { color: colors.textSecondary }]}>
            Have not received code?{' '}
          </Text>
          {resendCooldown > 0 ? (
            <Text style={[styles.resendCooldown, { color: colors.textTertiary }]}>
              Resend in {resendCooldown}s
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResendOTP} disabled={isSubmitting}>
              <Text style={[styles.resendLink, { color: colors.primary }]}>
                Resend OTP
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Change phone number link */}
        <TouchableOpacity style={styles.backLink} onPress={handleBackToPhone}>
          <Text style={[styles.backLinkText, { color: colors.primary }]}>
            ← Change phone number
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
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  countryCode: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    minWidth: 60,
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
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
    alignSelf: 'flex-start',
  },
  backLinkText: {
    fontSize: 14,
    fontWeight: '600',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 16,
    width: '100%',
  },
  otpInput: {
    width: 48,
    height: 56,
    borderWidth: 2,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
  },
  timerText: {
    fontSize: 14,
    marginBottom: 24,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    fontSize: 14,
  },
  resendCooldown: {
    fontSize: 14,
    fontWeight: '500',
  },
  resendLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
