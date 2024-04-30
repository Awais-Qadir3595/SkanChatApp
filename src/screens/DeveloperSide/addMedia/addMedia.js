import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  BackHandler,
} from 'react-native';
import styles from './style';
import PrimaryTextInput from '../../../components/core/PrimaryTextInput';
import Bold from '../../../components/core/bold';
import Label from '../../../components/core/Label';
import {mvs} from '../../../services/metrices';
import PrimaryButton from '../../../components/core/button';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getToken} from '../../../components/appComponents/NotificationApp';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import { CommonActions } from '@react-navigation/native';
import { ImageSvg } from '../../../assets/svgs';
import Row from '../../../components/core/Row';
import ImagePicker from 'react-native-image-crop-picker';
const AddMedia= props => {

    useEffect(() => {
        getUsers();
      }, []);
   
  const [SchoolName, setName] = useState();
  const [gmail, setGmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [name, setPrincipalName] = useState(null);
  const [imageData, setImageData] = useState(null);
   const [userList,setUsersList]=useState();

  

  const getUsers = () => {
    //console.log(global.user);
    //get all the classes on basis of sid
    firestore()
      .collection('user')
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          const list = [];
          querySnapshot.forEach(documentSnapshot => {
            list.push(documentSnapshot.data());
          });

          const newList = list.map(item => ({ ...item, checked: false }));

          setUsersList(newList);
        } else {
          Toast.show('no class found');
        }
      });
  };

  const uploadImage = async (uri, name) => {
    const reference = storage().ref(name);
    const pathToFile = uri;

    await reference.putFile(pathToFile);
    const url = await storage().ref(name).getDownloadURL();
    return url;
  };
  

  const uploadMedia = async () => {

    console.log(imageData);
    
    console.log('..///////////////////////////////');
    console.log(imageData.path.split('/').pop().split('.')[0]);
    if (imageData==null) {
      Toast.show('please select a picture..');
      return;
    }
    
   setLoading(true)
    let banner = null;
    

    if (imageData != null) {
      let path = imageData.path.split('/').pop().split('.')[0];

      banner = await uploadImage(imageData.path, path);
    }
    const notificationClassId = [];

    
    let check = false;

    //map function for all checked classes
    // userList.map(async item => {
    //   setLoading(true);
    //   if (item.checked) {
    //     check = true;
    //     notificationClassId.push(item.id);

    //     setLoading(true);
         let id = 'id-' + new Date().getTime();
        
        
        await firestore()
          .collection('media')
          .doc(id)
          .set({
            id,
           banner

          })
          .then(() => {
            setLoading(false);

            // notifyEveryUser(notificationClassId);
            props.navigation.navigate('DeveloperDashboard');
            //SendNotification(props?.route?.params?.item?.token,msgToSend,'skan school system');

            setLoading(false);
         
            
            Toast.show('uploaded');
            
          });
      ;
    if (!check) {
      console.log('check = ', check);
      Toast.show('please select any class ');
    }
    setLoading(false)
  };

   

   
  const imageFromGallery = () => {
    ImagePicker.openPicker({
      cropping: false,
    }).then(image => {
      setImageData(image);

    });
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upper}>
       
       <Bold label='Add Banner' color='white'/>
      </View>

      <View style={styles.lower}>
        
      <TouchableOpacity style={styles.touchableStyle} onPress={() => imageFromGallery()}>
            <Row style={styles.innerData}>
              <ImageSvg/>
              <Bold label={'Upload image'} style={styles.itemMargin} size={12} />
            </Row>
          </TouchableOpacity>
        
        {
            imageData!=null?
            <Image
            resizeMode="contain"
            style={{
              width: '90%',
              height: mvs(300),
              borderRadius: 20,
              borderWidth: 3,
              borderColor: 'darkblue',
            }}
            source={{
              uri: imageData?.path,
            }}
          /> :null
        }

        

       <PrimaryButton label='Upload' color={'white'} height={40} width={70}
       onclick={uploadMedia} loading={loading}/>
      </View>
      
    </SafeAreaView>
  );
};
export default AddMedia;