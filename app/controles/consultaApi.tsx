// app/controles/WeatherCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WeatherData } from '../../app/api/apiClima';

interface Props {
  item: WeatherData;
}

//manejo del color
const WeatherCard: React.FC<Props> = ({ item }) => {
  let backgroundColor = 'blue';
  if (item.maxTemp >= 21 && item.maxTemp <= 30) {
    backgroundColor = 'yellow';
  } else if (item.maxTemp > 30) {
    backgroundColor = 'orange';
  }

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <Text style={styles.date}>
        {item.day}, {item.date}
      </Text>
      <Text style={styles.temp}>
        Max: {item.maxTemp.toFixed(1)}°C  -  Min: {item.minTemp.toFixed(1)}°C
      </Text>
      <Text style={styles.description}>{item.weatherDescription}</Text>
      <Text style={styles.pop}>Prob. de lluvia: {item.pop}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 16,
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  pop: {
    fontSize: 14,
  },
});

export default WeatherCard;
