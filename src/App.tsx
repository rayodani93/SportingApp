import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './presentation/screens/HomeScreen';
import MiembrosScreen from './presentation/screens/MiembrosScreen';
import NoticiasScreen from './presentation/screens/NoticiasScreen';
import ClasificacionScreen from './presentation/screens/ClasificacionScreen';
import GoleadoresScreen from './presentation/screens/GoleadoresScreen';
import LoginScreen from './presentation/screens/LoginScreen';
import RegisterScreen from './presentation/screens/RegisterScreen';
import JugadorRegisterScreen from './presentation/screens/JugadorRegisterScreen';
import AficionadoRegisterScreen from './presentation/screens/AficionadoRegisterScreen';
import AddNoticiaScreen from './presentation/screens/AddNoticiasScreen'; // Asegúrate de que la ruta es correcta

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} // Ocultar el encabezado para la pantalla de inicio
        />
        <Stack.Screen name="Miembros" component={MiembrosScreen} />
        <Stack.Screen name="Noticias" component={NoticiasScreen} />
        <Stack.Screen name="Clasificacion" component={ClasificacionScreen} />
        <Stack.Screen name="Goleadores" component={GoleadoresScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="JugadorRegister" component={JugadorRegisterScreen} />
        <Stack.Screen name="AficionadoRegister" component={AficionadoRegisterScreen} />
        <Stack.Screen name="AddNoticia" component={AddNoticiaScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
