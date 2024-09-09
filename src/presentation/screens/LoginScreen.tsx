import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { LoginScreenNavigationProp } from '../../types/navigation'; // Asegúrate de que la ruta es correcta

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Iniciar Sesión</Title>

      <TextInput
        label="Correo Electrónico"
        value={email}
        mode="outlined"
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email" // Usamos autoComplete en lugar de autoCompleteType
      />

      <TextInput
        label="Contraseña"
        value={password}
        mode="outlined"
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <Button mode="contained" onPress={() => console.log('Iniciar sesión')} style={styles.button}>
        Iniciar Sesión
      </Button>

      <Button mode="text" onPress={() => navigation.navigate('Register')} style={styles.registerButton}>
        ¿No tienes cuenta? Regístrate
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
  registerButton: {
    marginTop: 10,
  },
});

export default LoginScreen;
