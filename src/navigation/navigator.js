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
import HeadOffice from './HeadOffice';

 
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
    


     


  }
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='HeadOffice'>
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
          name={'HeadOffice'}
          component={HeadOffice}
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
