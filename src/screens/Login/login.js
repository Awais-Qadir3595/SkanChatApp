import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import styles from './style';
import PrimaryTextInput from '../../components/core/PrimaryTextInput';
import Bold from '../../components/core/bold';
import Label from '../../components/core/Label';
import { mvs } from '../../services/metrices';
import PrimaryButton from '../../components/core/button';
import { Axios_Fetch, Axios_Post_data } from '../../hooks/axiosCode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { getToken } from '../../components/appComponents/NotificationApp';
import { colors, colorsTheme } from '../../services/color';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';

const Login = ({ navigation }) => {
  const [id, setId] = useState(0);
  const [password, setPassword] = useState(0);
  const [loading, setLoading] = useState(false);
  const [eyeClick, setEyeClick] = useState(true);
  
  const [eye, setEye] = useState('EyeOn');
  useEffect(() => {

    getData();

  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('RememberItem');
      console.log(jsonValue);
      if (jsonValue !== null) {
        const myObject = JSON.parse(jsonValue);
        //global.user = myObject;
        console.log('Retrieved object:', myObject);
        setId(myObject?.system_id)
        setPassword(myObject?.password)
        // navigation.navigate('Messages');
      } else {
        // console.log('No object with that key');
      }
    } catch (error) {
      //  console.error('Error retrieving object:', error);
    }
  };

  const saveOtherInfo=async(data)=>{

     
     
    //getting school data
    await firestore()
    .collection('schools')
    .where('sid', '==', data?.sid)
    .get()
    .then(querySnapshot => {
        if (querySnapshot.size > 0) {
            querySnapshot.forEach(documentSnapshot => {
              console.log('school data');
               //  console.log(documentSnapshot.data());
                global.school = documentSnapshot.data();
                AsyncStorage.setItem(
                  'schoolData',
                  JSON.stringify(documentSnapshot.data()),
                );
            });
        } else {
            Alert.alert('no data found');
        }
    });
  
    //console.log('save info here');
    await firestore()
    .collection('class')
    .where('id', '==', data?.cid)
    .get()
    .then(querySnapshot => {
        if (querySnapshot.size > 0) {
            querySnapshot.forEach(documentSnapshot => {
              console.log('dta classs is here  //////////////');
                 console.log(documentSnapshot.data().CName.split('-'));
                 console.log('mmmmm------------------------mmmmmmmm');
                 console.log(documentSnapshot.data());
                //setClassData(documentSnapshot.data().CName.split('-'))
                global.class = documentSnapshot.data().CName.split('-');

                AsyncStorage.setItem(
                  'classData',
                  JSON.stringify(documentSnapshot.data().CName.split('-')),
                );
            });
        } else {
            // Alert.alert('no data found');
        }
    });


    let banners = [];
    await firestore()
        .collection('media')
        .get()
        .then(querySnapshot => {
            if (querySnapshot.size > 0) {
                querySnapshot.forEach(documentSnapshot => {
                    //console.log(documentSnapshot.data());
                    banners.push(documentSnapshot.data())

                });
                AsyncStorage.setItem(
                  'bannersData',
                  JSON.stringify(banners),
                );
                global.banners=banners;
                
          


            } else {
                setIsBanners(false);
                console.log('no data found', data);
            }
        });


  }

  const Login = async () => {

   

    
    console.log(password);
    console.log(id);
    const parsedId = parseInt(id, 10); // Assuming `id` should be an integer
    const parsedPassword = parseInt(password, 10);

    console.log('pass = ', parsedId, '- gmail = ', parsedPassword);
    if (password == '' || id == '') {
      Toast.show('please fill all fields');
    } else {


      setLoading(true);

      await firestore()
        .collection('user').where('system_id', '==', id)
        .where('password', '==', password)
        .where('system_id', '==', id)

        .get()
        .then(querySnapshot => {
          console.log(querySnapshot.size, 'sizee======');
          console.log(id, password);
          if (querySnapshot.size == 1) {
            //console.log('docId', querySnapshot.docs[0].id);
            querySnapshot.forEach(documentSnapshot => {


              console.log('role  = ', documentSnapshot.data().role);
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

                navigation.navigate('AdminStack');
                setLoading(false);
              } else if (documentSnapshot.data().role == 'Developer') {


                setLoading(false);
                navigation.navigate('DeveloperStack');
              } else if (documentSnapshot.data().role == 'Class') {


                setLoading(false);
                navigation.navigate('ClassStack');
              } else {
                // console.log('no one match');
                // updateForToken(querySnapshot.docs[0].id);
                 saveOtherInfo(documentSnapshot?.data());
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
        // console.log('User updated!');
        setLoading(false);
      });
  };
  const handleId = v => {
    setId(v);
  };
  const handlePassword = v => {
    setPassword(v);
  };

  const handleEyeClick = () => {

    //console.log('nnnn');

    if (eyeClick) {
      setEye('EyeOff')
    }
    else {
      setEye('EyeOn')
    }
    setEyeClick(!eyeClick);
  }
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        style={styles.upper}
        colors={['darkblue', 'darkblue', 'rgba(0,212,255,1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1.4 }}>
        {/* <Label
          label={'Wellcome !!'}
          style={{marginVertical: mvs(10)}}
          size={20}
          color="white"
        /> */}
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
          style={{ alignSelf: 'center' }}
          color={'white'}
        />
      </LinearGradient>

      <View style={styles.lower}>
        <PrimaryTextInput
          placeholder="Enter id"
          style={{ width: '90%' }}
          onChangeText={handleId}
          inputValue={id}

        />
        <PrimaryTextInput
          placeholder="Enter Password"
          style={{ width: '90%' }}
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
          style={{ width: '90%', marginTop: mvs(50) }}

        />
        <TouchableOpacity onPress={() => navigation.navigate('UserStack')}>
          <Text>Continue without login? <Bold label='Continue' color={colorsTheme.primary} /></Text>
        </TouchableOpacity>


      </View>
    </ScrollView>
  );
};
export default Login;
