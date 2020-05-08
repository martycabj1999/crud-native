import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Inicio from './views/Inicio';
import NewClient from './views/NewClient';
import ClientDetails from './views/ClientDetails';
import Navbar from './components/ui/NavBar';

//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//React Native Paper
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();

//Definir el tema
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent: '#0655BF'
  }
}

const App = () => {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Inicio"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary
              },
              headerTintColor: theme.colors.surface,
              headerTitleStyle: {
                fontWeight: 'bold'
              }
            }}
          >
            <Stack.Screen
              name="Inicio"
              component={Inicio}
              options={ () => ({
                headerTitleAlign: 'center'
              })}
            />
            <Stack.Screen
              name="NuevoCliente"
              component={NewClient}
              options={{
                headerTitleAlign: 'center',
                title: "Nuevo Cliente"
              }}
            />
            <Stack.Screen
              name="DetallesCliente"
              component={ClientDetails}
              options={{
                title: "Detalles Cliente"
              }}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
