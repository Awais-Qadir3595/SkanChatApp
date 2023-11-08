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
import { CommonActions } from '@react-navigation/native';
const ClassDashboard = ({navigation}) => {

  const [schoolData, setSchoolData] = useState('loading..');
  const [classData, setClassData] = useState('loading..');
  
const sid=global?.user?.sid;
 //console.log('...../////......',global?.user);

  useEffect(() => {
    getDataSchool();
     
  }, []);

  useEffect(()=>{
    
    const backAction = () => {
      if (navigation.isFocused()) {
    
        BackHandler.exitApp();
        
        return true;  
      }
   
      return false;
    };
  
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
  
    return () => backHandler.remove();

  },[])

 

  const getDataSchool = async() => {
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
          Alert.alert('no School found');
        }
      });
  };

  const logout = async () => {
    console.log('mhr');
    try {
      await AsyncStorage.removeItem('userLogin');
      navigation.navigate('Login');
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

  const ViewStudents=()=>{
    navigation.navigate('ViewStudents')
  }
  const addStudent = () => {
    navigation.navigate('AddStudent', schoolData);
  };

  const addPost=()=>{
     
    navigation.navigate('AddPost',schoolData)
  }

  const ViewPosts=()=>{
    navigation.navigate('ViewPosts')
  }
  return (
    <View style={styles.main}>

     

      <View style={styles.upper}>
        <Image
          source={require('../../../assets/images/skan2.png')}
          style={{borderRadius: 90, height: mvs(120), width: mvs(120)}}
        />
        <View style={styles.SchoolStyle}>
          <Bold label={schoolData.SchoolName} color={'white'} size={20} />
          <Bold label={global?.user?.CName} color={'white'} size={16}  style={{marginTop:mvs(10)}}/>
        </View>
       
     
      </View>
      <View style={styles.body}>
        <Row style={styles.rw}>
          <TouchableOpacity style={styles.boxes} onPress={addStudent}>
            <Bold label="Add Student" color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxes} onPress={ViewStudents}>
            <Bold label="View Students" color={'white'} />
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
export default ClassDashboard;
