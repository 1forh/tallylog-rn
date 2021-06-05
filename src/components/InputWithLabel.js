import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { tailwind } from '@tailwind';

export default function InputWithLabel(props) {
  return (
    <View>
      <Text style={[tailwind(`mb-2 font-bold text-lg text-gray-400`), props.style]}>{props.label}</Text>

      <View style={[tailwind('px-3 bg-gray-700 rounded-lg')]}>
        <TextInput
          keyboardType={props.keyboardType ?? 'default'}
          contextMenuHidden={props.contextMenuHidden ?? false}
          blurOnSubmit={props.disableReturn !== true}
          ref={props.ref}
          onSubmitEditing={props.onSubmitEditing}
          returnKeyType={props.returnKeyType ?? 'default'}
          textContentType={props.textContentType}
          enablesReturnKeyAutomatically={props.enablesReturnKeyAutomatically}
          style={[tailwind('p-0 h-14 w-full text-gray-300'), { fontSize: 20 }]}
          autoCompleteType={props.autoCompleteType}
          autoFocus={props.autoFocus}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          autoFocus={props.autoFocus}
          value={props.value}
          secureTextEntry={props.secureTextEntry}
          autoCorrect={props.autoCorrect}
          autoCapitalize={props.autoCapitalize}
        />
      </View>
    </View>
  );
}
