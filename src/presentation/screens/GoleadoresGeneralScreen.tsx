import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { parseDocument } from 'htmlparser2';
import { findAll, getInnerHTML } from 'domutils';
import { decode } from 'html-entities';
import { Picker } from '@react-native-picker/picker'; // Importa Picker desde el nuevo paquete
import { colors } from '../../types/theme'; // Importamos los colores
import TopBar from './components/TopBar'; // Importamos el TopBar

interface TableData {
  headers: string[];
  rows: string[][];
}

// Función para limpiar y decodificar el HTML
const cleanHTML = (html: string) => {
  const text = html.replace(/<\/?[^>]+(>|$)/g, ""); // Eliminar etiquetas HTML
  return decode(text.trim().replace(/\s+/g, ' ')); // Decodificar entidades HTML y eliminar espacios múltiples
};

const GoleadoresGeneralScreen = () => {
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedJornada, setSelectedJornada] = useState(30); // Valor inicial para la jornada
  const { width } = useWindowDimensions(); // Obtiene las dimensiones de la ventana
  const isPortrait = width < 600; // Define un umbral para considerar orientación vertical

  useEffect(() => {
    const fetchClasificacion = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        // Realizar la petición de inicio de sesión
        await axios.post('https://aranjuez.ffmadrid.es/nfg/NLogin?NUser=M7445&NPass=1010');

        // Obtener la clasificación
        const response = await axios.get(
          `https://aranjuez.ffmadrid.es/nfg/NPcd/NFG_CMP_Goleadores?cod_primaria=1000128&codcompeticion=1005401&codtemporada=19&codgrupo=1005402`,
          {
            withCredentials: true,
          }
        );

        const html = response.data;

        // Parsear HTML para extraer la tabla
        const document = parseDocument(html);
        const tables = findAll(elem => elem.name === 'table', document.children);

        console.log('Total tables found:', tables.length); // Verificar la cantidad de tablas

        if (tables.length > 0) { // Asegúrate de que hay al menos una tabla
          const table = tables[4]; // Cambia este índice si es necesario
          const headers = ['Jugador', 'Equipo', 'Grupo', 'PJ', 'G', 'GP'];
          const rows = findAll(elem => elem.name === 'tr', table.children);

          // Extraer datos de las filas
          const rowData = rows.slice(1).map((row, index) => {
            index--;
            const cells = findAll(elem => elem.name === 'td', row.children);
            const rowCells = cells.map(cell => cleanHTML(getInnerHTML(cell)));

            const filteredCells = rowCells.slice(0, 11);
            if (filteredCells.length > 0) {
              return [...filteredCells];
            }
            return null;
          }).filter(row => row !== null);

          setTableData({
            headers: headers,
            rows: rowData,
          });
        } else {
          console.error('No se encontraron suficientes tablas en el documento.');
        }
      } catch (error) {
        console.error('Error fetching clasificacion:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasificacion();
  }, [selectedJornada]);

  const filteredHeaders = isPortrait ? tableData?.headers.slice(0, 5) : tableData?.headers;
  const filteredRows = isPortrait ? tableData?.rows.map(row => row.slice(0, 5)) : tableData?.rows;

  return (
    <View style={styles.container}>
      <TopBar title="General" />
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : isError ? (
        <Text style={styles.errorText}>Error al cargar los datos.</Text>
      ) : tableData ? (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerRow}>
            {filteredHeaders?.map((header, index) => (
              <View key={index} style={[styles.headerCell, index === 1 ? styles.secondColumn : styles.otherColumn]}>
                <Text style={styles.headerText}>{header}</Text>
              </View>
            ))}
          </View>
          {filteredRows?.map((row, rowIndex) => (
            <View key={rowIndex} style={[
              styles.row,
              rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow,
              row[1].toLowerCase().includes('sporting') ? styles.highlightRow : undefined
            ]}>
              {row.map((cell, cellIndex) => (
                <View
                  key={cellIndex}
                  style={[
                    styles.cell,
                    cellIndex === 1 ? styles.secondColumn : styles.firstColumn,
                    row[1].toLowerCase().includes('sporting') && cellIndex === 0 ? {} : {}
                  ]}
                >
                  <Text
                    style={[
                      styles.cellText,
                      row[1].toLowerCase().includes('sporting') && cellIndex === 0 ? styles.boldText : null
                    ]}
                  >
                    {cell}
                  </Text>
                </View>

              ))}
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
  headerRow: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 5,
  },
  headerCell: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
  },
  firstColumn: {
    flex: 3,
  },
  secondColumn: {
    flex: 3,
  },
  otherColumn: {
    flex: 3,
  },
  headerText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
    borderRadius: 5,
  },
  cell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#dee2e6',
    alignItems: 'center',
  },
  evenRow: {
    backgroundColor: '#ffffff',
  },
  oddRow: {
    backgroundColor: '#f1f3f5',
  },
  highlightRow: {
    backgroundColor: '#d4edda', // Color verde claro para resaltar
  },
  boldText: {
    fontWeight: 'bold', // Negrita para el jugador del Sporting
  },
  cellText: {
    color: '#212529',
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

export default GoleadoresGeneralScreen;
