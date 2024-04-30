import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, Switch, FlatList, TouchableOpacity } from 'react-native';
import { styles } from './style';
import Bold from '../../../components/core/bold';
import { mvs } from '../../../services/metrices';
import PrimaryButton from '../../../components/core/button';
import { colorsTheme } from '../../../services/color';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';
import SendNotification from '../../../hooks/notification';
import messaging from '@react-native-firebase/messaging';
import CheckBox from 'react-native-check-box';
import LinearGradient from 'react-native-linear-gradient';
import Row from '../../../components/core/Row';
import { ImageSvg, PdfSvg } from '../../../assets/svgs';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';
import { WebView } from 'react-native-webview';

const AddPost = props => {


  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [listOfToken, setListOfToken] = useState();
  const [imageData, setImageData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfName, setPdfName] = useState(null);


  console.log('globalll---', global.user);


  const uploadImage = async (uri, name) => {
    const reference = storage().ref(name);
    const pathToFile = uri;

    await reference.putFile(pathToFile);
    const url = await storage().ref(name).getDownloadURL();
    return url;
  };

  const uploadPdf = async () => {
    try {
      // console.log('pdfUrl = ', pdfUrl[0]);
      const name = pdfUrl[0].name;
      const uri = pdfUrl[0].fileCopyUri;

      //console.log('name = ', name);
      // console.log('uri = ', uri);

      const reference = storage().ref(name);
      await reference.putFile(uri);

      const downloadURL = await reference.getDownloadURL();

      if (downloadURL != null) {
        setLoading(false);
        return downloadURL;
      }

      // Here, you can save the 'downloadURL' to your Firebase database or perform other operations.
    } catch (err) {
      // Error handling
      return -1;
    }
  };
  const handlePost = async () => {
setLoading(true);
 
    const notificationClassId = [];

    if (message == '' && imageData == null && pdfUrl == null) {
      Toast.show('please enter a message..');
      setLoading(false);
      return;
    }

    let imgUri = null;
    let pdfUri = null;
    let pdfName = null;

    if (imageData != null) {
      let path = imageData.path.split('/').pop().split('.')[0];

      imgUri = await uploadImage(imageData.path, path);
    }
if (pdfUrl != null) {
      pdfUri = await uploadPdf();
      pdfName = pdfUrl[0].name;
       
      
    }


    
    let id = 'id-' + new Date().getTime();
    let post = message;
    let sid = props?.route?.params?.sid;
    let cid = global?.user?.id;
    var date = new Date();
    let isAdmin = false;
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
        read: false,
        imgUri,
        pdfUri,
        pdfName
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

  const renderClasses = ({ item, index }) => {
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

  const imageFromGallery = () => {
    ImagePicker.openPicker({
      cropping: false,
    }).then(image => {
      setImageData(image);

    });
  };
  const documentPicker = async () => {
    var a = null;
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory',
      });
console.log('//////////////////////');
     
      setPdfName(res[0].name)


      setPdfUrl(res);

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        // console.error('Error picking PDF:', err);
      }
    }
  };

  return (
    <View style={styles.main}>
      <LinearGradient
        style={styles.upper}
        colors={['darkblue', 'darkblue', 'rgba(0,212,255,1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1.4 }}>
        <Image
          source={require('../../../assets/images/skan2.png')}
          style={{ borderRadius: 90, height: mvs(120), width: mvs(120) }}
        />
        <Bold
          label={props?.route?.params.SchoolName}
          color={'white'}
          size={20}
        />
      </LinearGradient>
      <View style={styles.body}>
        <TextInput
          style={styles.textInput}
          multiline={true}
          numberOfLines={4} // Adjust the number of lines as needed
          placeholder="Enter your text here."
          onChangeText={v => setMessage(v)}
          value={message}
        // Other props like onChangeText, value, etc. can be added here
        />


        <Row style={styles.imgpdfRow}>
          <TouchableOpacity style={styles.touchableStyle} onPress={() => imageFromGallery()}>
             
              <ImageSvg />
              <Bold label={'Upload Image'} style={styles.itemMargin} size={12} />
           
          </TouchableOpacity>

          <TouchableOpacity style={styles.touchableStyle} onPress={documentPicker}>
            
              <PdfSvg />
              <Bold label='Upload Documents' style={styles.itemMargin} size={12} />
            
          </TouchableOpacity>


        </Row>
<Row style={{alignItems:'center'}}>
        {
          imageData !== null ?
            <Image
              resizeMode="stretch"
              style={{
                width: '30%',
                height: mvs(100),
                borderRadius: 20,
                borderWidth: 3,
                borderColor: 'darkblue',
              }}
              source={{
                uri: imageData?.path,
              }}
            /> : null
        }

        {
          pdfUrl !== null ?
            <View style={{  backgroundColor:colorsTheme.primary,padding:10,width:'50%',alignSelf:'flex-end',
            borderRadius:5}}>
              {/* <WebView
                source={{
                  uri: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`,
                }}
                style={{ width: '100%' }}
              /> */}
              <Bold label={pdfName} color={'white'}  />
            </View> : null
        }

</Row>
        <PrimaryButton
          label="Save"
          bgColor={colorsTheme.primary}
          width={'25%'}
          color={'white'}
          height={mvs(40)}
          style={{ alignSelf: 'flex-end' }}
          onclick={handlePost}
          loading={loading}
        />
      </View>
    </View>
  );
};
export default AddPost;