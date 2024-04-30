import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NotificationPopup from 'react-native-push-notification-popup';
import Messages from '../screens/Messages/messages';
 
import messaging from '@react-native-firebase/messaging';
import { NotificationListener, getToken, requestUserPermission } from '../components/appComponents/NotificationApp';
import Toast from 'react-native-simple-toast';
import { BackHandler,View } from 'react-native';
import Inbox from '../screens/userSide/inbox/inbox';
import MyTabs from './tab';
import DashBoard from '../screens/userSide/userDashboard/dashboard';
import SkansSchoolList from '../screens/userSide/skansSchools/skansSchools';
import SchoolDescription from '../screens/userSide/schoolDescription/schoolDescription';
 
const Stack = createNativeStackNavigator();

const UserStack = ({navigation}) => {

  const popupRef = useRef(null);
 

// useEffect(()=>{


//   const backAction = () => {
//     if (navigation.isFocused()) {
      
//       BackHandler.exitApp();
       
//       return true; // Return true to prevent default behavior (e.g., going back in the navigation stack)
//     }

//     // If not on the desired screen, allow the default back navigation
//     return false;
//   };

//   const backHandler = BackHandler.addEventListener(
//     'hardwareBackPress',
//     backAction,
//   );

//   return () => backHandler.remove();
// },[])

  return (
    

   
      <Stack.Navigator>
     
     <Stack.Screen
          name={'UserStack'}
          component={DashBoard}
          options={{headerShown: false}}
        /> 

     <Stack.Screen
          name={'Messenger'}
          component={Inbox}
          options={{headerShown: false}}
        
        /> 
      <Stack.Screen
          name={'Announcement'}
          component={Messages}
          options={{headerShown: false}}
        /> 
        <Stack.Screen
          name={'SkansSchoolList'}
          component={SkansSchoolList}
          options={{headerShown: false}}
        /> 
         <Stack.Screen
          name={'SchoolDescription'}
          component={SchoolDescription}
          options={{headerShown: false}}
        /> 

      </Stack.Navigator>
       
  );
};
export default UserStack;
