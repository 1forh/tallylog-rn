import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';

export default function LogItems({ navigation }) {
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate('LogItem')}>
        <Text>View Item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
