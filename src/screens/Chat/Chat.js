import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  Touchable,
  TouchableOpacity,
  FlatList,
  Alert,
  Text,
  ActivityIndicator,
  Dimensions,
  LogBox,
  PermissionsAndroid,
} from 'react-native';
import styles from './style';
import Row from '../../components/core/Row';
import Bold from '../../components/core/bold';
import {
  Audio,
  ThreeDots,
  Video,
  ImagePick,
  Tick,
  UnSeenTick,
} from '../../assets/svgs';
import {colorsTheme} from '../../services/color';

import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Label from '../../components/core/Label';
import PrimaryTextInput from '../../components/core/PrimaryTextInput';
import {mvs} from '../../services/metrices';
import PrimaryButton from '../../components/core/button';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import {saveData} from '../main';
import firestore from '@react-native-firebase/firestore';
import SendNotification from '../../hooks/notification';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';
import {WebView} from 'react-native-webview';
 
 


const ChatScreen = props => {
  let threadId = props?.route?.params?.threadId;
  var sender = global.user.id;
  var reciverId = props?.route?.params?.item?.id;

  const senderReceiver = [];
  senderReceiver.push(sender);
  senderReceiver.push(reciverId);

  const [loading, setLoading] = useState(false);
  const currentDate = new Date();
  const [msgToSend, setMsgToSend] = useState('');
  const [chatList, setChatList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [imageData, setImageData] = useState(null);
  const [fullImageModal, setFullImageModal] = useState(false);
  const [fullImageUrl, setFullImageUrl] = useState();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [fullPdfModal, setFullPdfModal] = useState(false);
  const [fullPdfUrl, setFullPdfUrl] = useState();
  const [thumbnails, setThumbnails] = useState();
  const flatListRef = useRef(null);
let fileUri='file:///data/user/0/com.chatapplication/cache/a3cacf3f-daf7-40b6-a8ee-0a2a42a0b12d/M.Ashiq-2.pdf'
  useEffect(() => {
    getChat();
  }, []);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({animated: true});
  }, [chatList]);

  const getChat = async () => {
    await firestore()
      .collection('chat')
      .where('receiverId', '==', props?.route?.params?.item?.id)
      .where('senderId', '==', global?.user?.id)
      .onSnapshot(querySnapshot => {
        if (querySnapshot.size > 0) {
          const arr = [];

          querySnapshot.forEach(documentSnapshot => {
            arr.push(documentSnapshot.data());
          });

          // arr.reverse();
          setChatList(arr);
        }
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
  const addChat = async () => {
     console.log('enter ---------------------------------------');
    setLoading(true);

    let imguri = null;
    let pdfUri = null;
    let pdfName=null;

    if (msgToSend == '' && imageData == null && pdfUrl == null) {
      setLoading(false);
      Toast.show('field is empty');
      return;
    }

    if (imageData != null) {
      // console.log('image data --------------------------------------');
      let path = imageData.path.split('/').pop().split('.')[0];

      imguri = await uploadImage(imageData.path, path);
    }

    if (pdfUrl != null) {
      pdfUri = await uploadPdf();
      pdfName=pdfUrl[0].name;
      // console.log('after return ==============',pdfUrl);
      // console.log(pdfUri);
    }

    setImageData(null);
    // setPdfUrl(null);
    let isAdmin = false;
    if (props?.route?.params?.check == 'Management') {
      isAdmin = true;
    } else {
      isAdmin = false;
    }

    const read = false;

    let chatId = 'id-' + new Date().getTime();

    let result = await saveData('chat', chatId, {
      id: chatId,
      message: msgToSend,
      receiverId: props?.route?.params?.item?.id,
      senderId: global?.user?.id,
      time: new Date(),
      isAdmin,
      read,
      sid: props?.route?.params?.item?.sid,
      imgUri: imguri,
      pdfUri: pdfUri,
      pdfName:pdfName
    });
    
    if (result) {
      
      setLoading(false);
      setMsgToSend('');
      setPdfUrl(null);
      SendNotification(props?.route?.params?.item?.token, msgToSend, 'SKAN');
    } else {
      Alert.alert('message could not sent');
      setLoading(false);
    }
  };
  const openFullImage = item => {
    setFullImageUrl(item.imgUri);
    setFullImageModal(true);
  };

  const openFullPdf = item => {
    setFullPdfModal(true);
    setFullPdfUrl(item.pdfUri);
  };
  const getTime = item => {
    const _seconds = item?.time?.seconds;
    const _nanoseconds = item?.time?.nanoseconds;
    const timestamp = new Date(_seconds * 1000 + _nanoseconds / 1000000);
    const date = timestamp.toLocaleDateString(); // Format: MM/DD/YYYY or DD/MM/YYYY, depending on your locale
    const time = timestamp.toLocaleTimeString(); // Format: HH:MM:SS AM/PM

    let month = timestamp.getMonth();

    let hours = timestamp.getHours();
    let minutes = timestamp.getMinutes();
    let seconds = timestamp.getSeconds();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    let timeResult = null;
    if (hours >= 12) {
      hours = hours % 12;
      if (hours < 10) {
        hours = '0' + hours;
      }
      timeResult = hours + ':' + minutes + ':' + seconds + ' : PM';
    } else {
      if (hours < 10) {
        hours = '0' + hours;
      }
      timeResult = hours + ':' + minutes + ':' + seconds + ' : AM';
    }

    var result = {
      time: timeResult,
      date: date,
    };
    return result;
  };
  const renderMsg = ({item}) => {
    var time = getTime(item);

    return (
      <>
        {item?.senderId == sender ? (
          <View style={{borderBottomColor: 'powderblue', borderBottomWidth: 1}}>
            <View style={styles.msgReceived}>
              {item.pdfUri ? (
                <TouchableOpacity
                  onPress={() => openFullPdf(item)}
                  style={{borderWidth: 1, marginVertical: mvs(4)}}>
              
                  <WebView
                    source={{
                      uri: `https://docs.google.com/gview?embedded=true&url=${item.url}`,
                    }}
                    style={{height: 150, width: '100%'}}
                  />
                  <Label
                    label={item.pdfName}
                    style={{backgroundColor: 'darkblue', padding: 4}}
                    color="white"
                  />
                </TouchableOpacity>
              ) : item.imgUri ? (
                <TouchableOpacity onPress={() => openFullImage(item)}>
                  <Image
                    resizeMode="stretch"
                    style={{
                      width: '80%',
                      height: mvs(200),
                      borderRadius: 20,
                      borderWidth: 3,
                      borderColor: 'darkblue',
                    }}
                    source={{
                      uri: item.imgUri,
                    }}
                  />
                </TouchableOpacity>
              ) : null}
              {item.message ? (
                <View
                  style={{
                    backgroundColor: '#cce6ff',
                    padding: mvs(10),
                    borderRadius: 10,
                  }}>
                  <Label label={item.message} />
                </View>
              ) : null}
              <View style={{alignItems: 'flex-end'}}>
                <Label label={time?.time} color="gray" size={12} />
                <Label label={time?.date} color="gray" size={12} />
              </View>

              {item.read ? (
                <Tick style={{alignSelf: 'flex-end'}} />
              ) : (
                <UnSeenTick style={{alignSelf: 'flex-end'}} />
              )}
            </View>
          </View>
        ) : (
          <View style={styles.msgSend}>
            <Label label={item.message} />
          </View>
        )}
      </>
    );
  };

  const properties = () => {
    setModalVisible(true);
  };
  const imageFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
    }).then(image => {});
  };
  const imageFromGallery = () => {
    ImagePicker.openPicker({
      cropping: false,
    }).then(image => {
      setImageData(image);
      setModalVisible(false);
    });
  };
  const onCross = () => {
    setPdfUrl(null);
  };

  const uploadImage = async (uri, name) => {
    const reference = storage().ref(name);
    const pathToFile = uri;

    await reference.putFile(pathToFile);
    const url = await storage().ref(name).getDownloadURL();
    return url;
  };

  const documentPicker = async () => {
    var a = null;
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory',
      });

       console.log(res);
      setModalVisible(false);
       
      setPdfUrl(res);
     
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        // console.error('Error picking PDF:', err);
      }
    }
  };

  // https://drive.google.com/viewerng/viewer?embedded=true&url={your pdf url}’
  return (
    <View style={styles.main}>
      <Row style={styles.rw}>
        <View>
          <Image
            style={styles.img}
            resizeMode="contain"
            source={require('../../assets/images/user.png')}
          />
        </View>
        <View style={styles.desc}>
          <Bold label={props?.route?.params?.item?.name} size={25} />
        </View>
        
        <View style={styles.Options}>
          <Row style={{alignItems: 'center'}}></Row>
        </View>
      </Row>

      <View style={styles.msgView}>
        <FlatList
          ref={flatListRef}
          data={chatList}
          renderItem={renderMsg}
          keyExtractor={(item, index) => index.toString()}
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd({animated: true});
          }}
        />
      </View>

      <View style={styles.rwLast}>
        {imageData !== null ? (
          <Image
            resizeMode="stretch"
            style={{
              width: '80%',
              height: mvs(200),
              borderRadius: 20,
              borderWidth: 3,
              borderColor: 'darkblue',
            }}
            source={{
              uri: imageData?.path,
            }}
          />
        ) : null}
        {pdfUrl !== null ? (
          <View
            style={{width: '100%',  backgroundColor: '#ecf2f9'}}>
            <Row
              style={{alignItems:'center',
                 borderWidth:1,
                 borderColor:'darkblue',
                 paddingVertical:10,
                paddingHorizontal: mvs(10),
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={() => onCross()}>
                <Icon name="close-thick" size={30} color="darkblue" />
              </TouchableOpacity>

              <Label
                label={pdfUrl[0].name}
                color="black"
                style={{marginHorizontal: 10}}
              />
            </Row>
            {/* <Image source={{ uri: thumbnails }} style={{height:200,width:200}} /> */}
            {/* <WebView
              source={{
               // uri:`https://drive.google.com/viewerng/viewer?embedded=true&url=${pdfUrl[0].fileCopyUri}`
              uri: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(fileUri)}`,
              // uri: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl[0].fileCopyUri)}`,
              }}
              onError={(error) => console.error('WebView error : ', error)
            }
              style={{height: 200, width: '100%'}}
            /> */}
          </View>
        ) : null}
        <Row style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <ImagePick />
          </TouchableOpacity>
          <PrimaryTextInput
            style={styles.input}
            placeholder="your message. . . "
            onChangeText={v => setMsgToSend(v)}
            inputValue={msgToSend}
          />
          <PrimaryButton
          height={mvs(45)}
          width={'17%'}
          onPress={() => addChat()}
          iconName={'send-outline'}
          iconColor='white'
          onclick={() => addChat()}
          loading={loading}
          />
          {/* <TouchableOpacity
            style={{
               
              width: '17%',
              backgroundColor: 'white',
              height: mvs(45),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: 'darkblue',
              backgroundColor: 'powderblue',
            }}
            onPress={() => addChat()}>
            {loading ? (
              <ActivityIndicator size="large" color={colorsTheme.primary} />
            ) : (
              <Icon name="send-outline" size={30} color="darkblue" />
            )}
          </TouchableOpacity> */}

          {/* <PrimaryButton
            label="send"
            bgColor={'teal'}
            height={40}
            width={60}
            color={'white'}
            onclick={() => addChat()}
            loading={loading}
          /> */}
        </Row>
      </View>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}>
        <View style={{justifyContent: 'center', alignItems: 'center',backgroundColor:"white",borderRadius:5,padding:mvs(20)}}>
          <View style={{padding:mvs(10)}}>
            <Label label='Please Select' size={20} />
          </View>


           


          <Row
            style={{
              padding:mvs(20),
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '100%',
              backgroundColor: 'lightblue',
              borderRadius: 20,
            }}>

            <TouchableOpacity
              style={{
                borderWidth: 1,
                height: mvs(40),
                justifyContent: 'center',
                alignItems: 'center',
                width: '45%',
                backgroundColor: 'white',
                borderRadius: 10,
              }}
              onPress={() => documentPicker()}>
                
              <Bold label="Document" />
           
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                height: mvs(40),
                justifyContent: 'center',
                alignItems: 'center',
                width: '45%',
                backgroundColor: 'white',
                borderRadius: 10,
              }}
              onPress={() => imageFromGallery()}>
              <Bold label="Gallery" />
            </TouchableOpacity>
          </Row>
        </View>
      </Modal>
      <Modal
        isVisible={fullImageModal}
        onBackButtonPress={() => setFullImageModal(false)}
        onBackdropPress={() => setFullImageModal(false)}>
        <View style={{justifyContent: 'center'}}>
          <Image
            resizeMode="stretch"
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: mvs(600),
              borderWidth: 2,
              borderColor: 'gray',
            }}
            source={{
              uri: fullImageUrl,
            }}
          />
        </View>
      </Modal>

      <Modal
        isVisible={fullPdfModal}
        onBackButtonPress={() => setFullPdfModal(false)}
        onBackdropPress={() => setFullPdfModal(false)}>
        <View style={{flex: 1}}>
          <WebView
            source={{
              uri: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(fullPdfUrl)}`,
            }}
            style={{width: '100%'}}
          />
        </View>
      </Modal>
    </View>
  );
};
export default ChatScreen;
