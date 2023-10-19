import React from 'react';
import { View, Button } from 'react-native';
import notifee from '@notifee/react-native';

const Test=()=> {

  async function onDisplayNotification() {

    console.log('mmmmmm----mmmmm----mmmm');
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
         // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  return (
    <View>
      <Button title="Display Notification" onPress={() => {onDisplayNotification()}} />
    </View>
  );
}
export default Test;