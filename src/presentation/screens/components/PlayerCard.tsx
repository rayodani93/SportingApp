import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';

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
    backgroundColor: '#fff',
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
    textAlign: 'center',
  },
  position: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default PlayerCard;
