import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogItem from '@screens/LogItem';
import LogItems from '@screens/LogItem';

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
          name="LogItems"
          component={LogItems}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="LogItem" component={LogItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoggedIn;
