import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/colors';
import { Notification } from '@/src/store/notificationStore';

interface NotificationItemProps {
  notification: Notification;
  onPress: () => void;
}

export function NotificationItem({ notification, onPress }: NotificationItemProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, !notification.read && styles.unread]} 
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="notifications" size={20} color={notification.read ? Colors.textTertiary : Colors.primary} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, !notification.read && styles.unreadText]}>{notification.title}</Text>
        <Text style={styles.body} numberOfLines={2}>{notification.body}</Text>
        <Text style={styles.timestamp}>{new Date(notification.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</Text>
      </View>
      {!notification.read && <View style={styles.dot} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  unread: { backgroundColor: Colors.primaryLight },
  iconContainer: { marginRight: 12, marginTop: 4 },
  content: { flex: 1 },
  title: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  unreadText: { color: Colors.textPrimary },
  body: { fontSize: 13, color: Colors.textSecondary, marginTop: 4 },
  timestamp: { fontSize: 11, color: Colors.textTertiary, marginTop: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary, marginLeft: 8, marginTop: 6 },
});
