import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { LoginScreenNavigationProp } from '../../types/navigation';
import LinearGradient from 'react-native-linear-gradient';
import { commonStyles, colors } from '../../types/theme'; // Importamos los estilos y colores comunes

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LinearGradient colors={[colors.primary, colors.secondary]} style={styles.container}>
      <View style={styles.formContainer}>
        <Title style={styles.title}>Iniciar Sesión</Title>

        <TextInput
          label="Correo Electrónico"
          value={email}
          mode="outlined"
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          theme={{ colors: { text: colors.white, primary: colors.white } }} // Colores del input
        />

        <TextInput
          label="Contraseña"
          value={password}
          mode="outlined"
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          theme={{ colors: { text: colors.white, primary: colors.white } }} // Colores del input
        />

        {/* Botón de inicio de sesión con fondo blanco y texto en azul oscuro */}
        <Button
          mode="contained"
          onPress={() => console.log('Iniciar sesión')}
          style={[styles.loginButton, { backgroundColor: colors.white }]} // Fondo blanco
          labelStyle={{ color: colors.primary }} // Texto en azul oscuro
        >
          Iniciar Sesión
        </Button>

        {/* Botón de registro con texto blanco y negrita */}
        <Button
          mode="text"
          onPress={() => navigation.navigate('Register')}
          labelStyle={styles.registerButtonText} // Estilo del texto directamente
          style={styles.registerButton}
        >
          ¿No tienes cuenta? Regístrate
        </Button>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fondo semitransparente para el formulario
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.white,
  },
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent', // Fondo transparente para los inputs
  },
  loginButton: {
    marginTop: 10,
    borderRadius: 30, // Ajuste adicional de estilo del botón
  },
  registerButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  registerButtonText: {
    color: colors.white,
    fontWeight: 'bold', // Negrita
    fontSize: 16, // Tamaño de fuente ajustado
    textTransform: 'uppercase',
  },
});

export default LoginScreen;
