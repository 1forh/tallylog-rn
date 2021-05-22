/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, Pressable, View } from 'react-native';

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

export default function App() {
  // const isDarkMode = useColorScheme() === 'dark';
  const [tally, setTally] = useState(0);

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.wrapper}>
        <View style={styles.inner}>
          <Text style={styles.name}>Testing</Text>
          <Text style={styles.tally}>{tally}</Text>
        </View>
        <View style={styles.buttons}>
          <Pressable style={styles.button} onPress={() => setTally(tally - 1)}>
            <Text style={styles.buttonText}>-</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => setTally(tally + 1)}>
            <Text style={styles.buttonText}>+</Text>
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
    marginTop: 100,
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
  button: {
    backgroundColor: '#000',
    width: '45%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 42,
    lineHeight: 44,
  },
});
