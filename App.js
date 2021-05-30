import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import TheApp from './src/TheApp';

import theStore from '@store';

export default function App() {
  return (
    <Provider store={theStore}>
      <StatusBar />
      <TheApp />
    </Provider>
  );
}
