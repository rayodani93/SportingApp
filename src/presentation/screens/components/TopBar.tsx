import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types/navigation';
import { colors } from '../../../types/theme';

type Props = {
  title: string; // Para que puedas cambiar el título en cada pantalla
};

// Tipamos el hook useNavigation para las pantallas definidas en RootStackParamList
type NavigationProp = StackNavigationProp<RootStackParamList>;

const TopBar: React.FC<Props> = ({ title }) => {
  const navigation = useNavigation<NavigationProp>(); // Tipamos el hook de navegación

  return (
    <View style={styles.topBar}>
      {/* Icono de flecha a la izquierda */}
      <TouchableOpacity style={styles.iconLeft} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={30} color={colors.primary} />
      </TouchableOpacity>

      {/* Título centrado */}
      <Text style={styles.title}>{title}</Text>

      {/* Icono de home a la derecha */}
      <TouchableOpacity style={styles.iconRight} onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={30} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    position: 'relative',
  },
  iconLeft: {
    position: 'absolute',
    left: 10, // Mantén el icono pegado a la izquierda
  },
  iconRight: {
    position: 'absolute',
    right: 10, // Mantén el icono pegado a la derecha
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    flex: 1,
  },
});

export default TopBar;
