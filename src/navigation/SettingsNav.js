import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '@screens/Settings';
import { gray } from '@utils/colors';
import UpdatePassword from '@screens/UpdatePassword';

const Stack = createStackNavigator();

export default function SettingsNav() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        cardStyle: { backgroundColor: gray[900] },
      }}
    >
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UpdatePassword"
        component={UpdatePassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
