import React, {useEffect, useState} from 'react';
import {View, Text, Image, Touchable, TouchableOpacity, BackHandler} from 'react-native';
import {styles} from './style';
import Row from '../../../components/core/Row';
import Bold from '../../../components/core/bold';
import {colorsTheme} from '../../../services/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {mvs} from '../../../services/metrices';
import { Alert } from 'react-native';
const AdminDashBoard = ({navigation}) => {

  const [schoolData, setSchoolData] = useState('loading..');
  console.log('global',global?.user?.sid);
const sid=global?.user?.sid;
console.log('sid====',sid);
  useEffect(() => {
    getData();
  }, []);

  useEffect(()=>{
    const backAction = () => {
      if (navigation.isFocused()) {
        // Handle what you want to do when the back button is pressed on this screen
        // For example, you can exit the app using the following code:
        BackHandler.exitApp();
        // navigation.navigate(COMMON.BETBAZI)
        return true; // Return true to prevent default behavior (e.g., going back in the navigation stack)
      }
  
      // If not on the desired screen, allow the default back navigation
      return false;
    };
  
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
  
    return () => backHandler.remove();
  },[])



  const getData = async() => {
   await firestore()
      .collection('schools')
      .where('sid','==',sid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(documentSnapshot => {
            console.log(documentSnapshot.data());

            setSchoolData(documentSnapshot.data());
          });
        } else {
          Alert.alert('no data found');
        }
      });
  };

  const logout = async () => {
    console.log('mhr');
    try {
      await AsyncStorage.removeItem('userLogin');
      navigation.navigate('Login');
      console.log('Removed object');
    } catch (error) {
      console.error(`Error removing object with key`, error);
    }
  };

  const ViewUsers=()=>{
    navigation.navigate('ViewUsers')
  }
  const addUsers = () => {
    navigation.navigate('SignUp', schoolData);
  };

  const addPost=()=>{
     
    navigation.navigate('CreatePost',schoolData)
  }

  const ViewPosts=()=>{
    navigation.navigate('ViewPosts')
  }
  return (
    <View style={styles.main}>

     

      <View style={styles.upper}>
        <Image
          source={require('../../../assets/images/skan2.jpg')}
          style={{borderRadius: 90, height: mvs(120), width: mvs(120)}}
        />
        <View style={styles.SchoolStyle}>
          <Bold label={schoolData.SchoolName} color={'white'} size={20} />
        </View>
      </View>
      <View style={styles.body}>
        <Row style={styles.rw}>
          <TouchableOpacity style={styles.boxes} onPress={addUsers}>
            <Bold label="Add User" color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxes} onPress={ViewUsers}>
            <Bold label="View Users" color={'white'} />
          </TouchableOpacity>
        </Row>

        <Row style={styles.rw}>
          <TouchableOpacity style={styles.boxes} onPress={addPost}>
            <Bold label="Add Post " color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxes} onPress={ViewPosts}>
            <Bold label="View Posts" color={'white'} />
          </TouchableOpacity>
        </Row>
      </View>
      <TouchableOpacity style={{position:'absolute',top:20,right:10}} onPress={logout}>
        <Bold label='LogOut' color={'white'}/>
      </TouchableOpacity>
    </View>
  );
};
export default AdminDashBoard;
