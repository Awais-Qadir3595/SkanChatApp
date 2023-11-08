import React, {useEffect, useRef} from 'react';
import {View, Animated, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors, colorsTheme} from '../../services/color';
import {mvs} from '../../services/metrices';

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
    console.log('uncle');
    navigation.navigate('Login');
    try {
      const jsonValue = await AsyncStorage.getItem('userLogin');
      const myObject = JSON.parse(jsonValue);
      if (myObject !== null) {
        console.log(
          myObject.role
        );
        global.user = myObject;
        console.log('Retrieved object:', myObject);
        if (myObject.role == 'Admin') {
          navigation.replace('AdminStack');
        } else 
          if (myObject.role == 'Developer')
          {
            navigation.replace('DeveloperStack');
          }
          else
            if(myObject.role == 'Class')
            navigation.replace('ClassStack');
          else {
            navigation.replace('UserStack');
          }
        
      } else {
        console.log('aaa');
        navigation.replace('Login');
      }
    } catch (error) {
      //  console.error('Error retrieving object:', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorsTheme.primary,
      }}>
      <Animated.View style={{transform: [{translateY: slideAnim}]}}>
        <Image
          source={require('../../assets/images/skan2.png')}
          style={{borderRadius: 90, height: mvs(150), width: mvs(150)}}
        />
      </Animated.View>
    </View>
  );
};
export default Splash;
