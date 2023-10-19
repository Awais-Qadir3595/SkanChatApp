import React, { useEffect, useState } from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import {styles} from './style';
import Bold from '../../../components/core/bold';
import {mvs} from '../../../services/metrices';
import PrimaryButton from '../../../components/core/button';
import {colorsTheme} from '../../../services/color';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';
import SendNotification from '../../../hooks/notification';
import messaging from '@react-native-firebase/messaging';


const CreatePost = props => {
  //console.log('sid....',props.route.params.sid);
    const [message,setMessage]=useState('');
    const [loading,setLoading]=useState(false);
    const [listOfToken,setListOfToken]=useState();
    var date = new Date() //To get the Current Date
    console.log('----dates-----  = ',date);

    // useEffect(()=>{
    //   getPermission();
    
    //  },[])
    
    //  const getPermission=async()=>{
    //   const authStatus = await messaging().requestPermission();
       
    //  }



    const handlePost=async()=>{
      if(message=='')
    {
      Toast.show('please enter a message..')
      return
    }
    
    
        setLoading(true);
      let chatId = 'id-' + new Date().getTime();
      console.log('mmmm---',message);
      let text=message;
     let sid=props?.route?.params?.sid;
      console.log(text);
      console.log('sid---',sid);
      console.log(chatId);
      await firestore()
        .collection('chat')
        .doc(chatId)
        .set({
          sid,
          text,
          chatId,
          dateTime:date
        })
        .then(() => {
          setLoading(false);
         console.log('post created');
           
           notifyEveryUser();
           props.navigation.navigate('AdminDashBoard')
  //SendNotification(props?.route?.params?.item?.token,msgToSend,'skan school system');
           
          setLoading(false);
          setMessage('');
          Toast.show('post created');
        
        });
    }

    const notifyEveryUser=async()=>{

      console.log('msg send = ',message);
console.log('sid login user == ',global.user.sid);
      //fetching tokens
      const subscriber = await firestore()
               .collection('user')
               .where('sid', '==',global.user.sid)
               .where('role', '==','User')
               .onSnapshot(querySnapshot => {
               // console.log('chat size',querySnapshot.size);
               
                
                   const arr = [];
                   
                   querySnapshot.forEach(documentSnapshot => {
                    console.log('each data is == ',documentSnapshot.data().token);
                       arr?.push(documentSnapshot.data().token)
                       SendNotification(documentSnapshot.data().token,message,'skan school system');

                   });
                   setListOfToken(arr);
                   console.log('below is array');
                   console.log(arr);
               });
///////


    }
  return (
    <View style={styles.main}>
      <View style={styles.upper}>
        <Image
          source={require('../../../assets/images/skan2.jpg')}
          style={{borderRadius: 90, height: mvs(120), width: mvs(120)}}
        />
        <Bold
          label={props?.route?.params.SchoolName}
          color={'white'}
          size={20}
        />
      </View>
      <View style={styles.body}>
        <TextInput
          style={styles.textInput}
          multiline={true}
          numberOfLines={4} // Adjust the number of lines as needed
          placeholder="Enter your text here..."
          onChangeText={(v)=>setMessage(v)}
          value={message}
          // Other props like onChangeText, value, etc. can be added here
        />
        <PrimaryButton
          label="save"
          bgColor={colorsTheme.primary}
          width={'25%'}
          color={'white'}
          height={mvs(40)}
          style={{alignSelf:'flex-end'}}
          onclick={handlePost}
        />
      </View>
    </View>
  );
};
export default CreatePost;
