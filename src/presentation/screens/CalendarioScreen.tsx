import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { parseDocument } from 'htmlparser2';
import { findAll, getInnerHTML, hasAttrib, getAttributeValue } from 'domutils';
import { decode } from 'html-entities';
import { Picker } from '@react-native-picker/picker'; // Importa Picker desde el nuevo paquete
import { colors } from '../../types/theme'; // Importamos los colores

interface TableData {
  headers: string[];
  rows: string[][];
}

// Función para limpiar y decodificar el HTML, omitiendo comentarios
const cleanHTML = (html: string) => {
  const withoutComments = html.replace(/<!--.*?-->/gs, ""); // Eliminar comentarios
  const text = withoutComments.replace(/<\/?[^>]+(>|$)/g, ""); // Eliminar etiquetas HTML
  return decode(text.trim().replace(/\s+/g, ' ')); // Decodificar entidades HTML y eliminar espacios múltiples
};

const CalendarioScreen: React.FC = () => {
  const [divContent, setDivContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedJornada, setSelectedJornada] = useState(30); // Valor inicial para la jornada
  const { width } = useWindowDimensions(); // Obtiene las dimensiones de la ventana
  const isPortrait = width < 600; // Define un umbral para considerar orientación vertical

  useEffect(() => {
    const fetchCalendario = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        // Realizar la petición de inicio de sesión
        await axios.post('https://aranjuez.ffmadrid.es/nfg/NLogin?NUser=M7445&NPass=1010');

        // Obtener el calendario
        const response = await axios.get(
          `https://aranjuez.ffmadrid.es/nfg/NPcd/NFG_CmpJornada?cod_primaria=1000128&CodCompeticion=1005401&CodGrupo=1005402&CodTemporada=19&CodJornada=${selectedJornada}&cod_agrupacion=1&Sch_Tipo_Juego=1`,
          {
            withCredentials: true,
          }
        );

        const html = response.data;

        // Parsear HTML para extraer el div con clase "row"
        const document = parseDocument(html);
        const rows = findAll(elem => elem.name === 'div' && hasAttrib(elem, 'class') && getAttributeValue(elem, 'class') === 'row', document.children);

        console.log('Total divs with class "row" found:', rows.length); // Verificar la cantidad de divs

        if (rows.length > 0) { // Asegúrate de que hay al menos un div con clase "row"
          const targetDiv = rows[0]; // Extrae el primer div con clase "row"
          const divInnerHTML = getInnerHTML(targetDiv);
          const cleanedDivContent = cleanHTML(divInnerHTML);
          console.log(cleanedDivContent);
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
  }, [selectedJornada]); // Añadir selectedJornada como dependencia

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedJornada}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedJornada(itemValue)}
        >
          {[...Array(30).keys()].map(i => (
            <Picker.Item key={i+1} label={`Jornada ${i+1}`} value={i+1} />
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
    backgroundColor: '#f8f9fa', // Fondo claro
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
    color: '#dc3545', // Texto rojo para errores
    textAlign: 'center',
    marginVertical: 20,
  },
  noDataText: {
    color: '#6c757d', // Texto gris para cuando no hay datos
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default CalendarioScreen;
