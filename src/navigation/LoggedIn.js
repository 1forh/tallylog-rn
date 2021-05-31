import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogsNav from '@navigation/LogsNav';
import Settings from '@screens/Settings';
import { gray, blue } from '@utils/colors';
import { tailwind } from '@utils/tailwind';
import { CogIcon, ViewListIcon } from 'react-native-heroicons/solid';

const Tab = createBottomTabNavigator();

const LoggedIn = () => {
  return (
    <Tab.Navigator
      initialRouteName="LogItems"
      screenOptions={({ route }) => ({
        cardStyle: { backgroundColor: gray[900] },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'LogsNav') {
            return <ViewListIcon color={color} size={size} />;
          } else if (route.name === 'Settings') {
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
      <Tab.Screen name="Settings" component={Settings} options={{ title: '' }} />
    </Tab.Navigator>
  );
};

export default LoggedIn;
