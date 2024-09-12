import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './presentation/screens/HomeScreen';
import MiembrosScreen from './presentation/screens/MiembrosScreen';
import NoticiasScreen from './presentation/screens/NoticiasScreen';
import CalendarioScreen from './presentation/screens/CalendarioScreen';
import ClasificacionScreen from './presentation/screens/ClasificacionScreen';
import GoleadoresScreen from './presentation/screens/GoleadoresScreen';
import LoginScreen from './presentation/screens/LoginScreen';
import RegisterScreen from './presentation/screens/RegisterScreen';
import JugadorRegisterScreen from './presentation/screens/JugadorRegisterScreen';
import AficionadoRegisterScreen from './presentation/screens/AficionadoRegisterScreen';
import AddNoticiaScreen from './presentation/screens/AddNoticiasScreen';
import GoleadoresGeneralScreen from './presentation/screens/GoleadoresGeneralScreen';
import NewsDetailScreen from './presentation/screens/NewsDetailScreen'; // Importar la pantalla de detalle de noticias
import { RootStackParamList } from './types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Miembros"
          component={MiembrosScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Noticias"
          component={NoticiasScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Clasificacion"
          component={ClasificacionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Calendario"
          component={CalendarioScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Goleadores"
          component={GoleadoresScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="JugadorRegister"
          component={JugadorRegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AficionadoRegister"
          component={AficionadoRegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddNoticia"
          component={AddNoticiaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GoleadoresGeneral"
          component={GoleadoresGeneralScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewsDetail"
          component={NewsDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
