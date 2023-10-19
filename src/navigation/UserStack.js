import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NotificationPopup from 'react-native-push-notification-popup';
import Messages from '../screens/Messages/messages';
 
import messaging from '@react-native-firebase/messaging';
import { NotificationListener, getToken, requestUserPermission } from '../components/appComponents/NotificationApp';
import Toast from 'react-native-simple-toast';
import { BackHandler,View } from 'react-native';
 
const Stack = createNativeStackNavigator();

const UserStack = ({navigation}) => {

  const popupRef = useRef(null);
//   useEffect(() => {
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       console.log('remote message-----',remoteMessage?.notification);
//       //Toast.show(remoteMessage?.notification?.title,remoteMessage?.notification?.body);
//       Toast.show('a new message arrived');
//       //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage?.notification?.body));
//     });

//     return unsubscribe;
//   }, []);


//   useEffect(() => {
     
//     NotificationListener();
//     requestUserPermission();
//     getToken();

//   }, []);

useEffect(()=>{


  








  const backAction = () => {
    if (navigation.isFocused()) {
      // Handle what you want to do when the back button is pressed on this screen
      // For example, you can exit the app using the following code:
      BackHandler.exitApp();
      // navigation.navigate(COMMON.BETBAZI)
      return true; // Return true to prevent default behavior (e.g., going back in the navigation stack)
    }

    // If not on the desired screen, allow the default back navigation
    return false;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  return () => backHandler.remove();
},[])

  return (
    

   
      <Stack.Navigator>
     
          <Stack.Screen
          name={'Messages'}
          component={Messages}
          options={{headerShown: false}}
        />

      </Stack.Navigator>
       
  );
};
export default UserStack;
