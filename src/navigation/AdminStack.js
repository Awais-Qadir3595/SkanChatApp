import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login/login';
import SignUp from '../screens/SignUp/signUp';
import Messages from '../screens/Messages/messages';
import ChatScreen from '../screens/Chat/Chat';
import messaging from '@react-native-firebase/messaging';
import {
  NotificationListener,
  getToken,
  requestUserPermission,
} from '../components/appComponents/NotificationApp';
import Toast from 'react-native-simple-toast';
import {Alert, BackHandler} from 'react-native';
import Splash from '../screens/splash/splash';
import AdminDashBoard from '../screens/AdminSide/AdminDashBoard/adminDashBoard';
import CreatePost from '../screens/AdminSide/createPost/createPost';
import ViewPosts from '../screens/AdminSide/viewPosts/showPosts/viewPosts';
import AddClass from '../screens/AdminSide/addClass/addClass';
import ViewClasses from '../screens/AdminSide/viewClasses/viewClasses';
import ListOfClasses from '../screens/AdminSide/viewPosts/listOfClasses/listOfClasses';
import StudentsList from '../screens/AdminSide/StudentsList/studentsList';
import StudentList from '../screens/AdminSide/StudentsList/studentsList';
const Stack = createNativeStackNavigator();

const AdminStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'AdminDashBoard'}
        component={AdminDashBoard}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={'AddClass'}
        component={AddClass}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={'ViewClasses'}
        component={ViewClasses}
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
      <Stack.Screen
        name={'ListOfClasses'}
        component={ListOfClasses}
        options={{headerShown: false}}
      />

<Stack.Screen 
        name={'StudentList'}
        component={StudentList}
        options={{headerShown: false}}
      />
      <Stack.Screen
          name={'ChatScreen'}
          component={ChatScreen}
          options={{headerShown: false}}
        />

        
    </Stack.Navigator>
  );
};
export default AdminStack;
