import React, { useRef, useEffect } from 'react';
import { SafeAreaView, Animated, ImageBackground, Text, View, TouchableOpacity } from 'react-native';
import { tailwind } from '@utils/tailwind';
import PagerView from 'react-native-pager-view';
import Container from '@components/Container';
import LogItemPreview from '@components/LogItemPreview';
import LogPreview from '@components/LogPreview';
import { ChevronRightIcon } from 'react-native-heroicons/solid';

const exampleLogs = [
  { name: 'Fitness', color: 'indigo' },
  { name: 'Bad Habits', color: 'rose' },
  { name: 'Yearly Goals', color: 'gray' },
];

const exampleItems = [
  {
    name: 'Push-ups',
    tally: 15,
    history: [],
    goal: 60,
    resetEvery: 'day',
    tallyUpdated: null,
  },
  {
    name: 'Floss teeth',
    tally: 1,
    history: [],
    goal: 2,
    resetEvery: 'day',
    tallyUpdated: null,
  },
  {
    name: 'Mediate',
    tally: 1,
    history: [],
    goal: 1,
    resetEvery: 'day',
    tallyUpdated: null,
  },
];

export default function WalkThrough({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  });

  const SwipeToAdvance = ({ text }) => {
    return (
      <View style={tailwind('mt-20 items-center justify-center flex-row')}>
        <Text style={tailwind('text-gray-400 text-lg font-light')}>{text}</Text>
        <ChevronRightIcon style={tailwind('ml-2 mt-px text-gray-400')} size={24} />
      </View>
    );
  };

  const SkipToLogin = ({ style }) => {
    return (
      <View style={[style, tailwind('justify-center items-center')]}>
        <TouchableOpacity activeOpacity={0.75} style={tailwind('items-center justify-center flex-row')} onPress={() => navigation.navigate('Splash')}>
          <Text style={tailwind('text-gray-400 text-lg')}>Skip</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={tailwind('flex-1 flex-col')}>
      <PagerView style={tailwind('flex-1 flex-col')} initialPage={0}>
        <ImageBackground source={require('@assets/splash.png')} style={tailwind('flex-1 justify-center items-center')} key="0">
          <Container style={tailwind('pt-28')}>
            <Animated.View style={{ opacity: fadeAnim }}>
              <View style={tailwind('items-center')}>
                <Text style={tailwind('text-gray-400 text-xl mb-2 font-light')}>👋 Welcome to</Text>
                <Text style={tailwind('text-gray-100 text-4xl font-bold')}>Tally Log</Text>

                <SwipeToAdvance text="Swipe right to see how it works" />
                <View style={tailwind('relative w-full')}>
                  <SkipToLogin style={tailwind('absolute left-0 right-0 top-36 w-full')} />
                </View>
              </View>
            </Animated.View>
          </Container>
        </ImageBackground>

        <View style={tailwind('flex-1')} key="1">
          <Container style={tailwind('pt-20')}>
            <View style={tailwind('items-center')}>
              <View style={tailwind('items-center mt-10')}>
                <Text style={tailwind('text-3xl text-white font-bold mb-1')}>Create logs</Text>
                <Text style={tailwind('text-2xl text-blue-300 font-bold')}>to organize your tallies</Text>
              </View>

              <View style={tailwind('mt-16 w-full px-4')}>
                <Text style={tailwind('text-xl text-gray-400 font-light mb-4 text-center')}>Examples</Text>
                <LogPreview log={exampleLogs[0]} demo={true} style={tailwind('mb-5')} />
                <LogPreview log={exampleLogs[1]} demo={true} style={tailwind('mb-5')} />
                <LogPreview log={exampleLogs[2]} demo={true} style={tailwind('mb-5')} />
              </View>
            </View>
          </Container>
        </View>

        <View style={tailwind('flex-1')} key="2">
          <Container style={tailwind('pt-20')}>
            <View style={tailwind('items-center')}>
              <View style={tailwind('items-center mt-10')}>
                <Text style={tailwind('text-3xl text-white font-bold mb-1')}>Add tallies</Text>
                <Text style={tailwind('text-2xl text-blue-300 font-bold')}>for goals, tasks, and habits</Text>
              </View>

              <View style={tailwind('mt-16 w-full px-4')}>
                <Text style={tailwind('text-xl text-gray-400 font-light mb-4 text-center')}>Examples</Text>
                <LogItemPreview item={exampleItems[0]} demo={true} style={tailwind('w-full mb-5')} />
                <LogItemPreview item={exampleItems[1]} demo={true} style={tailwind('w-full mb-5')} />
                <LogItemPreview item={exampleItems[2]} demo={true} style={tailwind('w-full mb-5')} />
              </View>
            </View>
          </Container>
        </View>

        <View key="3">
          <Container style={tailwind('pt-20')}>
            <View style={tailwind('items-center mt-10')}>
              <Text style={tailwind('text-3xl text-white font-bold mb-1')}>Ready?</Text>
              <Text style={tailwind('text-2xl text-blue-300 font-bold')}>Start tallying today!</Text>
            </View>
          </Container>
          <ImageBackground source={require('@assets/splash.png')} style={tailwind('flex-1 justify-center items-center')}>
            <View style={tailwind('flex-1 w-full justify-end pb-10')}>
              <Container>
                <View style={tailwind('flex flex-col w-full mb-12')}>
                  <Animated.View style={{ opacity: fadeAnim }}>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')} style={tailwind('bg-blue-500 w-full py-4 rounded-lg mb-4')}>
                      <Text style={tailwind('text-blue-800 text-xl font-bold text-center')}>Create an account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={tailwind('w-full py-4 rounded-lg')}>
                      <Text style={tailwind('text-gray-300 text-xl font-bold text-center')}>Sign in</Text>
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              </Container>
            </View>
          </ImageBackground>
        </View>
      </PagerView>
    </View>
  );
}
