import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Alert } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { LoginScreenNavigationProp } from '../../types/navigation';
import { supabase } from '../../config/supabaseClient';
import { colors } from '../../types/theme';

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true); // Mostrar el estado de carga
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        Alert.alert('Error', error.message);
      } else if (data.user?.email === 'rayodani93@gmail.com') {
        // Navega al dashboard si es superusuario
        navigation.navigate('Dashboard');
      } else {
        // Si no es superusuario, navega a la pantalla Home
        navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert('Error', 'Algo salió mal. Inténtalo de nuevo.');
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/FondoInicioSesion.jpg')}
      style={styles.backgroundImage}
    >
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
            theme={{ colors: { text: colors.primary, primary: colors.primary } }}
          />

          <TextInput
            label="Contraseña"
            value={password}
            mode="outlined"
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
            theme={{ colors: { text: colors.primary, primary: colors.primary } }}
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading} // Muestra un indicador de carga
            disabled={loading} // Desactiva el botón mientras carga
            style={styles.loginButton}
            labelStyle={{ color: colors.strongBlue }}
          >
            Iniciar Sesión
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.navigate('Register')}
            labelStyle={styles.registerButtonText}
            style={styles.registerButton}
          >
            ¿No tienes cuenta? Regístrate
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.strongBlue,
  },
  input: {
    marginBottom: 20,
    backgroundColor: colors.white,
  },
  loginButton: {
    marginTop: 10,
    borderRadius: 30,
    backgroundColor: colors.white,
    borderColor: colors.strongBlue,
    borderWidth: 2,
  },
  registerButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  registerButtonText: {
    color: colors.strongBlue,
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default LoginScreen;
