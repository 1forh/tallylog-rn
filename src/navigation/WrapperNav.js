import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoggedIn from '@navigation/LoggedIn';
import LoggedOut from '@navigation/LoggedOut';
import { gray } from '@utils/colors';

const Stack = createStackNavigator();

export default function WrapperNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          cardStyle: { backgroundColor: gray[900] },
        }}
      >
        <Stack.Screen
          name="LoggedIn"
          component={LoggedIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoggedOut"
          component={LoggedOut}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
