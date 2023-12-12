 
import {Alert, AppRegistry,Text} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './src/navigation/navigator';
import Toast from 'react-native-simple-toast';
import SignUp from './src/screens/SignUp/signUp';
import {name as appName} from './app.json';
import Test from './test';
import { popUpNotification } from './src/components/appComponents/NotificationApp';

 messaging().setBackgroundMessageHandler(async remoteMessage => {
  popUpNotification(remoteMessage)
});

 


AppRegistry.registerComponent(appName, () => App);
 