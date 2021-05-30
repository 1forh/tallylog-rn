import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { tailwind } from '@utils/tailwind';
import LogItemPreview from '@components/LogItemPreview';
import Container from '@components/Container';

export default function LogItems({ navigation }) {
  return (
    <SafeAreaView>
      <Container>
        <LogItemPreview navigate={navigation.navigate} />
      </Container>
    </SafeAreaView>
  );
}
