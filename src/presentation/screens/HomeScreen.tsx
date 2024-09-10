import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Reemplazo de expo-linear-gradient
import { HomeScreenNavigationProp } from '../../types/navigation';
import { colors } from '../../types/theme'; // Importamos los colores

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.loginButton} 
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Login')}
      >
        <Image 
          source={require('../../assets/logo_login.png')} 
          style={styles.loginIcon}
        />
      </TouchableOpacity>

      <Image 
        source={require('../../assets/escudo.png')} 
        style={styles.logo}
      />

      <View style={styles.menu}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Miembros')}>
          <Text style={styles.buttonText}>Miembros</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Noticias')}>
          <Text style={styles.buttonText}>Noticias</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Clasificacion')}>
          <Text style={styles.buttonText}>Clasificación</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Goleadores')}>
          <Text style={styles.buttonText}>Goleadores</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white, // Fondo blanco
  },
  loginButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  loginIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  menu: {
    marginTop: 20,
    width: '80%',
  },
  button: {
    backgroundColor: colors.primary, // Fondo azul
    padding: 15,
    borderRadius: 30,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: colors.white, // Texto en blanco
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default HomeScreen;
