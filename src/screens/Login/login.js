import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, Image, ScrollView} from 'react-native';
import styles from './style';
import PrimaryTextInput from '../../components/core/PrimaryTextInput';
import Bold from '../../components/core/bold';
import Label from '../../components/core/Label';
import {mvs} from '../../services/metrices';
import PrimaryButton from '../../components/core/button';
import {Axios_Fetch, Axios_Post_data} from '../../hooks/axiosCode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {getToken} from '../../components/appComponents/NotificationApp';
import { colors, colorsTheme } from '../../services/color';
import Toast from 'react-native-simple-toast';

const Login = ({navigation}) => {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
 const [eyeClick,setEyeClick]=useState(true);
 const [eye,setEye]=useState('EyeOn');
  useEffect(() => {
    
    getData();

  },[]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('RememberItem');
      console.log(jsonValue);
      if (jsonValue !== null) {
        const myObject = JSON.parse(jsonValue);
        //global.user = myObject;
        console.log('Retrieved object:', myObject);
        setGmail(myObject?.gmail)
        setPassword(myObject?.password)
       // navigation.navigate('Messages');
      } else {
        // console.log('No object with that key');
      }
    } catch (error) {
      //  console.error('Error retrieving object:', error);
    }
  };

  const Login = async () => {
    if (password == '' || gmail == '') {
      Toast.show('please fill all fields');
    } else {
      console.log(password,'====',gmail);

      setLoading(true);

    await  firestore()
        .collection('user')
        .where('gmail', '==', gmail)
        .where('password', '==', password)
        .get()
        .then(querySnapshot => {
        console.log(querySnapshot.size,'sizee======');
          if (querySnapshot.size == 1) {
           // console.log('docId', querySnapshot.docs[0].id);
            querySnapshot.forEach(documentSnapshot => {


              console.log(documentSnapshot.data().role);
              AsyncStorage.setItem(
                'userLogin',
                JSON.stringify(documentSnapshot.data()),
              ); 
              AsyncStorage.setItem(
                'RememberItem',
                JSON.stringify(documentSnapshot.data()),
              ); 
              global.user = documentSnapshot?.data();
              updateForToken(querySnapshot.docs[0].id);

              if (documentSnapshot.data().role == 'Admin') {
                console.log('admin');
                navigation.navigate('AdminStack');
                setLoading(false);
              } else if (documentSnapshot.data().role == 'Developer') {
                console.log('-------developer----',documentSnapshot.data().role);

                setLoading(false);
                navigation.navigate('DeveloperStack');
              } else if (documentSnapshot.data().role == 'Class') {
                console.log('class');

                setLoading(false);
                navigation.navigate('ClassStack');
              } else  {
              
               // updateForToken(querySnapshot.docs[0].id);
                navigation.navigate('UserStack');
                setLoading(false);
              }

              //   console.log('saved ');
            });
          } else {
            setLoading(false);
            Toast.show('Wrong Credientials')
          }
        });
    }
  };

  const updateForToken = async id => {
    let token = await getToken();

    console.log('in func', token);
    firestore()
      .collection('user')
      .doc(id)
      .update({
        token: token,
      })
      .then(() => {
        console.log('User updated!');
        setLoading(false);
      });
  };
  const handleGmail = v => {
    setGmail(v);
  };
  const handlePassword = v => {
    setPassword(v);
  };

  const handleEyeClick=()=>{

    //console.log('nnnn');
    
    if(eyeClick)
    {
      setEye('EyeOff')
    }
    else{
      setEye('EyeOn')
    }
    setEyeClick(!eyeClick);
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.upper}>
        <Label
          label={'Wellcome !!'}
          style={{marginVertical: mvs(10)}}
          size={20}
          color="white"
        />
        <Image
          style={{
            height: mvs(120),
            width: mvs(120),
            alignSelf: 'center',
            borderRadius: 110,
            marginBottom: 30,
          }}
          resizeMode="stretch"
          source={require('../../assets/images/skan2.png')}
        />
        <Bold
          label={'Login'}
          size={35}
          style={{alignSelf: 'center'}}
          color={'white'}
        />
      </View>

      <View style={styles.lower}>
        <PrimaryTextInput
          placeholder="Enter UserName"
          style={{width: '90%'}}
          onChangeText={handleGmail}
          inputValue={gmail}
          
        />
        <PrimaryTextInput
          placeholder="Enter Password"
          style={{width: '90%'}}
          onChangeText={handlePassword}
          secureTextEntry={eyeClick}
          inputValue={password}
          rightIcon={eye}
          onEyeClick={handleEyeClick}
          
        />
        <PrimaryButton
          label="Login"
          bgColor={colorsTheme.primary}
          height={mvs(60)}
          color={'white'}
          loading={loading}
          onclick={() => Login()}
          style={{width: '90%',marginTop:mvs(50)}}
          
        />

        
      </View>
    </ScrollView>
  );
};
export default Login;
