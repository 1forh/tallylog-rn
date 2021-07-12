import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import { tailwind } from '@tailwind';
import InputWithLabel from '@components/InputWithLabel';
import { updatePassword } from '@store/actions/userActions';
import { CheckCircleIcon } from 'react-native-heroicons/solid';

export default function UpdatePasswordForm() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const onUpdatePassword = async () => {
    try {
      await dispatch(updatePassword(currentPassword, newPassword));
      setCurrentPassword('');
      setNewPassword('');
      fadeIn();

      setTimeout(() => {
        fadeOut();
      }, 3000);
    } catch (error) {
      alert(error);
      fadeOut();
    }
  };

  return (
    <>
      <View style={tailwind('mb-6 w-full')}>
        <InputWithLabel placeholder="Current password" value={currentPassword} secureTextEntry={true} onChangeText={(text) => setCurrentPassword(text)} />
        <InputWithLabel placeholder="New password" value={newPassword} secureTextEntry={true} onChangeText={(text) => setNewPassword(text)} />
      </View>

      <View style={tailwind('flex justify-center w-full items-start')}>
        <View style={tailwind('flex-row justify-center items-center')}>
          <TouchableOpacity onPress={onUpdatePassword} disabled={currentPassword === '' || newPassword === ''} style={tailwind('bg-blue-500 py-2 px-5 rounded-lg')}>
            <Text style={tailwind('text-blue-800 text-base font-bold text-center')}>Update Password</Text>
          </TouchableOpacity>
          <Animated.View style={{ opacity: fadeAnim }}>
            <CheckCircleIcon size="32" style={tailwind('text-green-500 ml-4')} />
          </Animated.View>
        </View>
      </View>
    </>
  );
}
