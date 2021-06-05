import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { tailwind } from '@tailwind';
import InputWithLabel from '@components/InputWithLabel';

export default function LogItemForm({ item, submit, buttonText }) {
  const [form, setForm] = useState({
    name: item?.name ?? '',
    goal: item?.goal ?? null,
    resetEvery: item?.resetEvery ? item?.resetEvery : item ? 'never' : 'day',
  });

  const ResetButtonTally = ({ resetEvery, text, isActive = false }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={[isActive ? tailwind('bg-gray-800') : null, tailwind(' items-center justify-center text-white px-4 py-3 rounded-lg')]}
        onPress={() => setForm({ ...form, resetEvery })}
      >
        <Text style={[tailwind('items-center justify-center'), tailwind('text-white text-sm font-semibold capitalize')]}>{resetEvery}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={tailwind('mb-6')}>
        <InputWithLabel label="What do you want to tally?" value={form.name} onChangeText={(text) => setForm({ ...form, name: text })} autoFocus={true} />
      </View>

      <View style={tailwind('mb-6 w-48')}>
        <InputWithLabel label="Set a goal" value={form.goal} onChangeText={(text) => setForm({ ...form, goal: text })} keyboardType="number-pad" />
      </View>

      <View style={tailwind('mb-6')}>
        <View>
          <Text style={[tailwind(`mb-2 font-bold text-lg text-gray-400`)]}>Reset tally every</Text>

          <View style={tailwind('flex-row w-full')}>
            <ResetButtonTally resetEvery="day" isActive={form.resetEvery === 'day'} />
            <ResetButtonTally resetEvery="week" isActive={form.resetEvery === 'week'} />
            <ResetButtonTally resetEvery="month" isActive={form.resetEvery === 'month'} />
            <ResetButtonTally resetEvery="year" isActive={form.resetEvery === 'year'} />
            <ResetButtonTally resetEvery="never" isActive={form.resetEvery === 'never'} />
          </View>
        </View>
      </View>

      <View style={tailwind('flex justify-center mt-10 w-full items-center')}>
        <TouchableOpacity onPress={() => submit(form)} disabled={form.name === ''} style={tailwind('bg-blue-500 w-full py-4 rounded-lg')}>
          <Text style={tailwind('text-blue-800 text-xl font-bold text-center')}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
