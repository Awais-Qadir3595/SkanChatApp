import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import styles from './style';
import PrimaryTextInput from '../../components/core/PrimaryTextInput';
import Bold from '../../components/core/bold';
import Label from '../../components/core/Label';
import {mvs} from '../../services/metrices';
import PrimaryButton from '../../components/core/button';
import axios from 'axios';
import {Axios_Fetch, Axios_Post_data} from '../../hooks/axiosCode';
import {ROUTES} from '../../hooks/routes';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = ({navigation}) => {
  const [name, setName] = useState();
  const [gmail, setGmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const handleName = v => {
    setName(v);
  };

  const handleGmail = v => {
    setGmail(v);
  };

  const handlePassword = v => {
    setPassword(v);
  };

  const SignUp = async () => {
    console.log('signup');
    if (name == null || gmail == null || password == null) {
      Alert.alert('please enter All field');
    } else {
      setLoading(true);
      let id = 'id-' + new Date().getTime();
      await firestore()
        .collection('user')
        .doc(id)
        .set({
          name,
          gmail,
          password,
          id,
        })
        .then(() => {
          setLoading(false);
          console.log('User added!');
          const user={
            gmail:gmail,
            id:id,
            name:name,
            password:password
          };
          AsyncStorage.setItem('userLogin', JSON.stringify(user));
          global.user=user;
          navigation.navigate('Messages')
        });
      // let data = await Axios_Post_data(
      //   {
      //     userName: name,
      //     email: gmail,
      //     password: password,
      //   },
      //   ROUTES.addUser,
      // );
      // console.log(data,'it');
      // if (data.status) {
      //   global.user = data;
      //   navigation.navigate('Messages');
      //   setLoading(false);
      // }
      // else{
      //   setLoading(false);
      //   Alert.alert(data?.message)
      // }

      // if(data!=null)
      // {
      //   navigation.navigate('Messages')
      // }
      // else{
      //   Alert.alert('could not signUp')
      // }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upper}>
            <Label label={'Wellcome !!'} style={{marginVertical:mvs(10)}} size={20} color="white"/>
            <Image
        style={{height:mvs(150),width:mvs(150),alignSelf:'center',borderRadius:110,marginBottom:30}}
        resizeMode="stretch"
        source={require('../../assets/images/skan2.jpg')}
      />
               <Bold label={'Sign Up'} size={35}  style={{alignSelf:'center'}} color={'white'}/>
              
            </View>

      <View style={styles.lower}>
        <PrimaryTextInput
          placeholder="enter Name"
          style={{width: '90%', marginLeft: 0}}
          onChangeText={handleName}
        />

        <PrimaryTextInput
          placeholder="enter gmail"
          style={{width: '90%', marginLeft: 0}}
          onChangeText={handleGmail}
        />
        <PrimaryTextInput
          placeholder="enter Password"
          style={{width: '90%', marginLeft: 0}}
          onChangeText={handlePassword}
        />
        <PrimaryButton
          label="Sign Up"
          bgColor={'navy'}
          height={mvs(60)}
          color={'white'}
          style={{marginTop: mvs(50), width: '90%'}}
          onclick={() => SignUp()}
          loading={loading}
        />
        <Text>
          <Label label="Already have account? " />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Bold label=" Login" color="navy" size={20}/>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};
export default SignUp;
