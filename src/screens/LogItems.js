import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, ScrollView, View, TouchableOpacity, Platform, LayoutAnimation } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { tailwind } from '@utils/tailwind';
import { BlurView } from 'expo-blur';
import LogItemPreview from '@components/LogItemPreview';
import Container from '@components/Container';
import TopBar from '@components/TopBar';
import * as Haptics from 'expo-haptics';
import { PlusIcon, StarIcon } from 'react-native-heroicons/solid';
import { fetchItems } from '@store/actions/logsActions';
import { gray } from '@utils/colors';

export default function LogItems({ navigation, isFavorites }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
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

  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <ScrollView style={tailwind('flex-1')} stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="always" scrollEventThrottle={32}>
        <View style={tailwind('relative')}>
          <BlurView style={tailwind('absolute w-full h-full z-10')} intensity={75} tint="dark" />
          <TopBar goBack={() => navigation.goBack()} style={tailwind('z-50')} iconType={isFavorites ? 'star' : 'left'}>
            {name}
          </TopBar>
        </View>

        <Container style={tailwind('pt-5 pb-20')}>
          {items.length > 0 ? (
            items.map((item) => (
              <View style={tailwind('mb-4')} key={item.id}>
                <LogItemPreview navigate={navigation.navigate} item={item} log={log} />
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
