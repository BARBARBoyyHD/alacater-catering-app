import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/src/constants/colors';
import { Package } from '@/src/data/mockData';

interface PackageCardProps {
  pkg: Package;
  onPress?: (id: string) => void;
}

export function PackageCard({ pkg, onPress }: PackageCardProps) {
  const router = useRouter();
  const formatPrice = (price: number) => {
    return `Rp${price.toLocaleString('id-ID')}`;
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push('/product-detail')}
      activeOpacity={0.8}
    >
      <Image source={{ uri: pkg.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {pkg.name}
        </Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color={Colors.warning} />
          <Text style={styles.rating}>
            {pkg.rating} ({pkg.reviews})
          </Text>
        </View>
        <Text style={styles.priceLabel}>Mulai dari</Text>
        <Text style={styles.price}>{formatPrice(pkg.price)}</Text>
        <View style={styles.tagsRow}>
          {pkg.tags.map((tag) => (
            <View key={tag} style={styles.tagChip}>
              <Text style={styles.tagText}>
                {tag} {tag === 'Vegan' ? '🌱' : '✓'}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 32 - 32 - 12) / 2;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    overflow: 'hidden',
    width: cardWidth,
  },
  image: {
    width: '100%',
    height: 120,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: Colors.textTertiary,
    marginLeft: 4,
  },
  priceLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  tagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  tagText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
