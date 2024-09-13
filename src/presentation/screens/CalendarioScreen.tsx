import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { parseDocument } from 'htmlparser2';
import { findAll, getInnerHTML, hasAttrib, getAttributeValue } from 'domutils';
import { decode } from 'html-entities';
import { Picker } from '@react-native-picker/picker'; 
import { colors } from '../../types/theme'; 
import TopBar from './components/TopBar'; 

// Función para limpiar y decodificar el HTML
const cleanHTML = (html: string) => {
  let cleanedHTML = html.replace(/<!--.*?-->/gs, ""); // Eliminar comentarios HTML
  cleanedHTML = cleanedHTML.replace(/<img[^>]*>/g, ""); // Eliminar imágenes
  cleanedHTML = cleanedHTML.replace(/<a[^>]*>.*?<\/a>/g, ""); // Eliminar hipervínculos
  cleanedHTML = cleanedHTML.replace(/<\/?[^>]+(>|$)/g, ""); // Decodificar entidades HTML y limpiar espacios
  return decode(cleanedHTML.trim().replace(/\s+/g, ' '));
};

const CalendarioScreen: React.FC = () => {
  const [results, setResults] = useState<Array<{ homeTeam: string; awayTeam: string; resultadoHome: string, resultadoAway: string, date: string; campo: string }> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedJornada, setSelectedJornada] = useState(1); 
  const { width } = useWindowDimensions(); 

  useEffect(() => {
    const fetchCalendario = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        // Autenticación en la página
        await axios.post('https://aranjuez.ffmadrid.es/nfg/NLogin?NUser=M7445&NPass=1010');

        // Obtener la jornada seleccionada
        const response = await axios.get(
          `https://aranjuez.ffmadrid.es/nfg/NPcd/NFG_CmpJornada?cod_primaria=1000128&CodCompeticion=1007391&CodGrupo=1007399&CodTemporada=20&CodJornada=${selectedJornada}&cod_agrupacion=1&Sch_Tipo_Juego=1`,
          { withCredentials: true }
        );

        // Parsear el HTML
        const html = response.data;
        const document = parseDocument(html);
        const rows = findAll(elem => elem.name === 'div' && hasAttrib(elem, 'class') && getAttributeValue(elem, 'class') === 'portlet-body body_fed', document.children);

        // Procesar los resultados de los partidos
        if (rows.length > 0) {
          const matches = rows.map(row => {
            /*const homeTeamElem = findAll(elem => hasAttrib(elem, 'class') && getAttributeValue(elem, 'class') === 'equipo_local', [row])[0];
            const awayTeamElem = findAll(elem => hasAttrib(elem, 'class') && getAttributeValue(elem, 'class') === 'equipo_visitante', [row])[0];
            const dateElem = findAll(elem => hasAttrib(elem, 'class') && getAttributeValue(elem, 'class') === 'fecha', [row])[0];
            const campoElem = findAll(elem => hasAttrib(elem, 'class') && getAttributeValue(elem, 'class') === 'campo', [row])[0];
            */
            const homeTeamElem = findAll(elem => elem.name === 'a', [row])[0];
            const awayTeamElem = findAll(elem => elem.name === 'a', [row])[1];
            const resultadoHomeElem = findAll(elem => hasAttrib(elem, 'class') && getAttributeValue(elem, 'class') === 'resultado_cerrada', [row])[0];
            const resultadoAwayElem = findAll(elem => hasAttrib(elem, 'class') && getAttributeValue(elem, 'class') === 'resultado_cerrada', [row])[1];
            const dateElem = findAll(elem => hasAttrib(elem, 'class') && getAttributeValue(elem, 'class') === 'esconder', [row])[0];
            const campoElem = findAll(elem => hasAttrib(elem, 'width') && getAttributeValue(elem, 'width') === '263<tml_else>476', [row])[0];

            // Verificamos si los elementos existen antes de procesarlos
            const homeTeam = homeTeamElem ? cleanHTML(getInnerHTML(homeTeamElem)) : "Equipo local no disponible";
            const awayTeam = awayTeamElem ? cleanHTML(getInnerHTML(awayTeamElem)) : "Equipo visitante no disponible";
            const resultadoHome = resultadoHomeElem ? cleanHTML(getInnerHTML(resultadoHomeElem)) : '';
            const resultadoAway = resultadoAwayElem ? cleanHTML(getInnerHTML(resultadoAwayElem)) : '';
            const date = dateElem ? cleanHTML(getInnerHTML(dateElem)) : "Fecha no disponible";
            const campo = campoElem ? cleanHTML(getInnerHTML(campoElem)) : "Campo no disponible";

            return { homeTeam, awayTeam, resultadoHome, resultadoAway, date, campo };
          });

          setResults(matches);
        } else {
          console.error('No se encontraron divs con la clase "row".');
        }
      } catch (error) {
        console.error('Error fetching calendario:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalendario();
  }, [selectedJornada]); 

  return (
    <View style={styles.container}>
      <TopBar title="Calendario" />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedJornada}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedJornada(itemValue)}
        >
          {[...Array(30).keys()].map(i => (
            <Picker.Item key={i + 1} label={`Jornada ${i + 1}`} value={i + 1} />
          ))}
        </Picker>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : isError ? (
        <Text style={styles.errorText}>Error al cargar los datos.</Text>
      ) : results ? (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          {results.map((match, index) => (
            <View key={index} style={styles.matchContainer}>
              <Text style={styles.teamText}>{match.homeTeam} vs {match.awayTeam}</Text>
              {match.resultadoHome ? (<Text style={styles.resultText}>{match.resultadoHome} {match.resultadoAway}</Text>) : ''}
              <Text style={styles.dateText}>{match.date}</Text>
              <Text style={styles.campoText}>{match.campo}</Text>
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
  pickerContainer: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderColor: '#ced4da',
    borderWidth: 1,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
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
  resultText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.primary,
    textAlign: 'center',
    width: '20%',
    borderRadius: 6,
    borderColor: colors.primary,
    borderWidth: 1,
    padding: 1,
    margin: 2
  },
  dateText: {
    color: '#6c757d',
    fontSize: 14,
  },
  campoText: {
    color: '#28a745',
    fontSize: 14,
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

export default CalendarioScreen;
