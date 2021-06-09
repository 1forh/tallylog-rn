import React, { useState } from 'react';
import { View, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import WrapperNav from '@navigation/WrapperNav';
import theStore from '@store';
import { tailwind } from '@tailwind';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';

export default function App() {
  LogBox.ignoreLogs([
    'ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.',
  ]);

  const [appIsReady, setAppIsReady] = useState(false);

  const stallSplashScreen = () => {
    const images = [require('./assets/splash.png')];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  };

  if (!appIsReady) {
    return <AppLoading startAsync={stallSplashScreen} onFinish={() => setAppIsReady(true)} onError={console.warn} />;
  }

  return (
    <View style={tailwind('flex-1')}>
      <Provider store={theStore}>
        <WrapperNav />
      </Provider>
    </View>
  );
}
