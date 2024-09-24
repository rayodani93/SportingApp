import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { HomeScreenNavigationProp } from '../../types/navigation';
import { colors } from '../../types/theme';
import TopBar from './components/TopBar';

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Pasamos la imagen como componente al TopBar */}
      <TopBar title={<Image source={require('../../assets/logo_adidas.png')} style={styles.logo} />} />

      <View style={styles.centeredContent}>
        <Image
          source={require('../../assets/PortadaJuanjo.jpeg')}
          style={styles.estefamImage}
        />
      </View>

      <View style={styles.sponsorsContainer}>
        <Image
          source={require('../../assets/logo_maderasa.png')}
          style={styles.logoMaderasa}
        />
        <Image
          source={require('../../assets/logo_juanjo.png')}
          style={styles.logoJuanjo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  estefamImage: {
    width: 250,
    height: 250,
    borderRadius: 125,
    resizeMode: 'cover',
  },
  sponsorsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 40,
    marginBottom: 30,
  },
  logo: {
    width: 160, // Tamaño del logo
    height: 80,
    resizeMode: 'contain',
  },
  logoMaderasa: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  logoJuanjo: {
    width: 250,
    height: 100,
    resizeMode: 'contain',
  },
});

export default HomeScreen;
