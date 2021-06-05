import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import InputWithLabel from '@components/InputWithLabel';
import { tailwind } from '@tailwind';
import TopBar from '@components/TopBar';
import { signInWithEmailAndPassword } from '@store/actions/userActions';
import BlurredTopWrapper from '@components/BlurredTopWrapper';

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    try {
      await dispatch(signInWithEmailAndPassword(email, password));
      setEmail('');
      setPassword('');
      navigation.navigate('LoggedIn', { screen: 'LogItems' });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <BlurredTopWrapper topBar={<TopBar>Sign in</TopBar>}>
        <View style={tailwind('mb-6')}>
          <InputWithLabel label="Email" onChangeText={(text) => setEmail(text)} autoCompleteType="email" keyboardType="email-address" autoCorrect={false} autoCapitalize="none" />
        </View>
        <View>
          <InputWithLabel label="Password" onChangeText={(text) => setPassword(text)} secureTextEntry autoCompleteType="password" autoCorrect={false} autoCapitalize="none" />
        </View>
        <View style={tailwind('flex justify-center mt-10 w-full items-center')}>
          <TouchableOpacity onPress={submit} disabled={email === '' || password === ''} style={tailwind('bg-blue-500 w-full py-4 rounded-lg')}>
            <Text style={tailwind('text-blue-800 text-xl font-bold text-center')}>Sign in</Text>
          </TouchableOpacity>
        </View>

        <View style={tailwind('border-t border-gray-800 pt-10 mt-10 items-center')}>
          <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
            <Text style={tailwind('text-gray-400 text-xl font-bold')}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </BlurredTopWrapper>
    </SafeAreaView>
  );
}
