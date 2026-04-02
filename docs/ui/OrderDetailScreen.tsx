import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
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
  packageName: 'Weight Loss Plus',
  duration: '10/20 Hari',
  mealPlan: 'Siang + Malam',
  quantity: 'x1',
  image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200',
};

const additionalMenuData = [
  {
    id: '1',
    name: 'Snack Bar Diet',
    quantity: 'x1',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=200',
  },
  {
    id: '2',
    name: 'Snack Bar Diet',
    quantity: 'x1',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=200',
  },
];

const activityData = [
  {
    id: '3',
    status: 'Sedang Dikirim',
    statusType: 'shipping',
    mealName: 'Classic BBQ',
    date: 'Hari ini, 21 Agustus',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200',
  },
  {
    id: '2',
    status: 'Makanan Sudah Sampai',
    statusType: 'delivered',
    mealName: 'Grilled Olive Salmon',
    date: 'Kemarin, 20 Agustus',
    image: 'https://images.unsplash.com/photo-1485921325833-c51c50e83183?w=200',
  },
  {
    id: '1',
    status: 'Makanan Sudah Sampai',
    statusType: 'delivered',
    mealName: 'Lemonade Dory Steak',
    date: 'Selasa, 19 Agustus',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=200',
  },
];

const statusOptions = ['Semua Status', 'Pesanan Mendatang', 'Sedang Dikirim', 'Selesai'];

const OrderDetailScreen: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('Semua Status');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const getStatusColor = (statusType: string) => {
    switch (statusType) {
      case 'shipping':
        return '#4A6FA5';
      case 'delivered':
        return '#1B5E3A';
      default:
        return '#666';
    }
  };

  const renderActivityItem = (item: typeof activityData[0]) => (
    <View key={item.id} style={styles.activityCard}>
      <Image source={{ uri: item.image }} style={styles.activityImage} />
      <View style={styles.activityContent}>
        <View style={styles.activityHeader}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.statusType) },
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
          <Text style={styles.activityNumber}>#{item.id}</Text>
        </View>
        <Text style={styles.activityMeal}>{item.mealName}</Text>
        <View style={styles.activityDate}>
          <Ionicons name="calendar-outline" size={16} color="#999" />
          <Text style={styles.activityDateText}>{item.date}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FF7B00" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Pesanan</Text>
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

        {/* Order Item */}
        <View style={styles.orderCard}>
          <View style={styles.orderItem}>
            <Image source={{ uri: orderData.image }} style={styles.orderImage} />
            <View style={styles.orderInfo}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderName}>{orderData.packageName}</Text>
                <Text style={styles.orderQuantity}>{orderData.quantity}</Text>
              </View>
              <Text style={styles.orderDetail}>{orderData.duration}</Text>
              <Text style={styles.orderDetail}>{orderData.mealPlan}</Text>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Aksi Lainnya</Text>
                <Ionicons name="ellipsis-horizontal" size={16} color="#FF7B00" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Additional Menu */}
        <View style={styles.additionalSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Menu Tambahan</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={additionalMenuData}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.additionalList}
            ItemSeparatorComponent={() => <View style={styles.additionalSeparator} />}
            renderItem={({ item }) => (
              <View style={styles.additionalCard}>
                <Image source={{ uri: item.image }} style={styles.additionalImage} />
                <View style={styles.additionalInfo}>
                  <Text style={styles.additionalName}>{item.name}</Text>
                  <Text style={styles.additionalQuantity}>{item.quantity}</Text>
                </View>
              </View>
            )}
          />
        </View>

        {/* Order Activity */}
        <View style={styles.activitySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Aktivitas Pesanan</Text>
            <TouchableOpacity>
              <Ionicons name="search" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Filters */}
          <View style={styles.filterContainer}>
            <View style={styles.filterDropdown}>
              <TouchableOpacity
                style={styles.filterButton}
                onPress={() => setShowStatusDropdown(!showStatusDropdown)}
              >
                <Text style={styles.filterButtonText}>{selectedStatus}</Text>
                <Ionicons name="chevron-down" size={16} color="#666" />
              </TouchableOpacity>
              {showStatusDropdown && (
                <View style={styles.dropdownContent}>
                  {statusOptions.map((status) => (
                    <TouchableOpacity
                      key={status}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedStatus(status);
                        setShowStatusDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{status}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterChipText}>Pesanan Mendatang</Text>
            </TouchableOpacity>
          </View>

          {/* Activity List */}
          <View style={styles.activityList}>
            {activityData.map(renderActivityItem)}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Hubungi Merchant</Text>
          <Ionicons name="chatbubble" size={24} color="#fff" />
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
  orderCard: {
    backgroundColor: '#fff',
    marginBottom: 1,
  },
  orderItem: {
    flexDirection: 'row',
    padding: 16,
  },
  orderImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  orderInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  orderName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  orderQuantity: {
    fontSize: 14,
    color: '#999',
  },
  orderDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FF7B00',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 8,
    alignSelf: 'flex-start',
    gap: 6,
  },
  actionButtonText: {
    color: '#FF7B00',
    fontSize: 12,
    fontWeight: '600',
  },
  additionalSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  seeAllText: {
    color: '#FF7B00',
    fontSize: 14,
    fontWeight: '600',
  },
  additionalList: {
    paddingRight: 16,
  },
  additionalSeparator: {
    width: 12,
  },
  additionalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    width: 200,
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
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  additionalQuantity: {
    fontSize: 14,
    color: '#999',
  },
  activitySection: {
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  filterDropdown: {
    position: 'relative',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    gap: 6,
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
  },
  dropdownContent: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 8,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  filterChipText: {
    fontSize: 14,
    color: '#666',
  },
  activityList: {
    gap: 12,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  activityImage: {
    width: 100,
    height: 100,
  },
  activityContent: {
    flex: 1,
    padding: 12,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  activityNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  activityMeal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  activityDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activityDateText: {
    fontSize: 14,
    color: '#999',
  },
  bottomBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingBottom: 20,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7B00',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OrderDetailScreen;
