import React, {useEffect, useRef} from 'react';
import {View, Animated, Image, NavigatorIOS} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors, colorsTheme} from '../../services/color';
import {mvs} from '../../services/metrices';
import LinearGradient from 'react-native-linear-gradient';

const Splash = ({navigation}) => {
  const slideAnim = useRef(new Animated.Value(-200)).current;

  setTimeout(function () {
    //  console.log(await getToken());

    checkLoggedIn();
  }, 2000);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  const checkLoggedIn = async () => {
   
   
    try {
      const jsonValue = await AsyncStorage.getItem('userLogin');
      const myObject = JSON.parse(jsonValue);
      // const myObject={"cid": "class-1712828189242", "gmail": "adminstudent", 
      // "id": "id-1712828260459", "name": "Admin student", "password": "adminstudent@123",
      //  "role": "User", "sid": "sid-1712828105866",
      //  }
      // console.log('user Login');
      console.log(myObject);
      if (myObject !== null) {
        global.user = myObject;
        switch (myObject.role) {
          case 'Admin':
            navigation.replace('AdminStack');
            break;
          case 'Developer':
            navigation.replace('DeveloperStack');
            break;
          case 'Class':
            navigation.replace('ClassStack');
            break;
          default:
            navigation.replace('UserStack');
        }
      } else {
        navigation.replace('Login'); // Navigate to Login screen if user data doesn't exist
      }
    } catch (error) {
      console.error('Error retrieving object:', error);
      navigation.replace('Login'); // Handle errors by navigating to Login screen
    }
  };
  

  return (
    <LinearGradient
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      colors={['darkblue', 'rgba(0,212,255,1)']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1.0}}>
      <Animated.View style={{transform: [{translateY: slideAnim}]}}>
        <Image
          source={require('../../assets/images/skan2.png')}
          style={{borderRadius: 90, height: mvs(150), width: mvs(150)}}
        />
      </Animated.View>
    </LinearGradient>
  );
};
export default Splash;
