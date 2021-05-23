/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// gray-100 = #F9F9F9;

import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, Pressable, View, Image } from 'react-native';

export default function App() {
  // const isDarkMode = useColorScheme() === 'dark';
  const [tally, setTally] = useState(0);

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.wrapper}>
        <View style={styles.inner}>
          <Text style={styles.name}>Push-ups</Text>
          <Text style={styles.tally}>{tally}</Text>
        </View>
        <View style={[styles.buttons, styles.buttonsRed]}>
          <Pressable style={[styles.button, styles.buttonRed]} onPress={() => setTally(tally - 1)}>
            <Image
              style={{
                height: 30,
              }}
              source={require('./images/tally-mark--1.png')}
              resizeMode="contain"
            />
          </Pressable>
          <Pressable style={[styles.button, styles.buttonRed]} onPress={() => setTally(tally - 5)}>
            <Image
              style={{
                height: 30,
              }}
              source={require('./images/tally-mark--5.png')}
              resizeMode="contain"
            />
          </Pressable>
        </View>
        <View style={styles.buttons}>
          <Pressable style={styles.button} onPress={() => setTally(tally + 1)}>
            <Image
              style={{
                height: 30,
              }}
              source={require('./images/tally-mark--1.png')}
              resizeMode="contain"
            />
          </Pressable>
          <Pressable style={styles.button} onPress={() => setTally(tally + 5)}>
            <Image
              style={{
                height: 30,
              }}
              source={require('./images/tally-mark--5.png')}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  inner: {
    marginTop: 150,
    flexGrow: 1,
  },
  name: {
    marginBottom: 20,
    fontSize: 36,
    textAlign: 'center',
  },
  tally: {
    fontSize: 72,
    fontWeight: '800',
    textAlign: 'center',
  },
  buttons: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
  },
  buttonsRed: {
    paddingBottom: 0,
  },
  button: {
    backgroundColor: '#000',
    width: '45%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  buttonRed: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: '#fff',
    fontSize: 42,
    lineHeight: 44,
  },
  image: {},
});
