import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { tailwind } from '@tailwind';
import { blue } from '@utils/colors';

export default function TheLoader({ style }) {
  return (
    <View style={{ ...style, ...tailwind('items-center justify-center') }}>
      <ActivityIndicator size="large" color={blue[500]} />
    </View>
  );
}
