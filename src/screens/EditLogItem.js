import React from 'react';
import { SafeAreaView } from 'react-native';
import { tailwind } from '@tailwind';
import { useDispatch, useSelector } from 'react-redux';
import TopBar from '@components/TopBar';
import LogItemForm from '@components/LogItemForm';
import { editLogItem } from '@store/actions/logsActions';
import BlurredTopWrapper from '@components/BlurredTopWrapper';

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
      <BlurredTopWrapper
        topBar={
          <TopBar iconType="left" goBack={() => navigation.goBack()}>
            Edit Item
          </TopBar>
        }
      >
        <LogItemForm submit={submit} item={item} buttonText="Edit log" />
      </BlurredTopWrapper>
    </SafeAreaView>
  );
}
