import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import PlayerCard from './components/PlayerCard';
import { colors } from '../../types/theme';
import { MiembrosScreenNavigationProp } from '../../types/navigation'; // Asegúrate de que el tipo de navegación está correctamente definido
import TopBar from './components/TopBar'; // Importa el componente TopBar

// Define el tipo de un jugador
type Player = {
  id: number;
  nombre: string;
  posicion: string;
  foto: any; // Cambiado a 'any' para soportar las imágenes locales con require
};

// Datos de 22 jugadores
const players: Player[] = [
  { id: 1, nombre: 'Andres Briones', posicion: 'Portero', foto: require('../../assets/Andres.jpeg') },
  { id: 2, nombre: 'Alex Pérez', posicion: 'Defensa', foto: require('../../assets/alexperez.jpeg') },
  { id: 3, nombre: 'Tinka', posicion: 'Defensa', foto: require('../../assets/Tinka.jpeg') },
  { id: 4, nombre: 'Encinas', posicion: 'Defensa', foto: require('../../assets/Encinas.png') },
  { id: 5, nombre: 'Gabino', posicion: 'Defensa', foto: require('../../assets/delaFuente.png') },
  { id: 6, nombre: 'Joni', posicion: 'Defensa', foto: require('../../assets/Briones.png') },
  { id: 7, nombre: 'Mario', posicion: 'Defensa', foto: require('../../assets/Tinkita.png') },
  { id: 8, nombre: 'Juli', posicion: 'Defensa', foto: require('../../assets/Juli.jpeg') },
  { id: 9, nombre: 'Samu', posicion: 'Defensa', foto: require('../../assets/delaFuente.png') },
  { id: 10, nombre: 'Víctor', posicion: 'Defensa', foto: require('../../assets/Victor.jpeg') },
  { id: 11, nombre: 'Sánchez', posicion: 'Centrocampista', foto: require('../../assets/Tinkita.png') },
  { id: 12, nombre: 'Nacho', posicion: 'Centrocampista', foto: require('../../assets/Masen.jpeg') },
  { id: 13, nombre: 'Albert', posicion: 'Centrocampista', foto: require('../../assets/Alber.jpeg') },
  { id: 14, nombre: 'de la Fuente', posicion: 'Centrocampista', foto: require('../../assets/delaFuente.png') },
  { id: 15, nombre: 'Estefania', posicion: 'Centrocampista', foto: require('../../assets/EstefanAlergia.jpeg') },
  { id: 16, nombre: 'Bellot', posicion: 'Centrocampista', foto: require('../../assets/Bellot.jpeg') },
  { id: 17, nombre: 'Calvo', posicion: 'Centrocampista', foto: require('../../assets/delaFuente.png') },
  { id: 18, nombre: 'Torres', posicion: 'Centrocampista', foto: require('../../assets/Briones.png') },
  { id: 19, nombre: 'Josema', posicion: 'Centrocampista', foto: require('../../assets/Tinkita.png') },
  { id: 20, nombre: 'Chirla', posicion: 'Delantero', foto: require('../../assets/Encinas.png') },
  { id: 21, nombre: 'Valencia', posicion: 'Delantero', foto: require('../../assets/delaFuente.png') },
  { id: 22, nombre: 'Juanele', posicion: 'Delantero', foto: require('../../assets/Juanele.jpeg') },
];

type Props = {
  navigation: MiembrosScreenNavigationProp;
};

// Renderiza cada tarjeta de jugador
const renderItem = ({ item }: { item: Player }) => (
  <View style={styles.item}>
    <PlayerCard player={item} onPress={() => { /* Aquí puedes agregar la navegación */ }} />
  </View>
);

const MiembrosScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Usar el componente TopBar */}
      <TopBar title="Plantilla" />

      <FlatList
        data={players} // La lista de jugadores
        renderItem={renderItem} // El componente que se renderiza
        keyExtractor={(item) => item.id.toString()} // Clave única para cada elemento
        numColumns={2} // Establece dos columnas
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white, // Fondo blanco
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  item: {
    flex: 1,
    margin: 10,
    backgroundColor: colors.primary, // Fondo azul para las tarjetas
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default MiembrosScreen;
