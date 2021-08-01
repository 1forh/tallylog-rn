import React from 'react';
import { Text, View } from 'react-native';
import { tailwind } from '@utils/tailwind';
import { AdMobBanner } from 'expo-ads-admob';

export default function BannerAd() {
  const onBannerError = (error) => {
    console.error(error);
  };

  return (
    <View style={tailwind('w-full')}>
      <AdMobBanner
        adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds={true}
        onDidFailToReceiveAdWithError={onBannerError}
      />
    </View>
  );
}
