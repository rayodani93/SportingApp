import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { commonStyles, colors } from '../../types/theme'; // Importamos el tema

const NoticiasScreen: React.FC = () => {
  return (
    <LinearGradient colors={[colors.primary, colors.secondary]} style={commonStyles.container}>
      <Text style={commonStyles.title}>Noticias</Text>
      <TouchableOpacity style={commonStyles.button}>
        <Text style={commonStyles.buttonText}>Ver más noticias</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default NoticiasScreen;
