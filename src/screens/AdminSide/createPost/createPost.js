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
import { ImageSvg, PdfSvg, PostSvg } from '../../../assets/svgs';
import Row from '../../../components/core/Row';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';
import { WebView } from 'react-native-webview';


const CreatePost = props => {
  useEffect(() => {
    getClasses();
  }, []);

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [listOfToken, setListOfToken] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [classes, setClasses] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  
  const getClasses = () => {
    //console.log(global.user);
    //get all the classes on basis of sid
    firestore()
      .collection('class')
      .where('sid', '==', global?.user?.sid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          const list = [];
          querySnapshot.forEach(documentSnapshot => {
            list.push(documentSnapshot.data());
          });

          const newList = list.map(item => ({ ...item, checked: false }));

          setClasses(newList);
        } else {
          Toast.show('no class found');
        }
      });
  };

  const toggleCheckBox = (item, index) => {
    var arr = [...classes];
    arr[index].checked = !arr[index].checked;
    setClasses(arr);
  };

  const uploadImage = async (uri, name) => {
    const reference = storage().ref(name);
    const pathToFile = uri;

    await reference.putFile(pathToFile);
    const url = await storage().ref(name).getDownloadURL();
    return url;
  };

  const handlePost = async () => {

    setLoading(true);
    if (message == '' && imageData == null && pdfUrl == null) {
      Toast.show('please enter a message..');
      return;
    }


    let imgUri = null;
    let pdfUri = null;
    let pdfName = null;

    if (imageData != null) {
      let path = imageData.path.split('/').pop().split('.')[0];

      imgUri = await uploadImage(imageData.path, path);
    }
    const notificationClassId = [];

    if (pdfUrl != null) {
      pdfUri = await uploadPdf();
      pdfName = pdfUrl[0].name;
      // console.log('after return ==============',pdfUrl);
      // console.log(pdfUri);
    }
    let check = false;

    //map function for all checked classes
    classes.map(async item => {
      setLoading(true);
      if (item.checked) {
        check = true;
        notificationClassId.push(item.id);

        setLoading(true);
        let id = 'id-' + new Date().getTime();
        let post = message;
        let sid = global?.user?.sid;
        let cid = item.id;
        var date = new Date();
        let isAdmin = true;

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
            imgUri,
            pdfUri,
            pdfName

          })
          .then(() => {
            setLoading(false);

            notifyEveryUser(notificationClassId);
            props.navigation.navigate('AdminDashBoard');
            //SendNotification(props?.route?.params?.item?.token,msgToSend,'skan school system');

            setLoading(false);
            setMessage('');
            Toast.show('post created');

          });
      }
    });
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

  const uploadPdf = async () => {
    try {
      // console.log('pdfUrl = ', pdfUrl[0]);
      const name = pdfUrl[0].name;
      const uri = pdfUrl[0].fileCopyUri;
      // console.log('name = ', name);
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


  const notifyEveryUser = async data => {
    try {
      let tokens = [];
      // item contain classIds
      // Create an array of Promises for Firestore queries
      const queryPromises = data.map(async item => {
        const querySnapshot = await firestore()
          .collection('user')
          .where('cid', '==', item)
          .get();

        const querySnapshot2 = await firestore()
          .collection('user')
          .where('id', '==', item)
          .get();

        const arr1 = [];
        querySnapshot.forEach(documentSnapshot => {
          arr1.push(documentSnapshot.data()?.token);
        });

        const arr2 = [];
        querySnapshot2.forEach(documentSnapshot => {
          arr2.push(documentSnapshot.data()?.token);
        });
        const combinedArr = [...arr1, ...arr2];
        tokens.push(...combinedArr);




        return combinedArr; // Resolve the promise with the array of tokens
      });

      // Wait for all Firestore queries to complete
      await Promise.all(queryPromises);



      tokens.forEach(async item => {
        SendNotification(item, message);
      });
    } catch (error) {
      console.error(error);
    }
  };



  const renderClasses = ({ item, index }) => {


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

  const documentPicker = async () => {
    var a = null;
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory',
      });

      console.log(res);


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
        <PostSvg />
        {/* <Image
          source={require('../../../assets/images/skan2.png')}
          style={{borderRadius: 90, height: mvs(120), width: mvs(120)}}
        /> */}
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
          <TouchableOpacity style={styles.innerData}  onPress={() => imageFromGallery()}>
          
              <ImageSvg />
              <Bold label={'Image'} style={styles.itemMargin} size={12} />
            
          </TouchableOpacity>

          <TouchableOpacity style={styles.innerData} onPress={documentPicker}>
            
              <PdfSvg />
              <Bold label=' Documents' style={styles.itemMargin} size={12} />
           
          </TouchableOpacity>


        </Row>

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
            <View style={{ flex: 1 }}>
              <WebView
                source={{
                  uri: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`,
                }}
                style={{ width: '100%' }}
              />
            </View> : null
        }

        <Bold
          style={{ margin: mvs(10) ,}}
          label="Please select the classes with whom you want to share the post."
        />
        <FlatList
          style={{ marginTop: mvs(20) }}
          numColumns={2}
          columnWrapperStyle={{
            marginBottom: 15,
            justifyContent: 'space-between',
          }}
          data={classes}
          renderItem={renderClasses}
          keyExtractor={(item, index) => index.toString()}
        />

        <PrimaryButton
          label="Save"
          bgColor={colorsTheme.primary}
          width={'25%'}
          color={'white'}
          height={mvs(40)}
          style={{ alignSelf: 'flex-end',margin:10 }}
          onclick={handlePost}
          loading={loading}
        />
      </View>
    </View>
  );
};
export default CreatePost;