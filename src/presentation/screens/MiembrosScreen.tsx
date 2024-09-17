import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native';
import PlayerCard from './components/PlayerCard';
import { colors } from '../../types/theme';
import { MiembrosScreenNavigationProp } from '../../types/navigation';
import { supabase } from '../../config/supabaseClient'; // Importa supabase
import TopBar from './components/TopBar'; // Importa el componente TopBar

// Define el tipo de un jugador
type Player = {
  id: number;
  nombre: string;
  posicion: string;
  foto: string;
  comentarios: string;
};

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
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase
        .from('jugadores')
        .select('id, nombre, posicion, foto, comentarios');

      if (!error) {
        setPlayers(data || []);
      } else {
        console.error('Error fetching players:', error.message);
      }
      setLoading(false);
    };

    fetchPlayers();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  return (
    <View style={styles.container}>
      <TopBar title="Plantilla" />
      <FlatList
        data={players}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  item: {
    flex: 1,
    margin: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default MiembrosScreen;
