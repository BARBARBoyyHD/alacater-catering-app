import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/colors';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
  color?: string;
  maxStars?: number;
}

export function StarRating({
  rating,
  onRatingChange,
  size = 24,
  color = Colors.warning,
  maxStars = 5,
}: StarRatingProps) {
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    const name = i <= rating ? 'star' : 'star-outline';
    
    if (onRatingChange) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => onRatingChange(i)}>
          <Ionicons name={name} size={size} color={color} style={styles.star} />
        </TouchableOpacity>
      );
    } else {
      stars.push(
        <Ionicons key={i} name={name} size={size} color={color} style={styles.star} />
      );
    }
  }

  return <View style={styles.container}>{stars}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 4,
  },
});
