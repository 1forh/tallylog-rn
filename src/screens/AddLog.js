import React from 'react';
import { SafeAreaView } from 'react-native';
import { tailwind } from '@tailwind';
import { useDispatch } from 'react-redux';
import TopBar from '@components/TopBar';
import Container from '@components/Container';
import LogForm from '@components/LogForm';
import { createLog } from '@store/actions/logsActions';

export default function AddLog({ navigation }) {
  const dispatch = useDispatch();

  const submit = (form) => {
    dispatch(createLog(form));
    navigation.navigate('Logs');
  };

  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <TopBar iconType="down" goBack={() => navigation.goBack()}>
        Add Log
      </TopBar>

      <Container style={tailwind('flex-1 mt-5')}>
        <LogForm submit={submit} buttonText="Add log" />
      </Container>
    </SafeAreaView>
  );
}
