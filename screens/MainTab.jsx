
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import DashboardScreen from './DashboardScreen';
import LogsScreen from './LogsScreen';
import ProfileScreen from './ProfileScreen';
import LoginScreen from './LoginScreen';

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = 'view-dashboard';
          else if (route.name === 'Logs') iconName = 'format-list-bulleted';
          else if (route.name === 'Profile') iconName = 'account';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#111372ff',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,

      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Logs" component={LogsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>

  );
}
