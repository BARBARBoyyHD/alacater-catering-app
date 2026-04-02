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
const productData = {
  title: 'Keto Diet — Premium',
  subtitle: 'Keto Catering Package',
  description: 'Low-carb, high-protein meals delivered daily',
  rating: 4.8,
  reviewCount: 1521,
  price: 350000,
  halal: true,
  about:
    'Kami menghadirkan menu premium dengan bahan segar berkualitas tinggi, diolah oleh tim berpengalaman dalam dunia kuliner. Setiap hidangan dirancang khusus untuk mendukung gaya hidup keto-mu—lezat, sehat, dan praktis.',
  fullAbout:
    'Kami menghadirkan menu premium dengan bahan segar berkualitas tinggi, diolah oleh tim berpengalaman dalam dunia kuliner. Setiap hidangan dirancang khusus untuk mendukung gaya hidup keto-mu—lezat, sehat, dan praktis. Dengan kandungan nutrisi yang tepat, paket ini membantu Anda mencapai target kesehatan dan berat badan ideal.',
};

const providerData = {
  name: 'Catering Kamu',
  rating: 4.8,
  reviews: '4,2RB',
  verified: true,
};

const menuOptions = [
  {
    id: '1',
    title: 'Weekly Menu',
    subtitle: 'Nutritious meals, delivered daily',
    backgroundColor: '#F5F0E6',
    days: [
      { day: 'Monday', meal: 'Grilled Chicken & Veggies' },
      { day: 'Tuesday', meal: 'Salmon & Avocado Bowl' },
      { day: 'Wednesday', meal: 'Beef & Broccoli' },
      { day: 'Thursday', meal: 'Veggie Stir-fry' },
      { day: 'Friday', meal: 'Chicken Rice Bowl' },
      { day: 'Saturday', meal: 'Mixed Greens & Eggs' },
    ],
  },
  {
    id: '2',
    title: 'Weekly Menu',
    subtitle: 'Nutritious meals, delivered daily',
    backgroundColor: '#FFD700',
    days: [
      { day: 'MON', meal: 'Salmon & Avocado Bowl' },
      { day: 'TUES', meal: 'Beef & Broccoli' },
      { day: 'WED', meal: 'Veggie Stir-fry' },
      { day: 'FRI', meal: 'Chicken Rice Bowl' },
      { day: 'SAT', meal: 'Tuna Salad' },
    ],
  },
  {
    id: '3',
    title: 'Weekly',
    subtitle: 'Nutritious meals, delivered daily',
    backgroundColor: '#1B5E3A',
    days: [
      { day: 'Monday', meal: 'Grilled Chicken & Veggies' },
      { day: 'Wednesday', meal: 'Beef & Broccoli' },
      { day: 'Friday', meal: 'Chicken Rice Bowl' },
    ],
  },
];

const reviewsData = {
  average: 4.8,
  totalReviews: 481,
  distribution: [
    { stars: 5, count: 380, percentage: 79 },
    { stars: 4, count: 72, percentage: 15 },
    { stars: 3, count: 19, percentage: 4 },
    { stars: 2, count: 5, percentage: 1 },
    { stars: 1, count: 5, percentage: 1 },
  ],
  items: [
    {
      id: '1',
      name: 'Gabriel Hanna',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      rating: 4,
      date: '6 Days ago',
      comment:
        'Rasanya enak banget dan porsinya pas. Cocok buat aku yang lagi diet keto',
      images: [
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200',
        'https://images.unsplash.com/photo-1543362906-ac1b48263852?w=200',
      ],
      replies: 2,
      likes: 7,
    },
    {
      id: '2',
      name: 'Alvin Dave',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      rating: 4,
      date: '6 Days ago',
      comment:
        'Makanannya selalu fresh, nggak pernah terlambat, recommended banget!',
      images: [
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200',
        'https://images.unsplash.com/photo-1543362906-ac1b48263852?w=200',
      ],
      replies: 1,
      likes: 3,
    },
  ],
};

const ProductDetailScreen: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const formatPrice = (price: number) => {
    return `Rp${price.toLocaleString('id-ID')}`;
  };

  const renderStars = (rating: number, size: number = 16) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Ionicons key={i} name="star" size={size} color="#FFB800" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Ionicons key={i} name="star-half" size={size} color="#FFB800" />
        );
      } else {
        stars.push(
          <Ionicons key={i} name="star-outline" size={size} color="#FFB800" />
        );
      }
    }
    return stars;
  };

  const renderMenuCard = (menu: typeof menuOptions[0]) => (
    <View
      key={menu.id}
      style={[styles.menuCard, { backgroundColor: menu.backgroundColor }]}
    >
      <Text style={styles.menuCardTitle}>{menu.title}</Text>
      <Text style={styles.menuCardSubtitle}>{menu.subtitle}</Text>
      <View style={styles.menuDays}>
        {menu.days.map((item, index) => (
          <View key={index} style={styles.menuDayRow}>
            <Text style={styles.menuDay}>{item.day}</Text>
            <Text style={styles.menuMeal}>{item.meal}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderReviewItem = (review: typeof reviewsData.items[0]) => (
    <View key={review.id} style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Image source={{ uri: review.avatar }} style={styles.reviewAvatar} />
        <View style={styles.reviewInfo}>
          <Text style={styles.reviewName}>{review.name}</Text>
          <View style={styles.reviewStars}>
            {renderStars(review.rating, 14)}
          </View>
        </View>
        <Text style={styles.reviewDate}>{review.date}</Text>
      </View>
      <Text style={styles.reviewComment}>{review.comment}</Text>
      {review.images.length > 0 && (
        <View style={styles.reviewImages}>
          {review.images.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img }}
              style={styles.reviewImage}
            />
          ))}
        </View>
      )}
      <View style={styles.reviewActions}>
        <TouchableOpacity style={styles.reviewAction}>
          <Text style={styles.reviewActionText}>Lihat Balasan</Text>
          <Ionicons name="chevron-down" size={16} color="#FF7B00" />
        </TouchableOpacity>
        <View style={styles.reviewLikes}>
          <Ionicons name="heart-outline" size={20} color="#FF3B30" />
          <Text style={styles.reviewLikesText}>{review.likes}</Text>
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
        <Text style={styles.headerTitle}>{productData.title}</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#FF7B00" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
            }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>{productData.subtitle}</Text>
            <Text style={styles.heroDescription}>{productData.description}</Text>
          </View>
          <View style={styles.heroMeals}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150',
              }}
              style={styles.heroMealImage}
            />
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=150',
              }}
              style={styles.heroMealImage}
            />
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=150',
              }}
              style={styles.heroMealImage}
            />
          </View>
          <TouchableOpacity style={styles.heroCta}>
            <Text style={styles.heroCtaText}>Order Today</Text>
          </TouchableOpacity>
          <View style={styles.heroPagination}>
            <View style={styles.paginationDotActive} />
            <View style={styles.paginationDot} />
            <View style={styles.paginationDot} />
          </View>
        </View>

        {/* Provider Info */}
        <TouchableOpacity style={styles.providerSection}>
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
          <Ionicons name="chevron-forward" size={24} color="#FF7B00" />
        </TouchableOpacity>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{productData.title}</Text>
          <TouchableOpacity style={styles.productRating}>
            <View style={styles.starsRow}>
              {renderStars(productData.rating)}
            </View>
            <Text style={styles.ratingText}>
              {productData.rating} ({productData.reviewCount})
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#FF7B00" />
          </TouchableOpacity>
          <Text style={styles.priceLabel}>Mulai dari</Text>
          <Text style={styles.productPrice}>
            {formatPrice(productData.price)}
          </Text>
          {productData.halal && (
            <View style={styles.halalBadge}>
              <Text style={styles.halalText}>Halal</Text>
              <Ionicons name="shield-checkmark" size={16} color="#666" />
            </View>
          )}
        </View>

        {/* About Package */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>Tentang Paket</Text>
          <Text style={styles.aboutText}>
            {expanded ? productData.fullAbout : productData.about}
          </Text>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1543362906-ac1b48263852?w=600',
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

        {/* Daily Menu */}
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Menu Harian</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.menuScroll}
          >
            {menuOptions.map(renderMenuCard)}
          </ScrollView>
        </View>

        {/* Reviews */}
        <View style={styles.reviewSection}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewSectionTitle}>Review</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Lihat Semua</Text>
              <Ionicons name="chevron-forward" size={20} color="#FF7B00" />
            </TouchableOpacity>
          </View>

          {/* Rating Summary */}
          <View style={styles.ratingSummary}>
            <View style={styles.ratingSummaryLeft}>
              <Text style={styles.ratingAverage}>
                {reviewsData.average}
                <Text style={styles.ratingMax}> / 5</Text>
              </Text>
              <View style={styles.ratingStars}>
                {renderStars(reviewsData.average, 24)}
              </View>
              <Text style={styles.ratingCount}>
                {reviewsData.totalReviews} Reviews
              </Text>
            </View>
            <View style={styles.ratingDistribution}>
              {reviewsData.distribution.map((item) => (
                <View key={item.stars} style={styles.distributionRow}>
                  <Text style={styles.distributionStar}>{item.stars}</Text>
                  <View style={styles.distributionBar}>
                    <View
                      style={[
                        styles.distributionFill,
                        { width: `${item.percentage}%` },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Review Items */}
          {reviewsData.items.map(renderReviewItem)}
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.chatButton}>
          <Ionicons name="chatbubble-outline" size={24} color="#FF7B00" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderButtonText}>Pesan Sekarang</Text>
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
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroBanner: {
    height: 280,
    backgroundColor: '#0D2B3E',
    position: 'relative',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF8E7',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroDescription: {
    fontSize: 14,
    color: '#FFF8E7',
    textAlign: 'center',
    marginBottom: 20,
  },
  heroMeals: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
  },
  heroMealImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  heroCta: {
    backgroundColor: '#FFD700',
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 12,
    alignSelf: 'center',
    marginBottom: 16,
  },
  heroCtaText: {
    color: '#0D2B3E',
    fontSize: 16,
    fontWeight: '600',
  },
  heroPagination: {
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
  productInfo: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 1,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  starsRow: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#999',
    marginRight: 4,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF7B00',
    marginBottom: 12,
  },
  halalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  halalText: {
    fontSize: 14,
    color: '#666',
    marginRight: 6,
  },
  aboutSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 1,
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
  menuSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 1,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  menuScroll: {
    flexDirection: 'row',
    gap: 12,
  },
  menuCard: {
    width: 200,
    borderRadius: 16,
    padding: 16,
  },
  menuCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E3A',
    marginBottom: 4,
  },
  menuCardSubtitle: {
    fontSize: 12,
    color: '#1B5E3A',
    marginBottom: 16,
  },
  menuDays: {
    gap: 8,
  },
  menuDayRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  menuDay: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1B5E3A',
    width: 70,
  },
  menuMeal: {
    fontSize: 12,
    color: '#1B5E3A',
    flex: 1,
  },
  reviewSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  reviewSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FF7B00',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  seeAllText: {
    color: '#FF7B00',
    fontSize: 14,
    fontWeight: '600',
  },
  ratingSummary: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  ratingSummaryLeft: {
    borderRightWidth: 1,
    borderRightColor: '#D9D9D9',
    paddingRight: 16,
    marginRight: 16,
  },
  ratingAverage: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingMax: {
    fontSize: 20,
    color: '#999',
  },
  ratingStars: {
    marginTop: 8,
    marginBottom: 8,
  },
  ratingCount: {
    fontSize: 14,
    color: '#999',
  },
  ratingDistribution: {
    flex: 1,
    justifyContent: 'center',
  },
  distributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  distributionStar: {
    fontSize: 12,
    color: '#999',
    width: 16,
    marginRight: 8,
  },
  distributionBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E5E5',
    borderRadius: 3,
    overflow: 'hidden',
  },
  distributionFill: {
    height: '100%',
    backgroundColor: '#FFB800',
    borderRadius: 3,
  },
  reviewItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingBottom: 16,
    marginBottom: 16,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewInfo: {
    flex: 1,
    marginLeft: 12,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  reviewStars: {
    flexDirection: 'row',
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginTop: 12,
    marginBottom: 12,
  },
  reviewImages: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  reviewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  reviewActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewActionText: {
    color: '#FF7B00',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  reviewLikes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewLikesText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
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
  chatButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#FF7B00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  orderButton: {
    flex: 1,
    backgroundColor: '#FF7B00',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductDetailScreen;
