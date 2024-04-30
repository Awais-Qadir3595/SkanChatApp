import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  BackHandler,
} from 'react-native';
import styles from './style';
import PrimaryTextInput from '../../../components/core/PrimaryTextInput';
import Bold from '../../../components/core/bold';
import Label from '../../../components/core/Label';
import {mvs} from '../../../services/metrices';
import PrimaryButton from '../../../components/core/button';

import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getToken} from '../../../components/appComponents/NotificationApp';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import { CommonActions } from '@react-navigation/native';

const AddSchool = props => {

  useEffect(()=>{
   
    //  BackHandler.addEventListener('hardwareBackPress', handleHardwareBackPress);

    
  },[])
   
  const [SchoolName, setName] = useState();
  const [email, setEmail] = useState();
  const [passwd, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [name, setPrincipalName] = useState(null);

   

  const handleName = v => {
    setName(v);
  };

  const handleEmail = v => {
    setEmail(v);
  };

  const handlePassword = v => {
    setPassword(v);
  };

  const handleSignUp = async () => {
    
    if (SchoolName == null || email == null || passwd == null) {
      Toast.show('please Fill All fields');
    } else {  
       let gmail=email.toLowerCase();
       let password=passwd.toLowerCase();
        
      setLoading(true);
      let dateTime=new Date().getTime();
      let sid = 'sid-' + dateTime;
      //let id='user-' + dateTime;
      let role = 'Admin';
      await firestore()
        .collection('schools')
        .doc(sid)
        .set({
          SchoolName,
          sid,
        })
        .then(async() => {
           console.log('enter in school');
            await firestore()
            .collection('user')
            .doc(sid)
            .set({
               id:sid,
               gmail,
               password,
               name,
               role,
               sid,
            })
            .then(() => {
               
               console.log('enter in user');
              setPrincipalName('');
              setEmail('');
              setPassword('');
              setLoading(false);
              setName('');
              Toast.show('School Added');
              
            });
       
        });
    }
  };

  const handlePrincipal = v => {
    setPrincipalName(v);
  };

  const logout = async () => {
    console.log('mhr');
    try {
      await AsyncStorage.removeItem('userLogin');
      props.navigation.navigate('Login');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
      console.log('Removed object');
    } catch (error) {
      console.error(`Error removing object with key`, error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upper}>
        <Label label={'Wellcome !!'} size={20} color="white" />
        <Image
          style={{
            height: mvs(110),
            width: mvs(110),
            alignSelf: 'center',
            borderRadius: 110,
          }}
          resizeMode="stretch"
          source={require('../../../assets/images/skan2.png')}
        />
        <Bold
          label={'Add Schools'}
          size={20}
          style={{alignSelf: 'center'}}
          color={'white'}
        />
        <Bold
          label={props.route?.params?.SchoolName}
          size={20}
          color={'white'}
          style={{alignSelf: 'center'}}
        />
      </View>

      <View style={styles.lower}>
        <PrimaryTextInput
          placeholder="enter School Name"
          style={{width: '90%', marginLeft: 0}}
          onChangeText={handleName}
          inputValue={SchoolName}
        />
        <PrimaryTextInput
          placeholder="enter Principal name"
          style={{width: '90%', marginLeft: 0}}
          onChangeText={handlePrincipal}
          inputValue={name}
        />
        <PrimaryTextInput
          placeholder="enter gmail"
          style={{width: '90%', marginLeft: 0}}
          onChangeText={handleEmail}
          inputValue={email}
        />
        <PrimaryTextInput
          placeholder="enter Password"
          style={{width: '90%', marginLeft: 0}}
          onChangeText={handlePassword}
          inputValue={passwd}
        />

        <PrimaryButton
          label="Sign Up"
          bgColor={'navy'}
          height={mvs(60)}
          color={'white'}
          style={{marginTop: mvs(50), width: '90%'}}
          onclick={() => handleSignUp()}
          loading={loading}
        />

       
      </View>
      
    </SafeAreaView>
  );
};
export default AddSchool;
