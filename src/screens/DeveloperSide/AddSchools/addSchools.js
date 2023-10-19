import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
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

const AddSchool = props => {
   
  const [SchoolName, setName] = useState();
  const [gmail, setGmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [name, setPrincipalName] = useState(null);


  const handleName = v => {
    setName(v);
  };

  const handleGmail = v => {
    setGmail(v);
  };

  const handlePassword = v => {
    setPassword(v);
  };

  const handleSignUp = async () => {
    if (SchoolName == null || gmail == null || password == null) {
      Alert.alert('please enter All field');
    } else {
      setLoading(true);
      let sid = 'sid-' + new Date().getTime();
      let id='user-' + new Date().getTime();
      let role = 'Admin';
      await firestore()
        .collection('schools')
        .doc(id)
        .set({
          SchoolName,
          sid,
        })
        .then(async() => {
           console.log('enter in school');
            await firestore()
            .collection('user')
            .doc(id)
            .set({
               id,
               gmail,
               password,
               name,
               role,
               sid,
            })
            .then(() => {
               
               console.log('enter in user');
              setPrincipalName('');
              setGmail('');
              setPassword('');
              setLoading(false);
              setName('');
              Toast.show('user Added');
              // AsyncStorage.setItem('userLogin', JSON.stringify(user));
              //global.user = user;
              // props.navigation.navigate('Messages');
            });
          // AsyncStorage.setItem('userLogin', JSON.stringify(user));
          //global.user = user;
          // props.navigation.navigate('Messages');
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
          source={require('../../../assets/images/skan2.jpg')}
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
          onChangeText={handleGmail}
          inputValue={gmail}
        />
        <PrimaryTextInput
          placeholder="enter Password"
          style={{width: '90%', marginLeft: 0}}
          onChangeText={handlePassword}
          inputValue={password}
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

        <Text>
          {/* <Label label="Already have account? " /> */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate('AdminDashBoard')}>
            <Bold label=" Back to DashBoard" color="navy" size={20} />
          </TouchableOpacity>
        </Text>
      </View>
      <TouchableOpacity style={{position:'absolute',top:20,right:10}} onPress={logout}>
        <Bold label='LogOut' color={'white'}/>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default AddSchool;
