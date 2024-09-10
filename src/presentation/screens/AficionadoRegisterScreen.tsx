import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AficionadosScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Registro Aficionados</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Fondo blanco
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Color del texto
  },
});

export default AficionadosScreen;