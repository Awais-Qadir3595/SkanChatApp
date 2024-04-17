import React from "react";
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidVisibility, AuthorizationStatus } from '@notifee/react-native';

const NotificationListener=()=>{
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });
  
      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
             
          }
         
        });
}
 

const getToken=async()=>{
  await messaging().registerDeviceForRemoteMessages();
var token = await messaging().getToken();
 return token;
 

}

async function requestUserPermission() {

 // console.log('------------requesting for permission0-----------',);
  const settings = await notifee.requestPermission();

if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
  //console.log('User denied permissions request');
} else if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
   //console.log('User granted permissions request');
} else if (settings.authorizationStatus === AuthorizationStatus.PROVISIONAL) {
   //console.log('User provisionally granted permissions request');
}

 
}

const popUpNotification=async(msg)=>{
  //console.log(msg.notification);
  try {
    const channelId = 'your_channel_id'; // Replace with your own channel ID

    await notifee.createChannel({
      id: channelId,
      name: 'awais',
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
      
    });

    await notifee.displayNotification({
      title: msg?.notification?.title,
      body: msg?.notification?.body,
      android: {
        channelId: channelId,
        clickAction: {
          activity: 'com.skanchatapp',
        },
      },
       
    });
  } catch (error) {
    console.error('Notification error:', error);
  }


}

export {NotificationListener,getToken,requestUserPermission,popUpNotification};