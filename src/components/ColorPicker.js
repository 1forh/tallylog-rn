import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { gray, pickerColors, pickerColorsBorder } from '@utils/colors';
import { tailwind } from '@tailwind';

export default function ColorPicker({ color, pick }) {
  return (
    <View>
      <View>
        <Text style={[tailwind(`mb-2 font-bold text-lg text-gray-400`)]}>Color</Text>
      </View>
      <View style={[tailwind(`flex-row flex-wrap -mb-5`)]}>
        {Object.keys(pickerColors).map((colorKey) => {
          return (
            <TouchableOpacity onPress={() => pick(colorKey)} key={colorKey} activeOpacity={0.6} style={tailwind('w-14 h-14 mr-5 mb-5')}>
              <View
                style={[
                  {
                    backgroundColor: pickerColors[colorKey],
                    ...tailwind('w-full h-full rounded-full border-4'),
                  },
                  color === colorKey ? { borderColor: pickerColorsBorder[colorKey] } : { borderColor: 'transparent' },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
