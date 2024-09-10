import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Player: { playerId: number };
  Miembros: undefined; 
  Noticias: undefined; 
  Clasificacion: undefined; 
  Goleadores: undefined; 
  JugadorRegister: undefined; 
  AficionadoRegister: undefined; 
  AddNoticia: undefined; // Nueva pantalla para añadir noticias
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

export type NoticiasScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Noticias'
>;

export type AddNoticiaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddNoticia'
>;
