import React, {useEffect, useState} from 'react';
import {View, Text, Image, Touchable, TouchableOpacity, BackHandler,ActivityIndicator} from 'react-native';
import {styles} from './style';
import Row from '../../../components/core/Row';
import Bold from '../../../components/core/bold';
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';
 
import {mvs} from '../../../services/metrices';
 
 import { CommonActions } from '@react-navigation/native';
 


const DeveloperDashboard = ({navigation}) => {
 
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

  const ViewSchools=()=>{
    navigation.navigate('ViewSchools')
  }
  const AddSchool=()=>{
    navigation.navigate('AddSchool')
  }

  const deleteAll=async()=>{
 navigation.navigate('DeleteDashboard');
 return;
    var arr=[];
    await firestore()
    .collection('user')
    .where('role', '!=', 'Developer')
    .get()
    .then(querySnapshot => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach(documentSnapshot => {
          //console.log(documentSnapshot.data());
arr.push(documentSnapshot.data());

          //setSchoolName(documentSnapshot.data().SchoolName);
        });
      } else {
        Alert.alert('no data found');
      }
    });

arr.map((item)=>{

  firestore()
  .collection('user') 
  .doc(item.id)
  .delete()
  .then(() => {
    //console.log('deleted======================');
    
    
  });
})
  
  }

  const AddMedia=()=>{
    navigation.navigate('AddMedia')
  }
  return (
    <View style={styles.main}>
      <View style={styles.upper}>
        <Image
          source={require('../../../assets/images/skan2.png')}
          style={{borderRadius: 90, height: mvs(120), width: mvs(120)}}
        />
         
      </View>
      <View style={styles.body}>
         

        <Row style={styles.rw}>
          <TouchableOpacity style={styles.boxes} onPress={AddSchool}>
            <Bold label="Add School " color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxes} onPress={ViewSchools}>
            <Bold label="View School" color={'white'} />
          </TouchableOpacity>
          
        
        </Row>
        <Row style={styles.rw}>
          <TouchableOpacity style={styles.boxes} onPress={AddMedia}>
            <Bold label="Add Media" color={'white'} />
          </TouchableOpacity>
          
        </Row>
        
      </View>
      <TouchableOpacity style={{position:'absolute',top:20,right:10}} onPress={logout}>
        <Bold label='LogOut' color={'white'}/>
      </TouchableOpacity>
    </View>
  );
};
export default DeveloperDashboard;
