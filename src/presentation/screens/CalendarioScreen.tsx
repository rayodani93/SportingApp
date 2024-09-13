import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { parseDocument } from 'htmlparser2';
import { findAll, getInnerHTML, hasAttrib, getAttributeValue } from 'domutils';
import { decode } from 'html-entities';
import { Picker } from '@react-native-picker/picker'; 
import { colors } from '../../types/theme'; 
import TopBar from './components/TopBar'; // Importa el TopBar

interface TableData {
  headers: string[];
  rows: string[][];
}

// Función para limpiar y decodificar el HTML
const cleanHTML = (html: string) => {
  const withoutComments = html.replace(/<!--.*?-->/gs, ""); 
  const text = withoutComments.replace(/<\/?[^>]+(>|$)/g, ""); 
  return decode(text.trim().replace(/\s+/g, ' ')); 
};

const CalendarioScreen: React.FC = () => {
  const [divContent, setDivContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedJornada, setSelectedJornada] = useState(1); 
  const { width } = useWindowDimensions(); 
  const isPortrait = width < 600; 

  useEffect(() => {
    const fetchCalendario = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        await axios.post('https://aranjuez.ffmadrid.es/nfg/NLogin?NUser=M7445&NPass=1010');

        const response = await axios.get(
          `https://aranjuez.ffmadrid.es/nfg/NPcd/NFG_CmpJornada?cod_primaria=1000128&CodTemporada=20&CodGrupo=1007399&CodCompeticion=1007391&CodJornada=${selectedJornada}&cod_agrupacion=1`,
          { withCredentials: true }
        );

        const html = response.data;
        const document = parseDocument(html);
        const rows = findAll(elem => elem.name === 'div' && hasAttrib(elem, 'class') && getAttributeValue(elem, 'class') === 'row', document.children);

        if (rows.length > 0) {
          const targetDiv = rows[0]; 
          const divInnerHTML = getInnerHTML(targetDiv);
          const cleanedDivContent = cleanHTML(divInnerHTML);
          setDivContent(cleanedDivContent);
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
      {/* Añadir TopBar */}
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
      ) : divContent ? (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          <Text>{divContent}</Text>
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
