import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LogItems from '@screens/LogItems';
import LogItem from '@screens/LogItem';
import { gray } from '@utils/colors';

const Stack = createStackNavigator();

export default function LogsNav() {
  return (
    <Stack.Navigator
      initialRouteName="LogItems"
      screenOptions={{
        cardStyle: { backgroundColor: gray[900] },
      }}
    >
      <Stack.Screen
        name="LogItems"
        component={LogItems}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LogItem"
        component={LogItem}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
