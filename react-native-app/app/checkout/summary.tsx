import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/src/constants/colors';
import { useOrderStore } from '@/src/store/orderStore';

export default function CheckoutSummaryScreen() {
  const router = useRouter();
  const { orderDraft } = useOrderStore();

  const calculateSubtotal = () => {
    if (!orderDraft.package) return 0;
    
    let basePrice = orderDraft.package.price;
    
    // Adjust for meal plan
    if (orderDraft.mealPlan === 'Both') {
      basePrice = basePrice; // Base price is already for "Both" or we assume it's the package price
    } else {
      basePrice = basePrice * 0.6; // Assuming single meal is 60% of both
    }

    let total = basePrice * orderDraft.quantity * orderDraft.duration;

    // Apply duration discounts
    if (orderDraft.duration === 20) total *= 0.95;
    if (orderDraft.duration === 60) total *= 0.85;

    return total;
  };

  const formatPrice = (price: number) => {
    return `Rp${Math.round(price).toLocaleString('id-ID')}`;
  };

  const subtotal = calculateSubtotal();

  const getDeliverySchedule = () => {
    const start = new Date(orderDraft.startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + orderDraft.duration);

    return `${start.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ringkasan Pesanan</Text>
          <View style={styles.packageCard}>
            <Image source={{ uri: orderDraft.package?.image }} style={styles.packageImage} />
            <View style={styles.packageInfo}>
              <Text style={styles.packageName}>{orderDraft.package?.name}</Text>
              <Text style={styles.packageMeta}>{orderDraft.quantity} Paket • {orderDraft.duration} Hari</Text>
              <Text style={styles.packageMeta}>{orderDraft.mealPlan === 'Both' ? 'Siang & Malam' : orderDraft.mealPlan === 'Lunch' ? 'Siang' : 'Malam'}</Text>
            </View>
          </View>
        </View>

        {/* Delivery Schedule */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Jadwal Pengiriman</Text>
            <Ionicons name="time-outline" size={20} color={Colors.primary} />
          </View>
          <Text style={styles.scheduleText}>{getDeliverySchedule()}</Text>
          <Text style={styles.metaText}>Pengiriman setiap hari Senin - Jumat</Text>
        </View>

        {/* Payment Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rincian Pembayaran</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>{formatPrice(subtotal)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Biaya Layanan</Text>
            <Text style={styles.priceValue}>Rp5.000</Text>
          </View>
          <View style={[styles.priceRow, { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: Colors.borderLight }]}>
            <Text style={styles.totalLabel}>Total Pembayaran</Text>
            <Text style={styles.totalValue}>{formatPrice(subtotal + 5000)}</Text>
          </View>
        </View>

        {/* Payment Method Stub */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
          <TouchableOpacity style={styles.paymentSelector} onPress={() => router.push('/checkout/payment')}>
            <View style={styles.paymentMethod}>
              <Ionicons name="wallet-outline" size={24} color={Colors.primary} />
              <Text style={styles.paymentMethodText}>Pilih Metode Pembayaran</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerInfo}>
          <Text style={styles.footerLabel}>Total</Text>
          <Text style={styles.footerPrice}>{formatPrice(subtotal + 5000)}</Text>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={() => router.push('/checkout/payment')}>
          <Text style={styles.submitButtonText}>Lanjut ke Pembayaran</Text>
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
  scrollContent: { paddingBottom: 120 },
  section: { padding: 20, backgroundColor: Colors.card, marginBottom: 10 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginBottom: 15 },
  packageCard: { flexDirection: 'row', alignItems: 'center' },
  packageImage: { width: 80, height: 80, borderRadius: 8, marginRight: 15 },
  packageInfo: { flex: 1 },
  packageName: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: 5 },
  packageMeta: { fontSize: 14, color: Colors.textSecondary, marginBottom: 2 },
  scheduleText: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary, marginBottom: 5 },
  metaText: { fontSize: 13, color: Colors.textSecondary },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  priceLabel: { fontSize: 14, color: Colors.textSecondary },
  priceValue: { fontSize: 14, color: Colors.textPrimary, fontWeight: '500' },
  totalLabel: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  totalValue: { fontSize: 18, fontWeight: '700', color: Colors.primary },
  paymentSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.borderMedium,
    borderRadius: 8,
    backgroundColor: Colors.background,
  },
  paymentMethod: { flexDirection: 'row', alignItems: 'center' },
  paymentMethodText: { marginLeft: 12, fontSize: 14, fontWeight: '500', color: Colors.textPrimary },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerInfo: { flex: 1 },
  footerLabel: { fontSize: 12, color: Colors.textSecondary },
  footerPrice: { fontSize: 18, fontWeight: '700', color: Colors.primary },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: { color: Colors.white, fontWeight: '700', fontSize: 16 },
});
