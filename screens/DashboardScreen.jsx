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
import { Card, PaperProvider } from 'react-native-paper';
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
        <Text style={styles.chartTitle}>Son 7 Günlük Log Sayısı</Text>
        <LineChart
          data={{
            labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
            datasets: [{ data: [50, 70, 90, 80, 100, 60, 75] }],
          }}
          width={screenWidth - 20}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
            strokeWidth: 2,
          }}
          bezier
          style={styles.chart}
        />
      </TouchableOpacity>

      {/* Pie Chart */}
      <TouchableOpacity onPress={() => handlePress('Pie Chart')}>
        <Text style={styles.chartTitle}>Log Dağılımı</Text>
        <PieChart
          data={pieData}
          width={screenWidth - 20}
          height={200}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
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
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
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
  chart: {
    borderRadius: 10,
    marginTop: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
});

