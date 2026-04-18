import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '@/src/constants/colors';
import { StarRating } from '@/src/components/common/StarRating';

export default function ReviewSubmissionScreen() {
  const router = useRouter();
  const { orderId, editId } = useLocalSearchParams();
  
  const [ratings, setRatings] = useState({
    overall: editId ? 5 : 0,
    taste: editId ? 5 : 0,
    quality: editId ? 5 : 0,
    delivery: editId ? 4 : 0,
  });
  const [comment, setComment] = useState(editId ? 'Makanannya enak sekali! Porsinya pas untuk makan siang. Pengiriman juga tepat waktu.' : '');
  const [images, setImages] = useState<string[]>(editId ? ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200'] : []);
  const [isSubmitting, setIsProcessing] = useState(false);

  const updateRating = (key: keyof typeof ratings, value: number) => {
    setRatings(prev => ({ ...prev, [key]: value }));
  };

  const pickImage = async () => {
    if (images.length >= 3) {
      Alert.alert('Batas Foto', 'Anda hanya dapat mengunggah maksimal 3 foto.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (ratings.overall === 0) {
      Alert.alert('Rating Diperlukan', 'Mohon berikan rating keseluruhan.');
      return;
    }
    if (comment.length < 10) {
      Alert.alert('Ulasan Terlalu Pendek', 'Mohon berikan ulasan minimal 10 karakter.');
      return;
    }

    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert('Berhasil', editId ? 'Ulasan Anda telah diperbarui!' : 'Terima kasih atas ulasan Anda!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Beri Ulasan</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rating Keseluruhan</Text>
          <StarRating 
            rating={ratings.overall} 
            onRatingChange={(v) => updateRating('overall', v)} 
            size={40} 
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rating Kategori</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.ratingLabel}>Rasa Makanan</Text>
            <StarRating 
              rating={ratings.taste} 
              onRatingChange={(v) => updateRating('taste', v)} 
              size={24} 
            />
          </View>
          <View style={styles.ratingRow}>
            <Text style={styles.ratingLabel}>Kualitas Bahan</Text>
            <StarRating 
              rating={ratings.quality} 
              onRatingChange={(v) => updateRating('quality', v)} 
              size={24} 
            />
          </View>
          <View style={styles.ratingRow}>
            <Text style={styles.ratingLabel}>Pengiriman</Text>
            <StarRating 
              rating={ratings.delivery} 
              onRatingChange={(v) => updateRating('delivery', v)} 
              size={24} 
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bagikan Pengalaman Anda</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Tulis ulasan Anda di sini (minimal 10 karakter)..."
            multiline
            numberOfLines={5}
            value={comment}
            onChangeText={setComment}
            placeholderTextColor={Colors.textTertiary}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Foto (Opsional)</Text>
          <Text style={styles.sectionSubtitle}>Maksimal 3 foto</Text>
          <View style={styles.imageGrid}>
            {images.map((uri, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri }} style={styles.previewImage} />
                <TouchableOpacity 
                  style={styles.removeImageButton} 
                  onPress={() => removeImage(index)}
                >
                  <Ionicons name="close-circle" size={20} color={Colors.error} />
                </TouchableOpacity>
              </View>
            ))}
            {images.length < 3 && (
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                <Ionicons name="camera-outline" size={32} color={Colors.primary} />
                <Text style={styles.uploadText}>Tambah Foto</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.submitButton, isSubmitting && styles.disabledButton]} 
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.submitButtonText}>Kirim Ulasan</Text>
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
  scrollContent: { paddingBottom: 100 },
  section: { padding: 20, backgroundColor: Colors.card, marginBottom: 10 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 15 },
  sectionSubtitle: { fontSize: 12, color: Colors.textTertiary, marginTop: -10, marginBottom: 15 },
  ratingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  ratingLabel: { fontSize: 14, color: Colors.textSecondary },
  textInput: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 15,
    fontSize: 14,
    color: Colors.textPrimary,
    textAlignVertical: 'top',
    height: 120,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  imageGrid: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  imageWrapper: { width: 90, height: 90, borderRadius: 8, overflow: 'hidden' },
  previewImage: { width: '100%', height: '100%' },
  removeImageButton: { position: 'absolute', top: 5, right: 5, backgroundColor: Colors.white, borderRadius: 10 },
  uploadButton: {
    width: 90,
    height: 90,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
  },
  uploadText: { fontSize: 10, color: Colors.primary, fontWeight: '700', marginTop: 5 },
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
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
  },
  disabledButton: { backgroundColor: Colors.disabled },
  submitButtonText: { color: Colors.white, fontWeight: '700', fontSize: 16 },
});
