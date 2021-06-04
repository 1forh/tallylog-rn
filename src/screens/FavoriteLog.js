import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import LogItems from '@screens/LogItems';
import { tailwind } from '@utils/tailwind';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@components/Container';
import { StarIcon } from 'react-native-heroicons/solid';
import { gray } from '@utils/colors';

export default function FavoriteLog({ navigation }) {
  const dispatch = useDispatch();
  const favoriteLog = useSelector((state) => state.logsReducer.logs.filter((log) => log.favorite));

  useEffect(() => {
    // dispatch({ type: 'items/SET_LOG', payload: favoriteLog });r7
    // dispatch(fetchFavoriteLog(favoriteLog.id));
  }, []);

  // return <LogItems navigation={navigation} isFavorites={true} />;

  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <Container style={tailwind('pt-5 pb-20')}>
        <View style={tailwind('items-center justify-center mt-20')}>
          <StarIcon color={gray[100]} size={36} style={tailwind('mb-5')} />
          <Text style={tailwind('text-gray-100 text-2xl')}>Add a favorite log</Text>
        </View>
      </Container>
    </SafeAreaView>
  );
}
