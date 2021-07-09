import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, SafeAreaView, View } from 'react-native';
import { tailwind } from '@utils/tailwind';
import TopBar from '@components/TopBar';
import BlurredTopWrapper from '@components/BlurredTopWrapper';

export default function LogItemHistory({ navigation }) {
  const dispatch = useDispatch();
  const { tally, name, id: itemId } = useSelector((state) => state.logsReducer.item);
  const { id: logId } = useSelector((state) => state.logsReducer.log);

  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <BlurredTopWrapper
        topBar={
          <TopBar iconType="left" goBack={() => navigation.goBack()}>
            History
          </TopBar>
        }
      >
        <Text>Testing</Text>
      </BlurredTopWrapper>
    </SafeAreaView>
  );
}
