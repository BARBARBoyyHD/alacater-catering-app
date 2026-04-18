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
import { useRouter } from 'expo-router';
import { Colors } from '@/src/constants/colors';

const { width } = Dimensions.get('window');

// Mock data (temporary, will be replaced with TanStack Query)
const profileData = {
  name: 'Catering Kamu',
  rating: 4.8,
  reviews: '4,2RB',
  verified: true,
  tagline: 'Fresh meals, made for you',
  about: 'Kami menghadirkan cita rasa autentik dengan bahan berkualitas dan layanan terbaik.',
};

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
    ],
  },
];

export default function CateringProfileScreen() {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header Image */}
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600' }}
            style={styles.headerImage}
          />
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileLogo}>
            <Ionicons name="restaurant" size={32} color={Colors.textTertiary} />
          </View>
          <Text style={styles.profileName}>{profileData.name} <Ionicons name="checkmark-circle" size={18} color={Colors.primary} /></Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color={Colors.warning} />
            <Text style={styles.profileRating}>{profileData.rating} ({profileData.reviews} ulasan)</Text>
          </View>
          <TouchableOpacity style={styles.chatButton}>
            <Ionicons name="chatbubble" size={18} color={Colors.white} />
            <Text style={styles.chatButtonText}>Chat</Text>
          </TouchableOpacity>
        </View>

        {/* About Provider */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tentang Provider</Text>
          <Text style={styles.aboutText} numberOfLines={expanded ? undefined : 3}>
            {profileData.about}
          </Text>
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text style={styles.expandText}>{expanded ? 'Selengkapnya' : 'Tutup'}</Text>
          </TouchableOpacity>
        </View>

        {/* Package Categories */}
        {packageCategories.map((category) => (
          <View key={category.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{category.title}</Text>
            <View style={styles.packagesRow}>
              {category.packages.map((pkg) => (
                <TouchableOpacity key={pkg.id} style={styles.packageCard} onPress={() => router.push('/product-detail')}>
                  <Image source={{ uri: pkg.image }} style={styles.packageImage} />
                  <View style={styles.packageContent}>
                    <Text style={styles.packageName}>{pkg.name}</Text>
                    <Text style={styles.packagePrice}>Rp{pkg.price.toLocaleString('id-ID')}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingBottom: 40 },
  headerContainer: { height: 200 },
  headerImage: { width: '100%', height: '100%' },
  backButton: { position: 'absolute', top: 50, left: 16, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  profileSection: { backgroundColor: Colors.card, padding: 20, alignItems: 'center', marginTop: -40, marginHorizontal: 20, borderRadius: 16 },
  profileLogo: { width: 64, height: 64, borderRadius: 16, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  profileName: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  profileRating: { fontSize: 14, color: Colors.textSecondary, marginLeft: 6 },
  chatButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary, paddingHorizontal: 40, paddingVertical: 12, borderRadius: 24, gap: 8 },
  chatButtonText: { color: Colors.white, fontWeight: '600' },
  section: { backgroundColor: Colors.card, padding: 20, marginTop: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: 10 },
  aboutText: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22 },
  expandText: { color: Colors.primary, fontWeight: '600', marginTop: 8 },
  packagesRow: { flexDirection: 'row', gap: 12 },
  packageCard: { width: width * 0.4, backgroundColor: Colors.background, borderRadius: 12, overflow: 'hidden' },
  packageImage: { width: '100%', height: 100 },
  packageContent: { padding: 10 },
  packageName: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  packagePrice: { fontSize: 14, fontWeight: '700', color: Colors.primary, marginTop: 4 },
});
