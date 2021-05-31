import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { tailwind } from '@tailwind';
import { blue } from '@utils/colors';

export default function TheLoader() {
  return (
    <View style={tailwind('flex-1 items-center justify-center')}>
      <ActivityIndicator size="large" color={blue[500]} />
    </View>
  );
}
