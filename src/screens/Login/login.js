import React, { useEffect, useState } from "react";
import {View,Text,TouchableOpacity, Alert, Image} from 'react-native';
import styles from "./style";
import PrimaryTextInput from '../../components/core/PrimaryTextInput';
import Bold from '../../components/core/bold';
import Label from '../../components/core/Label';
import { mvs } from "../../services/metrices";
import PrimaryButton from '../../components/core/button';
import { Axios_Fetch, Axios_Post_data } from "../../hooks/axiosCode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
 

import { ROUTES } from "../../hooks/routes";
const Login=({navigation})=>{



    const [gmail,setGmail]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        checkLoggedIn();
    },[])

    const checkLoggedIn=async()=>{
        console.log('checkLoggedIn');
        try {
            const jsonValue = await AsyncStorage.getItem('userLogin');
            if (jsonValue !== null) {
              const myObject = JSON.parse(jsonValue);
              global.user=myObject;
              console.log('Retrieved object:', myObject);
              navigation.navigate('Messages')
            } else {
              console.log('No object with that key');
            }
          } catch (error) {
            console.error('Error retrieving object:', error);
          }
    }
    
   const Login= async ()=>{

    if(password=='' || gmail=='')
    {
        Alert.alert('please fill all fields')
        
        
    }
    else{
setLoading(true);

        firestore()
        .collection('user').where('gmail','==',gmail)
        .where('password','==',password)
        .get()
        .then(querySnapshot => {
            console.log(querySnapshot.size);
            if(querySnapshot.size==1)
            {
               
                navigation.navigate('Messages');
                querySnapshot.forEach(documentSnapshot => {
                     AsyncStorage.setItem('userLogin', JSON.stringify(documentSnapshot.data()));
                     global.user=documentSnapshot.data();
                     console.log('saved ');
                  });

                 
                 
            }
            else{
                setLoading(false);
                Alert.alert('wrong user crediential');
            }
        })

    }

}

    const handleGmail=(v)=>{
     
        setGmail(v)
    }
    const handlePassword=(v)=>{
        
        setPassword(v);
    }


    return(
        <View style={styles.container}>
            <View style={styles.upper}>
            <Label label={'Wellcome !!'} style={{marginVertical:mvs(10)}} size={20} color="white"/>
            <Image
        style={{height:mvs(150),width:mvs(150),alignSelf:'center',borderRadius:110,marginBottom:30}}
        resizeMode="stretch"
        source={require('../../assets/images/skan2.jpg')}
      />
               <Bold label={'Login'} size={35}  style={{alignSelf:'center'}} color={'white'}/>
              
            </View>

            <View style={styles.lower}>
            <PrimaryTextInput   placeholder="Enter gmail" style={{width:'90%', }} onChangeText={handleGmail}/>
            <PrimaryTextInput   placeholder="Enter Password" style={{width:'90%', }} onChangeText={handlePassword}/>
            <PrimaryButton label="Login" bgColor={'navy'} height={mvs(60)} color={'white'} loading={loading}
            onclick={()=>Login()} style={{width:'90%', }} />

<Text >
  <Bold label="Don't have an account?"/>
  <TouchableOpacity onPress={()=>navigation.navigate('SignUp')} >
  <Bold label="SignUp" color={'navy'} style={styles.signUpStyle}/>
  </TouchableOpacity>
 
  </Text>

            </View>

            


            
          
        </View>
    )
}
export default Login;

 
       
        

 
    

 