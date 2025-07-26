import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Card } from 'react-native-paper';
import { LineChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const DashboardScreen = () => {
  const logCounts = [
    { name: 'Info', count: 120, color: '#4CAF50' },
    { name: 'Warning', count: 45, color: '#FFC107' },
    { name: 'Error', count: 30, color: '#F44336' },
    { name: 'Debug', count: 60, color: '#2196F3' },
  ];

  const pieData = logCounts.map((item) => ({
    name: item.name,
    population: item.count,
    color: item.color,
    legendFontColor: '#333',
    legendFontSize: 12,
  }));

  const handlePress = (label) => {
    Alert.alert('Tıklama', `${label} tıklandı`);
  };

  // Saatlik log etiketleri (SAAT ayrı, TARİH üstte gösterilecek)
  const hourlyLabels = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
  const hourlyData = [5, 8, 12, 20, 18, 10, 15, 25];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => handlePress('Log Dashboard Başlığı')}>
        <Text style={styles.title}>Dashboard</Text>
      </TouchableOpacity>

      {/* Kartlar */}
      <View style={styles.cardRow}>
        {logCounts.map((item, index) => (
          <View key={index} style={styles.cardWrapper}>
            <TouchableOpacity onPress={() => handlePress(`${item.name} Kart`)}>
              <Card style={[styles.card, { backgroundColor: item.color }]}>
                <Card.Content>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardValue}>{item.count}</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Line Chart */}
      <TouchableOpacity onPress={() => handlePress('Line Chart')}>
        <Text style={styles.chartTitle}>Saat Bazlı Log Sayısı</Text>
      </TouchableOpacity>

      {/* Tarih Başlığı */}
      <Text style={styles.dateLabel}>Tarih: 25/07/2025</Text>

      <LineChart
        data={{
          labels: hourlyLabels,
          datasets: [
            {
              data: hourlyData,
            },
          ],
        }}
        width={screenWidth - 20}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#f4f6f8',
          backgroundGradientTo: '#f4f6f8',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: '5',
            strokeWidth: '2',
            stroke: '#2196F3',
          },
        }}
        bezier
        style={styles.chart}
        onDataPointClick={({ value, index }) => {
          const label = hourlyLabels[index];
          Alert.alert('Saatlik Log', `25/07 ${label} saatinde ${value} log var`);
        }}
      />

      {/* Pie Chart */}
      <TouchableOpacity onPress={() => handlePress('Pie Chart')}>
        <Text style={styles.chartTitle}>Log Dağılımı</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Alert.alert('Log Dağılımı', 'Daha fazla detay için çalışılıyor...')}
      >
        <PieChart
          data={pieData}
          width={screenWidth - 20}
          height={220}
          chartConfig={{
            color: () => `#000`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={styles.chart}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f6f8',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    alignSelf: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cardWrapper: {
    width: '48%',
    marginBottom: 12,
  },
  card: {
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    alignSelf: 'center',
  },
  dateLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  chart: {
    borderRadius: 10,
    marginTop: 10,
  },
});
