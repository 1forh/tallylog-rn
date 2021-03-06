import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '@screens/Login';
import CreateAccount from '@screens/CreateAccount';
import Splash from '@screens/Splash';
import WalkThrough from '@screens/WalkThrough';
import { gray } from '@utils/colors';

const Stack = createStackNavigator();

const LoggedIn = () => {
  return (
    <Stack.Navigator
      initialRouteName="WalkThrough"
      screenOptions={{
        cardStyle: { backgroundColor: gray[900] },
      }}
    >
      <Stack.Screen name="WalkThrough" component={WalkThrough} options={{ headerShown: false }} />
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default LoggedIn;
