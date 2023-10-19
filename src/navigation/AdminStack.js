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
import { Alert, BackHandler } from 'react-native';
import Splash from '../screens/splash/splash';
import AdminDashBoard from '../screens/AdminSide/AdminDashBoard/adminDashBoard';
import ViewUsers from '../screens/AdminSide/viewUser/viewUsers';
import CreatePost from '../screens/AdminSide/createPost/createPost';
import AddSchool from '../screens/DeveloperSide/AddSchools/addSchools';
import ViewPosts from '../screens/AdminSide/viewPosts/viewPosts';
const Stack = createNativeStackNavigator();

const AdminStack = ({navigation}) => {

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




  return (
     
      <Stack.Navigator>
      
      <Stack.Screen
          name={'AdminDashBoard'}
          component={AdminDashBoard}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={'SignUp'}
          component={SignUp}
          options={{headerShown: false}}
        />


        

<Stack.Screen
          name={'ViewUsers'}
          component={ViewUsers}
          options={{headerShown: false}}
        />

<Stack.Screen
          name={'CreatePost'}
          component={CreatePost}
          options={{headerShown: false}}
        />
        
          <Stack.Screen
          name={'ViewPosts'}
          component={ViewPosts}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
   
  );
};
export default AdminStack;
