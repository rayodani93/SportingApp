import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { parseDocument } from 'htmlparser2';
import { findAll, getInnerHTML } from 'domutils';
import { decode } from 'html-entities';
import { Picker } from '@react-native-picker/picker'; // Importa Picker desde el nuevo paquete
import { colors } from '../../types/theme'; // Importamos los colores
import TopBar from './components/TopBar'; // Importa el TopBar

interface TableData {
  headers: string[];
  rows: string[][];
}

const cleanHTML = (html: string) => {
  const text = html.replace(/<\/?[^>]+(>|$)/g, ""); 
  return decode(text.trim().replace(/\s+/g, ' ')); 
};

const ClasificacionScreen = () => {
  const hoy = new Date();
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const fechasjornadas = ['28/09/24','06/10/24','20/10/24','26/10/24','09/11/24','17/11/24','23/11/24','01/12/24','14/12/24','22/12/24','11/01/25','19/01/25','25/01/25','02/02/25','08/02/25','16/02/25','22/02/25','02/03/25','08/03/25','16/03/25','22/03/25','30/03/25','05/04/25','13/04/25','26/04/25','11/05/25','17/05/25', '25/05/25', '31/05/25', '08/06/25' ];
  
  let index = 1;
  fechasjornadas.forEach(fecha => {
    let fechaDate = new Date(fecha);
    if (fechaDate < hoy) {
      index++;
    }
  });

  const [selectedJornada, setSelectedJornada] = useState(index); 
  const { width } = useWindowDimensions(); 
  const isPortrait = width < 600;


  useEffect(() => {
    const fetchClasificacion = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        await axios.post('https://aranjuez.ffmadrid.es/nfg/NLogin?NUser=M7445&NPass=1010');

        const response = await axios.get(
          `https://aranjuez.ffmadrid.es/nfg/NPcd/NFG_VisClasificacion?cod_primaria=1000128&codjornada=1&codcompeticion=1007391&codgrupo=1007399&codjornada=${selectedJornada}&cod_agrupacion=1`,
          { withCredentials: true }
        );

        const html = response.data;
        const document = parseDocument(html);
        const tables = findAll(elem => elem.name === 'table', document.children);

        if (tables.length > 0) {
          const table = tables[9]; 
          const headers = ['Pos.', 'Equipo', 'Puntos', 'J', 'G', 'E', 'P', 'F', 'C', 'Últimos'];
          const rows = findAll(elem => elem.name === 'tr', table.children);

          const rowData = rows.slice(1).map((row, index) => {
            index--;
            const cells = findAll(elem => elem.name === 'td', row.children);
            const rowCells = cells.map(cell => cleanHTML(getInnerHTML(cell)));

            const filteredCells = rowCells.slice(2, 11);
            if (filteredCells.length > 0) {
              return [String(index + 1), ...filteredCells];
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

  const filteredHeaders = isPortrait ? tableData?.headers.slice(0, 4) : tableData?.headers;
  const filteredRows = isPortrait ? tableData?.rows.map(row => row.slice(0, 4)) : tableData?.rows;

  return (
    <View style={styles.container}>
      {/* Añadir TopBar */}
      <TopBar title="Clasificación" />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedJornada}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedJornada(itemValue)}
        >
          {[...Array(30).keys()].map(i => (
            <Picker.Item key={i + 1} label={`Jornada ${i + 1} (${fechasjornadas[i]})`} value={i + 1} />
          ))}
        </Picker>
      </View>

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
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, cellIndex) => (
                <View key={cellIndex} style={[
                  styles.cell,
                  rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow,
                  cellIndex === 1 ? styles.secondColumn : styles.firstColumn
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
    flex: 1,
  },
  secondColumn: {
    flex: 4,
  },
  otherColumn: {
    flex: 1,
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

export default ClasificacionScreen;
