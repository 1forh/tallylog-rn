import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoggedIn from '@navigation/LoggedIn';
import LoggedOut from '@navigation/LoggedOut';
import TheLoader from '@screens/TheLoader';
import { gray } from '@utils/colors';
import { firebase } from '@utils/firebase';

const Stack = createStackNavigator();

export default function WrapperNav() {
  const dispatch = useDispatch();
  const [isAuthenticationReady, setAuthenticationReady] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);

  const onAuthStateChanged = (user) => {
    const authenticated = (user?.uid && user.uid !== '') || false;

    if (authenticated) {
      dispatch({
        type: 'user/SET_USER',
        payload: { email: user.email, uid: user.uid, name: user.displayName },
      });
    }

    setAuthenticationReady(true);

    setAuthenticated(!!user);
  };

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: gray[900],
    },
  };

  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  firebase.auth().onAuthStateChanged(onAuthStateChanged);

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          cardStyle: { backgroundColor: gray[900] },
        }}
      >
        {isAuthenticationReady ? (
          isAuthenticated ? (
            <Stack.Screen
              name="LoggedIn"
              component={LoggedIn}
              options={{
                headerShown: false,
                cardStyleInterpolator: forFade,
              }}
            />
          ) : (
            <Stack.Screen
              name="LoggedOut"
              component={LoggedOut}
              options={{
                headerShown: false,
                cardStyleInterpolator: forFade,
              }}
            />
          )
        ) : (
          <Stack.Screen
            name="TheLoader"
            component={TheLoader}
            options={{
              headerShown: false,
              cardStyleInterpolator: forFade,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
