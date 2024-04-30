import React, { useEffect, useState } from 'react';
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
import { mvs } from '../../../services/metrices';
import PrimaryButton from '../../../components/core/button';
import axios from 'axios';
import { Axios_Fetch, Axios_Post_data } from '../../../hooks/axiosCode';
import { ROUTES } from '../../../hooks/routes';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from '../../../components/appComponents/NotificationApp';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
const AddClass = props => {
  // console.log('aaaa', props?.route?.params);

  const [CName, setName] = useState(null);
  const [userMail, setUserMail] = useState(null);
  const [passwd, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [existThreat, setExistThreat] = useState(false);
  useEffect(() => {
    getTokenFunction();
  }, []);
  const getTokenFunction = async () => {
    let token = await getToken();
    //console.log('useEffect', token);
    setToken(token);
  };
  const handleName = v => {
    setName(v);
  };

  const handleGmail = v => {

    setUserMail(v);
  };

  const handlePassword = v => {
    setPassword(v);
  };
  const checkExistance = async () => {


    let username = userMail.trim();
    const querySnapShot = await firestore()
      .collection('user')
      .where('role', '==', 'Class')
      .where('gmail', '==', username)
      .get();



    if (querySnapShot.size > 0) {
      setExistThreat(true);
      Toast.showWithGravity('user Exist please change UserName', Toast.LONG,
        Toast.TOP,)
      return 0;
    } else {
      setExistThreat(false);
      return 1;

    }


  }
  const handleAddStudent = async () => {

    let system_id = userMail.trim().toLowerCase();

    let check = await checkExistance();
    //  console.log('check  =  ',check);
    if (check == 0) {
      return;
    }
    //console.log(gmail.length);
    if (system_id.length <= 2) {
      Toast.show('user Name must be atleast 3 letters')
      return;
    }


    if (CName == null || userMail == null || passwd == null) {

      Toast.show('please fill All Fields')
    } else {

      setLoading(true);
      let id = 'class-' + new Date().getTime();
      let sid = global?.user?.id
      let password = passwd.toLowerCase();

      let role = 'Class'
      await firestore()
        .collection('user')
        .doc(id)
        .set({
          CName,
          system_id,
          password,
          id,
          sid,
          role,


        })
        .then(async () => {
          await firestore()
            .collection('class')
            .doc(id)
            .set({
              CName,
              id,
              sid,
            })
            .then(() => {
              setLoading(false);
              setUserMail('');
              setPassword('');
              setLoading(false);
              setName('');
              Toast.show('Class Added');
              props?.navigation?.navigate('AdminDashBoard')

            });
          Toast.show('user Added');

        });


    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.upper}
        colors={['darkblue', 'darkblue', 'rgba(0,212,255,1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1.4 }}>
        {/* <Label
          label={'Wellcome !!'}
          
          size={20}
          color="white"
        /> */}
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
          label={'Add Class'}
          size={20}
          style={{ alignSelf: 'center' }}
          color={'white'}
        />
        <Bold label={props.route?.params?.SchoolName} size={20}
          color={'white'} style={{ alignSelf: 'center' }} />
      </LinearGradient>

      <View style={styles.lower}>
        <PrimaryTextInput
          placeholder="Enter Class Name"
          style={{ width: '90%', marginLeft: 0 }}
          onChangeText={handleName}
          inputValue={CName}

        />

        <PrimaryTextInput
          placeholder="Enter id"
          style={{ width: '90%', marginLeft: 0, borderBottomColor: existThreat ? 'red' : 'gray', }}
          onChangeText={handleGmail}
          inputValue={userMail}
          existThreat={existThreat}
          onBlur={() => checkExistance()}
        />
        <PrimaryTextInput
          placeholder="Enter Password"
          style={{ width: '90%', marginLeft: 0 }}
          onChangeText={handlePassword}
          inputValue={passwd}
        />

        <PrimaryButton
          label="Add"
          bgColor={'navy'}
          height={mvs(60)}
          color={'white'}
          style={{ marginTop: mvs(50), width: '90%' }}
          onclick={() => handleAddStudent()}
          loading={loading}

        />

        <Text>

          <TouchableOpacity onPress={() => props.navigation.navigate('AdminDashBoard')}>
            <Bold label=" Back to Dashboard" color="navy" size={20} />
          </TouchableOpacity>

        </Text>
      </View>
    </SafeAreaView>
  );
};
export default AddClass;
