import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import LoggedIn from '@navigation/LoggedIn';
import LoggedOut from '@navigation/LoggedOut';
import TheLoader from '@components/TheLoader';
import { firebase } from '@utils/firebase';
import { tailwind } from '@tailwind';

export default function TheApp() {
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
      setAuthenticated(authenticated);
    }

    setAuthenticationReady(true);
  };

  firebase.auth().onAuthStateChanged(onAuthStateChanged);

  if (isAuthenticationReady) {
    if (isAuthenticated) {
      return <LoggedIn />;
    } else {
      return <LoggedOut />;
    }
  } else {
    return <TheLoader style={tailwind('flex-1')} />;
  }
}
