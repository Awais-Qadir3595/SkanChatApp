import React, {useEffect} from 'react';
 
import {createNativeStackNavigator} from '@react-navigation/native-stack';
 
 
import AddSchool from '../screens/DeveloperSide/AddSchools/addSchools';
import { BackHandler } from 'react-native';
 
const Stack = createNativeStackNavigator();

const DeveloperStack = ({navigation}) => {

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('remote message-----',remoteMessage?.notification);
  //     //Toast.show(remoteMessage?.notification?.title,remoteMessage?.notification?.body);
  //     Toast.show('a new message arrived');
  //     //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage?.notification?.body));
  //   });

  //   return unsubscribe;
  // }, []);


  // useEffect(() => {
     
  //   NotificationListener();
  //   requestUserPermission();
  //   getToken();

  // }, []);

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
          name={'AddSchool'}
          component={AddSchool}
          options={{headerShown: false}}
        />
          
      </Stack.Navigator>
     
  );
};
export default DeveloperStack;
