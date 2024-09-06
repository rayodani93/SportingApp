import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Player: { playerId: number };
  Miembros: undefined; // Agregamos Miembros
  Noticias: undefined; // Agregamos Noticias
  Clasificacion: undefined; // Agregamos Clasificación
  Goleadores: undefined; // Agregamos Goleadores
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

export type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;
