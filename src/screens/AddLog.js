import React from 'react';
import { SafeAreaView } from 'react-native';
import { tailwind } from '@tailwind';
import { useDispatch } from 'react-redux';
import TopBar from '@components/TopBar';
import LogForm from '@components/LogForm';
import { createLog } from '@store/actions/logsActions';
import BlurredTopWrapper from '@components/BlurredTopWrapper';

export default function AddLog({ navigation }) {
  const dispatch = useDispatch();

  const submit = (form) => {
    dispatch(createLog(form));
    navigation.navigate('Logs');
  };

  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <BlurredTopWrapper
        topBar={
          <TopBar iconType="down" goBack={() => navigation.goBack()}>
            Add Log
          </TopBar>
        }
      >
        <LogForm submit={submit} buttonText="Add log" />
      </BlurredTopWrapper>
    </SafeAreaView>
  );
}
