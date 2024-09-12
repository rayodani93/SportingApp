import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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

  return (
    <View style={styles.topBar}>
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
});

export default TopBar;
