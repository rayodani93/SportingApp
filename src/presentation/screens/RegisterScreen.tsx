import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Title, Subheading } from 'react-native-paper';
import { RegisterScreenNavigationProp } from '../../types/navigation';
import { colors } from '../../types/theme';
import TopBar from './components/TopBar'; 

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Imagen de fondo */}
      <Image source={require('../../assets/Maradona.jpeg')} style={styles.backgroundImage} />

      {/* Añadir TopBar fuera del overlay */}
      <TopBar title="Registro" />

      {/* Overlay semitransparente */}
      <View style={styles.overlay}>
        {/* Título */}
        <Title style={styles.title}>Únete a Sporting</Title>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.strongBlue,
  },
  button: {
    paddingVertical: 15,
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
    backgroundColor: '#4CAF50', // Verde para Jugador
  },
  fanButton: {
    backgroundColor: '#8BC34A', // Verde más claro para Aficionado
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  image: {
    width: 180,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default RegisterScreen;
