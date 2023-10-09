import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login/login';
import SignUp from '../screens/SignUp/signUp';
import Messages from '../screens/Messages/messages';
import ChatScreen from '../screens/Chat/Chat';
import messaging from '@react-native-firebase/messaging';
import { NotificationListener, getToken, requestUserPermission } from '../components/appComponents/NotificationApp';
import Toast from 'react-native-simple-toast';
import { Alert } from 'react-native';
const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('remote message-----',remoteMessage?.notification);
      //Toast.show(remoteMessage?.notification?.title,remoteMessage?.notification?.body);
      Toast.show('a new message arrived');
      //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage?.notification?.body));
    });

    return unsubscribe;
  }, []);


  useEffect(() => {
     
    NotificationListener();
    requestUserPermission();
    getToken();

  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'Login'}
          component={Login}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={'SignUp'}
          component={SignUp}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={'Messages'}
          component={Messages}
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
