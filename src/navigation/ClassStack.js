import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ClassDashboard from '../screens/ClassSide/Dashboard/dashboard';
import AddStudent from '../screens/ClassSide/AddStudent/addStudent';
import ViewStudents from '../screens/ClassSide/viewStudents/ViewStudents';
import AddPost from '../screens/ClassSide/AddPost/AddPost';
import ViewPosts from '../screens/ClassSide/viewPosts/viewPosts';
 
const Stack = createNativeStackNavigator();

const ClassStack= ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'ClassDashboard'}
        component={ClassDashboard}
        options={{headerShown: false}}
      />

<Stack.Screen
        name={'AddStudent'}
        component={AddStudent}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'ViewStudents'}
        component={ViewStudents}
        options={{headerShown: false}}
      />
  <Stack.Screen
        name={'AddPost'}
        component={AddPost}
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
export default ClassStack;
