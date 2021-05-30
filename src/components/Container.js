import React from 'react';
import { View } from 'react-native';
import { tailwind } from '@tailwind';

function Container(props) {
  return <View style={{ ...tailwind('px-4'), ...props.style }}>{props.children}</View>;
}

export default Container;
