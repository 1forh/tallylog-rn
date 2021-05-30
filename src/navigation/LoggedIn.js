import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogItem from '@screens/LogItem';
import LogItems from '@screens/LogItem';
import { gray } from '@utils/colors';

const Stack = createStackNavigator();

const LoggedIn = () => {
  return (
    <NavigationContainer>
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
        <Stack.Screen name="LogItem" component={LogItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoggedIn;
