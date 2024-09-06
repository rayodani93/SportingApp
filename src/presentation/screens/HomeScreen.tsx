import React from 'react';
import { View, Image, StyleSheet, Text, Button } from 'react-native';
import { HomeScreenNavigationProp } from '../../types/navigation'; // Asegúrate de que la ruta es correcta

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sporting Aranjuez</Text>
      <Image 
        source={require('../../assets/escudo.jpg')} // Ruta de la imagen del escudo
        style={styles.logo}
      />

      {/* Menú de navegación debajo del escudo */}
      <View style={styles.menu}>
        <Button title="Miembros" onPress={() => navigation.navigate('Miembros')} />
        <Button title="Noticias" onPress={() => navigation.navigate('Noticias')} />
        <Button title="Clasificación" onPress={() => navigation.navigate('Clasificacion')} />
        <Button title="Goleadores" onPress={() => navigation.navigate('Goleadores')} />
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
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  menu: {
    marginTop: 20,
    width: '80%',
  },
  button: {
    marginVertical: 10,
  },
});

export default HomeScreen;
