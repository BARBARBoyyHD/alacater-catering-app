import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/colors';
import { Provider as ProviderType } from '@/src/data/mockData';
import { PackageCard } from './PackageCard';

interface ProviderCardProps {
  provider: ProviderType;
  onProviderPress?: (id: string) => void;
  onPackagePress?: (id: string) => void;
}

export function ProviderCard({ provider, onProviderPress, onPackagePress }: ProviderCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.providerInfo}>
          <View style={styles.logo}>
            <Ionicons name="restaurant" size={24} color={Colors.textSecondary} />
          </View>
          <View>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{provider.name}</Text>
              {provider.verified && (
                <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
              )}
            </View>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color={Colors.warning} />
              <Text style={styles.rating}>
                {provider.rating} ({provider.reviews})
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => onProviderPress?.(provider.id)}>
          <Ionicons name="chevron-forward" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.packagesRow}
      >
        {provider.packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} onPress={onPackagePress} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginRight: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: Colors.textTertiary,
    marginLeft: 4,
  },
  packagesRow: {
    flexDirection: 'row',
    gap: 12,
  },
});
