import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, ScrollView, View, TouchableOpacity, Platform, LayoutAnimation } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { tailwind } from '@utils/tailwind';
import { BlurView } from 'expo-blur';
import LogPreview from '@components/LogPreview';
import Container from '@components/Container';
import TopBar from '@components/TopBar';
import * as Haptics from 'expo-haptics';
import { PlusIcon } from 'react-native-heroicons/solid';
import { fetchLogs } from '@store/actions/logsActions';

export default function Logs({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const logs = useSelector((state) => state.logsReducer.logs);

  const goToAddItem = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    navigation.navigate('AddLog');
  };

  useEffect(() => {
    dispatch(fetchLogs());
  }, []);

  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <ScrollView style={tailwind('flex-1')} stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="always" scrollEventThrottle={32}>
        <View style={tailwind('relative')}>
          <BlurView style={tailwind('absolute w-full h-full z-10')} intensity={75} tint="dark" />
          <TopBar style={tailwind('z-50')}>My Logs</TopBar>
        </View>

        <Container style={tailwind('pt-5 pb-20')}>
          {logs.length > 0 ? (
            logs.map((log) => (
              <View style={tailwind('mb-4')} key={log.id}>
                <LogPreview navigate={navigation.navigate} log={log} />
              </View>
            ))
          ) : (
            <View></View>
          )}
        </Container>
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={goToAddItem}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.4,
          shadowRadius: 1,
          elevation: 2,
          ...tailwind('rounded-full w-14 h-14 flex items-center bg-blue-500 justify-center absolute bottom-5 right-5'),
        }}
      >
        <PlusIcon size={42} style={tailwind('text-blue-800')} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
