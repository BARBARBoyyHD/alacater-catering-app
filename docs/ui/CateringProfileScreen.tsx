import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Mock data
const profileData = {
  name: 'Catering Kamu',
  rating: 4.8,
  reviews: '4,2RB',
  verified: true,
  tagline: 'Fresh meals, made for you',
  instagram: '@cateringkamu',
  facebook: 'Catering Kamu Official',
  about:
    'Kami menghadirkan cita rasa autentik dengan bahan berkualitas dan layanan terbaik. Dengan pengalaman bertahun-tahun dalam industri kuliner, kami siap menyajikan hidangan lezat yang memenuhi kebutuhan acara Anda.',
  image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=600',
};

const promoData = [
  {
    id: '1',
    title: 'SPECIAL CATERING PROMO!',
    subtitle: 'Get 20% Off Your First Order',
    cta: 'ORDER NOW',
    image: 'https://images.unsplash.com/photo-1543362906-ac1b48263852?w=400',
    color: '#1B5E3A',
  },
  {
    id: '2',
    title: 'Fresh & Premium',
    subtitle: 'Enjoy FREE Delivery on Your First Order',
    cta: 'Order Now',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
    color: '#FF8C00',
  },
];

const packageCategories = [
  {
    id: 'weightloss',
    title: 'Weight Loss',
    packages: [
      {
        id: 'wl1',
        name: 'Weightloss — Basic',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        rating: 4.7,
        reviews: '4,2RB',
        price: 799000,
        tags: ['Vegan', 'Halal'],
      },
      {
        id: 'wl2',
        name: 'Weightloss — Premium',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        rating: 4.7,
        reviews: '4,2RB',
        price: 1199000,
        tags: ['Vegan', 'Halal'],
      },
    ],
  },
  {
    id: 'muscle',
    title: 'Muscle Gain',
    packages: [
      {
        id: 'mg1',
        name: 'Muscle Gain — Basic',
        image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=400',
        rating: 4.7,
        reviews: '4,2RB',
        price: 999000,
        tags: ['Halal'],
      },
      {
        id: 'mg2',
        name: 'Muscle Gain — Premium',
        image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=400',
        rating: 4.7,
        reviews: '4,2RB',
        price: 1499000,
        tags: ['Halal'],
      },
    ],
  },
];

interface PackageCardProps {
  pkg: {
    id: string;
    name: string;
    image: string;
    rating: number;
    reviews: string;
    price: number;
    tags: string[];
  };
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  const formatPrice = (price: number) => {
    return `Rp${price.toLocaleString('id-ID')}`;
  };

  return (
    <View style={styles.packageCard}>
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
};

const CateringProfileScreen: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const formatPrice = (price: number) => {
    return `Rp${price.toLocaleString('id-ID')}`;
  };

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
          }}
          style={styles.headerImage}
        />
        <View style={styles.headerOverlay} />

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Menu Button */}
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Profile Info */}
        <View style={styles.profileHeader}>
          <View style={styles.profileLogo}>
            <Ionicons name="restaurant" size={32} color="#666" />
          </View>
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.profileName}>{profileData.name}</Text>
              {profileData.verified && (
                <Ionicons name="checkmark-circle" size={22} color="#fff" />
              )}
            </View>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color="#FFB800" />
              <Text style={styles.profileRating}>
                {profileData.rating} ({profileData.reviews})
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.chatButton}>
            <Ionicons name="chatbubble" size={20} color="#fff" />
            <Text style={styles.chatButtonText}>Chat</Text>
          </TouchableOpacity>
        </View>

        {/* Social Media Buttons */}
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.instagramButton}>
            <Ionicons name="logo-instagram" size={20} color="#E4405F" />
            <Text style={styles.instagramButtonText}>Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.facebookButton}>
            <Ionicons name="logo-facebook" size={20} color="#fff" />
            <Text style={styles.facebookButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Promo Section */}
        <View style={styles.promoSection}>
          <Text style={styles.promoTitle}>Promo Terbatas!</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.promoScroll}
          >
            {promoData.map((promo) => (
              <View
                key={promo.id}
                style={[styles.promoCard, { backgroundColor: promo.color }]}
              >
                <View style={styles.promoContent}>
                  <Text style={styles.promoCardTitle}>{promo.title}</Text>
                  <Text style={styles.promoCardSubtitle}>{promo.subtitle}</Text>
                  <TouchableOpacity style={styles.promoCta}>
                    <Text style={styles.promoCtaText}>{promo.cta}</Text>
                  </TouchableOpacity>
                </View>
                <Image
                  source={{ uri: promo.image }}
                  style={styles.promoCardImage}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* About Provider */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>Tentang Provider</Text>
          <Text style={styles.aboutText}>
            {expanded
              ? profileData.about +
                ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              : profileData.about}
          </Text>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=600',
            }}
            style={styles.aboutImage}
          />
          <TouchableOpacity
            style={styles.expandButton}
            onPress={() => setExpanded(!expanded)}
          >
            <Text style={styles.expandButtonText}>Selengkapnya</Text>
            <Ionicons
              name={expanded ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#FF7B00"
            />
          </TouchableOpacity>
        </View>

        {/* Package Categories */}
        {packageCategories.map((category) => (
          <View key={category.id} style={styles.categorySection}>
            <View style={styles.categoryHeader}>
              <View style={styles.categoryLine} />
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <View style={styles.categoryLine} />
            </View>
            <View style={styles.packagesRow}>
              {category.packages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    height: 280,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    position: 'absolute',
    top: 110,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  profileLogo: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 6,
  },
  profileRating: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF7B00',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  socialButtons: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    gap: 12,
  },
  instagramButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 10,
    gap: 8,
  },
  instagramButtonText: {
    color: '#E4405F',
    fontSize: 14,
    fontWeight: '600',
  },
  facebookButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1877F2',
    borderRadius: 24,
    paddingVertical: 10,
    gap: 8,
  },
  facebookButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  promoSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  promoScroll: {
    flexDirection: 'row',
    gap: 12,
  },
  promoCard: {
    width: 280,
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoContent: {
    flex: 1,
    padding: 16,
  },
  promoCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 4,
  },
  promoCardSubtitle: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 12,
  },
  promoCta: {
    backgroundColor: '#FFD700',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  promoCtaText: {
    color: '#333',
    fontSize: 12,
    fontWeight: '600',
  },
  promoCardImage: {
    width: 100,
    height: '100%',
  },
  aboutSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
  },
  aboutImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  expandButtonText: {
    color: '#FF7B00',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  categorySection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 12,
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
    width: (width - 32 - 24 - 12) / 2,
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
  priceLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
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
});

export default CateringProfileScreen;
