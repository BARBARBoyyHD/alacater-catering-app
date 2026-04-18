import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/src/constants/colors';
import { ReviewCard } from '@/src/components/common/ReviewCard';

const MOCK_REVIEWS = [
  {
    id: '1',
    userName: 'Andi Saputra',
    rating: 5,
    date: '15 Apr 2026',
    comment: 'Makanannya enak sekali! Porsinya pas untuk makan siang. Pengiriman juga tepat waktu.',
    helpfulCount: 12,
    images: ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200'],
  },
  {
    id: '2',
    userName: 'Budi Raharjo',
    rating: 4,
    date: '12 Apr 2026',
    comment: 'Kualitas bahan sangat bagus. Sayurnya segar-segar. Sayang sambalnya kurang pedas buat saya.',
    helpfulCount: 5,
  },
  {
    id: '3',
    userName: 'Citra Lestari',
    rating: 5,
    date: '08 Apr 2026',
    comment: 'Sangat recommended untuk yang lagi program diet. Menu variatif setiap hari.',
    helpfulCount: 8,
  },
];

export default function ReviewListScreen() {
  const router = useRouter();
  const { productId } = useLocalSearchParams();
  const [filter, setFilter] = useState('Semua');
  const [reviews, setReviews] = useState(MOCK_REVIEWS);

  const handleHelpfulPress = (id: string) => {
    setReviews(prev => prev.map(r => {
      if (r.id === id) {
        const isHelpful = !(r as any).isHelpful;
        return {
          ...r,
          isHelpful,
          helpfulCount: isHelpful ? r.helpfulCount + 1 : r.helpfulCount - 1
        };
      }
      return r;
    }));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Semua Ulasan</Text>
      </View>

      <View style={styles.summarySection}>
        <View style={styles.ratingInfo}>
          <Text style={styles.averageRating}>4.8</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map(s => (
              <Ionicons key={s} name="star" size={16} color={Colors.warning} />
            ))}
          </View>
          <Text style={styles.totalReviews}>Dari 128 ulasan</Text>
        </View>
        <View style={styles.ratingBars}>
          {[5, 4, 3, 2, 1].map(r => (
            <View key={r} style={styles.ratingBarRow}>
              <Text style={styles.barLabel}>{r}</Text>
              <View style={styles.barBackground}>
                <View style={[styles.barFill, { width: `${r * 15 + 20}%` }]} />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.filterBar}>
        {['Semua', 'Dengan Foto', 'Rating 5', 'Rating 4'].map(f => (
          <TouchableOpacity 
            key={f} 
            style={[styles.filterChip, filter === f && styles.activeFilterChip]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.activeFilterText]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <ReviewCard
            userName={item.userName}
            rating={item.rating}
            date={item.date}
            comment={item.comment}
            images={item.images}
            helpfulCount={item.helpfulCount}
            isHelpful={(item as any).isHelpful}
            onHelpfulPress={() => handleHelpfulPress(item.id)}
            onEditPress={item.userName === 'Andi Saputra' ? () => router.push({ pathname: '/reviews/new', params: { editId: item.id } }) : undefined}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  summarySection: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: Colors.card,
    alignItems: 'center',
    marginBottom: 1,
  },
  ratingInfo: { alignItems: 'center', paddingRight: 20, borderRightWidth: 1, borderRightColor: Colors.borderLight },
  averageRating: { fontSize: 32, fontWeight: '800', color: Colors.textPrimary },
  starsRow: { flexDirection: 'row', marginVertical: 4 },
  totalReviews: { fontSize: 11, color: Colors.textSecondary },
  ratingBars: { flex: 1, marginLeft: 20, gap: 4 },
  ratingBarRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  barLabel: { fontSize: 11, color: Colors.textSecondary, width: 10 },
  barBackground: { flex: 1, height: 6, backgroundColor: Colors.background, borderRadius: 3, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: Colors.warning },
  filterBar: { flexDirection: 'row', padding: 15, backgroundColor: Colors.card, gap: 10 },
  filterChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.borderLight },
  activeFilterChip: { backgroundColor: Colors.primaryLight, borderColor: Colors.primary },
  filterText: { fontSize: 12, color: Colors.textSecondary },
  activeFilterText: { color: Colors.primary, fontWeight: '600' },
  listContent: { padding: 15 },
});
