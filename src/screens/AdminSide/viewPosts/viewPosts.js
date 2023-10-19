import React, { useEffect, useState } from "react";
import {Alert, FlatList, Text,View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Posts from "../../../components/appComponents/posts";
import Label from "../../../components/core/Label";
import {styles} from './style';
import Bold from "../../../components/core/bold";
import { mvs } from "../../../services/metrices";

const ViewPosts=()=>{

 const [postsList,setPostList]=useState([]);


    useEffect(() => {
        // console.log(global.user);
        getPost();
      }, []);

      const getPost = () => {
        firestore()
          .collection('chat')
          // .orderBy('dateTime','desc')
          .where('sid', '==', global?.user?.sid)
          .onSnapshot(querySnapshot => {
            if(querySnapshot)
            {
              console.log('size= ',querySnapshot);
              let size=querySnapshot.size;
              if (size > 0) {
                const list = [];
                querySnapshot.forEach(documentSnapshot => {
  
                  list.push(documentSnapshot.data());
                 // console.log(documentSnapshot.data().dateTime);
                });
                list.reverse();
                setPostList(list);
              }
            }
           else {
              Alert.alert('no data found');
            }
          });
      };

      const renderList = ({item}) => {


        const _seconds = item?.dateTime?.seconds;
        const _nanoseconds = item?.dateTime?.nanoseconds;
    
    // Convert the timestamp to a JavaScript Date object
    const timestamp = new Date(_seconds * 1000 + _nanoseconds / 1000000);
    
    // Extract the date and time components
    const date = timestamp.toLocaleDateString(); // Format: MM/DD/YYYY or DD/MM/YYYY, depending on your locale
    const time = timestamp.toLocaleTimeString(); // Format: HH:MM:SS AM/PM
     
    let month=timestamp.getMonth();
    
    let hours=timestamp.getHours();
    let minutes=timestamp.getMinutes();
    let seconds=timestamp.getSeconds();
    if(minutes<10)
    {
      minutes='0'+minutes;
    }
    if(seconds<10)
    {
      seconds='0'+seconds;
    }
    let timeResult=null;
    if(hours>=12)
    {
       hours=hours%12;
      if(hours<10)
      {
        hours='0'+hours;
      }
      timeResult= hours+':'+minutes+':'+seconds+' : PM';
    
      
    }
    else{
      if(hours<10)
      {
        hours='0'+hours;
      }
      timeResult=hours+':'+minutes+':'+seconds+' : AM';
    
    }
     
        return (
           
            <View style={styles.rw}>
            
              <View style={styles.desc}>
                <Bold label={item.text} />
               <View style={{marginTop:mvs(20),alignSelf:'flex-end'}}>
               <Label label={date} color='gray'/>
                <Label label={timeResult} color='gray'/>
               </View>
               
                
               
              </View>
            </View>
          
        );
      };
      return(
        <View style={styles.main}>
             

            <FlatList
            data={postsList}
            renderItem={renderList}
            keyExtractor={(item, index) => index.toString()}
            />
        </View>
      )
}
export default ViewPosts;
