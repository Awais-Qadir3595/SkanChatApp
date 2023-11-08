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
const AddStudent = props => {
  // console.log('aaaa', props?.route?.params);
  const [name, setName] = useState(null);
  const [userMail, setUserMail] = useState(null);
  const [password, setPassword] = useState(null);
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
      .where('role', '==', 'User')
      .where('gmail', '==', username)
      .get();

    if (querySnapShot.size > 0) {
      setExistThreat(true);
      Toast.showWithGravity('user Exist please change UserName',  Toast.LONG,
      Toast.TOP,)
      return 0;
    } else {
      setExistThreat(false);
      return 1;
    }
  };
  const AddStudent = async () => {
    
    let gmail = userMail.trim();
    let cid = global?.user?.id;
    let check = await checkExistance();
    //console.log('check  =  ',check);
    if (check == 0) {
      return;
    }
    if(gmail.length<=2)
    {
      Toast.show('user Name must be atleast 3 letters',Toast.LONG)
      return;
    }

    if (name == null || userMail == null || password == null) {
      Toast.show('please fill All Fields');
    } else {
      setLoading(true);
      let id = 'id-' + new Date().getTime();
      let sid = props?.route?.params?.sid;
      console.log('sid = ', props?.route?.params?.sid);
      let role = 'User';

      console.log('gmail = ',gmail);
    console.log('name = ',name);
    console.log('cid = ',global?.user);
    console.log('passwd = ',password);
    console.log('role = ',role);
    console.log('sid = ',sid);
    console.log('id = ',id);


      await firestore()
        .collection('user')
        .doc(id)
        .set({
           name,
          gmail,
          password,
          id,
          sid,
          role,
          cid,
        })
        .then(() => {
          setLoading(false);

          setUserMail('');
          setPassword('');
          setLoading(false);
          setName('');
          Toast.show('user Added');
        });
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
          label={'Add Student'}
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
          placeholder="enter Name"
          style={{width: '90%', marginLeft: 0}}
          onChangeText={handleName}
          inputValue={name}
        />

        <PrimaryTextInput
          placeholder="enter userName"
          style={{
            width: '90%',
            marginLeft: 0,
            borderBottomColor: existThreat ? 'red' : 'gray',
          }}
          onChangeText={handleGmail}
          inputValue={userMail}
          existThreat={existThreat}
          onBlur={() => checkExistance()}
        />
        <PrimaryTextInput
          placeholder="enter Password"
          style={{width: '90%', marginLeft: 0}}
          onChangeText={handlePassword}
          inputValue={password}
        />

        <PrimaryButton
          label="Add"
          bgColor={'navy'}
          height={mvs(60)}
          color={'white'}
          style={{marginTop: mvs(50), width: '90%'}}
          onclick={() => AddStudent()}
          loading={loading}
        />

        <Text>
          {/* <Label label="Already have account? " /> */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ClassDashboard')}>
            <Bold label=" Back to DashBoard" color="navy" size={20} />
          </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default AddStudent;
