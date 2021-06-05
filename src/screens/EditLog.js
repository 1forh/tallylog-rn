import React from 'react';
import { SafeAreaView } from 'react-native';
import { tailwind } from '@tailwind';
import { useDispatch, useSelector } from 'react-redux';
import TopBar from '@components/TopBar';
import LogForm from '@components/LogForm';
import { editLog } from '@store/actions/logsActions';
import BlurredTopWrapper from '@components/BlurredTopWrapper';

export default function EditLog({ navigation }) {
  const dispatch = useDispatch();
  const log = useSelector((state) => state.logsReducer.log);

  const submit = (form) => {
    dispatch(editLog(log.id, form));
    navigation.navigate('Logs');
  };

  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <BlurredTopWrapper
        topBar={
          <TopBar iconType="left" goBack={() => navigation.goBack()}>
            Edit Log
          </TopBar>
        }
      >
        <LogForm submit={submit} log={log} buttonText="Edit log" />
      </BlurredTopWrapper>
    </SafeAreaView>
  );
}
