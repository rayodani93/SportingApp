// src/presentation/screens/LoginScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { LoginScreenNavigationProp } from '../../types/navigation';

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Login Screen</Text>
      <Input
        placeholder="Email"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Password"
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        secureTextEntry
        containerStyle={styles.inputContainer}
      />
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
      />
      <Button
        title="Registro"
        onPress={() => navigation.navigate('Register')}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
    color: 'black',
  },
  image: {
    width: 240,
    height: 280,
    marginBottom: 20,
    resizeMode: 'contain', 
  },
  button: {
    backgroundColor: 'black',
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
  },
  inputContainer: {
    
    width: '80%',
  },
});


export default LoginScreen;
