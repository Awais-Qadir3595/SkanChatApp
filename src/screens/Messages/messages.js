import React, { useEffect, useState } from 'react';
import {FlatList, Text, View, Image, Touchable, TouchableOpacity, Alert} from 'react-native';
import styles from './style';
import Row from '../../components/core/Row';
import Bold from '../../components/core/bold';
import PrimaryTextInput from '../../components/core/PrimaryTextInput';
import {mvs} from '../../services/metrices';
import Label from '../../components/core/Label';
import { Axios_Fetch } from '../../hooks/axiosCode';
import { ROUTES } from '../../hooks/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThreeDots } from '../../assets/svgs';
import  Modal  from 'react-native-modal';
import DrawHorizentalLine from '../../components/core/drawHorizentalLine';
import firestore from '@react-native-firebase/firestore';
import { getAllOfCollectionwhere, getAllOfCollectionwhere1, getAllOfCollectionwherewhere, saveData } from '../main';


const Messages = ({navigation}) => {
   
  const [messageList,setMessageList]=useState([]);
  const [modalVisible,setModalVisible]=useState(false);
   //console.log(global?.user,'global variable data');

//    const jsonValue =  AsyncStorage.getItem('userLogin');
//    const myObject = JSON.parse(jsonValue);
// console.log('user async',myObject);

  useEffect(()=>{
    //getObjectFromAsyncStorage();
    getUsersList();
    checkLoggedIn();
    
  },[]);

  const checkLoggedIn=async()=>{
   // console.log('checkLoggedIn');
    try {
        const jsonValue = await AsyncStorage.getItem('userLogin');
        if (jsonValue !== null) {
          const myObject = JSON.parse(jsonValue);
          global.user=myObject;
         // console.log('Retrieved object:', myObject);
          navigation.navigate('Messages')
        } else {
         // console.log('No object with that key');
        }
      } catch (error) {
       // console.error('Error retrieving object:', error);
      }
}


  const getUsersList=async()=>{
     

    // const keys = await AsyncStorage.getAllKeys();
    // console.log(keys,'keys');

    firestore()
    .collection('user')
    // .where('gmail','!=',global?.user?.gmail)
    // .where('password','!=',global?.user?.password)
    .get()
    .then(querySnapshot => {
      //  console.log(querySnapshot.size);
        if(querySnapshot.size>0)
        {
           
            // console.log(querySnapshot,'this is');
           const list=[];
            querySnapshot.forEach(documentSnapshot => {
                 
               
                 if(documentSnapshot.data().gmail==global?.user?.gmail && documentSnapshot.data().password==global?.user?.password)
                 {
                   
                  // console.log('match',documentSnapshot.data());
                 }
                 else{
                 // console.log('not  match',documentSnapshot.data());
                  list.push(documentSnapshot.data())

                 }
                 
                  
              });
           setMessageList(list)

             
             
        }
        else{
            Alert.alert('no data found');
        }
    })
     
  }

  const changeText=(v)=>{
//console.log(v);
// const filteredData = messageList.filter((item) => item.userName==v);
// console.log(filteredData,'filtered');
// setMessageList(filteredData);
  }

  const properties=()=>{

    setModalVisible(true);

  }

  const Logout=async()=>{
     
    try {
      await AsyncStorage.removeItem('userLogin');
      navigation.navigate('Login');
      //console.log('Removed object' );
    } catch (error) {
      //console.error(`Error removing object with key: ${userData}`, error);
    }
  }
const getReceiverToken=async(id)=>{
 
  return new Promise(async (resolve, reject) => {
   firestore()
  .collection('user')
  .where('id','==',id)
  .get()
  .then(async querySnapshot => {
    let datokenFcm;
     //console.log(querySnapshot.size);
      if(querySnapshot.size>0)
      {
        
        querySnapshot.forEach(documentSnapshot => {
         //console.log('receiver token andr ', documentSnapshot.data().token);

         datokenFcm=documentSnapshot.data().token;
       });
      // console.log('andr sy h',datokenFcm);
       resolve(datokenFcm);
      // return datokenFcm;
      }
      else{
        reject('not found');
        
      }
    })
  })

}

  const startChat=async(item)=>{

    let id='id-' + new Date().getTime();
    let token=await getReceiverToken(item.id);
  
//console.log('receiver token ok',token);
    let senderReceiver=global?.user?.id+','+item?.id;
    let receiverSender=item?.id+','+global?.user?.id;
  let threadId;
   // console.log('sender-Receiver',global?.user?.id+','+item.id);
   // console.log('Receiver-sender',item.id+','+global.user?.id);


    firestore()
    .collection('threads')
    .where('senderReceiver', 'in', [senderReceiver, receiverSender])
    .get()
    .then(async querySnapshot => {
       // console.log('www',querySnapshot.empty);
        if(!querySnapshot.empty)
        {
          querySnapshot.forEach(documentSnapshot => {
             
            
           // console.log('thread data',documentSnapshot.data().threadId);
             threadId=documentSnapshot.data().threadId;
            navigation.navigate('ChatScreen',{item,threadId,token})
         });
    
        }else{
          // let senderReceiver=global.user?.id+','+item.id;
          // let receiverSender=item.id+','+global.user?.id
          //console.log('wao');
          let result=await saveData('threads',id,{
            
            sender:global.user.id,
            reciver:item.id,
            threadId:id,
            senderReceiver:senderReceiver,
             
          })
          if(result)
          {
          
          }
        }
             
        })
  //    let checkThread=await getAllOfCollectionwherewhere('threads','receiverSender',receiverSender,'senderReceiver',senderReceiver)
  // console.log('check thread',checkThread);

    

 
return
   
  }
  const renderList = ({item}) => {
// console.log('iteration',item);
    return (
        <TouchableOpacity onPress={()=>startChat(item)}>
      <Row style={styles.rw}>
        <View>
        <Image
        style={styles.img}
        source={require('../../assets/images/worker1.jpg')}
      />
        </View>
        <View style={styles.desc}>
           <Bold label={item.name}/>
           
        </View>
      </Row>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.main}>
      <Row>
      <Bold label="Messages" size={27} />
      <TouchableOpacity onPress={properties}>
            <ThreeDots style={styles.icons} />
            </TouchableOpacity>
      </Row>
      <PrimaryTextInput
        style={{borderWidth: 1, borderRadius: 20, marginVertical: mvs(20)}}
        placeholder="search"
        onChangeText={changeText}
      />
      <FlatList
        data={messageList}
        renderItem={renderList}
        keyExtractor={(item, index) => index.toString()}
      />

<Modal isVisible={modalVisible} onBackButtonPress={()=>setModalVisible(false) }>
        <View style={{position:'absolute',top:0,right:0,height:mvs(200),width:'40%',
        backgroundColor:'white',alignItems:'center',paddingTop:mvs(10)  }}>
          <TouchableOpacity onPress={()=>Logout()}>
            <Bold label='Logout' size={20}/>
          </TouchableOpacity>
          <DrawHorizentalLine style={{width:'90%'}}/>
        </View>
      </Modal>
    </View>
  );
};
export default Messages;
