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
import GoleadoresGeneralScreen from './presentation/screens/GoleadoresGeneralScreen';

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
        <Stack.Screen name="Miembros" component={MiembrosScreen}options={{ headerShown: false }} />
        <Stack.Screen name="Noticias" component={NoticiasScreen}options={{ headerShown: false }} />
        <Stack.Screen name="Clasificacion" component={ClasificacionScreen} options={{ title: 'Clasificación' }}/>
        <Stack.Screen name="Goleadores" component={GoleadoresScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen}options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="JugadorRegister" component={JugadorRegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AficionadoRegister" component={AficionadoRegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AddNoticia" component={AddNoticiaScreen} options={{ headerShown: false }}/> 
        <Stack.Screen name="GoleadoresGeneral" component={GoleadoresGeneralScreen} options={{ headerShown: false }}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
