import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, ScrollView, View, TouchableOpacity, Platform, LayoutAnimation, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { tailwind } from '@utils/tailwind';
import LogItemPreview from '@components/LogItemPreview';
import TopBar from '@components/TopBar';
import * as Haptics from 'expo-haptics';
import { PlusIcon } from 'react-native-heroicons/solid';
import { fetchItems } from '@store/actions/logsActions';
import { gray } from '@utils/colors';
import BlurredTopWrapper from '@components/BlurredTopWrapper';

export default function LogItems({ navigation, isFavorites }) {
  const dispatch = useDispatch();
  const log = useSelector((state) => state.logsReducer.log);
  const items = useSelector((state) => state.logsReducer.items);
  const { name } = log;

  const goToAddItem = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    navigation.navigate('AddItem');
  };

  useEffect(() => {
    dispatch(fetchItems(log.id));
  }, []);

  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  const topBar = (
    <TopBar goBack={() => navigation.goBack()} style={tailwind('z-50')} iconType={isFavorites ? 'star' : 'left'}>
      {name}
    </TopBar>
  );

  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <BlurredTopWrapper topBar={topBar}>
        {items.length > 0 ? (
          items.map((item) => (
            <View style={tailwind('mb-4')} key={item.id}>
              <LogItemPreview navigate={navigation.navigate} item={item} log={log} />
            </View>
          ))
        ) : (
          <Pressable onPress={goToAddItem} style={tailwind('pt-10 justify-center items-center')}>
            <PlusIcon style={tailwind('mb-3')} color={gray[300]} size={48} />
            <Text style={tailwind('text-xl text-gray-200 text-center')}>Add an item to start tallying</Text>
          </Pressable>
        )}
      </BlurredTopWrapper>

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
