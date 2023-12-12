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
import ListOfClasses from '../viewPosts/listOfClasses/listOfClasses';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { School, ThreeDotsWhite } from '../../../assets/svgs';
import notifee from '@notifee/react-native';
import LinearGradient from 'react-native-linear-gradient';
import PrimaryButton from '../../../components/core/button';
import Boxes from '../../../components/appComponents/boxes';
import Modal from 'react-native-modal';
import Label from '../../../components/core/Label';

const AdminDashBoard = ({navigation}) => {

  const [schoolData, setSchoolData] = useState('loading..');
  const [modalIsDelete, setModalIsDelete] = useState(false);


  console.log('global',global?.user);
const sid=global?.user?.sid;
//console.log('sid====',sid);

   

  useEffect(()=>{
    getData();
    
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



  const getData = async() => {
   await firestore()
      .collection('schools')
      .where('sid','==',sid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(documentSnapshot => {
           // console.log(documentSnapshot.data());

            setSchoolData(documentSnapshot.data());
          });
        } else {
          Alert.alert('no data found');
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

  const ViewUsers=()=>{
    navigation.navigate('ViewClasses')
  }
  const addUsers = () => {
    navigation.navigate('AddClass');
  };

  const addPost=()=>{
     
    navigation.navigate('CreatePost',schoolData)
  }

  const ListOfClasses=()=>{
    navigation.navigate('ListOfClasses')
  }
  return (
    <View style={styles.main}>

     

<LinearGradient
        style={styles.upper}
        colors={['darkblue', 'darkblue', 'rgba(0,212,255,1)']}
        start={{x: 0, y: 0}}
        end={{x: 0.5, y: 1.4}}>
          
        <Image
          source={require('../../../assets/images/skan2.png')}
          style={{borderRadius: 90, height: mvs(120), width: mvs(120)}}
        />
        <View style={styles.SchoolStyle}>
        <School  />
          <Bold label={schoolData?.SchoolName} color={'white'} size={20} />
         
          {/* <Icon name="bus-school" size={30} color="#900" /> */}
        </View>
      </LinearGradient>
      <View style={styles.body}>
        <Row style={styles.rw}>
        <Boxes
            label={'Add Class'}
            icon={'AddStudent'}
            onClick={addUsers}
          />
          <Boxes
            label={'View Class'}
            icon={'ViewClass'}
            onClick={ViewUsers}
          />
         
        </Row>

        <Row style={styles.rw}>

        <Boxes
            label={'Add Post'}
            icon={'AddPost'}
            onClick={addPost}
          />
            <Boxes
            label={'View Posts '}
            icon={'ViewPost'}
            onClick={ListOfClasses}
          />

         
        </Row>
      </View>
      <TouchableOpacity style={{position:'absolute',top:20,right:10}} onPress={()=>setModalIsDelete(true)}>
         
        <Icon name="logout" size={25} color="white" />
      </TouchableOpacity>
      
      <Modal
            isVisible={modalIsDelete}
            onBackButtonPress={() => setModalIsDelete(false)}
            onBackdropPress={() => setModalIsDelete(false)}
            backdropOpacity={0.7}>
            <View style={styles.deleteModal}>
              <Bold label="Do you want to logout?" />
              <Row style={{alignItems:'center',justifyContent:'space-evenly',width:'100%'}}>
                <PrimaryButton label='Yes' height={mvs(45)} width={'40%'} color={'white'}
                onclick={()=>logout()}/>
                
                <PrimaryButton label='No' height={mvs(45)} width={'40%'} color={'white'}
                onclick={()=>console.log('hummmm')}/>
              </Row>
            </View>
          </Modal>
    </View>
  );
};
export default AdminDashBoard;
