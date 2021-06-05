import React from 'react';
import { SafeAreaView } from 'react-native';
import { tailwind } from '@tailwind';
import { useDispatch, useSelector } from 'react-redux';
import TopBar from '@components/TopBar';
import LogItemForm from '@components/LogItemForm';
import Container from '@components/Container';
import { createItem } from '@store/actions/logsActions';

export default function AddItem({ navigation }) {
  const dispatch = useDispatch();
  const log = useSelector((state) => state.logsReducer.log);

  const submit = (form) => {
    dispatch(createItem(log.id, form));
    navigation.navigate('LogItems');
  };

  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <TopBar iconType="down" goBack={() => navigation.goBack()}>
        Add Item
      </TopBar>

      <Container style={tailwind('flex-1 mt-5')}>
        <LogItemForm submit={submit} buttonText="Add item" />
      </Container>
    </SafeAreaView>
  );
}
