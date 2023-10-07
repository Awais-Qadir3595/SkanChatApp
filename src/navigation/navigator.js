import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
 import Login from '../screens/Login/login';
import SignUp from '../screens/SignUp/signUp';
import Messages from '../screens/Messages/messages';
import ChatScreen from '../screens/Chat/Chat';
const Stack = createNativeStackNavigator();

const App = () => {
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
