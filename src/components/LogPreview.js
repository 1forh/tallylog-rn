import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { tailwind } from '@utils/tailwind';
import { gray } from '@utils/colors';
import { useDispatch } from 'react-redux';

export default function LogPreview({ navigate = () => {}, style, log }) {
  const dispatch = useDispatch();
  const { name, tally } = log;

  const goTo = () => {
    dispatch({ type: 'items/SET_LOG', payload: log });
    navigate('LogItems');
  };

  return (
    <View style={{ ...style }}>
      <TouchableOpacity onPress={goTo} style={tailwind('bg-gray-800 rounded-lg px-4 py-5 flex-row items-center justify-between')}>
        <Text style={tailwind('text-gray-400 text-xl')}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}
