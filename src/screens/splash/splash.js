import React, { useEffect, useRef } from 'react';
import {View,Text, Animated, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken, requestUserPermission } from '../../components/appComponents/NotificationApp';
const Splash=({navigation})=>{

    const slideAnim = useRef(new Animated.Value(-200)).current;  

    setTimeout( function  () {

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


      const checkLoggedIn=async()=>{
        console.log('uncle');
        navigation.navigate('Login')
        try {
            const jsonValue = await AsyncStorage.getItem('userLogin');
            const myObject = JSON.parse(jsonValue);
            if (myObject !== null) {
              global.user=myObject;
              console.log('Retrieved object:', myObject);
              if(myObject.role=='Admin')
              {
                navigation.replace('AdminStack')
              }
              else{
                if(myObject.role=='Developer')
                navigation.replace('DeveloperStack');
              else{
                navigation.replace('UserStack');
              }
              }
              
            } else {
              console.log('aaa');
                navigation.replace('Login')
            }
          } catch (error) {
          //  console.error('Error retrieving object:', error);
          }
    }

    return(

        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'darkblue'}}>


<Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
<Image source={require('../../assets/images/skan2.jpg')} style={{ borderRadius:90}} />
          
        </Animated.View>



        </View>

    )
}
export default Splash;