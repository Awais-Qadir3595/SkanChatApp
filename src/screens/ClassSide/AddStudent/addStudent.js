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

import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from '../../../components/appComponents/NotificationApp';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
const AddStudent = props => {
  // console.log('aaaa', props?.route?.params);
  const [name, setName] = useState(null);
  const [student_id, setStudentId] = useState(null);
  const [passwd, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [existThreat, setExistThreat] = useState(false);
  const [systemId, setSystemId] = useState(null);
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

  const handleStudentId = v => {
    setStudentId(v);
  };

  const handlePassword = v => {
    setPassword(v);
  };
  const checkExistance = async () => {
    
    const querySnapShot = await firestore()
      .collection('user')
      .where('role', '==', 'User')
      .where('system_id', '==', student_id)
      .get();

    if (querySnapShot.size > 0) {
      setExistThreat(true);
      Toast.showWithGravity('This student id exists', Toast.LONG,
        Toast.TOP,)
      return 0;
    } else {
      setExistThreat(false);
      return 1;
    }
  };
  const AddStudent = async () => {

     
    // let email = userMail.trim();
    // let gmail = email.toLowerCase();
    let cid = global?.user?.cid;
    let check = await checkExistance();
    console.log('check  =  ',check);
    if (check == 0) {
      return;
    }
     

    if (name == null || student_id == null || passwd == null) {
      Toast.show('please fill All Fields');
    } else {
      setLoading(true);
      let id = 'id-' + new Date().getTime();
      let sid = props?.route?.params?.sid;
      console.log('sid = ', props?.route?.params?.sid);
      let role = 'User';
      let password = passwd.toLowerCase();
let system_id=student_id;
      //   console.log('gmail = ',gmail);
      // console.log('name = ',name);
      // console.log('cid = ',global?.user);
      // console.log('passwd = ',passwd);
      // console.log('role = ',role);
      // console.log('sid = ',sid);
      // console.log('id = ',id);


      await firestore()
        .collection('user')
        .doc(id)
        .set({
          name,
          system_id,
          password,
          id,
          sid,
          role,
          cid,
        })
        .then(() => {
          setLoading(false);
          setStudentId(null);
          setPassword(null);
          setLoading(false);
          setName(null);
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
        end={{ x: 0.6, y: 1.3 }}>
        <Label label={'Wellcome !!'} size={20} color="white" style={{alignSelf:'center', }}/>
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
          label={'Add Student'}
          size={20}
          style={{ alignSelf: 'center' }}
          color={'white'}
        />
        <Bold
          label={props.route?.params?.SchoolName}
          size={20}
          color={'white'}
          style={{ alignSelf: 'center' }}
        />
      </LinearGradient>

      <View style={styles.lower}>
        <PrimaryTextInput
          placeholder="Enter Name"
          style={{ width: '90%', marginLeft: 0 }}
          onChangeText={handleName}
          inputValue={name}
        />

        <PrimaryTextInput
          placeholder="Enter Student_id"
          style={{
            width: '90%',
            marginLeft: 0,
            borderBottomColor: existThreat ? 'red' : 'gray',
          }}
          keyboardType="numeric"
          onChangeText={handleStudentId}
          inputValue={student_id}
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
          onclick={() => AddStudent()}
          loading={loading}
        />

        <Text>
          {/* <Label label="Already have account? " /> */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ClassDashboard')}>
            <Bold label=" Back to Dashboard" color="navy" size={20} />
          </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default AddStudent;
