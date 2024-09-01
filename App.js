// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AssetDetailsScreen from './screens/AssetDetailsScreen';
import ModifyMaintenanceScreen from './screens/ModifyMaintenanceScreen'; // Importa la nueva pantalla
import { AuthProvider } from './context/AuthContext'; // Importa el proveedor de contexto

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AssetDetails" component={AssetDetailsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ModifyMaintenance" component={ModifyMaintenanceScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
