import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AddFunction from './(tabs)/add';
import BalanceBlock from './(tabs)/balanceBlock';
import BankInfo from './(tabs)/bankInfo';
import ProfileScreen from './(tabs)/explore';
import HomeScreen from './(tabs)/index';
import ScannerScreen from './(tabs)/scanner';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [balance, setBalance] = useState(0);

  const updateBalance = (newBalance: number) => {
    setBalance(newBalance);
  };

  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen name="(tabs)/explore" component={BottomTabs} options={{ headerShown: true, title: 'PocketPay', headerBackTitle: 'Back', }} />
        <Stack.Screen name="(tabs)/add" component={AddFunction} options={{ headerShown: true, title: "Add Money", headerBackTitle: 'Back', }} />
        <Stack.Screen name="(tabs)/bankInfo" options={{ headerShown: true, title: "Add Money", headerBackTitle: 'Back', }}>
          {(props) => <BankInfo {...props} balance={balance} updateBalance={updateBalance} />}
        </Stack.Screen>
        <Stack.Screen name="(tabs)/balanceBlock" options={{ headerShown: true, title: "Add Money", headerBackTitle: 'Back', }}>
          {(props) => <BalanceBlock {...props} balance={balance} />}
        </Stack.Screen>
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home', headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile', headerShown: false }} />
      <Tab.Screen name="QRPay" component={ScannerScreen} options={{ title: 'QR Pay', headerShown: false }} />
    </Tab.Navigator>
  );
}
