import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/colors';

interface FilterChipProps {
  label: string;
  active: boolean;
  dropdown?: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export function FilterChip({ label, active, dropdown, onPress, style }: FilterChipProps) {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        active && styles.chipActive,
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.chipText,
          active && styles.chipTextActive,
        ]}
      >
        {label}
      </Text>
      {dropdown && (
        <Ionicons name="chevron-down" size={16} color={active ? Colors.card : Colors.textSecondary} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: 4,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  chipTextActive: {
    color: Colors.card,
    fontWeight: '500',
  },
});
