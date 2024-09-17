import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Switch, Button, StyleSheet, Alert, TextInput, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { parseDocument } from 'htmlparser2';
import { findAll, getInnerHTML, hasAttrib, getAttributeValue } from 'domutils';
import { supabase } from '../../config/supabaseClient';
import { colors } from '../../types/theme';
import { decode } from 'html-entities';
import TopBar from './components/TopBar';
import { Picker } from '@react-native-picker/picker';

const cleanHTML = (html: string) => {
  let cleanedHTML = html.replace(/<!--.*?-->/gs, "");
  cleanedHTML = cleanedHTML.replace(/<img[^>]*>/g, "");
  cleanedHTML = cleanedHTML.replace(/<a[^>]*>.*?<\/a>/g, "");
  cleanedHTML = cleanedHTML.replace(/<\/?[^>]+(>|$)/g, "");
  return decode(cleanedHTML.trim().replace(/\s+/g, ' '));
};

const AñadirConvocatoria = () => {
  const [jugadores, setJugadores] = useState<any[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<{ [key: number]: boolean }>({});
  const [search, setSearch] = useState('');
  const [partidos, setPartidos] = useState<any[]>([]);
  const [jornada, setJornada] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const fechasJornadas = ['28/09/24', '06/10/24', '12/10/24', '20/10/24', '26/10/24', '03/11/24', '09/11/24', '17/11/24', '23/11/24', '01/12/24', '14/12/24', '22/12/24', '11/01/25', '19/01/25', '25/01/25', '02/02/25', '08/02/25', '16/02/25', '22/02/25', '02/03/25', '08/03/25', '16/03/25', '22/03/25', '30/03/25', '05/04/25', '13/04/25', '26/04/25', '11/05/25', '17/05/25', '25/05/25'];

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

    const fetchPartidos = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        await axios.post('https://aranjuez.ffmadrid.es/nfg/NLogin?NUser=M7445&NPass=1010');

        const response = await axios.get(
          `https://aranjuez.ffmadrid.es/nfg/NPcd/NFG_CmpJornada?cod_primaria=1000128&CodCompeticion=1007391&CodGrupo=1007399&CodTemporada=20&CodJornada=${jornada}&cod_agrupacion=1&Sch_Tipo_Juego=1`,
          { withCredentials: true }
        );

        const html = response.data;
        const document = parseDocument(html);
        const rows = findAll(elem => elem.name === 'div' && hasAttrib(elem, 'class') && getAttributeValue(elem, 'class') === 'portlet-body body_fed', document.children);

        const matches = rows.map(row => {
          const homeTeamElem = findAll(elem => elem.name === 'a', [row])[0];
          const awayTeamElem = findAll(elem => elem.name === 'a', [row])[1];
          const dateElem = findAll(elem => hasAttrib(elem, 'class') && getAttributeValue(elem, 'class') === 'esconder', [row])[0];

          const homeTeam = homeTeamElem ? cleanHTML(getInnerHTML(homeTeamElem)) : "Equipo local no disponible";
          const awayTeam = awayTeamElem ? cleanHTML(getInnerHTML(awayTeamElem)) : "Equipo visitante no disponible";
          const date = dateElem ? cleanHTML(getInnerHTML(dateElem)) : "Fecha no disponible";

          return { homeTeam, awayTeam, date };
        });

        const filteredMatches = matches.filter(
          match => match.homeTeam.toLowerCase().includes('sporting') ||
            match.awayTeam.toLowerCase().includes('sporting')
        );

        setPartidos(filteredMatches);
      } catch (error) {
        setIsError(true);
        console.error('Error fetching partidos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartidos();
  }, [jornada]);

  const togglePlayerSelection = (id: number) => {
    setSelectedPlayers((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const submitConvocatoria = async () => {
    try {
      for (const playerId in selectedPlayers) {
        if (selectedPlayers[playerId]) {
          await supabase
            .from('jugadores')
            .update({ partidos_jugados: supabase.rpc('increment_partidos', { valor: 1 }) })
            .match({ id: playerId });
        }
      }
      Alert.alert('Convocatoria enviada correctamente');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  const filteredPlayers = jugadores.filter(player =>
    player.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TopBar title="Añadir Convocatoria" />

      {/* Seleccionar jornada */}
      <Picker selectedValue={jornada} onValueChange={setJornada} style={styles.picker}>
        {fechasJornadas.map((fecha, index) => (
          <Picker.Item key={index} label={`Jornada ${index + 1} (${fecha})`} value={index + 1} />
        ))}
      </Picker>

      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : isError ? (
        <Text style={styles.errorText}>Error al cargar los datos.</Text>
      ) : partidos.length > 0 ? (
        <View style={styles.matchContainer}>
          <Text style={styles.teamText}>
            {partidos[0].homeTeam} vs {partidos[0].awayTeam}
          </Text>
          <Text style={styles.dateText}>{partidos[0].date}</Text>
        </View>
      ) : (
        <Text>No hay partidos disponibles.</Text>
      )}

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar jugador..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredPlayers}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.playerName}>{item.nombre}</Text>
            <Switch
              value={selectedPlayers[item.id] || false}
              onValueChange={() => togglePlayerSelection(item.id)}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <Button title="Enviar Convocatoria" onPress={submitConvocatoria} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.white,
    },
    searchInput: {
      height: 40,
      borderColor: colors.primary,
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 16,
      paddingHorizontal: 10,
    },
    picker: {
      height: 50,
      width: '100%',
      marginBottom: 20,
    },
    card: {
      backgroundColor: colors.secondary,
      padding: 16,
      marginVertical: 8,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 3,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    playerName: {
      fontSize: 16,
      color: colors.white,
      fontWeight: 'bold',
    },
    matchContainer: {
      marginBottom: 15,
      padding: 10,
      backgroundColor: '#ffffff',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ced4da',
    },
    teamText: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    errorText: {
      color: '#dc3545',
      textAlign: 'center',
      marginVertical: 20,
    },
    dateText: {
      color: '#6c757d',
      fontSize: 16,
    },
  });
  

export default AñadirConvocatoria;
