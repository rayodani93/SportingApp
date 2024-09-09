import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { HomeScreenNavigationProp } from '../../types/navigation'; // Asegúrate de que la ruta es correcta

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sporting de Maderasa Bar Juanjo</Text>
      <Image 
        source={require('../../assets/escudo.png')} // Ruta de la imagen del escudo
        style={styles.logo}
      />

      {/* Menú de navegación debajo del escudo */}
      <View style={styles.menu}>
        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.7} // Ajusta la opacidad al presionar
          onPress={() => navigation.navigate('Miembros')}
        >
          <Text style={styles.buttonText}>Miembros</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Noticias')}
        >
          <Text style={styles.buttonText}>Noticias</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Clasificacion')}
        >
          <Text style={styles.buttonText}>Clasificación</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Goleadores')}
        >
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
    backgroundColor: '#FFFFFF', // Fondo blanco
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000', // Color del título en negro
    marginBottom: 20,
    fontFamily: 'debrosee', // Usa aquí la fuente Roboto
    textTransform: 'uppercase',
    textAlign: 'center',
    padding: 10,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  menu: {
    marginTop: 20,
    width: '80%',
  },
  button: {
    backgroundColor: '#000', // Fondo negro
    padding: 15,
    borderRadius: 5,
    marginVertical: 7,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF', // Texto en blanco
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto', // Usa aquí la fuente Roboto para el texto de los botones
    textTransform: 'uppercase',
  },
});

export default HomeScreen;
