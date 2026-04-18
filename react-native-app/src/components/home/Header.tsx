import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/colors';
import { useNotificationStore } from '@/src/store/notificationStore';

interface HeaderProps {
  location: string;
  onLocationPress: () => void;
  chatCount?: number;
}

export function Header({ location, onLocationPress, chatCount = 2 }: HeaderProps) {
  const { unreadCount } = useNotificationStore();
  
  return (
    <View style={styles.container}>
      <Text style={styles.locationLabel}>Lokasi</Text>
      <View style={styles.headerContent}>
        <TouchableOpacity style={styles.locationButton} onPress={onLocationPress}>
          <Ionicons name="location" size={20} color={Colors.primary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {location}
          </Text>
          <Ionicons name="chevron-down" size={20} color={Colors.primary} />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="chatbubble-ellipses" size={24} color={Colors.textPrimary} />
            {chatCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{chatCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications" size={24} color={Colors.textPrimary} />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount > 9 ? '9+' : unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  locationLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
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
    backgroundColor: Colors.card,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flex: 1,
    marginRight: 12,
  },
  locationText: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
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
    backgroundColor: Colors.error,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: Colors.card,
    fontSize: 12,
    fontWeight: '600',
  },
});
