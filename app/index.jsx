import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './Context/AuthContext';
import LoginScreenSS from './LoginSS';
import HomeScreen from './(tabs)/home';
import SignupSS from './SignupSS';
import Forgotpass from './Forgotpass';
import Moblogin from './OTPLogin';
import OTPLogin from './OTPLogin';
import OTPVerification from './OTPVerification';

const Stack = createStackNavigator();

// Navigation container for authenticated screens
const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      {/* Add other authenticated screens here */}
    </Stack.Navigator>
  );
};

// Navigation container for authentication screens
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginSS" component={LoginScreenSS} />
      <Stack.Screen name="SignupSS" component={SignupSS} />
      <Stack.Screen name="Forgotpass" component={Forgotpass} />
      <Stack.Screen name="OTPLogin" component={OTPLogin} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
    </Stack.Navigator>
  );
};

// Root navigator that checks auth state
const RootNavigator = () => {
  const { userData } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userData ? (
        <Stack.Screen name="Main" component={MainStack} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

// Main App component
const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer independent={true}>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;