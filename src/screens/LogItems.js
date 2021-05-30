import React, { useState } from 'react';
import { SafeAreaView, Text, ScrollView, View } from 'react-native';
import { tailwind } from '@utils/tailwind';
import { BlurView } from 'expo-blur';
import LogItemPreview from '@components/LogItemPreview';
import Container from '@components/Container';
import TopBar from '@components/TopBar';

export default function LogItems({ navigation }) {
  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <ScrollView style={tailwind('flex-1')} stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="always" scrollEventThrottle={32}>
        <View style={tailwind('relative')}>
          <BlurView style={tailwind('absolute w-full h-full z-10')} intensity={75} tint="dark" />
          <TopBar style={tailwind('z-50')}>Fitness</TopBar>
        </View>

        <Container style={tailwind('pt-5')}>
          <LogItemPreview navigate={navigation.navigate} style={tailwind('mb-4')} />
          <LogItemPreview navigate={navigation.navigate} style={tailwind('mb-4')} />
          <LogItemPreview navigate={navigation.navigate} style={tailwind('mb-4')} />
          <LogItemPreview navigate={navigation.navigate} style={tailwind('mb-4')} />
          <LogItemPreview navigate={navigation.navigate} style={tailwind('mb-4')} />
          <LogItemPreview navigate={navigation.navigate} style={tailwind('mb-4')} />
          <LogItemPreview navigate={navigation.navigate} style={tailwind('mb-4')} />
          <LogItemPreview navigate={navigation.navigate} style={tailwind('mb-4')} />
          <LogItemPreview navigate={navigation.navigate} style={tailwind('mb-4')} />
          <LogItemPreview navigate={navigation.navigate} style={tailwind('mb-4')} />
          <LogItemPreview navigate={navigation.navigate} style={tailwind('mb-4')} />
          <LogItemPreview navigate={navigation.navigate} style={tailwind('mb-4')} />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}
