import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types/navigation';
import { colors } from '../../../types/theme';

type Props = {
  title: string;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const TopBar: React.FC<Props> = ({ title }) => {
  const navigation = useNavigation<NavigationProp>();
  const [menuVisible, setMenuVisible] = useState(false);

  const menuOptions = [
    { label: 'Miembros', value: 'Miembros' },
    { label: 'Noticias', value: 'Noticias' },
    { label: 'Calendario', value: 'Calendario' },
    { label: 'Clasificación', value: 'Clasificacion' },
    { label: 'Goleadores', value: 'Goleadores' },
  ];

  const handleNavigation = (screen: 'Miembros' | 'Noticias' | 'Calendario' | 'Clasificacion' | 'Goleadores') => {
    setMenuVisible(false);
    navigation.navigate(screen);
  };

  return (
    /*<View style={styles.topBar}>
      <View style={styles.leftIcons}>
        
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Calendario')}>
          <Icon name="calendar" size={30} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Goleadores')}>
          <Icon name="soccer-ball-o" size={30} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Miembros')}>
          <Icon name="users" size={30} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.rightIcons}>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Clasificacion')}>
          <Icon name="list" size={30} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Noticias')}>
          <Icon name="newspaper-o" size={30} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={30} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>*/
    <View style={styles.containerNav}>
    <TouchableOpacity
      style={styles.menuButton}
      activeOpacity={0.7}
      onPress={() => setMenuVisible(true)}
    >
      <Icon name="bars" size={30} color={colors.primary} />
    </TouchableOpacity>

    <Text style={styles.title}>{title}</Text>

    <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={30} color={colors.primary} />
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
                onPress={() => handleNavigation(option.value as 'Miembros' | 'Noticias' | 'Calendario' | 'Clasificacion' | 'Goleadores')}
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
  topBar: {
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  leftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    flex: 1,
  },
  menuButton: {
    marginLeft: 8,
  },
  containerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.white,
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

export default TopBar;
