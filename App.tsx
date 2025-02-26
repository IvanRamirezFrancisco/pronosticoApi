import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
import WeatherCard from './app/controles/consultaApi';
import { fetchWeatherData, WeatherData } from './app/api/apiClima';

const App = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await fetchWeatherData();
        setWeatherData(data);
      } catch (error) {
        console.error('Error al obtener los datos del clima:', error);
      } finally {
        setLoading(false);
      }
    };
    getWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pronóstico de Clima</Text>
      <FlatList
        data={weatherData}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => <WeatherCard item={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
  },
  list: {
    paddingHorizontal: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
