import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/colors';

const TIMELINE = [
  { status: 'Paid', date: '18 Apr 2026, 10:00', completed: true },
  { status: 'Preparing', date: '18 Apr 2026, 11:30', completed: true },
  { status: 'Shipping', date: 'Expected today, 12:00', completed: false },
  { status: 'Delivered', date: '-', completed: false },
];

const SCHEDULE = [
  { day: 'Sen', date: '18', status: 'Delivered', menu: 'Ayam Penyet + Nasi Merah' },
  { day: 'Sel', date: '19', status: 'Upcoming', menu: 'Ikan Bakar + Sayur Asem' },
  { day: 'Rab', date: '20', status: 'Upcoming', menu: 'Daging Teriyaki + Salad' },
  { day: 'Kam', date: '21', status: 'Upcoming', menu: 'Gado-gado Spesial' },
  { day: 'Jum', date: '22', status: 'Upcoming', menu: 'Soto Ayam Madura' },
];

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [showSchedule, setShowSchedule] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Pesanan</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Order ID & Provider */}
        <View style={styles.section}>
          <View style={styles.idRow}>
            <Text style={styles.orderIdText}>Order ID: {id}</Text>
            <TouchableOpacity><Text style={styles.copyText}>Salin</Text></TouchableOpacity>
          </View>
          
          <View style={styles.providerCard}>
            <View style={styles.providerLogo}>
              <Ionicons name="restaurant" size={24} color={Colors.textSecondary} />
            </View>
            <View style={styles.providerInfo}>
              <Text style={styles.providerName}>Catering Kamu <Ionicons name="checkmark-circle" size={14} color={Colors.primary} /></Text>
              <Text style={styles.packageDetail}>Keto Diet — Premium (20 Hari)</Text>
            </View>
            <TouchableOpacity style={styles.chatButton}>
              <Ionicons name="chatbubble-ellipses-outline" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status Pesanan</Text>
          <View style={styles.timelineContainer}>
            {TIMELINE.map((item, index) => (
              <View key={item.status} style={styles.timelineItem}>
                <View style={styles.timelineLeading}>
                  <View style={[styles.timelineDot, item.completed ? styles.dotCompleted : styles.dotPending]} />
                  {index !== TIMELINE.length - 1 && <View style={[styles.timelineLine, item.completed ? styles.lineCompleted : styles.linePending]} />}
                </View>
                <View style={styles.timelineContent}>
                  <Text style={[styles.statusLabel, item.completed && styles.statusCompleted]}>{item.status}</Text>
                  <Text style={styles.statusTime}>{item.date}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Delivery Schedule */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.sectionHeaderRow} 
            onPress={() => setShowSchedule(!showSchedule)}
          >
            <Text style={styles.sectionTitle}>Jadwal Pengiriman</Text>
            <Ionicons name={showSchedule ? "chevron-up" : "chevron-down"} size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
          
          {showSchedule && (
            <View style={styles.scheduleContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {SCHEDULE.map((item) => (
                  <View key={item.date} style={styles.dayCard}>
                    <Text style={styles.dayName}>{item.day}</Text>
                    <View style={[styles.dateCircle, item.status === 'Delivered' && styles.dateCircleSuccess]}>
                      <Text style={[styles.dateNumber, item.status === 'Delivered' && styles.dateTextWhite]}>{item.date}</Text>
                    </View>
                    <Text style={styles.dayStatus} numberOfLines={1}>{item.status}</Text>
                  </View>
                ))}
              </ScrollView>
              
              <View style={styles.todayMenu}>
                <Text style={styles.menuLabel}>Menu Hari Ini (Siang & Malam):</Text>
                <Text style={styles.menuText}>{SCHEDULE[0].menu}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Additional Menu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Menu Tambahan</Text>
          <View style={styles.additionalItem}>
            <View style={styles.additionalDot} />
            <Text style={styles.additionalText}>Extra Sambal (Harian)</Text>
            <Text style={styles.additionalPrice}>Rp30.000</Text>
          </View>
        </View>

        {/* Order Modification Mock */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bantuan & Perubahan</Text>
          <TouchableOpacity style={styles.helpCard}>
            <Ionicons name="create-outline" size={20} color={Colors.textPrimary} />
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>Ubah Jadwal Pengiriman</Text>
              <Text style={styles.helpSubtitle}>Batas waktu H-1 pukul 20:00 WIB</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* Payment Detail */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rincian Pembayaran</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>Rp800.000</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Biaya Layanan</Text>
            <Text style={styles.priceValue}>Rp5.000</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Pembayaran</Text>
            <Text style={styles.totalValue}>Rp805.000</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.reviewButton} 
          onPress={() => router.push({ pathname: '/reviews/new', params: { orderId: id } })}
        >
          <Ionicons name="star-outline" size={20} color={Colors.white} />
          <Text style={styles.reviewButtonText}>Beri Ulasan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.merchantButton}>
          <Ionicons name="chatbubbles-outline" size={20} color={Colors.primary} />
          <Text style={styles.merchantButtonText}>Hubungi Merchant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  scrollContent: { paddingBottom: 100 },
  section: { padding: 20, backgroundColor: Colors.card, marginBottom: 10 },
  idRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  orderIdText: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  copyText: { fontSize: 13, color: Colors.primary, fontWeight: '700' },
  providerCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.background, padding: 15, borderRadius: 12 },
  providerLogo: { width: 44, height: 44, borderRadius: 10, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: Colors.borderLight },
  providerInfo: { flex: 1, marginLeft: 15 },
  providerName: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  packageDetail: { fontSize: 12, color: Colors.textSecondary },
  chatButton: { padding: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: 15 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timelineContainer: { marginLeft: 5 },
  timelineItem: { flexDirection: 'row', minHeight: 60 },
  timelineLeading: { alignItems: 'center', width: 20, marginRight: 15 },
  timelineDot: { width: 12, height: 12, borderRadius: 6, zIndex: 1 },
  dotCompleted: { backgroundColor: Colors.success },
  dotPending: { backgroundColor: Colors.borderMedium },
  timelineLine: { width: 2, flex: 1, marginVertical: -2 },
  lineCompleted: { backgroundColor: Colors.success },
  linePending: { backgroundColor: Colors.borderMedium },
  timelineContent: { flex: 1, paddingTop: -2 },
  statusLabel: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  statusCompleted: { color: Colors.textPrimary },
  statusTime: { fontSize: 12, color: Colors.textTertiary, marginTop: 4 },
  scheduleContainer: { marginTop: 10 },
  dayCard: { width: 60, alignItems: 'center', marginRight: 15 },
  dayName: { fontSize: 12, color: Colors.textSecondary, marginBottom: 8 },
  dateCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', marginBottom: 8, borderWidth: 1, borderColor: Colors.borderLight },
  dateCircleSuccess: { backgroundColor: Colors.success, borderColor: Colors.success },
  dateNumber: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  dateTextWhite: { color: Colors.white },
  dayStatus: { fontSize: 10, color: Colors.textTertiary },
  todayMenu: { marginTop: 20, backgroundColor: Colors.primaryLight, padding: 15, borderRadius: 10, borderWidth: 1, borderColor: Colors.primary },
  menuLabel: { fontSize: 12, fontWeight: '700', color: Colors.primary, marginBottom: 5 },
  menuText: { fontSize: 13, color: Colors.textPrimary, lineHeight: 18 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  priceLabel: { fontSize: 14, color: Colors.textSecondary },
  priceValue: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  totalRow: { marginTop: 10, paddingTop: 15, borderTopWidth: 1, borderTopColor: Colors.borderLight },
  totalLabel: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  totalValue: { fontSize: 16, fontWeight: '700', color: Colors.primary },
  additionalItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.background, padding: 12, borderRadius: 8 },
  additionalDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.primary, marginRight: 10 },
  additionalText: { flex: 1, fontSize: 14, color: Colors.textPrimary },
  additionalPrice: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  helpCard: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: Colors.borderLight },
  helpContent: { flex: 1, marginLeft: 15 },
  helpTitle: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  helpSubtitle: { fontSize: 12, color: Colors.textTertiary, marginTop: 2 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: Colors.card, borderTopWidth: 1, borderTopColor: Colors.borderLight, gap: 12 },
  reviewButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 8, backgroundColor: Colors.primary, gap: 10 },
  reviewButtonText: { fontSize: 15, fontWeight: '700', color: Colors.white },
  merchantButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 8, borderWidth: 1.5, borderColor: Colors.primary, gap: 10 },
  merchantButtonText: { fontSize: 15, fontWeight: '700', color: Colors.primary },
});
