import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '@/src/constants/colors';
import { useOrderStore, MealPlan, Duration } from '@/src/store/orderStore';

export default function ProductOrderScreen() {
  const router = useRouter();
  const { orderDraft, setQuantity, setStartDate, setDuration, setMealPlan, setNotes } = useOrderStore();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || orderDraft.startDate;
    setShowDatePicker(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const incrementQuantity = () => setQuantity(orderDraft.quantity + 1);
  const decrementQuantity = () => {
    if (orderDraft.quantity > 1) setQuantity(orderDraft.quantity - 1);
  };

  const durations: Duration[] = [5, 10, 20, 60];
  const mealPlans: MealPlan[] = ['Lunch', 'Dinner', 'Both'];

  const getSavingsLabel = (duration: Duration) => {
    if (duration === 20) return 'Hemat 5%';
    if (duration === 60) return 'Hemat 15%';
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Konfigurasi Pesanan</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 2.2 Quantity Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Jumlah Paket</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decrementQuantity} style={styles.stepButton}>
              <Ionicons name="remove" size={20} color={Colors.primary} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{orderDraft.quantity}</Text>
            <TouchableOpacity onPress={incrementQuantity} style={styles.stepButton}>
              <Ionicons name="add" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 2.3 Date Picker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tanggal Mulai</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
            <Ionicons name="calendar-outline" size={20} color={Colors.textSecondary} style={{ marginRight: 10 }} />
            <Text style={styles.dateText}>{orderDraft.startDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={orderDraft.startDate}
              mode="date"
              display="default"
              onChange={onDateChange}
              onValueChange={onDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>

        {/* 2.4 & 2.5 Duration Selection & Savings Badges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Durasi Langganan</Text>
          <View style={styles.optionsGrid}>
            {durations.map((d) => (
              <TouchableOpacity
                key={d}
                style={[
                  styles.optionCard,
                  orderDraft.duration === d && styles.selectedOptionCard,
                ]}
                onPress={() => setDuration(d)}
              >
                <Text style={[styles.optionLabel, orderDraft.duration === d && styles.selectedOptionLabel]}>{d} Hari</Text>
                {getSavingsLabel(d) && (
                  <View style={styles.savingsBadge}>
                    <Text style={styles.savingsText}>{getSavingsLabel(d)}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 2.6 Meal Plan Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pilihan Makan</Text>
          <View style={styles.optionsGrid}>
            {mealPlans.map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.optionCard,
                  orderDraft.mealPlan === p && styles.selectedOptionCard,
                ]}
                onPress={() => setMealPlan(p)}
              >
                <Text style={[styles.optionLabel, orderDraft.mealPlan === p && styles.selectedOptionLabel]}>{p === 'Both' ? 'Siang & Malam' : p === 'Lunch' ? 'Siang' : 'Malam'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 2.7 Notes Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Catatan (Opsional)</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Contoh: Alergi kacang, tidak pedas..."
            placeholderTextColor={Colors.textTertiary}
            multiline
            numberOfLines={3}
            value={orderDraft.notes}
            onChangeText={setNotes}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={() => router.push('/checkout/summary')}>
          <Text style={styles.submitButtonText}>Lanjut ke Checkout</Text>
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
  sectionTitle: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginBottom: 15 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  stepButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: { fontSize: 18, fontWeight: '700', marginHorizontal: 20, color: Colors.textPrimary },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.borderMedium,
    borderRadius: 8,
    backgroundColor: Colors.background,
  },
  dateText: { fontSize: 14, color: Colors.textPrimary },
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  optionCard: {
    flex: 1,
    minWidth: '45%',
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.borderMedium,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  selectedOptionCard: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  optionLabel: { fontSize: 14, fontWeight: '500', color: Colors.textSecondary },
  selectedOptionLabel: { color: Colors.primary, fontWeight: '700' },
  savingsBadge: {
    marginTop: 5,
    backgroundColor: Colors.success,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  savingsText: { fontSize: 10, color: Colors.white, fontWeight: 'bold' },
  notesInput: {
    borderWidth: 1,
    borderColor: Colors.borderMedium,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: Colors.textPrimary,
    textAlignVertical: 'top',
    height: 80,
    backgroundColor: Colors.background,
  },
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
  },
  submitButtonText: { color: Colors.white, fontWeight: '700', fontSize: 16 },
});
