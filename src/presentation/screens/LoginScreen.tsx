import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { LoginScreenNavigationProp } from '../../types/navigation';
import { colors } from '../../types/theme'; // Importamos los colores

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
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
          theme={{ colors: { text: colors.primary, primary: colors.primary } }} // Texto y bordes en azul
        />

        <TextInput
          label="Contraseña"
          value={password}
          mode="outlined"
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          theme={{ colors: { text: colors.primary, primary: colors.primary } }} // Texto y bordes en azul
        />

        {/* Botón de inicio de sesión con fondo blanco y texto en azul más fuerte */}
        <Button
          mode="contained"
          onPress={() => console.log('Iniciar sesión')}
          style={styles.loginButton}
          labelStyle={{ color: colors.strongBlue }} // Texto en azul más fuerte
        >
          Iniciar Sesión
        </Button>

        {/* Botón de registro con texto en azul más fuerte */}
        <Button
          mode="text"
          onPress={() => navigation.navigate('Register')}
          labelStyle={styles.registerButtonText} // Estilo del texto directamente
          style={styles.registerButton}
        >
          ¿No tienes cuenta? Regístrate
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white, // Fondo blanco
  },
  formContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'transparent', // Elimina cualquier cuadro de fondo innecesario
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.strongBlue, // Texto en azul
  },
  input: {
    marginBottom: 20,
    backgroundColor: colors.white, // Fondo blanco para el input
    borderColor: colors.primary, // Borde azul para los inputs
  },
  loginButton: {
    marginTop: 10,
    borderRadius: 30, // Borde redondeado
    backgroundColor: colors.white, // Fondo blanco
    borderColor: colors.strongBlue, // Borde azul fuerte
    borderWidth: 2, // Ancho del borde
  },
  registerButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  registerButtonText: {
    color: colors.strongBlue, // Texto en azul más fuerte
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default LoginScreen;
