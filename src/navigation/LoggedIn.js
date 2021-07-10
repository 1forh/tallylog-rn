import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogsNav from '@navigation/LogsNav';
import SettingsNav from '@navigation/SettingsNav';
import { gray, blue } from '@utils/colors';
import { tailwind } from '@utils/tailwind';
import { CogIcon, ViewListIcon, StarIcon } from 'react-native-heroicons/solid';

const Tab = createBottomTabNavigator();

const LoggedIn = () => {
  return (
    <Tab.Navigator
      initialRouteName="Settings"
      screenOptions={({ route }) => ({
        cardStyle: { backgroundColor: gray[900] },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'LogsNav') {
            return <ViewListIcon color={color} size={size} />;
          } else if (route.name === 'FavoriteLog') {
            return <StarIcon color={color} size={size} />;
          } else if (route.name === 'SettingsNav') {
            return <CogIcon color={color} size={size} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: blue[500],
        inactiveTintColor: gray[300],
        style: {
          borderTopColor: 'transparent',
          backgroundColor: '#000',
          ...tailwind('pt-5'),
        },
      }}
    >
      <Tab.Screen name="LogsNav" component={LogsNav} options={{ title: '' }} />
      <Tab.Screen name="SettingsNav" component={SettingsNav} options={{ title: '' }} />
    </Tab.Navigator>
  );
};

export default LoggedIn;
