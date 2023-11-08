import React, {useEffect, useState} from 'react';
import {View, Text, Image, TextInput, Switch, FlatList} from 'react-native';
import {styles} from './style';
import Bold from '../../../components/core/bold';
import {mvs} from '../../../services/metrices';
import PrimaryButton from '../../../components/core/button';
import {colorsTheme} from '../../../services/color';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';
import SendNotification from '../../../hooks/notification';
import messaging from '@react-native-firebase/messaging';
import CheckBox from 'react-native-check-box';

const AddPost = props => {
  

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [listOfToken, setListOfToken] = useState();
  

  console.log('globalll---',global.user);

   

  

  const handlePost = async () => {
   

    const notificationClassId=[];

    if (message == '') {
      Toast.show('please enter a message..');
      return;
    }

    setLoading(true);
    let id = 'id-' + new Date().getTime();
    let post = message;
    let sid = props?.route?.params?.sid;
    let cid = global?.user?.id;
    var date = new Date();
    let isAdmin=false;
    console.log('id---', id);
    console.log('sid---', sid);
    console.log('post---', post);
    console.log('cid ---', cid);
    console.log('date ---', date);
    console.log(id);
    await firestore()
      .collection('post')
      .doc(id)
      .set({
        sid,
        post,
        id,
        cid,
        dateTime: date,
        isAdmin,
        read:false
      })
      .then(() => {
        setLoading(false);
       

        notifyEveryUser();
        props.navigation.navigate('ClassDashboard');
        //SendNotification(props?.route?.params?.item?.token,msgToSend,'skan school system');

        setLoading(false);
        setMessage('');
        Toast.show('post created');
      });
    
    

   

  };

  const notifyEveryUser = async () => {

     
    await firestore()
      .collection('user')
      .where('cid', '==', global?.user?.id)
      .onSnapshot(querySnapshot => {
        const arr = [];
        querySnapshot.forEach(documentSnapshot => {
           
          arr?.push(documentSnapshot.data().token);
          SendNotification(
            documentSnapshot.data().token,
            message,
            'SKANS',
          );
        });
        setListOfToken(arr);
      });

      SendNotification(
       global?.user?.token,
        message,
        'SKANS',
      );
  };

  const renderClasses = ({item, index}) => {
    //console.log(item);

    return (
      <CheckBox
        style={{
          height: mvs(30),
          width: '30%',
          alignItems: 'center',
          marginHorizontal: mvs(20),
        }}
        onClick={() => toggleCheckBox(item, index)}
        isChecked={item.checked}
        leftText={item.CName}
      />
    );
  };
  return (
    <View style={styles.main}>
      <View style={styles.upper}>
        <Image
          source={require('../../../assets/images/skan2.png')}
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
          onChangeText={v => setMessage(v)}
          value={message}
          // Other props like onChangeText, value, etc. can be added here
        />

        
       

        <PrimaryButton
          label="save"
          bgColor={colorsTheme.primary}
          width={'25%'}
          color={'white'}
          height={mvs(40)}
          style={{alignSelf: 'flex-end'}}
          onclick={handlePost}
        />
      </View>
    </View>
  );
};
export default AddPost;
