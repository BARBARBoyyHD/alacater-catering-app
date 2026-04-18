import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/src/constants/colors';

export default function NotificationSettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Preferensi Notifikasi</Text>
      <View style={styles.row}>
        <Text>Promosi</Text>
        <Switch value={true} />
      </View>
      <View style={styles.row}>
        <Text>Update Pesanan</Text>
        <Switch value={true} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, title: { fontSize: 20, fontWeight: '700', marginBottom: 20 }, row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: Colors.borderLight } });
