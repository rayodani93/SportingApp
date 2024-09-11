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
  GoleadoresGeneral: undefined; // Nueva pantalla de Goleadores General
  JugadorRegister: undefined; 
  AficionadoRegister: undefined; 
  AddNoticia: undefined; 
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type GoleadoresScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Goleadores'
>;

export type GoleadoresGeneralScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GoleadoresGeneral'
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
export type MiembrosScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Miembros'
>;
