import React, { useCallback, useEffect } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Platform, LayoutAnimation, Pressable, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { tailwind } from '@utils/tailwind';
import LogItemPreview from '@components/LogItemPreview';
import TopBar from '@components/TopBar';
import Container from '@components/Container';
import BannerAd from '@components/BannerAd';
import * as Haptics from 'expo-haptics';
import { PlusIcon } from 'react-native-heroicons/solid';
import { fetchItems, updateItemOrder } from '@store/actions/logsActions';
import { gray, blue } from '@utils/colors';
// import BlurredTopWrapper from '@components/BlurredTopWrapper';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { BlurView } from 'expo-blur';

export default function LogItems({ navigation, isFavorites }) {
  const dispatch = useDispatch();
  const log = useSelector((state) => state.logsReducer.log);
  const items = useSelector((state) => state.logsReducer.items);
  const itemsLoading = useSelector((state) => state.logsReducer.itemsLoading);
  const { name } = log;

  const goToAddItem = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    navigation.navigate('AddItem');
  };

  const onDragEnd = (data, from, to) => {
    dispatch(updateItemOrder(log.id, data));
  };

  const renderItem = useCallback(({ item, index, drag, isActive }) => {
    return (
      <View style={tailwind('mb-4')}>
        <LogItemPreview navigate={navigation.navigate} item={item} log={log} onLongPress={drag} />
      </View>
    );
  }, []);

  useEffect(() => {
    dispatch(fetchItems(log.id));
  }, []);

  // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  const topBar = (
    <TopBar goBack={() => navigation.goBack()} style={tailwind('z-50')} iconType={isFavorites ? 'star' : 'left'}>
      {name}
    </TopBar>
  );

  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <View style={tailwind('flex-1')} stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="always" scrollEventThrottle={32}>
        <View style={tailwind('relative')}>
          <BlurView style={tailwind('absolute w-full h-full z-10')} intensity={75} tint="dark" />
          <View style={tailwind('z-50')}>{topBar}</View>
        </View>

        <Container style={tailwind('flex-1 mt-5')}>
          {itemsLoading ? (
            <View style={tailwind('flex-1 items-center justify-center')}>
              <ActivityIndicator size="large" color={blue[500]} />
            </View>
          ) : items.length > 0 ? (
            <DraggableFlatList data={items} renderItem={renderItem} keyExtractor={(item, index) => `draggable-item-${item.id}`} onDragEnd={({ data, from, to }) => onDragEnd(data, from, to)} />
          ) : (
            <Pressable onPress={goToAddItem} style={tailwind('pt-10 justify-center items-center')}>
              <PlusIcon style={tailwind('mb-3')} color={gray[300]} size={48} />
              <Text style={tailwind('text-xl text-gray-200 text-center')}>Add an item to start tallying</Text>
            </Pressable>
          )}
        </Container>
      </View>

      <BannerAd />

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
          ...tailwind('rounded-full w-14 h-14 flex items-center bg-blue-500 justify-center absolute bottom-20 right-5'),
        }}
      >
        <PlusIcon size={42} style={tailwind('text-blue-800')} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
