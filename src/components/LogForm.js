import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { tailwind } from '@tailwind';
import InputWithLabel from '@components/InputWithLabel';

export default function AddLog({ log, submit }) {
  const [form, setForm] = useState({
    name: log?.name ?? '',
  });

  return (
    <>
      <View style={tailwind('mb-6')}>
        <InputWithLabel label="Name" value={form.name} onChangeText={(text) => setForm({ ...form, name: text })} autoFocus={true} />
      </View>

      <View style={tailwind('flex justify-center mt-10 w-full items-center')}>
        <TouchableOpacity onPress={() => submit(form)} disabled={form.name === ''} style={tailwind('bg-blue-500 w-full py-4 rounded-lg')}>
          <Text style={tailwind('text-blue-800 text-xl font-bold text-center')}>Add Log</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
