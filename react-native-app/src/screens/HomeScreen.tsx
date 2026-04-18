import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/src/components/home/Header';
import { SearchSection } from '@/src/components/home/SearchSection';
import { ProviderCard } from '@/src/components/home/ProviderCard';
import { PromoBannerCarousel } from '@/src/components/common/PromoBanner';
import { Colors } from '@/src/constants/colors';
import {
  cateringData,
  filterOptions,
  promoBanners,
  locations,
} from '@/src/data/mockData';
import type { FilterOption } from '@/src/data/mockData';

export default function HomeScreen() {
  const [location, setLocation] = useState(locations[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOption[]>(filterOptions);

  const handleLocationPress = () => {
    // TODO: Open location selector modal
    const nextIndex = (locations.indexOf(location) + 1) % locations.length;
    setLocation(locations[nextIndex]);
  };

  const handleFilterToggle = (id: string) => {
    setFilters((prev) =>
      prev.map((f) => (f.id === id ? { ...f, active: !f.active } : f))
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        location={location}
        onLocationPress={handleLocationPress}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Promo Banner Carousel */}
        <PromoBannerCarousel banners={promoBanners} />

        {/* Search and Filters */}
        <SearchSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onFilterToggle={handleFilterToggle}
        />

        {/* Recommendations Title */}
        <View style={styles.recommendationsSection}>
          <Text style={styles.recommendationsTitle}>
            Rekomendasi catering
          </Text>
          <Text style={styles.recommendationsSubtitle}>di areamu 👍</Text>
        </View>

        {/* Provider Sections */}
        {cateringData.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  recommendationsSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  recommendationsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  recommendationsSubtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginTop: 4,
  },
});
