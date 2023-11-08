import React, {useEffect, useState} from 'react';
import {View, Text, Image, Touchable, TouchableOpacity, BackHandler,ActivityIndicator} from 'react-native';
import {styles} from './style';
import Row from '../../../components/core/Row';
import Bold from '../../../components/core/bold';
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';
 
import {mvs} from '../../../services/metrices';
 
 import { CommonActions } from '@react-navigation/native';
 


const DeleteDashboard = ({navigation}) => {
 
  useEffect(()=>{
   
  
    
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

  
  return (
    <View style={styles.main}>
       
      <View style={styles.body}>
         

        <Row style={styles.rw}>
          <TouchableOpacity style={styles.boxes} onPress={AddSchool}>
            <Bold label="delete School " color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxes} onPress={ViewSchools}>
            <Bold label="Delete School" color={'white'} />
          </TouchableOpacity>
        
        </Row>
        <TouchableOpacity style={styles.boxes} onPress={deleteAll}>
            <Bold label="Delete All Users Except Admin" color={'white'} />
          </TouchableOpacity>
      </View>
      
    </View>
  );
};
export default DeleteDashboard;
