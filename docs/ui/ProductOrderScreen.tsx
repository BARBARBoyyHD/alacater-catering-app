import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock data
const productData = {
  name: 'Claritika - Weightloss',
  provider: 'Catering Kamu',
  providerRating: 4.8,
  providerReviews: '4,2RB',
  verified: true,
  packageName: 'Weightloss — Basic',
  packageRating: 4.7,
  packageReviews: '4,2RB',
  basePrice: 350000,
  image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
  tags: ['Vegan', 'Halal'],
};

const durationOptions = [
  {
    id: '5',
    label: '5 Hari',
    originalPrice: 350000,
    price: 350000,
    savings: 0,
  },
  {
    id: '10',
    label: '10 Hari',
    originalPrice: 700000,
    price: 650000,
    savings: 50000,
  },
  {
    id: '20',
    label: '20 Hari',
    originalPrice: 1300000,
    price: 1200000,
    savings: 100000,
  },
  {
    id: '60',
    label: '60 Hari',
    originalPrice: 3900000,
    price: 3480000,
    savings: 420000,
  },
];

const mealPlanOptions = [
  {
    id: 'lunch',
    label: 'Makan Siang (1 Meal)',
    price: null,
    originalPrice: null,
    savings: null,
  },
  {
    id: 'dinner',
    label: 'Makan Malam (1 Meal)',
    price: null,
    originalPrice: null,
    savings: null,
  },
  {
    id: 'both',
    label: 'Makan Siang + Malam (2 Meals)',
    price: 1000000,
    originalPrice: 1200000,
    savings: 200000,
  },
];

const ProductOrderScreen: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState('14 November 2025');
  const [selectedDuration, setSelectedDuration] = useState('20');
  const [selectedMealPlan, setSelectedMealPlan] = useState('lunch');
  const [note, setNote] = useState('');

  const formatPrice = (price: number) => {
    return `Rp${price.toLocaleString('id-ID')}`;
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const getTotalPrice = () => {
    const duration = durationOptions.find((d) => d.id === selectedDuration);
    return duration ? duration.price : 0;
  };

  const getMaxSavings = () => {
    const duration = durationOptions.find((d) => d.id === selectedDuration);
    return duration ? duration.savings : 0;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FF7B00" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{productData.name}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Provider Info */}
        <View style={styles.providerSection}>
          <View style={styles.providerLogo}>
            <Ionicons name="restaurant" size={24} color="#666" />
          </View>
          <View style={styles.providerInfo}>
            <View style={styles.providerNameRow}>
              <Text style={styles.providerName}>{productData.provider}</Text>
              {productData.verified && (
                <Ionicons name="checkmark-circle" size={20} color="#FF7B00" />
              )}
            </View>
            <View style={styles.providerRating}>
              <Ionicons name="star" size={14} color="#FFB800" />
              <Text style={styles.providerRatingText}>
                {productData.providerRating} ({productData.providerReviews})
              </Text>
            </View>
          </View>
        </View>

        {/* Product Card */}
        <View style={styles.productCard}>
          <Image source={{ uri: productData.image }} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{productData.packageName}</Text>
            <View style={styles.productRating}>
              <Ionicons name="star" size={14} color="#FFB800" />
              <Text style={styles.productRatingText}>
                {productData.packageRating} ({productData.packageReviews})
              </Text>
            </View>
            <Text style={styles.priceLabel}>Mulai dari</Text>
            <Text style={styles.productPrice}>{formatPrice(productData.basePrice)}</Text>
            <View style={styles.tagsRow}>
              {productData.tags.map((tag) => (
                <View key={tag} style={styles.tagChip}>
                  <Text style={styles.tagText}>
                    {tag} {tag === 'Vegan' ? '🌱' : '✓'}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Quantity */}
        <View style={styles.quantitySection}>
          <Text style={styles.quantityLabel}>Jumlah:</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}
              onPress={handleDecrement}
              disabled={quantity <= 1}
            >
              <Ionicons
                name="remove"
                size={20}
                color={quantity <= 1 ? '#CCC' : '#FF7B00'}
              />
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={handleIncrement}>
              <Ionicons name="add" size={20} color="#FF7B00" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Start Date */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tanggal Mulai</Text>
          <Text style={styles.sectionSubtitle}>Pilih tanggal pertama pengiriman.</Text>
          <Text style={styles.inputLabel}>Pilih Tanggal</Text>
          <TouchableOpacity style={styles.dateInput}>
            <Ionicons name="calendar-outline" size={24} color="#999" />
            <Text style={styles.dateText}>{startDate}</Text>
          </TouchableOpacity>
        </View>

        {/* Duration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Durasi Langganan</Text>
          <Text style={styles.sectionSubtitle}>Atur durasi sesuai kebutuhanmu.</Text>
          <View style={styles.durationOptions}>
            {durationOptions.map((option) => {
              const isSelected = selectedDuration === option.id;
              const hasSavings = option.savings > 0;

              return (
                <View key={option.id}>
                  {hasSavings && (
                    <View style={styles.savingsBadge}>
                      <Ionicons name="pricetag" size={16} color="#fff" />
                      <Text style={styles.savingsText}>
                        Lebih hemat {formatPrice(option.savings)}
                      </Text>
                    </View>
                  )}
                  <TouchableOpacity
                    style={[
                      styles.durationOption,
                      isSelected && styles.durationOptionSelected,
                      hasSavings && styles.durationOptionWithSavings,
                    ]}
                    onPress={() => setSelectedDuration(option.id)}
                  >
                    <View style={styles.durationOptionLeft}>
                      <View
                        style={[
                          styles.radioButton,
                          isSelected && styles.radioButtonSelected,
                        ]}
                      >
                        {isSelected && <View style={styles.radioButtonInner} />}
                      </View>
                      <Text
                        style={[
                          styles.durationLabel,
                          isSelected && styles.durationLabelSelected,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </View>
                    <View style={styles.durationPrices}>
                      {hasSavings && (
                        <Text style={styles.originalPrice}>
                          {formatPrice(option.originalPrice)}
                        </Text>
                      )}
                      <Text
                        style={[
                          styles.durationPrice,
                          hasSavings && styles.durationPriceHighlighted,
                        ]}
                      >
                        {formatPrice(option.price)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

        {/* Meal Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meal Plan</Text>
          <Text style={styles.sectionSubtitle}>Tentukan jumlah hidangan per hari.</Text>
          <View style={styles.mealPlanOptions}>
            {mealPlanOptions.map((option) => {
              const isSelected = selectedMealPlan === option.id;
              const hasSavings = option.savings && option.savings > 0;

              return (
                <View key={option.id}>
                  {hasSavings && (
                    <View style={styles.savingsBadge}>
                      <Ionicons name="pricetag" size={16} color="#fff" />
                      <Text style={styles.savingsText}>
                        Lebih hemat {formatPrice(option.savings!)}
                      </Text>
                    </View>
                  )}
                  <TouchableOpacity
                    style={[
                      styles.mealPlanOption,
                      isSelected && styles.mealPlanOptionSelected,
                      hasSavings && styles.mealPlanOptionWithSavings,
                    ]}
                    onPress={() => setSelectedMealPlan(option.id)}
                  >
                    <View style={styles.mealPlanOptionLeft}>
                      <View
                        style={[
                          styles.radioButton,
                          isSelected && styles.radioButtonSelected,
                        ]}
                      >
                        {isSelected && <View style={styles.radioButtonInner} />}
                      </View>
                      <Text
                        style={[
                          styles.mealPlanLabel,
                          isSelected && styles.mealPlanLabelSelected,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </View>
                    {option.price && (
                      <View style={styles.mealPlanPrices}>
                        <Text style={styles.mealPlanPrice}>
                          {formatPrice(option.price)}
                        </Text>
                        {option.originalPrice && (
                          <Text style={styles.mealPlanOriginalPrice}>
                            {formatPrice(option.originalPrice)}
                          </Text>
                        )}
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Catatan (opsional)</Text>
          <Text style={styles.sectionSubtitle}>
            Tambahkan informasi tambahan untuk pesanan ini.
          </Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Contoh: hubungi sebelum pengantaran."
            placeholderTextColor="#999"
            value={note}
            onChangeText={setNote}
            multiline
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      {/* Bottom Summary Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.savingsBanner}>
          <Ionicons name="pricetag" size={18} color="#fff" />
          <Text style={styles.savingsBannerText}>
            Kamu sudah hemat sampai {formatPrice(getMaxSavings())}
          </Text>
        </View>
        <View style={styles.bottomContent}>
          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>Total Harga</Text>
            <Text style={styles.totalPrice}>{formatPrice(getTotalPrice())}</Text>
          </View>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>
              Lanjut ke Jadwal Pengiriman
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  providerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 1,
  },
  providerLogo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  providerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  providerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 6,
  },
  providerRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerRatingText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  productImage: {
    width: 120,
    height: 120,
  },
  productInfo: {
    flex: 1,
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  productRatingText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF7B00',
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  tagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 1,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#FF7B00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonDisabled: {
    borderColor: '#CCC',
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    minWidth: 24,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 12,
    padding: 12,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  durationOptions: {
    gap: 8,
  },
  savingsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B5E3A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    gap: 6,
  },
  savingsText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  durationOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
  },
  durationOptionWithSavings: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  durationOptionSelected: {
    borderColor: '#FF7B00',
    backgroundColor: '#FFF5EB',
  },
  durationOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioButtonSelected: {
    borderColor: '#FF7B00',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF7B00',
  },
  durationLabel: {
    fontSize: 16,
    color: '#333',
  },
  durationLabelSelected: {
    fontWeight: '600',
    color: '#FF7B00',
  },
  durationPrices: {
    alignItems: 'flex-end',
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  durationPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  durationPriceHighlighted: {
    color: '#FF7B00',
  },
  mealPlanOptions: {
    gap: 8,
  },
  mealPlanOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
  },
  mealPlanOptionWithSavings: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  mealPlanOptionSelected: {
    borderColor: '#FF7B00',
    backgroundColor: '#FFF5EB',
  },
  mealPlanOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealPlanLabel: {
    fontSize: 16,
    color: '#333',
  },
  mealPlanLabelSelected: {
    fontWeight: '600',
    color: '#FF7B00',
  },
  mealPlanPrices: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mealPlanPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF7B00',
  },
  mealPlanOriginalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#333',
    minHeight: 120,
    backgroundColor: '#fff',
  },
  bottomBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingBottom: 20,
  },
  savingsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B5E3A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  savingsBannerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  totalSection: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  continueButton: {
    flex: 2,
    backgroundColor: '#FF7B00',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductOrderScreen;
