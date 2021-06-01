import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { tailwind } from '@utils/tailwind';
import { gray, green } from '@utils/colors';
import { useDispatch } from 'react-redux';
import { LineChart } from 'react-native-svg-charts';

export default function LogItemPreview({ navigate = () => {}, style, item }) {
  const dispatch = useDispatch();
  const { name, tally, history } = item;
  const historyTallies = history.map((item) => item.tally).slice(0, 10);

  const goTo = () => {
    dispatch({ type: 'items/SET_ITEM', payload: item });
    navigate('LogItem');
  };

  return (
    <View style={{ ...style }}>
      <TouchableOpacity onPress={goTo} style={tailwind('bg-gray-800 rounded-lg px-4 py-5 flex-row items-center justify-between')}>
        <View style={tailwind('flex-row items-center')}>
          <Text style={tailwind('text-gray-400 text-xl mr-6')}>{name}</Text>
          <LineChart style={{ width: 75, height: 60 }} data={historyTallies} svg={{ stroke: green[500], strokeWidth: 3 }} contentInset={{ top: 20, bottom: 20 }}></LineChart>
        </View>
        <Text style={tailwind('text-gray-400 text-4xl font-bold')}>{tally}</Text>
      </TouchableOpacity>
    </View>
  );
}
