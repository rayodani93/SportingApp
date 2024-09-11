import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';
import { colors } from '../../../types/theme'; // Ruta corregida


type Props = {
  player: {
    id: number;
    nombre: string;
    posicion: string;
    foto: any;  // Cambiado a 'any' ya que require devuelve un número.
  };
  onPress: () => void;
};

const PlayerCard: React.FC<Props> = ({ player, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image source={player.foto} style={styles.image} />  
        <View style={styles.textContainer}>
          <Text style={styles.name}>{player.nombre}</Text>
          <Text style={styles.position}>{player.posicion}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary, // Fondo azul
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Para Android
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white, // Texto blanco
    textAlign: 'center',
  },
  position: {
    fontSize: 16,
    fontWeight: 'bold', // Texto en negrita
    color: colors.white, // Texto blanco
    marginTop: 5,
    textAlign: 'center',
  },
});

export default PlayerCard;
