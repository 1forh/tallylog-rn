import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import WrapperNav from '@navigation/WrapperNav';
import theStore from '@store';
import { tailwind } from '@tailwind';

export default function App() {
  return (
    <View style={tailwind('flex-1')}>
      <Provider store={theStore}>
        <WrapperNav />
      </Provider>
    </View>
  );
}
