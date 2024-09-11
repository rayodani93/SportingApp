import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Title, Subheading } from 'react-native-paper';
import { RegisterScreenNavigationProp } from '../../types/navigation';
import { colors } from '../../types/theme'; // Importamos los colores

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Título */}
      <Title style={styles.title}>Únete a Sporting</Title>
      <Subheading style={styles.subtitle}>¿Cuál es tu rol?</Subheading>

      {/* Botón para Jugador */}
      <TouchableOpacity 
        style={[styles.button, styles.playerButton]} 
        onPress={() => navigation.navigate('JugadorRegister')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Jugador</Text>
      </TouchableOpacity>
      
      {/* Imagen de Jugador */}
      <Image 
        source={require('../../assets/Masen.jpeg')} 
        style={styles.image}
      />

      {/* Botón para Aficionado */}
      <TouchableOpacity 
        style={[styles.button, styles.fanButton]} 
        onPress={() => navigation.navigate('AficionadoRegister')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Aficionado</Text>
      </TouchableOpacity>

      {/* Imagen de Aficionado */}
      <Image 
        source={require('../../assets/Fari.jpeg')} 
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white, // Fondo blanco
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.strongBlue, // Color azul fuerte
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 40,
    color: colors.primary, // Color azul primario para consistencia
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
    backgroundColor: colors.primary, // Azul para el botón de Jugador
  },
  fanButton: {
    backgroundColor: colors.secondary, // Azul más claro para el botón de Aficionado
  },
  buttonText: {
    color: colors.white, // Texto blanco
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  image: {
    width: 180,
    height: 120, // Ajustamos la altura para que la cabeza no se corte
    marginBottom: 20,
    resizeMode: 'contain', // Mostramos la imagen completa sin cortes
  },
});

export default RegisterScreen;
