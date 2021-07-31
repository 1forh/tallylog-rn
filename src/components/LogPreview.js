import React, { useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, I18nManager, Animated, Pressable, Alert } from 'react-native';
import { tailwind } from '@utils/tailwind';
import { gray, red, green, blue, yellow, indigo, pickerColors, pickerColorsText } from '@utils/colors';
import { useDispatch } from 'react-redux';
import { deleteLog } from '@store/actions/logsActions';
import { TrashIcon, PencilAltIcon } from 'react-native-heroicons/solid';
import { Swipeable } from 'react-native-gesture-handler';

export default function LogPreview({ navigate = () => {}, style, log, demo }) {
  const dispatch = useDispatch();
  const swipeableRef = useRef(null);
  const { name, color: logColor } = log;

  const goToLog = () => {
    dispatch({ type: 'items/SET_LOG', payload: log });
    navigate('LogItems');
  };

  const goToEditLog = () => {
    dispatch({ type: 'items/SET_LOG', payload: log });
    navigate('EditLog');
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
      {renderRightAction('Edit', 'pencil', gray[100], gray[900], 75, progress, () => goToEditLog())}
      {renderRightAction('Delete', 'trash', red[600], red[900], 150, progress, () => {
        Alert.alert('Deleting log', `Are you sure you want to delete this log?`, [
          {
            text: 'Ok',
            onPress: () => {
              dispatch(deleteLog(log.id));
            },
          },
          {
            text: 'Cancel',
          },
        ]);
      })}
    </View>
  );

  const Wrapper = ({ children }) => {
    return demo ? (
      <View>{children}</View>
    ) : (
      <Swipeable ref={swipeableRef} friction={2} leftThreshold={30} rightThreshold={40} renderRightActions={renderRightActions}>
        {children}
      </Swipeable>
    );
  };

  return (
    <View style={[style, logColor ? { backgroundColor: pickerColors[logColor] } : tailwind('bg-gray-800'), tailwind('rounded-lg overflow-hidden')]}>
      <Wrapper>
        <Pressable onPress={goToLog} style={[logColor ? { backgroundColor: pickerColors[logColor] } : tailwind('bg-gray-800'), tailwind('rounded-lg px-4 py-5 flex-row items-center justify-between')]}>
          <Text style={[logColor ? { color: pickerColorsText[logColor] } : tailwind('text-gray-300'), tailwind('text-xl font-semibold')]}>{name}</Text>
        </Pressable>
      </Wrapper>
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
