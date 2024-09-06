import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './presentation/screens/HomeScreen';
import MiembrosScreen from './presentation/screens/MiembrosScreen';
import NoticiasScreen from './presentation/screens/NoticiasScreen';
import ClasificacionScreen from './presentation/screens/ClasificacionScreen';
import GoleadoresScreen from './presentation/screens/GoleadoresScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Miembros" component={MiembrosScreen} />
        <Stack.Screen name="Noticias" component={NoticiasScreen} />
        <Stack.Screen name="Clasificacion" component={ClasificacionScreen} />
        <Stack.Screen name="Goleadores" component={GoleadoresScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

