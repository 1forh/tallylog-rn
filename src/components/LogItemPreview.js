import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { tailwind } from '@utils/tailwind';
import { gray } from '@utils/colors';

export default function LogItemPreview({ navigate = () => {}, style, item }) {
  const { name, tally } = item;

  return (
    <View style={{ ...style }}>
      <TouchableOpacity onPress={() => navigate('LogItem')} style={tailwind('bg-gray-800 rounded-lg px-4 py-5 flex-row items-center justify-between')}>
        <Text style={tailwind('text-gray-400 text-xl')}>{name}</Text>
        <Text style={tailwind('text-gray-400 text-4xl font-bold')}>{tally}</Text>
      </TouchableOpacity>
    </View>
  );
}
