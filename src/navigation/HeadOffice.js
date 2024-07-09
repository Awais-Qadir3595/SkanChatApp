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
import DashBoard from '../screens/HeadOffice/Dashboard/Dashboard';
import AddPost from '../screens/HeadOffice/AddPost/AddPostHeadOffice';
import AddPostHeadOffice from '../screens/HeadOffice/AddPost/AddPostHeadOffice';
const Stack = createNativeStackNavigator();

const HeadOffice = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'HeadOfficeDashBoard'}
        component={DashBoard}
        options={{headerShown: false}}
      />


<Stack.Screen
        name={'AddPostHeadOffice'}
        component={AddPostHeadOffice}
        options={{headerShown: false}}
      />
      

      

       
       

 
      

        
    </Stack.Navigator>
  );
};
export default HeadOffice;
