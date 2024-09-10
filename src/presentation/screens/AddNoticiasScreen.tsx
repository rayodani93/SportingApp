import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity, Text } from 'react-native';
import { launchImageLibrary, launchCamera, ImagePickerResponse, ImageLibraryOptions, CameraOptions } from 'react-native-image-picker';
import { createNoticia } from '../../services/api'; // Asegúrate de que la ruta es correcta
import { colors } from '../../types/theme';

const AddNoticiaScreen: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [imagen, setImagen] = useState<string | null>(null);
  const [contenido, setContenido] = useState('');

  const handleAddNoticia = async () => {
    if (titulo && imagen && contenido) {
      try {
        await createNoticia(titulo, imagen, contenido);
        Alert.alert('Éxito', 'Noticia creada correctamente');
      } catch (error) {
        Alert.alert('Error', (error as Error).message);
      }
    } else {
      Alert.alert('Error', 'Todos los campos son obligatorios');
    }
  };

  const handleImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('El usuario canceló la selección de la imagen');
      } else if (response.errorCode) {
        console.error('Error al seleccionar la imagen:', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0].uri;
        setImagen(selectedImage || null);
      }
    });
  };

  const handleCameraLaunch = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 1,
    };
    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('El usuario canceló la captura de imagen');
      } else if (response.errorCode) {
        console.error('Error al capturar la imagen:', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const capturedImage = response.assets[0].uri;
        setImagen(capturedImage || null);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />
      <TextInput
        placeholder="Contenido"
        value={contenido}
        onChangeText={setContenido}
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={5}
      />
      
      {/* Botón para seleccionar la imagen de la galería */}
      <TouchableOpacity style={styles.imageButton} onPress={handleImagePicker}>
        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>

      {/* Botón para capturar imagen con la cámara */}
      <TouchableOpacity style={styles.imageButton} onPress={handleCameraLaunch}>
        <Text style={styles.buttonText}>Capturar Imagen</Text>
      </TouchableOpacity>

      {/* Mostrar la imagen seleccionada */}
      {imagen && (
        <Image source={{ uri: imagen }} style={styles.imagePreview} />
      )}

      <Button title="Añadir Noticia" onPress={handleAddNoticia} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  input: {
    height: 40,
    borderColor: colors.primary,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  textArea: {
    height: 100,
  },
  imageButton: {
    backgroundColor: colors.primary,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: colors.white,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    resizeMode: 'contain',
  },
});

export default AddNoticiaScreen;
