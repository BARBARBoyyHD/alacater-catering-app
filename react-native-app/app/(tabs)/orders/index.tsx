import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/src/constants/colors';

const MOCK_ORDERS = [
  {
    id: 'ALA-982310',
    providerName: 'Catering Kamu',
    packageName: 'Keto Diet — Premium',
    price: 805000,
    status: 'Aktif',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    date: '18 Apr 2026',
  },
  {
    id: 'ALA-982309',
    providerName: 'Diet Sehat Studio',
    packageName: 'Balanced Meals',
    price: 655000,
    status: 'Selesai',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
    date: '10 Apr 2026',
  },
];

export default function OrderListScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState('Semua');

  const renderOrderItem = ({ item }: { item: typeof MOCK_ORDERS[0] }) => (
    <TouchableOpacity 
      style={styles.orderCard} 
      onPress={() => router.push({ pathname: '/order-detail/[id]', params: { id: item.id } })}
    >
      <View style={styles.cardHeader}>
        <View style={styles.providerInfo}>
          <Ionicons name="restaurant-outline" size={16} color={Colors.textSecondary} />
          <Text style={styles.providerName}>{item.providerName}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'Aktif' ? Colors.primaryLight : Colors.background }]}>
          <Text style={[styles.statusText, { color: item.status === 'Aktif' ? Colors.primary : Colors.textSecondary }]}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <Image source={{ uri: item.image }} style={styles.packageImage} />
        <View style={styles.packageInfo}>
          <Text style={styles.packageName}>{item.packageName}</Text>
          <Text style={styles.orderDate}>{item.date}</Text>
          <Text style={styles.orderPrice}>Rp{item.price.toLocaleString('id-ID')}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.orderId}>ID: {item.id}</Text>
        <TouchableOpacity style={styles.detailButton} onPress={() => router.push({ pathname: '/order-detail/[id]', params: { id: item.id } })}>
          <Text style={styles.detailButtonText}>Lihat Detail</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pesanan Saya</Text>
      </View>

      <View style={styles.filterBar}>
        {['Semua', 'Aktif', 'Selesai'].map((f) => (
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
        data={filter === 'Semua' ? MOCK_ORDERS : MOCK_ORDERS.filter(o => o.status === filter)}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={64} color={Colors.textTertiary} />
            <Text style={styles.emptyText}>Belum ada pesanan {filter !== 'Semua' ? filter : ''}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { padding: 20, backgroundColor: Colors.card, borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  headerTitle: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary },
  filterBar: { flexDirection: 'row', padding: 15, backgroundColor: Colors.card, gap: 10 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.borderLight },
  activeFilterChip: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterText: { fontSize: 14, color: Colors.textSecondary, fontWeight: '500' },
  activeFilterText: { color: Colors.white, fontWeight: '700' },
  listContent: { padding: 15, paddingBottom: 100 },
  orderCard: { backgroundColor: Colors.card, borderRadius: 12, padding: 15, marginBottom: 15, borderWidth: 1, borderColor: Colors.borderLight },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  providerInfo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  providerName: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  statusText: { fontSize: 12, fontWeight: '700' },
  cardContent: { flexDirection: 'row', gap: 15, marginBottom: 15 },
  packageImage: { width: 70, height: 70, borderRadius: 8 },
  packageInfo: { flex: 1, justifyContent: 'center' },
  packageName: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  orderDate: { fontSize: 13, color: Colors.textSecondary, marginBottom: 4 },
  orderPrice: { fontSize: 15, fontWeight: '700', color: Colors.primary },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderId: { fontSize: 12, color: Colors.textTertiary },
  detailButton: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, borderWidth: 1, borderColor: Colors.primary },
  detailButtonText: { fontSize: 13, fontWeight: '600', color: Colors.primary },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 },
  emptyText: { marginTop: 15, fontSize: 16, color: Colors.textSecondary },
});
