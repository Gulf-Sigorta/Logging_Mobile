import React, { useEffect } from 'react';
import {
  NavigationContainer
} from '@react-navigation/native';
import {
  createNativeStackNavigator
} from '@react-navigation/native-stack';
import {
  Provider as PaperProvider
} from 'react-native-paper';

import messaging from '@react-native-firebase/messaging';

import {
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  Platform,
  AppRegistry,
  StatusBar,
  PermissionsAndroid,
  Alert // Alert modülünü buraya ekledik!
} from 'react-native';

import { name as appName } from './app.json';


import LoginScreen from './screens/LoginScreen';
import MainTab from './screens/MainTab';
import DashboardScreen from './screens/DashboardScreen';
import myTheme from './src/theme';

const Stack = createNativeStackNavigator();

export default function App() {

  const requestUserPermission = async () => {
    // requestPermission zaten AuthorizationStatus döndürdüğü için direkt boolean'a çevirebiliriz
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
    return enabled; // İzin durumunu döndürüyoruz
  }

  // Android 13+ için POST_NOTIFICATIONS iznini de isteyelim
  // Bu iznin kullanıcı tarafından verilip verilmediğini kontrol etmek iyi bir pratiktir.
  const requestPostNotificationsPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS, {
        title: "Bildirim İzni",
        message: "Uygulamamızın size bildirim göndermesine izin verir misiniz?",
        buttonNeutral: "Daha Sonra",
        buttonNegative: "Reddet",
        buttonPositive: "İzin Ver"
      }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('POST_NOTIFICATIONS permission granted');
        return true;
      } else {
        console.log('POST_NOTIFICATIONS permission denied');
        return false;
      }
    }
    return true; // iOS veya Android 13 altı için her zaman true döndür
  };


  useEffect(() => {
    const subscribeToTopic = async () => {
      try {
        await messaging().subscribeToTopic('log'); // örnek: "logging_updates"
        console.log('✅ Topic aboneliği başarılı');
      } catch (error) {
        console.error('❌ Topic aboneliği başarısız:', error);
      }
    };

    subscribeToTopic();
  }, []);


  useEffect(() => {
    const setupNotifications = async () => {
      // Önce Android 13+ için POST_NOTIFICATIONS iznini isteyelim
      const postNotificationsGranted = await requestPostNotificationsPermission();

      if (postNotificationsGranted) {
        // Sonra Firebase messaging iznini isteyelim
        const firebasePermissionGranted = await requestUserPermission();

        if (firebasePermissionGranted) {
          const token = await messaging().getToken();
          console.log('FCM Token:', token);
          // Token'ı kendi sunucunuza göndermek iyi bir fikir olabilir
        } else {
          console.log('Firebase messaging permission not granted');
        }
      } else {
        console.log('Notifications will not be shown due to POST_NOTIFICATIONS denial.');
      }
    };

    setupNotifications();

    // Uygulama ön plandayken gelen mesajları dinle
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      Alert.alert('Yeni Bir Bildirim Geldi!', JSON.stringify(remoteMessage.notification));
    });

    return unsubscribe;
  }, []);

  // Uygulama kapalıyken veya arka plandayken bildirim tıklandığında
  useEffect(() => {
    messaging().getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // Burada bildirimden gelen veriyi işleyebilirsiniz
        }
      });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // Burada bildirimden gelen veriyi işleyebilirsiniz
    });
  }, []);


  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    // Burada arka plan mesajıyla ilgili mantığınızı uygulayabilirsiniz.
    // Örneğin, yerel bir bildirim gösterebilir, veritabanını güncelleyebilir vb.
    // Bildirim mesajları için: remoteMessage.notification
    // Veri mesajları için: remoteMessage.data
  });



  AppRegistry.registerComponent(appName, () => App);


  return (
    <PaperProvider theme={myTheme}>
      <NavigationContainer>
        <SafeAreaView style={styles.safeArea}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false
              }}
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