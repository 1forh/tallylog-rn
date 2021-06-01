import React, { useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { tailwind } from '@tailwind';
import { useDispatch, useSelector } from 'react-redux';
import TopBar from '@components/TopBar';
import InputWithLabel from '@components/InputWithLabel';
import Container from '@components/Container';
import { createItem } from '@store/actions/logsActions';

export default function AddItem({ navigation }) {
  const dispatch = useDispatch();
  const log = useSelector((state) => state.logsReducer.log);
  const [form, setForm] = useState({
    name: '',
  });

  const submit = () => {
    dispatch(createItem(log.id, form));
    navigation.navigate('LogItems');
  };

  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <TopBar iconType="down" goBack={() => navigation.goBack()}>
        Add Item
      </TopBar>

      <Container style={tailwind('flex-1 mt-5')}>
        <View style={tailwind('mb-6')}>
          <InputWithLabel label="Name" onChangeText={(text) => setForm({ ...form, name: text })} autoFocus={true} />
        </View>

        <View style={tailwind('flex justify-center mt-10 w-full items-center')}>
          <TouchableOpacity onPress={submit} disabled={form.name === ''} style={tailwind('bg-blue-500 w-full py-4 rounded-lg')}>
            <Text style={tailwind('text-blue-800 text-xl font-bold text-center')}>Add Item</Text>
          </TouchableOpacity>
        </View>
      </Container>
    </SafeAreaView>
  );
}
