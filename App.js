import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import TheApp from './src/TheApp';
import theStore from '@store';
import { tailwind } from '@tailwind';

export default function App() {
  return (
    <View style={tailwind('flex-1 bg-gray-900')}>
      <StatusBar barStyle="light-content" translucent={true} />
      <Provider store={theStore}>
        <TheApp />
      </Provider>
    </View>
  );
}
