import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { ChevronLeftIcon, ChevronDownIcon, StarIcon } from 'react-native-heroicons/solid';
import Container from '@components/Container';
import { gray, yellow } from '@utils/colors';
import { tailwind } from '@tailwind';

export default function TopBar({ goBack, children, style, iconType = 'left', right }) {
  const getIcon = () => {
    if (iconType === 'left') {
      return <ChevronLeftIcon color={gray[400]} size={36} style={tailwind('-ml-2')} />;
    } else if (iconType === 'down') {
      return <ChevronDownIcon color={gray[400]} size={36} style={tailwind('-ml-2')} />;
    } else if (iconType === 'star') {
      return <StarIcon color={yellow[400]} size={28} />;
    }
    return;
  };
  return (
    <Container style={{ ...style, ...tailwind('flex-row py-3 items-center justify-between') }}>
      <View style={tailwind('flex-row py-3 items-center')}>
        {iconType === 'star' ? (
          <View style={tailwind('w-10 h-10 justify-start justify-center')}>{getIcon()}</View>
        ) : (
          goBack && (
            <TouchableOpacity onPress={goBack} style={tailwind('w-10 h-10 justify-start justify-center')}>
              {getIcon()}
            </TouchableOpacity>
          )
        )}
        {children && <Text style={tailwind(`font-black text-2xl text-gray-400`)}>{children}</Text>}
      </View>
      {right && iconType !== 'star' && <View>{right}</View>}
    </Container>
  );
}
