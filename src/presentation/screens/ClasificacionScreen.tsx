import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { parseDocument } from 'htmlparser2';
import { findAll, getInnerHTML } from 'domutils';
import { decode } from 'html-entities';
import { colors } from '../../types/theme'; // Importamos los colores

interface TableData {
  headers: string[];
  rows: string[][];
}

// Función para limpiar y decodificar el HTML
const cleanHTML = (html: string) => {
  const text = html.replace(/<\/?[^>]+(>|$)/g, ""); // Eliminar etiquetas HTML
  return decode(text.trim().replace(/\s+/g, ' ')); // Decodificar entidades HTML y eliminar espacios múltiples
};

const ClasificacionScreen = () => {
  const [tableData, setTableData] = useState<TableData | null>(null);
  const { width } = useWindowDimensions(); // Obtiene las dimensiones de la ventana
  const isPortrait = width < 600; // Define un umbral para considerar orientación vertical
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchClasificacion = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        // Realizar la petición de inicio de sesión
        await axios.post('https://aranjuez.ffmadrid.es/nfg/NLogin?NUser=M7445&NPass=1010');

        // Obtener la clasificación
        const response = await axios.get(
          'https://aranjuez.ffmadrid.es/nfg/NPcd/NFG_VisClasificacion?cod_primaria=1000128&codjornada=12&codcompeticion=1005401&codgrupo=1005402&codjornada=12&cod_agrupacion=1',
          {
            withCredentials: true,
          }
        );

        const html = response.data;

        // Parsear HTML para extraer la tabla
        const document = parseDocument(html);
        const tables = findAll(elem => elem.name === 'table', document.children);

        console.log('Total tables found:', tables.length); // Verificar la cantidad de tablas

        if (tables.length > 0) {
          const table = tables[9]; // Cambia este índice si es necesario
          const headers = ['Pos.', 'Equipo', 'Puntos', 'J', 'G', 'E', 'P', 'F', 'C', 'Últimos'];
          const rows = findAll(elem => elem.name === 'tr', table.children);

          // Extraer datos de las filas
          const rowData = rows.slice(1).map((row, index) => {
            index--;
            const cells = findAll(elem => elem.name === 'td', row.children);
            const rowCells = cells.map(cell => cleanHTML(getInnerHTML(cell)));

            // Filtra las columnas: queremos 8 columnas a partir de la tercera
            const filteredCells = rowCells.slice(2, 11);
            if (filteredCells.length > 0) {
              return [String(index + 1), ...filteredCells]; // Añadir la posición como primer elemento
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
  }, []);

  // Filtra las columnas según la orientación
  const filteredHeaders = isPortrait ? tableData?.headers.slice(0, 4) : tableData?.headers;
  const filteredRows = isPortrait ? tableData?.rows.map(row => row.slice(0, 4)) : tableData?.rows;

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : isError ? (
        <Text style={styles.errorText}>Error al cargar los datos.</Text>
      ) : tableData ? (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerRow}>
            {filteredHeaders?.map((header, index) => (
              <View key={index} style={[styles.headerCell, index === 0 ? styles.firstColumn : styles.otherColumn]}>
                <Text style={styles.headerText}>{header}</Text>
              </View>
            ))}
          </View>
          {filteredRows?.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, cellIndex) => (
                <View key={cellIndex} style={[
                  styles.cell,
                  cellIndex === 0 ? styles.firstColumn : styles.otherColumn
                ]}>
                  <Text style={styles.cellText}>{cell}</Text>
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
    backgroundColor: colors.primary, // Fondo azul para toda la pantalla
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: colors.primary, // Color azul del encabezado
    paddingVertical: 10,
    borderRadius: 5,
  },
  headerCell: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
  },
  firstColumn: {
    flex: 0, // Ajustar el tamaño al contenido
  },
  otherColumn: {
    flex: 1, // Tomar el espacio restante
  },
  headerText: {
    color: colors.white, // Texto blanco en el encabezado
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: colors.white, // Fondo blanco para las filas
  },
  cell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#dee2e6',
    alignItems: 'center',
  },
  cellText: {
    color: colors.primary, // Texto azul para las filas
    fontWeight: 'bold', // Texto en negrita
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

export default ClasificacionScreen;
