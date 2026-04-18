import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/colors';
import { StarRating } from './StarRating';

interface ReviewCardProps {
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  images?: string[];
  helpfulCount?: number;
  isHelpful?: boolean;
  onHelpfulPress?: () => void;
  onEditPress?: () => void;
}

export function ReviewCard({
  userName,
  userAvatar,
  rating,
  date,
  comment,
  images,
  helpfulCount = 0,
  isHelpful = false,
  onHelpfulPress,
  onEditPress,
}: ReviewCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          {userAvatar ? (
            <Image source={{ uri: userAvatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={20} color={Colors.textTertiary} />
            </View>
          )}
          <View>
            <Text style={styles.userName}>{userName}</Text>
            <View style={styles.ratingRow}>
              <StarRating rating={rating} size={12} />
              <Text style={styles.date}>{date}</Text>
            </View>
          </View>
        </View>

        {onEditPress && (
          <TouchableOpacity onPress={onEditPress} style={styles.editButton}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.comment}>{comment}</Text>

      {images && images.length > 0 && (
        <View style={styles.imageGrid}>
          {images.map((img, idx) => (
            <Image key={idx} source={{ uri: img }} style={styles.reviewImage} />
          ))}
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.helpfulButton, isHelpful && styles.activeHelpfulButton]} 
          onPress={onHelpfulPress}
        >
          <Ionicons 
            name={isHelpful ? "thumbs-up" : "thumbs-up-outline"} 
            size={16} 
            color={isHelpful ? Colors.primary : Colors.textSecondary} 
          />
          <Text style={[styles.helpfulText, isHelpful && styles.activeHelpfulText]}>
            Membantu ({helpfulCount})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 11,
    color: Colors.textTertiary,
    marginLeft: 8,
  },
  comment: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  imageGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  reviewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: 12,
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activeHelpfulButton: {
    // optional active styling
  },
  helpfulText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  activeHelpfulText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  editText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '700',
  },
});
