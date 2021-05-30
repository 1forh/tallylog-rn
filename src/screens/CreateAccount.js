import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import Container from '@components/Container';
import InputWithLabel from '@components/InputWithLabel';
import { tailwind } from '@tailwind';
import TopBar from '@components/TopBar';
import PagerView from 'react-native-pager-view';
import { createUserWithEmailAndPassword } from '@store/actions/userActions';

export default function CreateAccount({ navigation }) {
  const dispatch = useDispatch();
  const pagerRef = useRef(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const changePage = (pageNumber) => {
    pagerRef.current.setPage(pageNumber);
    setCurrentPage(pageNumber);
  };

  const back = () => {
    if (currentPage === 0) {
      navigation.goBack();
    } else if (currentPage === 1) {
      changePage(0);
    } else if (currentPage === 2) {
      changePage(1);
    }
  };

  const toEmail = () => {
    if (!name) return;
    changePage(1);
  };

  const toPassword = () => {
    if (!email) return;
    changePage(2);
  };

  const createAccount = async () => {
    if (!password) return;

    try {
      await dispatch(createUserWithEmailAndPassword(email, password, name));
      setEmail('');
      setPassword('');
      navigation.navigate('TabNav');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <TopBar onBackPress={back}>Create an account</TopBar>

      <PagerView style={tailwind('flex-1 mt-5')} initialPage={currentPage} scrollEnabled={false} ref={pagerRef}>
        <View key="0">
          <Container>
            <View>
              <InputWithLabel label="What should we call you?" onChangeText={(text) => setName(text)} autoCompleteType="name" autoFocus={true} autoCorrect={false} />
            </View>

            <View style={tailwind('flex justify-center mt-10 w-full items-center')}>
              <TouchableOpacity onPress={toEmail} disabled={name === ''} style={tailwind('bg-blue-500 w-full py-4 rounded-lg')}>
                <Text style={tailwind('text-blue-800 text-xl font-bold text-center')}>Next</Text>
              </TouchableOpacity>
            </View>
          </Container>
        </View>
        <View key="1">
          <Container>
            <View>
              <InputWithLabel label="What's your email?" onChangeText={(text) => setEmail(text)} autoCompleteType="email" keyboardType="email-address" autoCorrect={false} autoCapitalize="none" />
            </View>

            <View style={tailwind('flex justify-center mt-10 w-full items-center')}>
              <TouchableOpacity onPress={toPassword} disabled={email === ''} style={tailwind('bg-blue-500 w-full py-4 rounded-lg')}>
                <Text style={tailwind('text-blue-800 text-xl font-bold text-center')}>Next</Text>
              </TouchableOpacity>
            </View>
          </Container>
        </View>
        <View key="2">
          <Container>
            <View>
              <InputWithLabel label="What's your password?" onChangeText={(text) => setPassword(text)} secureTextEntry autoCompleteType="password" autoFocus={true} autoCapitalize="none" />
            </View>

            <View style={tailwind('flex justify-center mt-10 w-full items-center')}>
              <TouchableOpacity onPress={createAccount} disabled={password === ''} style={tailwind('bg-blue-500 w-full py-4 rounded-lg')}>
                <Text style={tailwind('text-blue-800 text-xl font-bold text-center')}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </Container>
        </View>
      </PagerView>
    </SafeAreaView>
  );
}
