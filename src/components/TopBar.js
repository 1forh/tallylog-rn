import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { ChevronLeftIcon, ChevronDownIcon } from 'react-native-heroicons/solid';
import Container from '@components/Container';
import { gray } from '@utils/colors';
import { tailwind } from '@tailwind';

export default function TopBar({ goBack, children, style, iconType = 'left' }) {
  return (
    <Container style={{ ...style, ...tailwind('flex-row py-3 items-center') }}>
      {goBack && (
        <TouchableOpacity onPress={goBack} style={tailwind('px-2 -ml-4')}>
          {iconType === 'left' ? <ChevronLeftIcon color={gray[400]} size={36} /> : <ChevronDownIcon color={gray[400]} size={36} />}
        </TouchableOpacity>
      )}
      {children && <Text style={tailwind(`font-black text-2xl text-gray-400`)}>{children}</Text>}
    </Container>
  );
}
