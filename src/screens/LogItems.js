import React, { useState } from 'react';
import { SafeAreaView, Text, ScrollView, View, TouchableOpacity, Platform } from 'react-native';
import { tailwind } from '@utils/tailwind';
import { BlurView } from 'expo-blur';
import LogItemPreview from '@components/LogItemPreview';
import Container from '@components/Container';
import TopBar from '@components/TopBar';
import * as Haptics from 'expo-haptics';
import { PlusIcon } from 'react-native-heroicons/solid';

export default function LogItems({ navigation }) {
  const goToAddItem = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    navigation.navigate('AddItem');
  };

  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <ScrollView style={tailwind('flex-1')} stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="always" scrollEventThrottle={32}>
        <View style={tailwind('relative')}>
          <BlurView style={tailwind('absolute w-full h-full z-10')} intensity={75} tint="dark" />
          <TopBar style={tailwind('z-50')}>Fitness</TopBar>
        </View>

        <Container style={tailwind('pt-5 pb-20')}>
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

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={goToAddItem}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.4,
          shadowRadius: 1,
          elevation: 2,
          ...tailwind('rounded-full w-14 h-14 flex items-center bg-blue-500 justify-center absolute bottom-5 right-5'),
        }}
      >
        <PlusIcon size={42} style={tailwind('text-blue-800')} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
