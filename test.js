import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import { HttpTransportType, HubConnectionBuilder, LogLevel,signalR } from '@microsoft/signalr';
import {setJSExceptionHandler} from 'react-native-exception-handler';
import firestore from '@react-native-firebase/firestore';
const Test = () => {
  //const hub_endpoint='https://test.thesalear.com/api/chatting/sendmessage';
  const hub_endpoint = 'https://test.thesalear.com/offers';
  //const hub_endpoint='/offers';

  const [connectionState, setConnectedStateText] = useState('');
  const [isConnected, setConnected] = useState(false);
  const [conn, setConn] = useState(null);
  const [messageLog, setMessageLog] = useState([]);

  useEffect(() => {
    
    firestore()
    .collection('user')
    .get()
    .then(querySnapshot => {
      console.log('Total users: ', querySnapshot.size);
  
      querySnapshot.forEach(documentSnapshot => {
        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      });
    });
    

  
  
     

     
     
   
  }, []);
  return (
    <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
      <Text>chat signalR</Text>
      <Text>The Offers are given below : -</Text>
    </View>
  );
};
export default Test;
