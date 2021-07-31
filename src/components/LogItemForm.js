import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Button } from 'react-native';
import { tailwind } from '@tailwind';
import InputWithLabel from '@components/InputWithLabel';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function LogItemForm({ item, submit, buttonText }) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [form, setForm] = useState({
    name: item?.name ?? '',
    goal: item?.goal ?? null,
    resetEvery: item?.resetEvery ? item?.resetEvery : item ? 'never' : 'day',
  });

  const ResetButtonTally = ({ resetEvery, text, isActive = false }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={[isActive ? tailwind('bg-gray-800') : null, tailwind(' items-center justify-center text-white px-4 py-3 rounded-lg')]}
        onPress={() => setForm({ ...form, resetEvery })}
      >
        <Text style={[tailwind('items-center justify-center'), tailwind('text-white text-sm font-semibold capitalize')]}>{resetEvery}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <>
      <View style={tailwind('mb-6')}>
        <InputWithLabel label="What do you want to tally?" value={form.name} onChangeText={(text) => setForm({ ...form, name: text })} autoFocus={true} />
      </View>

      <View style={tailwind('mb-6 w-48')}>
        <InputWithLabel label="Set a goal" value={form.goal} onChangeText={(text) => setForm({ ...form, goal: text })} keyboardType="number-pad" />
      </View>

      <View style={tailwind('mb-6')}>
        <View>
          <Text style={[tailwind(`mb-2 font-bold text-lg text-gray-400`)]}>Reset tally every</Text>

          <View style={tailwind('flex-row w-full')}>
            <ResetButtonTally resetEvery="day" isActive={form.resetEvery === 'day'} />
            <ResetButtonTally resetEvery="week" isActive={form.resetEvery === 'week'} />
            <ResetButtonTally resetEvery="month" isActive={form.resetEvery === 'month'} />
            <ResetButtonTally resetEvery="year" isActive={form.resetEvery === 'year'} />
            <ResetButtonTally resetEvery="never" isActive={form.resetEvery === 'never'} />
          </View>
        </View>
      </View>

      <View style={tailwind('mb-6')}>
        <View>
          <Text style={[tailwind(`mb-2 font-bold text-lg text-gray-400`)]}>Reminders</Text>

          <View style={tailwind('flex-row w-full')}>
            <Text>stuff here</Text>
            <Button
              title="Press to schedule a notification"
              onPress={async () => {
                await schedulePushNotification();
              }}
            />
          </View>
        </View>
      </View>

      <View style={tailwind('flex justify-center mt-10 w-full items-center')}>
        <TouchableOpacity onPress={() => submit(form)} disabled={form.name === ''} style={tailwind('bg-blue-500 w-full py-4 rounded-lg')}>
          <Text style={tailwind('text-blue-800 text-xl font-bold text-center')}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
