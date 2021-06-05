import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { tailwind } from '@tailwind';
import InputWithLabel from '@components/InputWithLabel';
import ColorPicker from '@components/ColorPicker';

export default function LogForm({ log, submit, buttonText }) {
  const [form, setForm] = useState({
    name: log?.name ?? '',
    color: log?.color ?? '',
  });

  const pickColor = (color) => {
    setForm({ ...form, color });
  };

  return (
    <>
      <View style={tailwind('mb-6')}>
        <InputWithLabel label="Name" value={form.name} onChangeText={(text) => setForm({ ...form, name: text })} autoFocus={true} />
      </View>

      <View style={tailwind('mb-6')}>
        <ColorPicker pick={pickColor} color={form.color} />
      </View>

      <View style={tailwind('flex justify-center mt-10 w-full items-center')}>
        <TouchableOpacity onPress={() => submit(form)} disabled={form.name === ''} style={tailwind('bg-blue-500 w-full py-4 rounded-lg')}>
          <Text style={tailwind('text-blue-800 text-xl font-bold text-center')}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
