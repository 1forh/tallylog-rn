import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Logs from '@screens/Logs';
import LogItems from '@screens/LogItems';
import LogItem from '@screens/LogItem';
import { gray } from '@utils/colors';
import AddItem from '@screens/AddItem';
import AddLog from '@screens/AddLog';
import EditLog from '@screens/EditLog';
import EditLogItem from '@screens/EditLogItem';

const Stack = createStackNavigator();

export default function LogsNav() {
  return (
    <Stack.Navigator
      initialRouteName="Logs"
      screenOptions={{
        cardStyle: { backgroundColor: gray[900] },
      }}
    >
      <Stack.Screen
        name="Logs"
        component={Logs}
        options={{
          headerShown: false,
        }}
      />
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
        name="EditLog"
        component={EditLog}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditLogItem"
        component={EditLogItem}
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
      <Stack.Screen
        name="AddLog"
        component={AddLog}
        options={{
          headerShown: false,
          gestureDirection: 'vertical',
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
    </Stack.Navigator>
  );
}
