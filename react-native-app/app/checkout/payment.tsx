import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/src/constants/colors';

type PaymentMethod = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export default function PaymentScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<string>('va');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    { id: 'va', name: 'Virtual Account (Bank Transfer)', icon: 'business-outline' },
    { id: 'gopay', name: 'GoPay / E-Wallet', icon: 'wallet-outline' },
    { id: 'cc', name: 'Kartu Kredit / Debit', icon: 'card-outline' },
  ];

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      router.push('/checkout/confirmation');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Metode Pembayaran</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pilih Metode Pembayaran</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodCard,
                selectedMethod === method.id && styles.selectedMethodCard,
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <View style={styles.methodInfo}>
                <Ionicons name={method.icon} size={24} color={selectedMethod === method.id ? Colors.primary : Colors.textSecondary} />
                <Text style={[styles.methodName, selectedMethod === method.id && styles.selectedMethodName]}>{method.name}</Text>
              </View>
              {selectedMethod === method.id && (
                <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="shield-checkmark-outline" size={20} color={Colors.success} />
          <Text style={styles.infoText}>Pembayaran Anda diamankan dengan enkripsi 256-bit.</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.submitButton, isProcessing && styles.disabledButton]} 
          onPress={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.submitButtonText}>Bayar Sekarang</Text>
          )}
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
  sectionTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginBottom: 15 },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.borderMedium,
    borderRadius: 12,
    backgroundColor: Colors.background,
    marginBottom: 12,
  },
  selectedMethodCard: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  methodInfo: { flexDirection: 'row', alignItems: 'center' },
  methodName: { marginLeft: 15, fontSize: 15, fontWeight: '500', color: Colors.textSecondary },
  selectedMethodName: { color: Colors.textPrimary, fontWeight: '700' },
  infoBox: { flexDirection: 'row', padding: 20, alignItems: 'center' },
  infoText: { marginLeft: 10, fontSize: 12, color: Colors.textSecondary, flex: 1 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
  },
  disabledButton: { backgroundColor: Colors.disabled },
  submitButtonText: { color: Colors.white, fontWeight: '700', fontSize: 16 },
});
