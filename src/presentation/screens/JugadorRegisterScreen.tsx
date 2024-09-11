import React, { useState } from 'react';
import { View, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { TextInput, Button, Title, HelperText } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { supabase } from '../../config/supabaseClient';
import { RegisterScreenNavigationProp } from '../../types/navigation';
import { colors } from '../../types/theme';

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const JugadorRegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [dni, setDni] = useState('');
  const [correo, setCorreo] = useState('');
  const [posicion, setPosicion] = useState('portero'); 
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [codigoConfirmacion, setCodigoConfirmacion] = useState('');

  // Función para validar el formato de DNI español
  const validarDNI = (dni: string): boolean => {
    const dniPattern = /^[0-9]{8}[A-Za-z]$/; // 8 dígitos seguidos de una letra
    return dniPattern.test(dni);
  };

  const handleRegister = async () => {
    if (!nombre || !nombreUsuario || !dni || !correo || !password || !repetirPassword || !codigoConfirmacion) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    // Validar el formato del DNI
    if (!validarDNI(dni)) {
      Alert.alert('Error', 'El DNI no es válido. Debe tener 8 dígitos seguidos de una letra.');
      return;
    }

    if (password !== repetirPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    // Validar el código de confirmación
    if (codigoConfirmacion !== '2468') {
      Alert.alert('Error', 'El código de confirmación es incorrecto');
      return;
    }

    try {
      // 1. Inserta al jugador en la tabla de jugadores
      const { error: insertError } = await supabase.from('jugadores').insert([
        {
          nombre,
          nombre_usuario: nombreUsuario,
          dni,
          correo,
          posicion,
          contrasena: password,
        },
      ]);

      if (insertError) throw insertError;

      // 2. Enviar correo de autenticación a través de Supabase Auth
      const { error: authError } = await supabase.auth.signUp({
        email: correo,
        password,
      });

      if (authError) throw authError;

      Alert.alert('Éxito', 'Registro completado. Por favor, verifica tu correo electrónico.');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../assets/fondo_registro.jpg')} 
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Title style={styles.title}>Registro de Jugador</Title>
        <TextInput
          label="Nombre Completo"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
          autoCapitalize="words"
        />
        <TextInput
          label="Nombre de Usuario"
          value={nombreUsuario}
          onChangeText={setNombreUsuario}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          label="DNI"
          value={dni}
          onChangeText={setDni}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          label="Correo Electrónico"
          value={correo}
          onChangeText={setCorreo}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Picker
          selectedValue={posicion}
          onValueChange={(itemValue) => setPosicion(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Portero" value="portero" />
          <Picker.Item label="Defensa" value="defensa" />
          <Picker.Item label="Centrocampista" value="centrocampista" />
          <Picker.Item label="Delantero" value="delantero" />
        </Picker>

        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <TextInput
          label="Repetir Contraseña"
          value={repetirPassword}
          onChangeText={setRepetirPassword}
          style={styles.input}
          secureTextEntry
        />

        {password !== repetirPassword && (
          <HelperText type="error" visible={password !== repetirPassword}>
            Las contraseñas no coinciden
          </HelperText>
        )}

        
        <TextInput
          label="Código de Confirmación"
          value={codigoConfirmacion}
          onChangeText={setCodigoConfirmacion}
          style={styles.input}
          secureTextEntry
        />

        <Button mode="contained" onPress={handleRegister} style={styles.button}>
          Registrarse
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semitransparente
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    width: '100%',
    backgroundColor: colors.white,
  },
  picker: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: colors.white,
  },
  button: {
    backgroundColor: colors.primary,
    width: '100%',
    paddingVertical: 10,
  },
});

export default JugadorRegisterScreen;
