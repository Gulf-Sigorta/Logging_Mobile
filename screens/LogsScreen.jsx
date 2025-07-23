import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import { Card } from 'react-native-paper';

// Sample logs aynen buraya kalsın
const sampleLogs = [
  { id: '1', type: 'Info', message: 'Uygulama başlatıldı', time: '10:12' },
  { id: '2', type: 'Warning', message: 'Düşük pil seviyesi', time: '10:15' },
  { id: '3', type: 'Error', message: 'Bağlantı hatası', time: '10:18' },
  { id: '4', type: 'Debug', message: 'Butona tıklandı', time: '10:21' },
  { id: '5', type: 'Info', message: 'Kullanıcı giriş yaptı', time: '10:25' },
  { id: '6', type: 'Warning', message: 'Depolama alanı dolmak üzere', time: '10:30' },
  { id: '7', type: 'Error', message: 'Veri tabanı bağlantısı başarısız', time: '10:35' },
  { id: '8', type: 'Debug', message: 'API isteği gönderildi', time: '10:40' },
  { id: '9', type: 'Info', message: 'Bildirim alındı', time: '10:45' },
  { id: '10', type: 'Warning', message: 'Yavaş internet bağlantısı', time: '10:50' },
  { id: '11', type: 'Error', message: 'Dosya yükleme hatası', time: '10:55' },
  { id: '12', type: 'Debug', message: 'Sayfa yenilendi', time: '11:00' },
  { id: '13', type: 'Info', message: 'Kullanıcı çıkış yaptı', time: '11:05' },
  { id: '14', type: 'Warning', message: 'Hafıza kullanımı yüksek', time: '11:10' },
  { id: '15', type: 'Error', message: 'Yetki reddedildi', time: '11:15' },
  { id: '16', type: 'Debug', message: 'Animasyon başlatıldı', time: '11:20' },
  { id: '17', type: 'Info', message: 'Yedekleme tamamlandı', time: '11:25' },
  { id: '18', type: 'Warning', message: 'Güvenlik açığı tespit edildi', time: '11:30' },
  { id: '19', type: 'Error', message: 'Sunucu yanıt vermiyor', time: '11:35' },
  { id: '20', type: 'Debug', message: 'Cache temizlendi', time: '11:40' },
  { id: '21', type: 'Info', message: 'Yeni mesaj alındı', time: '11:45' },
  { id: '22', type: 'Warning', message: 'Kota sınırı aşıldı', time: '11:50' },
  { id: '23', type: 'Error', message: 'Veri kaybı tespit edildi', time: '11:55' },
  { id: '24', type: 'Debug', message: 'Performans testi yapıldı', time: '12:00' },
  { id: '25', type: 'Info', message: 'Oturum yenilendi', time: '12:05' },
  { id: '26', type: 'Warning', message: 'Çok sayıda başarısız giriş denemesi', time: '12:10' },
  { id: '27', type: 'Error', message: 'Donanım arızası', time: '12:15' },
  { id: '28', type: 'Debug', message: 'Veri senkronizasyonu tamamlandı', time: '12:20' },
  { id: '29', type: 'Info', message: 'Güncelleme başarıyla yüklendi', time: '12:25' },
  { id: '30', type: 'Warning', message: 'Kullanıcı etkin değil', time: '12:30' },
];

export default function LogsScreen() {
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [searchText, setSearchText] = useState('');

  // Filtreleme: selectedLevel ve searchText birlikte
  const filteredLogs = sampleLogs.filter(log => {
    const levelMatches = selectedLevel === 'All' || log.type === selectedLevel;
    const searchLower = searchText.toLowerCase();

    // Log mesajı veya seviyesi arama metnini içeriyorsa
    const searchMatches =
      log.message.toLowerCase().includes(searchLower) ||
      log.type.toLowerCase().includes(searchLower);

    return levelMatches && searchMatches;
  });

  const openModal = (log) => {
    setSelectedLog(log);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <Card style={[styles.card, { borderLeftColor: getColor(item.type) }]}>
        <Card.Content>
          <Text style={styles.type}>{item.type}</Text>
          <Text>{item.message}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const levels = ['All', 'Info', 'Warning', 'Error', 'Debug'];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Log Kayıtları</Text>

      {/* Search Bar */}
      <TextInput
        placeholder="Log mesajında veya seviyesinde ara..."
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchInput}
        clearButtonMode="while-editing"
      />

      {/* Seviye filtreleme butonları */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {levels.map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  selectedLevel === level ? getColor(level) : '#e0e0e0',
              },
            ]}
            onPress={() => setSelectedLevel(level)}
          >
            <Text style={styles.filterText}>{level}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Log listesi */}
      <FlatList
        data={filteredLogs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedLog && (
              <>
                <Text style={styles.modalTitle}>{selectedLog.type}</Text>
                <Text style={styles.modalText}>{selectedLog.message}</Text>
                <Text style={styles.modalTime}>{selectedLog.time}</Text>
              </>
            )}
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: '#fff' }}>Kapat</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const getColor = (type) => {
  switch (type) {
    case 'Info':
      return '#4CAF50';
    case 'Warning':
      return '#FFC107';
    case 'Error':
      return '#F44336';
    case 'Debug':
      return '#2196F3';
    default:
      return '#9E9E9E';
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f6f8',
    flex: 1,
    paddingTop: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  filterRow: {
    paddingVertical: 8,
    height: 50,
    paddingHorizontal: 4,
    gap: 8,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginHorizontal: 4,
    width: 100,
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    marginVertical: 5,
    paddingHorizontal: 10,
    borderLeftWidth: 6,
    borderRadius: 8,
    elevation: 2,
  },
  type: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  time: {
    marginTop: 4,
    color: 'gray',
    fontSize: 12,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalTime: {
    color: 'gray',
    fontSize: 12,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
});
