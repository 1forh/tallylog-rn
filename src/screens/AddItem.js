import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { tailwind } from '@tailwind';
import TopBar from '@components/TopBar';

export default function AddItem({ navigation }) {
  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <TopBar iconType="down" goBack={() => navigation.goBack()}>
        Add Item
      </TopBar>
      <Text></Text>
    </SafeAreaView>
  );
}
