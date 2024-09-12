import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { supabase } from '../../config/supabaseClient';
import { colors } from '../../types/theme';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { GoleadoresScreenNavigationProp } from '../../types/navigation';
import TopBar from './components/TopBar'; // Importamos el TopBar

interface Jugador {
  id: number;
  nombre: string;
  goles: number;
  partidos_jugados: number;
}

type Props = {
  navigation: GoleadoresScreenNavigationProp;
};

const GoleadoresScreen: React.FC<Props> = ({ navigation }) => {
  const [goleadores, setGoleadores] = useState<Jugador[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchGoleadores = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const { data, error } = await supabase
          .from('jugadores')
          .select('id, nombre, goles, partidos_jugados')
          .order('goles', { ascending: false });

        if (error) {
          throw new Error(error.message);
        }

        setGoleadores(data || []);
      } catch (error) {
        console.error('Error fetching goleadores:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoleadores();
  }, []);

  const calcularPromedio = (goles: number, partidos_jugados: number) => {
    if (partidos_jugados === 0) return 0;
    return (goles / partidos_jugados).toFixed(2);
  };

  return (
    <View style={styles.container}>
      {/* TopBar agregado */}
      <TopBar title="Goleadores" />

      {/* Botón para ir a la pantalla de Goleadores General */}
      <TouchableOpacity
        style={styles.generalButton}
        onPress={() => navigation.navigate('GoleadoresGeneral')}
      >
        <Text style={styles.generalButtonText}>General</Text>
      </TouchableOpacity>

      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : isError ? (
        <Text style={styles.errorText}>Error al cargar los datos.</Text>
      ) : goleadores.length > 0 ? (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>Jugador</Text>
            <Text style={styles.headerText}>Goles</Text>
            <Text style={styles.headerText}>Promedio</Text>
          </View>
          {goleadores.map((jugador) => (
            <View key={jugador.id} style={styles.row}>
              <Text style={styles.cellText}>{jugador.nombre}</Text>
              <Text style={styles.cellText}>{jugador.goles}</Text>
              <Text style={styles.cellText}>{calcularPromedio(jugador.goles, jugador.partidos_jugados)}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noDataText}>No hay datos disponibles</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  generalButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  generalButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    color: '#ffffff',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    padding: 10,
    justifyContent: 'space-between',
  },
  cellText: {
    color: '#212529',
    flex: 1,
    textAlign: 'center',
  },
  errorText: {
    color: '#dc3545',
    textAlign: 'center',
    marginVertical: 20,
  },
  noDataText: {
    color: '#6c757d',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default GoleadoresScreen;
