import React, { useState } from 'react';
import { View, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { TextInput, Button, Title, HelperText } from 'react-native-paper';
import { supabase } from '../../config/supabaseClient';
import { RegisterScreenNavigationProp } from '../../types/navigation';
import { colors } from '../../types/theme';

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const AficionadoRegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');

  const handleRegister = async () => {
    if (!nombre || !nombreUsuario || !email || !password || !repetirPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (password !== repetirPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      // 1. Inserta al aficionado en la tabla de seguidores
      const { error: insertError } = await supabase.from('seguidores').insert([
        {
          nombre,
          email,
          contrasena: password,
        },
      ]);

      if (insertError) throw insertError;

      // 2. Enviar correo de autenticación a través de Supabase Auth
      const { error: authError } = await supabase.auth.signUp({
        email,
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
        source={require('../../assets/fondo_registro.jpg')} // Asegúrate de que la ruta es correcta
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Title style={styles.title}>Registro de Aficionado</Title>
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
          label="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />
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
  button: {
    backgroundColor: colors.primary,
    width: '100%',
    paddingVertical: 10,
  },
});

export default AficionadoRegisterScreen;
