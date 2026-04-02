import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Mock data
const cateringData = [
  {
    id: '1',
    name: 'Catering Kamu',
    rating: 4.8,
    reviews: '4,2RB',
    verified: true,
    packages: [
      {
        id: 'p1',
        name: 'Weightloss',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        rating: 4.7,
        reviews: '4,2RB',
        price: 800000,
        tags: ['Vegan', 'Halal'],
      },
      {
        id: 'p2',
        name: 'Muscle Gain+',
        image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=400',
        rating: 4.7,
        reviews: '4,2RB',
        price: 800000,
        tags: ['Vegan', 'Halal'],
      },
    ],
  },
];

const filterOptions = [
  { id: '1', label: 'Vegan ', active: false },
  { id: '2', label: 'Halal ✅', active: true },
  { id: '3', label: 'Kalori', active: false, dropdown: true },
  { id: '4', label: '20 - 40 Gram', active: false },
];

const HomeScreen: React.FC = () => {
  const [location, setLocation] = useState('Bandung, Gedebage');
  const [searchQuery, setSearchQuery] = useState('');

  const formatPrice = (price: number) => {
    return `Rp${price.toLocaleString('id-ID')}`;
  };

  const renderPackageCard = (pkg: typeof cateringData[0]['packages'][0]) => (
    <View key={pkg.id} style={styles.packageCard}>
      <Image source={{ uri: pkg.image }} style={styles.packageImage} />
      <View style={styles.packageContent}>
        <Text style={styles.packageName}>{pkg.name}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="#FFB800" />
          <Text style={styles.packageRating}>
            {pkg.rating} ({pkg.reviews})
          </Text>
        </View>
        <Text style={styles.priceLabel}>Mulai dari</Text>
        <Text style={styles.packagePrice}>{formatPrice(pkg.price)}</Text>
        <View style={styles.tagsRow}>
          {pkg.tags.map((tag) => (
            <View key={tag} style={styles.tagChip}>
              <Text style={styles.tagText}>
                {tag} {tag === 'Vegan' ? '🌱' : '✓'}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderCateringSection = (item: typeof cateringData[0]) => (
    <View key={item.id} style={styles.cateringSection}>
      <View style={styles.cateringHeader}>
        <View style={styles.cateringInfo}>
          <View style={styles.cateringLogo}>
            <Ionicons name="restaurant" size={24} color="#666" />
          </View>
          <View>
            <View style={styles.cateringNameRow}>
              <Text style={styles.cateringName}>{item.name}</Text>
              {item.verified && (
                <Ionicons name="checkmark-circle" size={20} color="#FF7B00" />
              )}
            </View>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#FFB800" />
              <Text style={styles.cateringRating}>
                {item.rating} ({item.reviews})
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={24} color="#FF7B00" />
        </TouchableOpacity>
      </View>
      <View style={styles.packagesRow}>
        {item.packages.map(renderPackageCard)}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.locationLabel}>Lokasi</Text>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.locationButton}>
            <Ionicons name="location" size={20} color="#FF7B00" />
            <Text style={styles.locationText}>{location}</Text>
            <Ionicons name="chevron-down" size={20} color="#FF7B00" />
          </TouchableOpacity>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="chatbubble-ellipses" size={24} color="#333" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications" size={24} color="#333" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Halloween Promo Banner */}
        <View style={styles.promoBanner}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1508264165352-258db2ebd59b?w=600',
            }}
            style={styles.bannerImage}
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>HALLOWEEN</Text>
            <Text style={styles.bannerTitle}>PROMO 👻</Text>
            <Text style={styles.bannerTitle}>UP TO 20%!!!</Text>
          </View>
          <View style={styles.pagination}>
            <View style={styles.paginationDotActive} />
            <View style={styles.paginationDot} />
            <View style={styles.paginationDot} />
          </View>
        </View>

        {/* Search and Filters */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari catering..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersScroll}
          >
            {filterOptions.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterChip,
                  filter.active && styles.filterChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    filter.active && styles.filterTextActive,
                  ]}
                >
                  {filter.label}
                </Text>
                {filter.dropdown && (
                  <Ionicons name="chevron-down" size={16} color="#666" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Catering Recommendations */}
        <View style={styles.recommendationsSection}>
          <Text style={styles.recommendationsTitle}>
            Rekomendasi catering
          </Text>
          <Text style={styles.recommendationsSubtitle}>di areamu 👍</Text>
        </View>

        {cateringData.map(renderCateringSection)}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#FF7B00" />
          <Text style={[styles.navText, styles.navTextActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="bag" size={24} color="#666" />
          <Text style={styles.navText}>Pesanan Saya</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings" size={24} color="#666" />
          <Text style={styles.navText}>Pengaturan</Text>
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
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  locationLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#FF7B00',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flex: 1,
    marginRight: 12,
  },
  locationText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  promoBanner: {
    margin: 16,
    borderRadius: 20,
    overflow: 'hidden',
    height: 200,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 20,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 40,
  },
  pagination: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  paginationDotActive: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  searchSection: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  filtersScroll: {
    flexDirection: 'row',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  filterChipActive: {
    backgroundColor: '#FF7B00',
    borderColor: '#FF7B00',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
  recommendationsSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  recommendationsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  recommendationsSubtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  cateringSection: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cateringHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cateringInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cateringLogo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cateringNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cateringName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginRight: 6,
  },
  cateringRating: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  packagesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  packageCard: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    overflow: 'hidden',
    width: (width - 32 - 32 - 12) / 2,
  },
  packageImage: {
    width: '100%',
    height: 120,
  },
  packageContent: {
    padding: 12,
  },
  packageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  packageRating: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  packagePrice: {
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
    backgroundColor: '#fff',
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
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingBottom: 20,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  navTextActive: {
    color: '#FF7B00',
    fontWeight: '600',
  },
});

export default HomeScreen;
