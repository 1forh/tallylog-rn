import React, { useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, I18nManager, Animated, Pressable, Alert } from 'react-native';
import { tailwind } from '@utils/tailwind';
import { gray, green, red } from '@utils/colors';
import { useDispatch } from 'react-redux';
import { TrashIcon, PencilAltIcon } from 'react-native-heroicons/solid';
import { LineChart } from 'react-native-svg-charts';
import { Swipeable } from 'react-native-gesture-handler';
import { deleteItem } from '@store/actions/logsActions';

export default function LogItemPreview({ navigate = () => {}, style, item, log }) {
  const dispatch = useDispatch();
  const swipeableRef = useRef(null);
  const { name, tally, history, goal } = item;
  const historyTallies = history.map((item) => item.tally).slice(0, 5);

  const goToEditLogItem = () => {
    dispatch({ type: 'items/SET_ITEM', payload: item });
    navigate('EditLogItem');
    swipeableRef.current.close();
  };

  const renderRightAction = (text, icon, color, textColor, x, progress, handler) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
        <TouchableOpacity style={[styles.rightAction, { backgroundColor: color }, icon === 'trash' ? tailwind('rounded-tr-lg rounded-br-lg') : null]} onPress={handler}>
          {icon === 'pencil' ? (
            <PencilAltIcon name={icon} size={24} style={{ color: textColor, ...tailwind('mb-2') }} />
          ) : (
            <TrashIcon name={icon} size={24} style={{ color: textColor, ...tailwind('mb-2') }} />
          )}
          <Text style={{ color: textColor, ...tailwind('font-medium') }}>{text}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderRightActions = (progress) => (
    <View
      style={{
        width: 150,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      }}
    >
      {renderRightAction('Edit', 'pencil', gray[100], gray[900], 75, progress, () => goToEditLogItem())}
      {renderRightAction('Delete', 'trash', red[600], red[900], 150, progress, () => {
        Alert.alert('Deleting item', `Are you sure you want to delete this item?`, [
          {
            text: 'Ok',
            onPress: () => {
              dispatch(deleteItem(log.id, item.id));
            },
          },
          {
            text: 'Cancel',
          },
        ]);
      })}
    </View>
  );

  const goTo = () => {
    dispatch({ type: 'items/SET_ITEM', payload: item });
    navigate('LogItem');
  };

  return (
    <View style={tailwind('bg-gray-800 rounded-lg overflow-hidden')}>
      <Swipeable ref={swipeableRef} friction={2} leftThreshold={30} rightThreshold={40} renderRightActions={renderRightActions}>
        <Pressable onPress={goTo} style={tailwind('bg-gray-800 rounded-lg px-4 py-5 flex-row items-center justify-between')}>
          <View style={tailwind('flex-row items-center')}>
            <Text style={tailwind('text-gray-400 text-xl mr-6')}>{name}</Text>
            <LineChart style={{ width: 75, height: 60 }} data={historyTallies} svg={{ stroke: green[500], strokeWidth: 3 }} contentInset={{ top: 20, bottom: 20 }}></LineChart>
          </View>
          <Text style={[tailwind('font-bold'), goal ? tailwind('text-2xl') : tailwind(' text-4xl'), tally >= goal ? tailwind('text-green-500') : tailwind('text-gray-400')]}>
            {tally}
            {goal && <Text>/{goal}</Text>}
          </Text>
        </Pressable>
      </Swipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
