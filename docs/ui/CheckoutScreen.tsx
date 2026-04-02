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
const providerData = {
  name: 'Catering Kamu',
  rating: 4.8,
  reviews: '4,2RB',
  verified: true,
};

const orderData = {
  packageName: 'Weightloss',
  image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200',
  quantity: 1,
  duration: {
    label: 'Durasi Langganan',
    value: '20 Hari',
    originalPrice: 900000,
    price: 765000,
  },
  mealPlan: {
    label: 'Meal Plan',
    value: 'Makan Siang',
    price: 0,
  },
  weekend: {
    label: 'Tambahan Weekend',
    value: 'Sabtu + Minggu',
    originalPrice: 360000,
    price: 300000,
  },
  totalPackage: {
    originalPrice: 1200000,
    price: 1065000,
  },
};

const additionalMenuData = {
  items: [
    {
      id: '1',
      name: 'Snack Bar Diet',
      description: 'Praktis untuk camilan sehat.',
      image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=200',
      price: 15000,
      unit: '30 hari',
      quantity: 2,
    },
  ],
  total: 900000,
};

const deliverySchedule = [
  { day: 'Senin', location: 'Apartemen Jakarta' },
  { day: 'Selasa', location: 'Apartemen Jakarta' },
  { day: 'Rabu', location: 'Kantor Jakarta' },
  { day: 'Kamis', location: 'Apartemen Jakarta' },
  { day: 'Jumat', location: 'Kantor Jakarta' },
  { day: 'Sabtu', location: 'Rumah Jakarta' },
  { day: 'Minggu', location: 'Rumah Jakarta' },
];

const paymentSummary = {
  packagePrice: 1200000,
  additionalMenuPrice: 900000,
  deliveryFee: 0,
  serviceFee: 5000,
  discount: 195000,
  total: 1910000,
};

const CheckoutScreen: React.FC = () => {
  const [quantity, setQuantity] = useState(orderData.quantity);
  const [snackQuantity, setSnackQuantity] = useState(2);
  const [note, setNote] = useState('Titip ke security.');
  const [startDate, setStartDate] = useState('14 November 2025');

  const formatPrice = (price: number) => {
    if (price === 0) return 'Rp0';
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

  const handleSnackIncrement = () => {
    setSnackQuantity(snackQuantity + 1);
  };

  const handleSnackDecrement = () => {
    if (snackQuantity > 1) {
      setSnackQuantity(snackQuantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FF7B00" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Konfirmasi Pesanan</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Provider & Order Summary */}
        <View style={styles.orderCard}>
          <View style={styles.providerHeader}>
            <View style={styles.providerLogo}>
              <Ionicons name="restaurant" size={24} color="#666" />
            </View>
            <View style={styles.providerInfo}>
              <View style={styles.providerNameRow}>
                <Text style={styles.providerName}>{providerData.name}</Text>
                {providerData.verified && (
                  <Ionicons name="checkmark-circle" size={20} color="#FF7B00" />
                )}
              </View>
              <View style={styles.providerRating}>
                <Ionicons name="star" size={14} color="#FFB800" />
                <Text style={styles.providerRatingText}>
                  {providerData.rating} ({providerData.reviews})
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.orderDivider} />

          {/* Product */}
          <View style={styles.productRow}>
            <Image source={{ uri: orderData.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{orderData.packageName}</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}
                  onPress={handleDecrement}
                  disabled={quantity <= 1}
                >
                  <Ionicons
                    name="remove"
                    size={16}
                    color={quantity <= 1 ? '#CCC' : '#FF7B00'}
                  />
                </TouchableOpacity>
                <Text style={styles.quantityValue}>{quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={handleIncrement}>
                  <Ionicons name="add" size={16} color="#FF7B00" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Order Details */}
          <View style={styles.orderDetails}>
            <View style={styles.detailRow}>
              <View style={styles.detailLeft}>
                <Text style={styles.detailLabel}>{orderData.duration.label}</Text>
                <Text style={styles.detailValue}>{orderData.duration.value}</Text>
              </View>
              <View style={styles.detailRight}>
                <Text style={styles.detailOriginalPrice}>
                  {formatPrice(orderData.duration.originalPrice)}
                </Text>
                <Text style={styles.detailPrice}>{formatPrice(orderData.duration.price)}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailLeft}>
                <Text style={styles.detailLabel}>{orderData.mealPlan.label}</Text>
                <Text style={styles.detailValue}>{orderData.mealPlan.value}</Text>
              </View>
              <Text style={styles.detailPrice}>{formatPrice(orderData.mealPlan.price)}</Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailLeft}>
                <Text style={styles.detailLabel}>{orderData.weekend.label}</Text>
                <Text style={styles.detailValue}>{orderData.weekend.value}</Text>
              </View>
              <View style={styles.detailRight}>
                <Text style={styles.detailOriginalPrice}>
                  {formatPrice(orderData.weekend.originalPrice)}
                </Text>
                <Text style={styles.detailPrice}>{formatPrice(orderData.weekend.price)}</Text>
              </View>
            </View>
          </View>

          {/* Total Package */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Paket</Text>
            <View style={styles.totalPrices}>
              <Text style={styles.totalOriginalPrice}>
                {formatPrice(orderData.totalPackage.originalPrice)}
              </Text>
              <Text style={styles.totalPrice}>{formatPrice(orderData.totalPackage.price)}</Text>
            </View>
          </View>
        </View>

        {/* Additional Menu */}
        <View style={styles.additionalCard}>
          <Text style={styles.sectionTitle}>Menu Tambahan</Text>
          <View style={styles.additionalDivider} />

          {additionalMenuData.items.map((item) => (
            <View key={item.id}>
              <View style={styles.additionalItem}>
                <Image source={{ uri: item.image }} style={styles.additionalImage} />
                <View style={styles.additionalInfo}>
                  <Text style={styles.additionalName}>{item.name}</Text>
                  <Text style={styles.additionalDescription}>{item.description}</Text>
                  <View style={styles.additionalPriceRow}>
                    <Text style={styles.additionalPrice}>
                      {formatPrice(item.price)}
                    </Text>
                    <Text style={styles.additionalUnit}> x {item.unit}</Text>
                  </View>
                </View>
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={[styles.quantityButton, item.quantity <= 1 && styles.quantityButtonDisabled]}
                    onPress={handleSnackDecrement}
                    disabled={item.quantity <= 1}
                  >
                    <Ionicons
                      name="remove"
                      size={16}
                      color={item.quantity <= 1 ? '#CCC' : '#FF7B00'}
                    />
                  </TouchableOpacity>
                  <Text style={styles.quantityValue}>{item.quantity}</Text>
                  <TouchableOpacity style={styles.quantityButton} onPress={handleSnackIncrement}>
                    <Ionicons name="add" size={16} color="#FF7B00" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.additionalDivider} />
            </View>
          ))}

          <TouchableOpacity style={styles.addMoreButton}>
            <Text style={styles.addMoreText}>Tambah Menu Lain</Text>
            <Ionicons name="add" size={20} color="#FF7B00" />
          </TouchableOpacity>

          <View style={styles.additionalTotal}>
            <Text style={styles.additionalTotalLabel}>Total Tambahan</Text>
            <Text style={styles.additionalTotalPrice}>
              {formatPrice(additionalMenuData.total)}
            </Text>
          </View>
        </View>

        {/* Start Date */}
        <View style={styles.dateCard}>
          <View style={styles.dateHeader}>
            <Text style={styles.dateTitle}>Tanggal Mulai Berlangganan</Text>
            <TouchableOpacity>
              <Text style={styles.editText}>Ubah</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dateInput}>
            <Ionicons name="calendar-outline" size={24} color="#999" />
            <Text style={styles.dateText}>{startDate}</Text>
          </View>
        </View>

        {/* Delivery Schedule */}
        <View style={styles.scheduleCard}>
          <View style={styles.scheduleHeader}>
            <Text style={styles.scheduleTitle}>Jadwal Pengiriman</Text>
            <TouchableOpacity>
              <Text style={styles.editText}>Ubah</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scheduleList}>
            {deliverySchedule.map((item, index) => (
              <View key={item.day} style={styles.scheduleRow}>
                <Text style={styles.scheduleDay}>{item.day}</Text>
                <Text style={styles.scheduleLocation}>{item.location}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Notes */}
        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Catatan (opsional)</Text>
          <Text style={styles.noteSubtitle}>
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

        {/* Payment Summary */}
        <View style={styles.paymentCard}>
          <Text style={styles.sectionTitle}>Ringkasan Pembayaran</Text>
          <View style={styles.paymentDivider} />

          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Paket Weightloss</Text>
            <Text style={styles.paymentPrice}>{formatPrice(paymentSummary.packagePrice)}</Text>
          </View>

          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Menu Tambahan</Text>
            <Text style={styles.paymentPrice}>{formatPrice(paymentSummary.additionalMenuPrice)}</Text>
          </View>

          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabelHighlight}>
              Biaya Pengiriman (20 Hari)
            </Text>
            <Text style={styles.paymentPriceHighlight}>GRATIS</Text>
          </View>

          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Biaya Layanan</Text>
            <Text style={styles.paymentPrice}>{formatPrice(paymentSummary.serviceFee)}</Text>
          </View>

          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabelHighlight}>Diskon Extra</Text>
            <Text style={styles.paymentDiscount}>
              -{formatPrice(paymentSummary.discount)}
            </Text>
          </View>

          <View style={styles.paymentDivider} />

          <View style={styles.paymentTotalRow}>
            <Text style={styles.paymentTotalLabel}>Total Pembayaran</Text>
            <Text style={styles.paymentTotal}>{formatPrice(paymentSummary.total)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomTotal}>
          <Text style={styles.bottomTotalLabel}>Total Pembayaran</Text>
          <Text style={styles.bottomTotalPrice}>{formatPrice(paymentSummary.total)}</Text>
        </View>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>Lanjut Pembayaran</Text>
          <Ionicons name="shield-checkmark" size={24} color="#fff" />
        </TouchableOpacity>
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
    paddingBottom: 100,
  },
  orderCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  providerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
  orderDivider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 16,
  },
  productRow: {
    flexDirection: 'row',
    padding: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
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
  orderDetails: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLeft: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
  },
  detailRight: {
    alignItems: 'flex-end',
  },
  detailOriginalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  detailPrice: {
    fontSize: 14,
    color: '#333',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalPrices: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  totalOriginalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  additionalCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    padding: 16,
    paddingBottom: 8,
  },
  additionalDivider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 16,
  },
  additionalItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  additionalImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  additionalInfo: {
    flex: 1,
    marginLeft: 12,
  },
  additionalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  additionalDescription: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  additionalPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  additionalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF7B00',
  },
  additionalUnit: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FF7B00',
    borderRadius: 12,
    margin: 16,
    paddingVertical: 12,
    gap: 8,
  },
  addMoreText: {
    color: '#FF7B00',
    fontSize: 14,
    fontWeight: '600',
  },
  additionalTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  additionalTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  additionalTotalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dateCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  dateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  editText: {
    color: '#FF7B00',
    fontSize: 14,
    fontWeight: '600',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    margin: 16,
    borderRadius: 12,
    padding: 12,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  scheduleCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  scheduleList: {
    padding: 16,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scheduleDay: {
    fontSize: 14,
    color: '#666',
    width: 70,
  },
  scheduleLocation: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  noteCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    padding: 16,
    paddingBottom: 4,
  },
  noteSubtitle: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#333',
    minHeight: 100,
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 0,
  },
  paymentCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  paymentDivider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 16,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#666',
  },
  paymentLabelHighlight: {
    fontSize: 14,
    color: '#FF7B00',
    fontWeight: '600',
  },
  paymentPrice: {
    fontSize: 14,
    color: '#333',
  },
  paymentPriceHighlight: {
    fontSize: 14,
    color: '#FF7B00',
    fontWeight: '600',
  },
  paymentDiscount: {
    fontSize: 14,
    color: '#FF7B00',
    fontWeight: '600',
  },
  paymentTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
  },
  paymentTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  paymentTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingBottom: 20,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  bottomTotal: {
    flex: 1,
  },
  bottomTotalLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  bottomTotalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  payButton: {
    flex: 2,
    backgroundColor: '#FF7B00',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CheckoutScreen;
