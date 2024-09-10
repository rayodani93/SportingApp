import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Title, Subheading } from 'react-native-paper';
import { RegisterScreenNavigationProp } from '../../types/navigation';

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Título */}
      <Title style={styles.title}>Únete a Sporting</Title>
      <Subheading style={styles.subtitle}>¿Cuál es tu rol?</Subheading>

      {/* Botones para seleccionar el rol */}
      <TouchableOpacity 
        style={[styles.button, styles.playerButton]} 
        onPress={() => navigation.navigate('JugadorRegister')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Jugador</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.fanButton]} 
        onPress={() => navigation.navigate('AficionadoRegister')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Aficionado</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 40,
    color: '#666',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  playerButton: {
    backgroundColor: '#4CAF50', // Color verde para el botón de Jugador
  },
  fanButton: {
    backgroundColor: '#2196F3', // Color azul para el botón de Aficionado
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default RegisterScreen;
