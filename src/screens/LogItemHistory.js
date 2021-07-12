import React from 'react';
import { useSelector } from 'react-redux';
import { Text, SafeAreaView, View } from 'react-native';
import { tailwind } from '@utils/tailwind';
import TopBar from '@components/TopBar';
import { gray, green, red } from '@utils/colors';
import BlurredTopWrapper from '@components/BlurredTopWrapper';
import { LineChart, YAxis, XAxis } from 'react-native-svg-charts';
import { format as formatDate } from 'date-fns';

export default function LogItemHistory({ navigation }) {
  const { name, tally, history, goal, resetEvery, id: itemId } = useSelector((state) => state.logsReducer.item);
  const historyTallies = history?.map((item) => item.tally) ?? [];
  const historyDates = history?.map((item) => formatDate(new Date(item.date), 'M/dd')) ?? [];
  const { id: logId } = useSelector((state) => state.logsReducer.log);

  const sortedHistory = [...history].sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });

  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <BlurredTopWrapper
        topBar={
          <TopBar iconType="left" goBack={() => navigation.goBack()}>
            {name}
          </TopBar>
        }
      >
        <View style={{ height: 300, flexDirection: 'row' }}>
          <YAxis style={{ width: 40 }} numberOfTicks={5} data={historyTallies} formatLabel={(value) => value} contentInset={{ top: 20, bottom: 20 }} svg={{ fontSize: 18, fill: gray[300] }} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <LineChart style={{ flex: 1 }} data={historyTallies} svg={{ stroke: green[500], strokeWidth: 3 }} contentInset={{ top: 20, bottom: 20 }} />
            <XAxis style={{ height: 20 }} data={historyDates} formatLabel={(value, index) => historyDates[index]} contentInset={{ left: 20, right: 20 }} svg={{ fontSize: 12, fill: gray[300] }} />
          </View>
        </View>
        <View style={tailwind('mt-10')}>
          {sortedHistory.map((item, index) => (
            <View key={index} style={tailwind('bg-gray-800 mb-5 flex-row justify-between rounded-md px-4 py-5')}>
              <Text style={tailwind('text-gray-300 text-lg')}>{item.date}</Text>
              <Text style={tailwind('text-gray-300 text-2xl font-semibold')}>{item.tally}</Text>
            </View>
          ))}
        </View>
      </BlurredTopWrapper>
    </SafeAreaView>
  );
}
