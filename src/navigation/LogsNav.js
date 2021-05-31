import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import LogItems from '@screens/LogItems';
import LogItem from '@screens/LogItem';
import { gray } from '@utils/colors';
import AddItem from '@screens/AddItem';

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
      <Stack.Screen
        name="AddItem"
        component={AddItem}
        options={{
          headerShown: false,
          gestureDirection: 'vertical',
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
    </Stack.Navigator>
  );
}
