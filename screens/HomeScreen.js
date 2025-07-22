import React from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { LineChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Log Dashboard</Text>

      {/* Kartlar */}
      <View style={styles.cardRow}>
        {logCounts.map((item, index) => (
          <Card key={index} style={[styles.card, { backgroundColor: item.color }]}>
            <Card.Content>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardValue}>{item.count}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Line Chart */}
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

      {/* Pie Chart */}
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
    </ScrollView>
  );
};

export default HomeScreen;

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
  },
  card: {
    width: '48%',
    marginVertical: 8,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    color: '#fff',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
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
});
