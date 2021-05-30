import React from 'react';
import { SafeAreaView, Text, ScrollView } from 'react-native';
import { tailwind } from '@utils/tailwind';
import LogItemPreview from '@components/LogItemPreview';
import Container from '@components/Container';

export default function LogItems({ navigation }) {
  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <ScrollView style={tailwind('flex-1')}>
        <Container style={tailwind('pt-5')}>
          <Text style={tailwind('font-bold text-2xl text-gray-400 mb-4')}>Fitness</Text>
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
