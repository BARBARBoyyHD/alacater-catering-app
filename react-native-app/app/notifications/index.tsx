import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/src/constants/colors';
import { useNotificationStore } from '@/src/store/notificationStore';
import { NotificationItem } from '@/src/components/common/NotificationItem';

export default function NotificationListScreen() {
  const router = useRouter();
  const { notifications, markAsRead, markAllAsRead, clearAll } = useNotificationStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} /></TouchableOpacity>
        <Text style={styles.title}>Notifikasi</Text>
        <TouchableOpacity onPress={markAllAsRead}><Text style={styles.actionText}>Tandai Dibaca</Text></TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <NotificationItem 
            notification={item} 
            onPress={() => {
              markAsRead(item.id);
              if (item.data?.screen) router.push(`/${item.data.screen}/${item.data.id}`);
            }} 
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
        <Text style={styles.clearText}>Hapus Semua</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: Colors.card }, header: { flexDirection: 'row', padding: 20, alignItems: 'center', justifyContent: 'space-between' }, title: { fontSize: 18, fontWeight: '700' }, actionText: { color: Colors.primary }, clearButton: { padding: 20, alignItems: 'center' }, clearText: { color: Colors.error } });
