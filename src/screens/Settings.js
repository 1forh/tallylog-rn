import React from 'react';
import { useDispatch } from 'react-redux';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { signOut } from '@store/actions/userActions';
import { tailwind } from '@utils/tailwind';

export default function Settings({ navigation }) {
  const dispatch = useDispatch();

  const onSignOut = async () => {
    try {
      await dispatch(signOut());
      navigation.navigate('LoggedOut', { screen: 'Login' });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <View style={tailwind('flex-1 justify-end pb-14 items-center')}>
        <TouchableOpacity onPress={onSignOut} style={tailwind('bg-gray-300 py-3 px-10 rounded-lg')}>
          <Text>Sign out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
