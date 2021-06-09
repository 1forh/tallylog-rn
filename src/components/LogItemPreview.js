import React, { useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, I18nManager, Animated, Pressable, Alert } from 'react-native';
import { tailwind } from '@utils/tailwind';
import { gray, green, red } from '@utils/colors';
import { useDispatch } from 'react-redux';
import { TrashIcon, PencilAltIcon } from 'react-native-heroicons/solid';
import { LineChart } from 'react-native-svg-charts';
import { Swipeable } from 'react-native-gesture-handler';
import { deleteItem } from '@store/actions/logsActions';

export default function LogItemPreview({ navigate = () => {}, style, item, log, onLongPress }) {
  const dispatch = useDispatch();
  const swipeableRef = useRef(null);
  const { name, tally, history, goal, resetEvery, tallyUpdated } = item;
  const historyTallies = history?.map((item) => item.tally) ?? [];

  let resetEveryLabel;
  if (resetEvery === 'day') {
    resetEveryLabel = 'Today';
  } else if (resetEvery === 'week') {
    resetEveryLabel = 'This week';
  } else if (resetEvery === 'month') {
    resetEveryLabel = 'This month';
  } else if (resetEvery === 'year') {
    resetEveryLabel = 'This year';
  }

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
        <Pressable onPress={goTo} onLongPress={onLongPress} style={tailwind('bg-gray-800 rounded-lg px-4 py-2 flex-row items-center justify-between')}>
          <View style={tailwind('flex-row items-center')}>
            <View style={tailwind('mr-6')}>
              <Text style={tailwind('text-gray-400 text-xl -mb-1')}>{name}</Text>
              {resetEveryLabel && <Text style={tailwind('text-gray-500 text-base')}>{resetEveryLabel}</Text>}
            </View>
            <LineChart style={{ width: 75, height: 60 }} data={historyTallies} svg={{ stroke: green[500], strokeWidth: 3 }} contentInset={{ top: 20, bottom: 20 }}></LineChart>
          </View>

          <View style={tailwind('items-end')}>
            <Text style={[tailwind('font-bold text-xl -mb-1'), tally >= goal ? tailwind('text-green-500') : tailwind('text-gray-400')]}>
              {tally}
              {goal && <Text>/{goal}</Text>}
            </Text>
            {tallyUpdated && <Text style={tailwind('text-gray-500 text-base')}>{tallyUpdated}</Text>}
          </View>
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
