import React, { useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { tailwind } from '@tailwind';
import Tally from '@components/Tally';
import Container from '@components/Container';
import TopBar from '@components/TopBar';
import { gray, red } from '@utils/colors';

export default function LogItem({ navigation }) {
  const [tally, setTally] = useState(0);

  return (
    <SafeAreaView style={tailwind('flex-1 flex')}>
      <TopBar goBack={navigation.goBack} />
      <Container style={tailwind('flex-1 justify-between')}>
        <View style={tailwind('mt-20 flex items-center')}>
          <Text style={tailwind('text-4xl text-gray-400 font-light mb-2')}>Push-ups</Text>
          <Text style={{ fontSize: 120, ...tailwind('text-gray-400 font-bold') }}>{tally}</Text>
        </View>

        <View style={tailwind('pb-5')}>
          <View style={tailwind('flex-row mb-4')}>
            <TouchableOpacity style={tailwind('flex-1 mr-4 h-20 rounded-lg py-5 bg-red-500 bg-opacity-25 items-center')} onPress={() => setTally(tally - 1)}>
              <Tally style={tailwind('w-full')} color={red[900]} />
            </TouchableOpacity>
            <TouchableOpacity style={tailwind('flex-1 h-20 rounded-lg py-5 bg-red-500 bg-opacity-25 items-center')} onPress={() => setTally(tally - 5)}>
              <Tally value={5} style={tailwind('w-full')} color={red[800]} />
            </TouchableOpacity>
          </View>
          <View>
            <View style={tailwind('flex-row')}>
              <TouchableOpacity style={tailwind('flex-1 mr-4 h-20 rounded-lg py-5 bg-gray-800 items-center')} onPress={() => setTally(tally + 1)}>
                <Tally style={tailwind('w-full')} color={gray[500]} />
              </TouchableOpacity>
              <TouchableOpacity style={tailwind('flex-1 h-20 rounded-lg py-5 bg-gray-800 items-center')} onPress={() => setTally(tally + 5)}>
                <Tally value={5} style={tailwind('w-full')} color={gray[500]} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Container>
    </SafeAreaView>
  );
}
