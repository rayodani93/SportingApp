import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useSupabaseAuth } from '../../config/useSupabaseAuth'; // Asegúrate de tener esta hook correctamente implementada
import { DashboardScreenNavigationProp } from '../../types/navigation';

type Props = {
  navigation: DashboardScreenNavigationProp;
};

const Dashboard: React.FC<Props> = ({ navigation }) => {
  const { user, loading } = useSupabaseAuth();

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  if (!user || user.email !== 'rayodani93@gmail.com') {
    return <Text>No tienes acceso a esta página.</Text>;
  }

  return (
    <View style={styles.container}>
      <Button title="Subir Fotos Jugadores" onPress={() => navigation.navigate('SubirFotos')} />
      <Button title="Añadir Noticias" onPress={() => navigation.navigate('AddNoticia')} />
      <Button title="Añadir Convocatoria" onPress={() => navigation.navigate('Convocatoria')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default Dashboard;
