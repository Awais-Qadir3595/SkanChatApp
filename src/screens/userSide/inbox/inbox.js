import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  Touchable,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import styles from './style';
import Row from '../../../components/core/Row';
import Bold from '../../../components/core/bold';
import PrimaryTextInput from '../../../components/core/PrimaryTextInput';
import { mvs } from '../../../services/metrices';
import Label from '../../../components/core/Label';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SchoolIcon, StarBlue, StarYellow, ThreeDots } from '../../../assets/svgs';
import Modal from 'react-native-modal';
import DrawHorizentalLine from '../../../components/core/drawHorizentalLine';
import firestore from '@react-native-firebase/firestore';
import { saveData } from '../../main';
import { CommonActions } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import { colorsTheme } from '../../../services/color';
import { WebView } from 'react-native-webview';


const Inbox = ({ navigation }) => {
  const [messageList, setMessageList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [fullImageModal, setFullImageModal] = useState(false);
  const [fullImageUrl, setFullImageUrl] = useState();
  const [fullPdfModal, setFullPdfModal] = useState(false);
  const [fullPdfUrl, setFullPdfUrl] = useState();

  const [isColor, setColor] = useState(false);
  let unRead = [];
  const now = new Date();
  const currentTime = firestore.Timestamp.fromDate(now);
  let v = currentTime.toDate();
  const [schoolName, setSchoolName] = useState('');
  var unreadMessages = [];
  const dateObject = new Date(dateObject);

  useEffect(() => {
    getMsgList();
    getSchoolName();
    changeToRead();


  }, []);

  const getMsgList = () => {
    console.log('/////////--------------------------------/////////////////')
    firestore()
      .collection('chat')
      .where('receiverId', '==', global?.user?.id)

      .onSnapshot(querySnapshot => {
        if (querySnapshot.size > 0) {
          const list = [];
          querySnapshot.forEach(documentSnapshot => {
            console.log(documentSnapshot.data());
            list.push(documentSnapshot.data());
          });
          list.reverse();
          setMessageList(list);
          unreadMessages = list.filter(message => message.read == false);
          //  console.log('-------------unRead msgs------------');
          // console.log(unreadMessages);
        } else {
          Toast.show('no data found');
        }
      });
  };

  const changeToRead = async list => {
    firestore()
      .collection('chat')
      .where('receiverId', '==', global?.user?.id)
      .where('read', '==', false)
      .get()
      .then(querySnapshot => {
        //  console.log(querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          firestore()
            .collection('chat')
            .doc(documentSnapshot.data()?.id)
            .update({
              read: true,
            })
            .then(() => {
              console.log('User updated!');
            });
        });
      });
  };

  const properties = () => {
    setModalVisible(true);
  };

  const Logout = async () => {
    try {
      await AsyncStorage.removeItem('userLogin');
      global.user = '';
      navigation.navigate('Login');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        }),
      );
      //console.log('Removed object' );
    } catch (error) {
      //console.error(`Error removing object with key: ${userData}`, error);
    }
  };

  const getSchoolName = async () => {
    await firestore()
      .collection('schools')
      .where('sid', '==', global?.user?.sid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(documentSnapshot => {
            // console.log(documentSnapshot.data().SchoolName);

            setSchoolName(documentSnapshot.data().SchoolName);
          });
        } else {
          Alert.alert('no data found');
        }
      });
  };

  const openImage = (url) => {
  
    setFullImageUrl(url);
    setFullImageModal(true);
  }

  const openFullPdf = item => {
    setFullPdfModal(true);
    setFullPdfUrl(item.pdfUri);
  };


  const renderList = ({ item }) => {
    // console.log(item);
    const _seconds = item?.time?.seconds;
    const _nanoseconds = item?.time?.nanoseconds;

    // Convert the timestamp to a JavaScript Date object
    const timestamp = new Date(_seconds * 1000 + _nanoseconds / 1000000);

    // Extract the date and time components
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

    return (
      <View
        style={[
          styles.rw,
          {
            backgroundColor: item.read ? 'white' : '#EFF6F4',
            borderWidth: item.read ? 0 : 2,
            borderColor: item.read ? 'white' : '#DFE0FA',
          },
        ]}>
        {item?.isAdmin ? (
          <Row style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
            <StarYellow style={{ marginRight: mvs(10) }} />
            <Bold
              label="School Management"
              size={12}
              color={colorsTheme.primary}
            />
          </Row>
        ) : (
          <Row style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
            <StarBlue style={{ marginRight: mvs(10) }} />
            <Bold label="class Teacher" size={12} color={colorsTheme.primary} />
          </Row>
        )}
        <View style={styles.desc}>
          {item.imgUri ? (
            <TouchableOpacity onPress={() => openImage(item.imgUri)}>
              <Image
                resizeMode="stretch"
                style={{
                  height: mvs(200),
                  width: 200,
                  backgroundColor: 'white',
                  width: '100%',
                  marginBottom: mvs(10),
                }}
                source={{
                  uri: item.imgUri,
                }}
              />
            </TouchableOpacity>
          ) : item.pdfUri ?
            (


              <TouchableOpacity

                onPress={() => openFullPdf(item)}
                style={{ borderWidth: 1, marginVertical: mvs(4) }}>

                <WebView
                  source={{
                    uri: `https://docs.google.com/gview?embedded=true&url=${item.url}`,
                  }}
                  style={{ height: 150, width: '100%' }}
                />
                <Label
                  label={item.pdfName}
                  style={{ backgroundColor: 'darkblue', padding: 4 }}
                  color="white"
                />
              </TouchableOpacity>

            ) : null}



          <Bold label={item?.message} />
          <View style={{ marginTop: mvs(20), alignSelf: 'flex-end' }}>
            <Label label={date} color="gray" size={12} />
            <Label label={timeResult} color="gray" size={12} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <Row style={styles.headerRow}>
        <Row
          style={{
            marginVertical: mvs(10),
            
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Image
            style={styles.img}
            source={require('../../../assets/images/user.png')}
          />
          <Bold
            label={global?.user?.name}
            style={{ marginHorizontal: mvs(10) }}
            size={18}
          />
        </Row>
        <Row
        style={{
      
          alignItems: 'center',
        }}>
        <SchoolIcon
        style={{
          marginHorizontal: mvs(10),
        }}/>
        <Bold label={schoolName} size={15} />
        </Row>
      

      </Row>
      <Bold label={'Messenger'} size={15} color={colorsTheme.primary} style={styles.heading} />


      <FlatList
        data={messageList}
        renderItem={renderList}
        keyExtractor={(item, index) => index.toString()}
      />


      {/* logout modal */}

      <Modal
        isVisible={modalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            height: mvs(200),
            width: '40%',
            backgroundColor: 'white',
            alignItems: 'center',
            paddingTop: mvs(10),
          }}>
          <TouchableOpacity onPress={() => Logout()}>
            <Bold label="Logout" size={20} />
          </TouchableOpacity>
          <DrawHorizentalLine style={{ width: '90%' }} />
        </View>
      </Modal>

      {/*       
image modal */}

      <Modal
        isVisible={fullImageModal}
        onBackButtonPress={() => setFullImageModal(false)}
        onBackdropPress={() => setFullImageModal(false)}>
        <View style={{ flex: 1 }}>
          <Image
            resizeMode="contain"
            style={{ height: '100%', backgroundColor: 'black', width: '100%' }}
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
        <View style={{ flex: 1 }}>
          <WebView
            source={{
              uri: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(fullPdfUrl)}`,
            }}
            style={{ width: '100%' }}
          />
        </View>
      </Modal>
    </View>
  );
};
export default Inbox;
