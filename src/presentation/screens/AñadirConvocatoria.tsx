import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from '../../config/supabaseClient';

const AñadirConvocatoria = () => {
  const [jugadores, setJugadores] = useState<any[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase.from('jugadores').select('id, nombre, partidos_jugados');
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        setJugadores(data || []);
      }
    };
    fetchPlayers();
  }, []);

  const selectPlayer = (id: number) => {
    setSelectedPlayers((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter((playerId) => playerId !== id);
      } else {
        return [...prevState, id];
      }
    });
  };

  const submitConvocatoria = async () => {
    try {
      for (const playerId of selectedPlayers) {
        await supabase
          .from('jugadores')
          .update({ partidos_jugados: supabase.rpc('increment_partidos', { valor: 1 }) }) // Incrementar partidos jugados
          .match({ id: playerId });
      }
      Alert.alert('Convocatoria enviada correctamente');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={jugadores}
        renderItem={({ item }) => (
          <Button title={item.nombre} onPress={() => selectPlayer(item.id)} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Enviar Convocatoria" onPress={submitConvocatoria} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default AñadirConvocatoria;
