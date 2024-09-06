import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ClasificacionScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Clasificación</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ClasificacionScreen;
