import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import LoginScreen from './LoginScreen';


export default function RootLayout() {
  useFonts({
    'outfit':require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold':require('../assets/fonts/Outfit-Bold.ttf'),

  })

  return (
    <Stack screenOptions={{headerShown:false}}>
      {/* <Stack.Screen name="login" component={LoginScreen} /> */}
      <Stack.Screen name="(tabs)"  />
    </Stack>
  );
}
