import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Platform, LayoutAnimation, Pressable, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { tailwind } from '@utils/tailwind';
import LogPreview from '@components/LogPreview';
import TopBar from '@components/TopBar';
import BlurredTopWrapper from '@components/BlurredTopWrapper';
import * as Haptics from 'expo-haptics';
import { PlusIcon } from 'react-native-heroicons/solid';
import { fetchLogs, logsLoading } from '@store/actions/logsActions';
import { gray, blue } from '@utils/colors';

export default function Logs({ navigation }) {
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.logsReducer.logs);
  const logsLoading = useSelector((state) => state.logsReducer.logsLoading);

  const goToAddLog = () => {
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
      <BlurredTopWrapper topBar={<TopBar style={tailwind('z-50')}>My Logs</TopBar>}>
        {logsLoading ? (
          <View style={tailwind('flex-1 items-center justify-center pt-20')}>
            <ActivityIndicator size="large" color={blue[500]} />
          </View>
        ) : logs.length > 0 ? (
          logs.map((log) => (
            <View style={tailwind('mb-4')} key={log.id}>
              <LogPreview navigate={navigation.navigate} log={log} />
            </View>
          ))
        ) : (
          <Pressable onPress={goToAddLog} style={tailwind('pt-10 justify-center items-center')}>
            <PlusIcon style={tailwind('mb-3')} color={gray[300]} size={48} />
            <Text style={tailwind('text-xl text-gray-200 text-center')}>Add a log to get started</Text>
          </Pressable>
        )}
      </BlurredTopWrapper>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={goToAddLog}
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
