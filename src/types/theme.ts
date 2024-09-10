// theme.ts
import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#1e3c72',
  secondary: '#2a5298',
  white: '#ffffff',
};

// Definimos un tipo para los estilos
export const commonStyles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 30,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    textTransform: 'uppercase',
  },
});
