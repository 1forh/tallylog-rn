import React from 'react';
import { SafeAreaView } from 'react-native';
import { tailwind } from '@tailwind';
import { useDispatch, useSelector } from 'react-redux';
import TopBar from '@components/TopBar';
import Container from '@components/Container';
import LogItemForm from '@components/LogItemForm';
import { editLogItem } from '@store/actions/logsActions';

export default function EditLogItem({ navigation }) {
  const dispatch = useDispatch();
  const log = useSelector((state) => state.logsReducer.log);
  const item = useSelector((state) => state.logsReducer.item);

  const submit = (form) => {
    dispatch(editLogItem(log.id, item.id, form));
    navigation.navigate('LogItems');
  };

  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <TopBar iconType="left" goBack={() => navigation.goBack()}>
        Edit Item
      </TopBar>

      <Container style={tailwind('flex-1 mt-5')}>
        <LogItemForm submit={submit} item={item} buttonText="Edit log" />
      </Container>
    </SafeAreaView>
  );
}
