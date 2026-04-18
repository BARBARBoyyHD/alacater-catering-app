import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/src/constants/colors';
import { useOrderStore } from '@/src/store/orderStore';
import { cateringData } from '@/src/data/mockData';
import { StarRating } from '@/src/components/common/StarRating';
import { ReviewCard } from '@/src/components/common/ReviewCard';

const { width } = Dimensions.get('window');

const ProductDetailScreen: React.FC = () => {
  const router = useRouter();
  const { setPackage } = useOrderStore();
  const [expanded, setExpanded] = useState(false);

  const handleMenuPress = (item: string) => {
    Alert.alert('Menu Selected', `You tapped on: ${item}`);
  };

  const handleOrderPress = () => {
    // For mockup, we use the first package of the first provider
    const pkg = cateringData[0].packages[0];
    setPackage(pkg);
    router.push('/checkout');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 1.1 Hero Banner */}
        <View style={styles.heroBanner}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600' }}
            style={styles.heroImage}
          />
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.white} />
          </TouchableOpacity>
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Keto Diet — Premium</Text>
            <Text style={styles.heroSubtitle}>Low-carb, high-protein meals</Text>
          </View>
        </View>

        {/* 1.2 Provider Info */}
        <View style={styles.section}>
          <View style={styles.providerRow}>
            <View style={styles.providerLogo}><Ionicons name="restaurant" size={24} color={Colors.textSecondary} /></View>
            <View>
              <Text style={styles.providerName}>
                Catering Kamu <Ionicons name="checkmark-circle" size={16} color={Colors.primary} />
              </Text>
              <Text style={styles.providerRating}>4.8 (4,2RB Reviews)</Text>
            </View>
          </View>
        </View>

        {/* 1.3 Pricing & Options */}
        <View style={styles.section}>
          <Text style={styles.title}>Keto Diet — Premium</Text>
          <Text style={styles.price}>Rp350.000</Text>
        </View>

        {/* 1.4 About Package */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tentang Paket</Text>
          <Text numberOfLines={expanded ? undefined : 3} style={styles.text}>
            Kami menghadirkan menu premium dengan bahan segar berkualitas tinggi, diolah oleh tim berpengalaman.
          </Text>
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text style={styles.expandText}>{expanded ? 'Tutup' : 'Selengkapnya'}</Text>
          </TouchableOpacity>
        </View>

        {/* 1.5 Menu Carousel */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Menu Harian</Text>
          <TouchableOpacity style={styles.menuCard} onPress={() => handleMenuPress('Daily Menu')}>
            <Text style={styles.menuCardTitle}>Weekly Menu</Text>
          </TouchableOpacity>
        </View>

        {/* 1.6 Reviews */}
        <View style={styles.section}>
          <View style={styles.reviewHeader}>
            <Text style={styles.sectionTitle}>Ulasan Pembeli</Text>
            <TouchableOpacity onPress={() => router.push({ pathname: '/reviews/list', params: { productId: '1' } })}>
              <Text style={styles.seeAllText}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.ratingSummary}>
            <Ionicons name="star" size={24} color={Colors.warning} />
            <Text style={styles.ratingAverage}>4.8</Text>
            <Text style={styles.ratingCount}>/ 5.0 (1,5RB Ulasan)</Text>
          </View>

          <ReviewCard 
            userName="Andi Saputra"
            rating={5}
            date="15 Apr 2026"
            comment="Makanannya enak sekali! Porsinya pas untuk makan siang. Pengiriman juga tepat waktu."
            helpfulCount={12}
          />
        </View>
      </ScrollView>

      {/* 1.7 Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.chatButton}>
            <Ionicons name="chatbubble-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderButton} onPress={handleOrderPress}>
          <Text style={styles.orderButtonText}>Pesan Sekarang</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingBottom: 20 },
  section: { padding: 20, borderBottomWidth: 1, borderBottomColor: Colors.borderLight, backgroundColor: Colors.card },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10, color: Colors.textPrimary },
  heroBanner: { height: 250, backgroundColor: Colors.background },
  heroImage: { width: '100%', height: '100%' },
  backButton: { position: 'absolute', top: 50, left: 20, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  heroOverlay: { position: 'absolute', bottom: 20, left: 20 },
  heroTitle: { fontSize: 24, fontWeight: '700', color: Colors.white },
  heroSubtitle: { fontSize: 14, color: Colors.white },
  providerRow: { flexDirection: 'row', alignItems: 'center' },
  providerLogo: { width: 50, height: 50, borderRadius: 12, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  providerName: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary },
  providerRating: { fontSize: 14, color: Colors.textSecondary },
  title: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary, marginBottom: 5 },
  price: { fontSize: 20, fontWeight: '700', color: Colors.primary },
  text: { fontSize: 14, color: Colors.textSecondary, lineHeight: 20 },
  expandText: { color: Colors.primary, marginTop: 5, fontWeight: '600' },
  menuCard: { padding: 20, backgroundColor: Colors.card, borderRadius: 12, marginTop: 10, borderWidth: 1, borderColor: Colors.borderLight },
  menuCardTitle: { fontWeight: '600', color: Colors.textPrimary },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { marginLeft: 6, color: Colors.textSecondary },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  seeAllText: { color: Colors.primary, fontWeight: '700', fontSize: 13 },
  ratingSummary: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  ratingAverage: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary, marginLeft: 8 },
  ratingCount: { fontSize: 14, color: Colors.textSecondary, marginLeft: 4 },
  bottomBar: { flexDirection: 'row', padding: 20, borderTopWidth: 1, borderTopColor: Colors.borderLight, backgroundColor: Colors.white },
  chatButton: { width: 50, justifyContent: 'center', alignItems: 'center', borderColor: Colors.primary, borderWidth: 1.5, borderRadius: 8, marginRight: 10 },
  orderButton: { flex: 1, padding: 15, alignItems: 'center', backgroundColor: Colors.primary, borderRadius: 8 },
  orderButtonText: { color: Colors.white, fontWeight: '700' },
});

export default ProductDetailScreen;
