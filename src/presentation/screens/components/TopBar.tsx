import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types/navigation';
import { colors } from '../../../types/theme';
import { supabase } from '../../../config/supabaseClient';
import { useSupabaseAuth } from '../../../config/useSupabaseAuth';

type Props = {
  title: string | React.ReactNode; // Cambiado para aceptar string o React node
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const TopBar: React.FC<Props> = ({ title }) => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const isHome = route.name == 'Home';
  const [menuVisible, setMenuVisible] = useState(false);
  const { user } = useSupabaseAuth(); // Obtén el usuario autenticado

  const menuOptions = [
    { label: 'Calendario', value: 'Calendario' },
    { label: 'Clasificación', value: 'Clasificacion' },
    { label: 'Goleadores', value: 'GoleadoresGeneral' },
  ];

  if (user?.email) {
    menuOptions.push({ label: 'Cerrar Sesión', value: 'CerrarSesion' });
  }

  const handleNavigation = async (screen: string) => {
    setMenuVisible(false);
    if (screen === 'CerrarSesion') {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', 'Hubo un problema al cerrar sesión.');
      }
    } else {
      navigation.navigate(screen as 'Calendario' | 'Clasificacion' | 'Goleadores');
    }
  };

  return (
    <View style={styles.containerNav}>
      <TouchableOpacity
        style={styles.menuButton}
        activeOpacity={0.7}
        onPress={() => setMenuVisible(true)}
      >
        <Icon name="bars" size={30} color={colors.primary} />
      </TouchableOpacity>

      {/* Renderiza un componente de imagen o un texto como título */}
      {typeof title === 'string' ? (
        <Text style={styles.title}>{title}</Text>
      ) : (
        title
      )}

      {isHome ? (
          <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Register')}>
            <Icon name="user" size={30} color={colors.primary} />
          </TouchableOpacity>
        ) 
        : 
        (     
          <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Home')}>
            <Icon name="home" size={30} color={colors.primary} />
          </TouchableOpacity>
        )}


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
                onPress={() => handleNavigation(option.value)}
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
  containerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
    backgroundColor: colors.white,
  },
  menuButton: {
    marginLeft: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  icon: {
    marginRight: 8,
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
