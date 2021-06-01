import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LogItems from '@screens/LogItems';

export default function FavoriteLog({ navigation }) {
  return <LogItems navigation={navigation} isFavorites={true} />;
}
