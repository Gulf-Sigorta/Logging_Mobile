import React, { useState } from 'react';
import { View, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { Text, Switch, Button, Card } from 'react-native-paper';

export default function ProfileScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Kullanıcı bilgileri örnek
  const user = {
    name: 'Eray Duman',
    email: 'eray.duman@gig.com.tr',
    position: 'Backend Developer',
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    // Burada izinleri kontrol edip, kaydedebilirsin
  };

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Çıkış yapmak istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Evet', 
          onPress: () => {
            navigation.replace('Login'); // Login ekranına dön
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Profil Bilgileri Kartı */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>👤 Profil Bilgileri</Text>
            <Text style={styles.info}>Ad Soyad: {user.name}</Text>
            <Text style={styles.info}>E-posta: {user.email}</Text>
            <Text style={styles.info}>Pozisyon: {user.position}</Text>
          </Card.Content>
        </Card>

        {/* Bildirim Aç/Kapa Kartı */}
        <Card style={styles.card}>
          <Card.Content style={styles.row}>
            <Text style={styles.info}>🔔 Bildirimleri Aç/Kapat</Text>
            <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
          </Card.Content>
        </Card>

        {/* Çıkış Yap Butonu */}
        <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
          Çıkış Yap
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  container: { 
    flex: 1, 
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'flex-start', 
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: '#d32f2f',
    paddingVertical: 8,
    borderRadius: 10,
  },
});
