import React, {useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login/login';
 
import messaging, { firebase } from '@react-native-firebase/messaging';
import { NotificationListener, getToken, popUpNotification, requestUserPermission } from '../components/appComponents/NotificationApp';
import Toast from 'react-native-simple-toast';
 
import Splash from '../screens/splash/splash';
 
import AdminStack from './AdminStack';
import UserStack from './UserStack';
import DeveloperStack from './DeveloperStack';
import SendNotification from '../hooks/notification';
import notifee, { AndroidImportance, AndroidVisibility, AuthorizationStatus } from '@notifee/react-native';

 
const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    
   requestUserPermission();
   popUpNotification();
   
   
    NotificationListener();
  
     
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      //when app is on
      //Toast.show('Skan School system posted ');
       popUpNotification(remoteMessage)
    });

    return unsubscribe;
  }, []);

  const displayNotification=async(msg)=>{
    console.log(msg.notification);
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
        body: msg.notification.body,
        android: {
          channelId: channelId,
        },
      });
    } catch (error) {
      console.error('Notification error:', error);
    }


  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name={'Splash'}
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Login'}
          component={Login}
          options={{headerShown: false}}
        />

<Stack.Screen
          name={'AdminStack'}
          component={AdminStack}
          options={{headerShown: false}}
        />

<Stack.Screen
          name={'UserStack'}
          component={UserStack}
          options={{headerShown: false}}
        />
        
   
        

<Stack.Screen
          name={'DeveloperStack'}
          component={DeveloperStack}
          options={{headerShown: false}}
        />

        
 
         
          
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
