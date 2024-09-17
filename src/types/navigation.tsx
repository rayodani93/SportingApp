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
  Calendario: undefined;
  GoleadoresGeneral: undefined;
  JugadorRegister: undefined;
  AficionadoRegister: undefined;
  AddNoticia: undefined;
  SubirFotos: undefined; // Agrega esta ruta si no la tienes
  Convocatoria: undefined; // Agrega esta ruta si no la tienes
  Dashboard: undefined;
  NewsDetail: { id: number };
};


export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type GoleadoresScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Goleadores'
>;

export type CalendarioScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Calendario'
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

export type NewsDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NewsDetail'
>;

export type AddNoticiaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddNoticia'
>;

export type MiembrosScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Miembros'
>;

export type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;