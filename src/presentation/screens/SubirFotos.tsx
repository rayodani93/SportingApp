import React, { useEffect, useState } from 'react';
import { View, Button, Image, Alert, StyleSheet } from 'react-native';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import { supabase } from '../../config/supabaseClient';

const SubirFotos = () => {
  const [jugadores, setJugadores] = useState<any[]>([]); // Almacena jugadores
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null); // Jugador seleccionado
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Imagen seleccionada

  // Fetch de jugadores
  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase.from('jugadores').select('id, nombre');
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        setJugadores(data || []);
      }
    };
    fetchPlayers();
  }, []);

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri || null);
      }
    });
  };

  const handleUpload = async () => {
    if (!selectedPlayer) {
      Alert.alert('Error', 'Por favor selecciona un jugador.');
      return;
    }
    if (!selectedImage) {
      Alert.alert('Error', 'Por favor selecciona una imagen.');
      return;
    }

    const filePath = `jugadores/${selectedPlayer}.jpg`;

    const response = await fetch(selectedImage);
    const blob = await response.blob();

    const { error: uploadError } = await supabase.storage.from('jugadores').upload(filePath, blob, {
      cacheControl: '3600',
      upsert: true,
    });

    if (uploadError) {
      Alert.alert('Error al subir imagen', uploadError.message);
    } else {
      const { error: updateError } = await supabase
        .from('jugadores')
        .update({ foto: filePath })
        .eq('id', selectedPlayer);

      if (updateError) {
        Alert.alert('Error al actualizar jugador', updateError.message);
      } else {
        Alert.alert('Éxito', 'Foto subida correctamente.');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Seleccionar Jugador */}
      <Picker
        selectedValue={selectedPlayer}
        onValueChange={(itemValue) => setSelectedPlayer(itemValue)}
        style={styles.picker}
      >
        {jugadores.map((jugador) => (
          <Picker.Item key={jugador.id} label={jugador.nombre} value={jugador.id} />
        ))}
      </Picker>

      <Button title="Seleccionar Imagen" onPress={handleImagePicker} />
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.imagePreview} />}
      
      <Button title="Subir Foto" onPress={handleUpload} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
  imagePreview: {
    width: '100%',
    height: 300,
    marginVertical: 20,
    resizeMode: 'contain',
  },
});

export default SubirFotos;
