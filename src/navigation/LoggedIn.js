import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogItem from '@screens/LogItem';

const Stack = createStackNavigator();

const LoggedIn = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LogItem"
        screenOptions={{
          cardStyle: { backgroundColor: '#fff' },
        }}
      >
        <Stack.Screen
          name="LogItem"
          component={LogItem}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoggedIn;
