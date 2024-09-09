import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import axios from 'axios';
import { parseDocument } from 'htmlparser2';
import { findAll, getInnerHTML } from 'domutils';
import { decode } from 'html-entities';

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


  useEffect(() => {
    const fetchClasificacion = async () => {
      try {
        // Obtener la clasificación
        const response = await axios.get(
          'https://aranjuez.ffmadrid.es/nfg/NPcd/NFG_VisClasificacion?cod_primaria=1000128&codjornada=30&codcompeticion=1005401&codgrupo=1005402&codjornada=30&cod_agrupacion=1',
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
          const table = tables[9]; // Cambia este índice si es necesario
          const headers = ['Equipo', 'Ptos', 'J', 'G', 'E', 'P', 'F', 'C', 'Últimos']
          const rows = findAll(elem => elem.name === 'tr', table.children);

          // Extraer datos de las filas
          const rowData = rows.slice(1).map(row => {
            const cells = findAll(elem => elem.name === 'td', row.children);
            const rowCells = cells.map(cell => cleanHTML(getInnerHTML(cell)));

            // Filtra las columnas: queremos 8 columnas a partir de la tercera
            return rowCells.slice(2, 11); // Omitir las dos primeras columnas
          });

          setTableData({
            headers: headers,
            rows: rowData, // Mostrar todas las filas
          });
        } else {
          console.error('No se encontraron suficientes tablas en el documento.');
        }
      } catch (error) {
        console.error('Error fetching clasificacion:', error);
      }
    };

    fetchClasificacion();
  }, []);

  // Filtra las columnas según la orientación
  const filteredHeaders = isPortrait ? tableData?.headers.slice(0, 6) : tableData?.headers;
  const filteredRows = isPortrait ? tableData?.rows.map(row => row.slice(0, 6)) : tableData?.rows;

  return (
    <View style={styles.container}>
      {tableData ? (
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.headerRow}>
            {filteredHeaders?.map((header, index) => (
              <View key={index} style={styles.headerCell}>
                <Text>{header}</Text>
              </View>
            ))}
          </View>
          {filteredRows?.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, cellIndex) => (
                <View key={cellIndex} style={styles.cell}>
                  <Text>{cell}</Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
  },
  headerCell: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default ClasificacionScreen;
