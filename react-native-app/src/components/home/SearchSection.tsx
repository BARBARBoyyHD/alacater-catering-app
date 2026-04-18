import React from 'react';
import { View, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FilterChip } from '@/src/components/common/FilterChip';
import { Colors } from '@/src/constants/colors';
import { FilterOption } from '@/src/data/mockData';

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  filters: FilterOption[];
  onFilterToggle: (id: string) => void;
}

export function SearchSection({ searchQuery, onSearchChange, filters, onFilterToggle }: SearchSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={Colors.textTertiary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari catering..."
          placeholderTextColor={Colors.textTertiary}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {filters.map((filter) => (
          <FilterChip
            key={filter.id}
            label={filter.label}
            active={filter.active}
            dropdown={filter.dropdown}
            onPress={() => onFilterToggle(filter.id)}
          />
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
});
