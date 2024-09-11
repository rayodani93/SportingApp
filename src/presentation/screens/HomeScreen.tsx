import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import { HomeScreenNavigationProp } from '../../types/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../types/theme';

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const menuOptions = [
    { label: 'Miembros', value: 'Miembros' },
    { label: 'Noticias', value: 'Noticias' },
    { label: 'Clasificación', value: 'Clasificacion' },
    { label: 'Goleadores', value: 'Goleadores' },
  ];

  const handleNavigation = (screen: 'Miembros' | 'Noticias' | 'Clasificacion' | 'Goleadores') => {
    setMenuVisible(false);
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerNav}>
        <TouchableOpacity
          style={styles.menuButton}
          activeOpacity={0.7}
          onPress={() => setMenuVisible(true)}
        >
          <Icon name="bars" size={30} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoButton}>
          <Image 
            source={require('../../assets/logo_adidas.png')} 
            style={styles.logoIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Login')}
        >
          <Icon name="user" size={30} color={colors.primary} />
        </TouchableOpacity>
      </View>

        {/* Imagen agregada en el medio */}
      <View style={styles.sliderContainer}>
          <Image 
              source={require('../../assets/image1.png')} 
              style={styles.sliderImage}
          />
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.newsContainer}>
          <Image 
              source={require('../../assets/Estefam1.jpeg')} 
              style={styles.estefamImage}
          />
        </View>
        <View style={styles.sponsorsContainer}>
          <Image 
                source={require('../../assets/logo_maderasa.png')} 
                style={styles.logoMaderasa}
          />
          <Image 
                source={require('../../assets/logo_maderasa.png')} 
                style={styles.logoMaderasa}
          />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.fullScreenMenu}>
          <TouchableOpacity
            style={styles.closeButton}
            activeOpacity={0.7}
            onPress={() => setMenuVisible(false)}
          >
            <Icon name="times" size={30} color={colors.primary} />
          </TouchableOpacity>

          <View style={styles.modalContent}>
            {menuOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalOption}
                onPress={() => handleNavigation(option.value as 'Miembros' | 'Noticias' | 'Clasificacion' | 'Goleadores')}
              >
                <Text style={styles.modalText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    height: '100%'
  },
  containerNav: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: colors.white,
    flex: 1.2
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 3.8
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 7,
    padding: 30

  },
  newsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sponsorsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25
  },
  menuButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 8
  },
  logoButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 8
  },
  logoIcon: {
    width: 170,
    height: 70,
    resizeMode: 'contain',
  },
  estefamImage: {
    display: 'flex',
    width: 250,
    height: 250,
    borderRadius: 125
  },
  sliderImage: {
    height: '100%',
    resizeMode: 'contain'
  },
  logoMaderasa: {
    width: 150,
    height: 50
  },
  fullScreenMenu: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  modalContent: {
    width: '80%',
    alignItems: 'center',
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    width: '100%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
