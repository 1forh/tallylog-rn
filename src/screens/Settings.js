import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { signOut } from '@store/actions/userActions';
import { tailwind } from '@utils/tailwind';
import { ChevronRightIcon, StarIcon, LockClosedIcon, GlobeIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/solid';
import { LogoutIcon } from 'react-native-heroicons/outline';
import TopBar from '@components/TopBar';
import BlurredTopWrapper from '@components/BlurredTopWrapper';
import { gray } from '@utils/colors';
import * as Linking from 'expo-linking';

const SettingsLinkGroup = ({ children, style }) => {
  return (
    <View style={style}>
      <View style={tailwind('bg-gray-800 rounded-lg')}>{children}</View>
    </View>
  );
};

const SettingsLink = ({ last = false, onPress, Icon, text, iconBgColorClass = 'bg-gray-900' }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.75} style={tailwind('flex-row items-center w-full')}>
      <View style={tailwind('flex-row items-center pl-4')}>
        <View style={tailwind(`mr-4 p-1 rounded-lg ${iconBgColorClass}`)}>{Icon && <Icon color={gray[300]} />}</View>

        <View style={[tailwind('flex-row items-center justify-between flex-1 border-gray-700 py-3'), last ? tailwind('border-0') : tailwind('border-b')]}>
          <Text style={tailwind('text-white text-lg')}>{text}</Text>
          <View style={tailwind('mr-2')}>
            <ChevronRightIcon color={gray[500]} size={30} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function Settings({ navigation }) {
  const dispatch = useDispatch();

  const onSignOut = async () => {
    try {
      await dispatch(signOut());
    } catch (error) {
      alert(error);
    }
  };

  const requestReview = () => {
    Linking.openURL(`itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${1570186525}?action=write-review`);
  };

  const goToWebsite = () => {
    Linking.openURL(`https://www.tallylog.com`);
  };

  const goToSupport = () => {
    Linking.openURL(`https://www.tallylog.com/support`);
  };

  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <BlurredTopWrapper topBar={<TopBar style={tailwind('z-50')}>Settings</TopBar>}>
        <SettingsLinkGroup style={tailwind('mb-6')}>
          <SettingsLink text={'Update Password'} iconBgColorClass={'bg-yellow-800'} Icon={LockClosedIcon} onPress={() => navigation.navigate('UpdatePassword')} last={true} />
        </SettingsLinkGroup>

        <SettingsLinkGroup style={tailwind('mb-6')}>
          <SettingsLink text={'Website'} iconBgColorClass={'bg-blue-600'} Icon={GlobeIcon} onPress={goToWebsite} />
          <SettingsLink text={'Support'} iconBgColorClass={'bg-green-600'} Icon={QuestionMarkCircleIcon} onPress={goToSupport} />
          <SettingsLink text={'Rate Tally Log'} iconBgColorClass={'bg-pink-600'} Icon={StarIcon} last={true} onPress={requestReview} />
        </SettingsLinkGroup>

        <SettingsLinkGroup>
          <SettingsLink text={'Sign out'} iconBgColorClass={'bg-purple-500'} Icon={LogoutIcon} last={true} onPress={onSignOut} />
        </SettingsLinkGroup>
      </BlurredTopWrapper>
    </SafeAreaView>
  );
}
