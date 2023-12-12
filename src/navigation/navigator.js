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
import notifee  from '@notifee/react-native';
import ClassStack from './ClassStack';
import ChatScreen from '../screens/Chat/Chat';

 
const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    
   requestUserPermission();
   //popUpNotification();
   
   notifee();
    NotificationListener();
  
     
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      //when app is on
      //Toast.show('Skan School system posted ');
       popUpNotification(remoteMessage)
    });

    return unsubscribe;
  }, []);

  const notifee=async(msg)=>{
    


    // const initialNotification = await notifee.getInitialNotification();
    // if (initialNotification) {
    //   console.log('Notification caused application to open', initialNotification.notification);
    //   console.log('Press action used to open the app', initialNotification.pressAction);
    // }
    // return notifee.onForegroundEvent(({ type, detail }) => {
    //   switch (type) {
    //     case EventType.DISMISSED:
    //       console.log('User dismissed notification', detail.notification);
    //       break;
    //     case EventType.PRESS:
    //       console.log('User pressed notification', detail.notification);
    //       break;
    //   }
    // });


  }
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='Splash'>
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

<Stack.Screen
          name={'ClassStack'}
          component={ClassStack}
          options={{headerShown: false}}
        />
 
 <Stack.Screen
          name={'ChatScreen'}
          component={ChatScreen}
          options={{headerShown: false}}
        />
          
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
