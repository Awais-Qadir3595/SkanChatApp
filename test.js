import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
 
import Toast from 'react-native-simple-toast';
 
 
const Test=()=> {

  useEffect(() => {
    getSchool();
  }, []);

  const getSchool = async () => {
    
    await firestore()
      .collection('schools')
      .get()
      .then(querySnapshot => {
        console.log('size = ',querySnapshot.size);
        if (querySnapshot.size > 0) {
          const list = [];
          querySnapshot.forEach(documentSnapshot => {
            list.push(documentSnapshot.data());
          });
          setUsersList(list);
          console.log('data is presend');
        } else {
          Toast.show('no data found');
          console.log('data is not   presend');


        }
      });
  };
   
  return (
    <View style={{flex:1,backgroundColor:'lightgray',justifyContent:'center',alignItems:'center'}}>
        <Text>aws</Text>
    </View>
  );
}
export default Test;