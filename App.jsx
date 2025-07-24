import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';


import { View, SafeAreaView, Image, StyleSheet, Platform, StatusBar } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import MainTab from './screens/MainTab';
import DashboardScreen from './screens/DashboardScreen';
import myTheme from './src/theme';
import messaging from '@react-native-firebase/messaging';


const Stack = createNativeStackNavigator();

export default function App() {

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
  }

  useEffect(() => {
    requestUserPermission();
    getToken();
  }, [])
  return (
    <PaperProvider theme={myTheme}>
      <NavigationContainer>
        <SafeAreaView style={styles.safeArea}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={MainTab}
              options={{
                headerShown: false
              }}
            />
          </Stack.Navigator>
        </SafeAreaView >

      </NavigationContainer>

    </PaperProvider >


  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0

  },
});
