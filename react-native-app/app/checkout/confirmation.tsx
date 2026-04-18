import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/src/constants/colors';
import { useOrderStore } from '@/src/store/orderStore';

export default function OrderConfirmationScreen() {
  const router = useRouter();
  const { resetOrder } = useOrderStore();

  useEffect(() => {
    // We can clear the order draft once it's confirmed
    // resetOrder(); // Keeping it for now to show summary in confirmation if needed, but normally we reset
  }, []);

  const handleCheckStatus = () => {
    resetOrder();
    router.dismissAll();
    router.replace('/(tabs)/orders');
  };

  const handleFinish = () => {
    resetOrder();
    router.dismissAll();
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIconContainer}>
          <Ionicons name="checkmark-circle" size={100} color={Colors.success} />
        </View>
        <Text style={styles.title}>Pembayaran Berhasil!</Text>
        <Text style={styles.subtitle}>Pesanan Anda sedang diproses oleh merchant.</Text>
        
        <View style={styles.orderInfoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Order ID</Text>
            <Text style={styles.infoValue}>#ALC-982310</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Waktu</Text>
            <Text style={styles.infoValue}>{new Date().toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleCheckStatus}>
          <Text style={styles.secondaryButtonText}>Cek Status Pesanan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} onPress={handleFinish}>
          <Text style={styles.primaryButtonText}>Kembali ke Beranda</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.card },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  successIconContainer: { marginBottom: 30 },
  title: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary, marginBottom: 10 },
  subtitle: { fontSize: 16, color: Colors.textSecondary, textAlign: 'center', marginBottom: 40 },
  orderInfoCard: {
    width: '100%',
    padding: 20,
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  infoLabel: { fontSize: 14, color: Colors.textSecondary },
  infoValue: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  footer: { padding: 20, gap: 12 },
  primaryButton: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: { color: Colors.white, fontWeight: '700', fontSize: 16 },
  secondaryButton: {
    backgroundColor: Colors.white,
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  secondaryButtonText: { color: Colors.primary, fontWeight: '700', fontSize: 16 },
});
