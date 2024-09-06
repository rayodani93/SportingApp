import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import PlayerCard from './components/PlayerCard'; // Asegúrate de que esta ruta es correcta

// Define el tipo de un jugador
type Player = {
  id: number;
  nombre: string;
  posicion: string;
  foto: any; // Cambiado a 'any' para soportar las imágenes locales con require
};

// Datos de 22 jugadores
const players: Player[] = [
  { id: 1, nombre: 'De la Fuente', posicion: 'Mediocampista', foto: require('../../assets/delaFuente.png') },
  { id: 2, nombre: 'Briones', posicion: 'Mediocampista', foto: require('../../assets/Briones.png') },
  { id: 3, nombre: 'Tinkita', posicion: 'Defensa', foto: require('../../assets/Tinkita.png') },
  { id: 4, nombre: 'Encinas', posicion: 'Portero', foto: require('../../assets/Encinas.png') },
  { id: 5, nombre: 'Jugador 5', posicion: 'Delantero', foto: require('../../assets/delaFuente.png') },
  { id: 6, nombre: 'Jugador 6', posicion: 'Mediocampista', foto: require('../../assets/Briones.png') },
  { id: 7, nombre: 'Jugador 7', posicion: 'Defensa', foto: require('../../assets/Tinkita.png') },
  { id: 8, nombre: 'Jugador 8', posicion: 'Portero', foto: require('../../assets/Encinas.png') },
  { id: 9, nombre: 'Jugador 9', posicion: 'Delantero', foto: require('../../assets/delaFuente.png') },
  { id: 10, nombre: 'Jugador 10', posicion: 'Mediocampista', foto: require('../../assets/Briones.png') },
  { id: 11, nombre: 'Jugador 11', posicion: 'Defensa', foto: require('../../assets/Tinkita.png') },
  { id: 12, nombre: 'Jugador 12', posicion: 'Portero', foto: require('../../assets/Encinas.png') },
  { id: 13, nombre: 'Jugador 13', posicion: 'Mediocampista', foto: require('../../assets/delaFuente.png') },
  { id: 14, nombre: 'Jugador 14', posicion: 'Mediocampista', foto: require('../../assets/Briones.png') },
  { id: 15, nombre: 'Jugador 15', posicion: 'Defensa', foto: require('../../assets/Tinkita.png') },
  { id: 16, nombre: 'Jugador 16', posicion: 'Portero', foto: require('../../assets/Encinas.png') },
  { id: 17, nombre: 'Jugador 17', posicion: 'Mediocampista', foto: require('../../assets/delaFuente.png') },
  { id: 18, nombre: 'Jugador 18', posicion: 'Mediocampista', foto: require('../../assets/Briones.png') },
  { id: 19, nombre: 'Jugador 19', posicion: 'Defensa', foto: require('../../assets/Tinkita.png') },
  { id: 20, nombre: 'Jugador 20', posicion: 'Portero', foto: require('../../assets/Encinas.png') },
  { id: 21, nombre: 'Jugador 21', posicion: 'Delantero', foto: require('../../assets/delaFuente.png') },
  { id: 22, nombre: 'Jugador 22', posicion: 'Mediocampista', foto: require('../../assets/Briones.png') },
];

// Renderiza cada tarjeta de jugador
const renderItem = ({ item }: { item: Player }) => (
  <View style={styles.item}>
    <PlayerCard player={item} onPress={() => { /* Aquí puedes agregar la navegación */ }} />
  </View>
);

const MiembrosScreen = () => {
  return (
    <View style={styles.container}>
      {/* Título encima de las tarjetas */}
      <Text style={styles.title}>Sporting Maderasa Bar Juanjo 2024/25</Text>
      <FlatList
        data={players} // La lista de jugadores
        renderItem={renderItem} // El componente que se renderiza
        keyExtractor={(item) => item.id.toString()} // Clave única para cada elemento
        numColumns={2} // Establece dos columnas
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Fondo negro
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFD700', // Color amarillo del título
  },
  item: {
    flex: 1,
    margin: 10,
  },
});

export default MiembrosScreen;
