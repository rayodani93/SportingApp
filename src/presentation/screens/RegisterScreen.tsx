// src/presentation/screens/RegisterScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { RegisterScreenNavigationProp } from '../../types/navigation';

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Register Screen</Text>
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
      <Input
        placeholder="Confirm Password"
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        secureTextEntry
        containerStyle={styles.inputContainer}
      />
      <Button
        title="Register"
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        onPress={() => console.log('Register pressed')}
      />
      <Button
        title="Go to Login"
        type="clear"
        titleStyle={styles.clearButtonTitle}
        onPress={() => navigation.navigate('Login')}
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
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    width: '80%',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#6200ee',
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
  },
  clearButtonTitle: {
    color: '#6200ee',
  },
});

export default RegisterScreen;
