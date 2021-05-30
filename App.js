import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import TheApp from './src/TheApp';
import theStore from '@store';
import { tailwind } from '@tailwind';
import { gray } from '@utils/colors';

export default function App() {
  return (
    <View style={tailwind('flex-1')}>
      <Provider store={theStore}>
        <TheApp />
      </Provider>
    </View>
  );
}
