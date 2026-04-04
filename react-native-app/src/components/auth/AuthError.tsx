/**
 * AuthError Component - Inline error messages for auth forms.
 *
 * Per Color Guidelines: Error states use #FF3B30 (red).
 * Displays with an icon and message below form fields.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface AuthErrorProps {
  message: string | null;
}

export function AuthError({ message }: AuthErrorProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  if (!message) return null;

  return (
    <View style={[styles.container, { backgroundColor: '#FFF0F0', borderColor: colors.error }]}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={[styles.text, { color: colors.error }]} numberOfLines={3}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    gap: 8,
  },
  icon: {
    fontSize: 18,
    flexShrink: 0,
  },
  text: {
    fontSize: 14,
    flex: 1,
  },
});
