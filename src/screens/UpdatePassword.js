import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { tailwind } from '@utils/tailwind';
import TopBar from '@components/TopBar';
import BlurredTopWrapper from '@components/BlurredTopWrapper';
import UpdatePasswordForm from '@components/UpdatePasswordForm';

export default function UpdatePassword({ navigation }) {
  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <BlurredTopWrapper
        topBar={
          <TopBar iconType="left" goBack={() => navigation.goBack()}>
            Update Password
          </TopBar>
        }
      >
        <View>
          <View style={tailwind('w-full')}>
            <Text style={tailwind('text-gray-500 text-base')}>Enter your current password and your new one</Text>
          </View>
          <UpdatePasswordForm />
        </View>
      </BlurredTopWrapper>
    </SafeAreaView>
  );
}
