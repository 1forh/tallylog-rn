import React from 'react';
import { View, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import WrapperNav from '@navigation/WrapperNav';
import theStore from '@store';
import { tailwind } from '@tailwind';

export default function App() {
  LogBox.ignoreLogs([
    'ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.',
  ]);

  return (
    <View style={tailwind('flex-1')}>
      <Provider store={theStore}>
        <WrapperNav />
      </Provider>
    </View>
  );
}
