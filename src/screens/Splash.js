import React, { useEffect, useRef } from 'react';
import { Text, View, ImageBackground, Animated, TouchableOpacity } from 'react-native';
import { tailwind } from '@tailwind';
import Container from '@components/Container';

export default function Splash({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  });

  return (
    <View style={tailwind('flex-1 flex-col')}>
      <ImageBackground source={require('@assets/splash.png')} style={tailwind('flex-1 justify-center items-center')}>
        <View style={tailwind('flex-1 w-full justify-end pb-10')}>
          <Container>
            <View style={tailwind('flex flex-col w-full mb-12')}>
              <Animated.View style={{ opacity: fadeAnim }}>
                <View style={tailwind('items-center mb-40')}>
                  <Text style={tailwind('text-gray-400 text-xl mb-2 font-light')}>👋 Welcome to</Text>
                  <Text style={tailwind('text-gray-100 text-4xl font-bold')}>Tally Log</Text>
                </View>

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
  );
}
