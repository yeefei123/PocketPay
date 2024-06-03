import { useColorScheme } from '@/hooks/useColorScheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import AddFunction from './(tabs)/add';
import BankInfo from './(tabs)/bankInfo';
import ProfileScreen from './(tabs)/explore';
import HomeScreen from './(tabs)/index';
import ScannerScreen from './(tabs)/scanner'; // renamed from App to avoid confusion

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home', headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile', headerShown: false }} />
      <Tab.Screen name="QRPay" component={ScannerScreen} options={{ title: 'QR Pay', headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <Stack.Navigator>
        <Stack.Screen name="(tabs)/explore" component={BottomTabs} options={{ headerShown: true, title: 'PocketPay', headerBackTitle: 'Back', }} />
        <Stack.Screen name="(tabs)/add" component={AddFunction} options={{ headerShown: true, title: "Add Money" }} />
      <Stack.Screen name="(tabs)/bankInfo" component={BankInfo} options={{ headerShown: true, title: "Add Money" }} />
      </Stack.Navigator>
  );
}
