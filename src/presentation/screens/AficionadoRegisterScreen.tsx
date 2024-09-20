import React, { useEffect, useState } from 'react';
import { View, Button, Image, Alert, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import { supabase } from '../../config/supabaseClient';
import { colors, commonStyles } from '../../types/theme';

const SubirFotos = () => {
  const [jugadores, setJugadores] = useState<any[]>([]); 
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); 

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
    <ImageBackground source={require('../../assets/Messi.jpeg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedPlayer}
            onValueChange={(itemValue) => setSelectedPlayer(itemValue)}
            style={styles.picker}
          >
            {jugadores.map((jugador) => (
              <Picker.Item key={jugador.id} label={jugador.nombre} value={jugador.id} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={commonStyles.button} onPress={handleImagePicker}>
          <Text style={commonStyles.buttonText}>Seleccionar Imagen</Text>
        </TouchableOpacity>

        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.imagePreview} />}

        <TouchableOpacity style={commonStyles.button} onPress={handleUpload}>
          <Text style={commonStyles.buttonText}>Subir Foto</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  },
  pickerContainer: {
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
  imagePreview: {
    width: '100%',
    height: 300,
    marginVertical: 20,
    resizeMode: 'contain',
    borderRadius: 10,
  },
});

export default SubirFotos;
