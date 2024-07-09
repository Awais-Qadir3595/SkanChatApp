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
  //  checkStoragePermission();
   
   notifee();
    NotificationListener();
  
     
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      //when app is on
      //Toast.show('Skan School system posted ');
       popUpNotification(remoteMessage)
    });

    return unsubscribe;
  }, []);
  const requestStoragePermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Storage Permission',
                message: 'App needs access to your storage to download files.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
        console.warn('Error requesting WRITE_EXTERNAL_STORAGE permission:', err);
        return false;
    }
};

const requestManageStoragePermission = async () => {
  try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE,
          {
              title: 'Manage Storage Permission',
              message: 'App needs access to manage your storage.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
          },
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
      console.warn('Error requesting MANAGE_EXTERNAL_STORAGE permission:', err);
      return false;
  }
};


  const checkStoragePermission = async () => {
    if (Platform.OS === 'android') {
        if (Platform.Version >= 30) {
            try {
                const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE);
                if (!granted) {
                    await requestManageStoragePermission();
                }
            } catch (err) {
                console.log('Error while checking MANAGE_EXTERNAL_STORAGE permission:', err);
            }
        } else {
            try {
                const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
                if (!granted) {
                    await requestStoragePermission();
                }
            } catch (err) {
                console.warn('Error while checking WRITE_EXTERNAL_STORAGE permission:', err);
            }
        }
    }
};
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
