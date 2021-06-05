import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { tailwind } from '@tailwind';
import { useDispatch, useSelector } from 'react-redux';
import TopBar from '@components/TopBar';
import LogItemForm from '@components/LogItemForm';
import { createItem } from '@store/actions/logsActions';
import BlurredTopWrapper from '@components/BlurredTopWrapper';

export default function AddItem({ navigation }) {
  const dispatch = useDispatch();
  const log = useSelector((state) => state.logsReducer.log);

  const submit = (form) => {
    dispatch(createItem(log.id, form));
    navigation.navigate('LogItems');
  };

  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <BlurredTopWrapper
        topBar={
          <TopBar style={tailwind('z-50')} iconType="down" goBack={() => navigation.goBack()}>
            Add Item
          </TopBar>
        }
      >
        <LogItemForm submit={submit} buttonText="Add item" />
      </BlurredTopWrapper>
    </SafeAreaView>
  );
}
