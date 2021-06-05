import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { tailwind } from '@tailwind';
import Container from '@components/Container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BlurView } from 'expo-blur';

export default function BlurredTopWrapper({ children, topBar }) {
  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <KeyboardAwareScrollView style={tailwind('flex-1')} stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="always" scrollEventThrottle={32}>
        <View style={tailwind('relative')}>
          <BlurView style={tailwind('absolute w-full h-full z-10')} intensity={75} tint="dark" />
          <View style={tailwind('z-50')}>{topBar}</View>
        </View>

        <Container style={tailwind('flex-1 mt-5')}>{children}</Container>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
