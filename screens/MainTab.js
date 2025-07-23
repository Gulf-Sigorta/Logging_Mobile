
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './HomeScreen';
import LogsScreen from './LogsScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName;
      if (route.name === 'Dashboard') iconName = 'view-dashboard';
      else if (route.name === 'Logs') iconName = 'file-document';
      else if (route.name === 'Profile') iconName = 'account';

      return <Icon name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#2196F3',
    tabBarInactiveTintColor: 'gray',
    headerShown: false,
  })}
>
  <Tab.Screen name="Dashboard" component={HomeScreen} />
  <Tab.Screen name="Logs" component={LogsScreen} />
  <Tab.Screen name="Profile" component={ProfileScreen} />
</Tab.Navigator>

  );
}
