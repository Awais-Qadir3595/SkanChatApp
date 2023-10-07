import React, { useEffect, useState } from 'react';
import {View, Image, Touchable, TouchableOpacity, FlatList, Alert,Text} from 'react-native';
import styles from './style';
import Row from '../../components/core/Row';
import Bold from '../../components/core/bold';
import {Audio, ThreeDots, Video,ImagePick} from '../../assets/svgs';
import Label from '../../components/core/Label';
import PrimaryTextInput from '../../components/core/PrimaryTextInput';
import { mvs } from '../../services/metrices';
import PrimaryButton from '../../components/core/button';
import  Modal  from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import { saveData } from '../main';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = (props) => {
let threadId=props?.route?.params?.threadId
var sender=global.user.id;
var reciverId=props?.route?.params?.item?.id;

const senderReceiver=[];
senderReceiver.push(sender);
senderReceiver.push(reciverId);
// console.log('receiver id = ',props?.route?.params?.item?.id);
// console.log('sender id = ',global.user.id);
    const [loading,setLoading]=useState(false);
    const currentDate = new Date();
    const [msgToSend,setMsgToSend]=useState('');
const [chatList,setChatList]=useState([]);
const [modalVisible,setModalVisible]=useState(false);
const [senderData,setSenderData]=useState([]);
const [receiverData,setReceiverData]=useState([]);
//const [totalData,setTotalData]=useState([]);
 
 
useEffect(()=>{
    getChat();
},[])



const getChat=async()=>{

  
  const subscriber = firestore()
               .collection('chat')
               .where('threadId', '==',threadId)
               .onSnapshot(querySnapshot => {
                console.log('chat size',querySnapshot.size);
                querySnapshot.forEach(documentSnapshot => {
                  
                  console.log('saved ',documentSnapshot.data());
               });
                   const arr = [];
                   
                   querySnapshot.forEach(documentSnapshot => {
                       arr?.push({ ...documentSnapshot.data(), id:documentSnapshot?.id 
})
                   });
                   console.log('mhr',arr);
                   setChatList(arr);
               });

               





}

const addChat=async()=>{
  if(msgToSend=='')
  {
    return
  }
  setLoading(true);
  //console.log('id = ',props?.route?.params?.item?.id);
  let chatId= 'id-' + new Date().getTime();

  let result=await saveData('chat',chatId,{
    text:msgToSend,
    threadId,
    chatId,
    sender,
    reciverId
  })
if(result)
{
  setLoading(false);
  setMsgToSend('');
}
else{
  Alert.alert("message could not sent");
}
 
       
}



const renderMsg=({item})=>{
    console.log('item',item);
    return(
    <>       
     {
            item?.sender==sender?
            <View style={styles.msgReceived}>
            <Label label={item.text}/>
          </View>:
 <View style={styles.msgSend}>
 <Label label={item.text}/>
</View>

        }
        </>

       
    )
}

 
const properties=()=>{

  setModalVisible(true);

}
const imageFromCamera=()=>{
  ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true,
  }).then(image => {
    console.log(image);
  });
}
const imageFromGallery=()=>{
  ImagePicker.openCamera({
  width: 300,
  height: 400,
  cropping: true,
}).then(image => {
  console.log(image);
});
}
  return (
    <View style={styles.main}>
      <Row style={styles.rw}>
        <View>
          <Image
            style={styles.img}
            source={require('../../assets/images/worker1.jpg')}
          />
        </View>
        <View style={styles.desc}>
          <Bold label={props?.route?.params?.item?.name} size={25} />
        </View>
        <View style={styles.Options}>
          <Row style={{alignItems: 'center'}}>
            <Video style={styles.icons} />
            <Audio style={styles.icons} />
            <TouchableOpacity onPress={properties}>
            <ThreeDots style={styles.icons} />
            </TouchableOpacity>
           
          </Row>
        </View>
      </Row>
      

<View style={styles.msgView}>
<FlatList 
      data={chatList}
      renderItem={renderMsg}
      keyExtractor={(item,index)=>index.toString()}
      />
</View>
     

      
 


 
 

<Row style={styles.rwLast}>
     <TouchableOpacity onPress={()=>setModalVisible(true)}>
      <ImagePick/>
     </TouchableOpacity>
<PrimaryTextInput  style={styles.input} placeholder='your message. . . ' onChangeText={(v)=>setMsgToSend(v)} inputValue={msgToSend}/>

<PrimaryButton label='send' bgColor={'teal'} height={40} width={60} color={'white'} onclick={()=>addChat()}
loading={loading}/>

</Row>
 
<Modal isVisible={modalVisible} onBackdropPress={()=>setModalVisible(false)} onBackButtonPress={()=>setModalVisible(false)}>
        <View style={{ justifyContent:'center',alignItems:'center',   }}>
          <Row style={{height:mvs(60),alignItems:'center',justifyContent:'space-around',width:'70%',backgroundColor:'lightblue',
          borderRadius:20
         }}>
          <TouchableOpacity  style={{borderWidth:1,height:mvs(40),justifyContent:'center',alignItems:'center',width:'40%',
        backgroundColor:'white',borderRadius:10}}
        onPress={()=>imageFromCamera()}>
          <Bold label='camera'/>

          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:1,height:mvs(40),justifyContent:'center',alignItems:'center',width:'40%',
        backgroundColor:'white',borderRadius:10}}
        onPress={()=>imageFromGallery()}>
          <Bold label='gallery' />

          </TouchableOpacity>
          </Row>
        
           
        </View>
      </Modal>
    </View>

  
  );
};
export default ChatScreen;
