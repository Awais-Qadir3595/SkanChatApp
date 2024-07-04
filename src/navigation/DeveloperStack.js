import React, {useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AddSchool from '../screens/DeveloperSide/AddSchools/addSchools';
import {BackHandler} from 'react-native';
import ViewSchools from '../screens/DeveloperSide/ViewSchools/ViewSchool';
import DeveloperDashboard from '../screens/DeveloperSide/dashboard/dashboard';
import DeleteDashboard from '../screens/DeveloperSide/deleteSide/deleteDashBoard';
import AddMedia from '../screens/DeveloperSide/addMedia/addMedia';
import ShareFile from '../screens/DeveloperSide/feechalan';
import SendMSgOfFees from '../screens/DeveloperSide/sendMsgOfFees/sendMsgOfFees';

const Stack = createNativeStackNavigator();

const DeveloperStack = ({navigation}) => {
  // useEffect(()=>{
  //   const backAction = () => {
  //     if (navigation.isFocused()) {

  //       BackHandler.exitApp();

  //       return true;
  //     }
  //     return false;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // },[])

  return (
    <Stack.Navigator initialRouteName="DeveloperDashboard">
      <Stack.Screen
        name={'DeveloperDashboard'}
        component={DeveloperDashboard}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={'AddSchool'}
        component={AddSchool}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={'ViewSchools'}
        component={ViewSchools}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'DeleteDashboard'}
        component={DeleteDashboard}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name={'AddMedia'}
        component={AddMedia}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name={'ShareFile'}
        component={ShareFile}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name={'SendMSgOfFees'}
        component={SendMSgOfFees}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default DeveloperStack;