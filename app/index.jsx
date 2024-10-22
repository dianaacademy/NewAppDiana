import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './Context/AuthContext';
import LoginScreenSS from './LoginSS'; 
import HomeScreen from './(tabs)/home';
import SignupSS from './SignupSS';
import Forgotpass from './Forgotpass';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer independent={true}>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="Home" component={HomeScreen} />
      
    </Stack.Navigator>
  );
};

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LoginSS" component={LoginScreenSS} /> 
    <Stack.Screen name="SignupSS" component={SignupSS} />
    <Stack.Screen name="Forgotpass" component={Forgotpass} />
  </Stack.Navigator>
);

export default App;