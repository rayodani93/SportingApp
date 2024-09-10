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
      <TouchableOpacity
        style={styles.menuButton}
        activeOpacity={0.7}
        onPress={() => setMenuVisible(true)}
      >
        <Icon name="bars" size={30} color={colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.logoButton}
      >
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  logoButton: {
    position: 'absolute',
    top: 10,
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
  logoIcon: {
    width: 170,
    height: 100,
    resizeMode: 'contain',
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
