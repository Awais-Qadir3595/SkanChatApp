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
import Row from '../../components/core/Row';
import Bold from '../../components/core/bold';
import PrimaryTextInput from '../../components/core/PrimaryTextInput';
import { mvs } from '../../services/metrices';
import Label from '../../components/core/Label';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StarBlue, StarYellow, ThreeDots } from '../../assets/svgs';
import Modal from 'react-native-modal';
import DrawHorizentalLine from '../../components/core/drawHorizentalLine';
import firestore from '@react-native-firebase/firestore';
import { saveData } from '../main';
import { CommonActions } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import { colorsTheme } from '../../services/color';
import { WebView } from 'react-native-webview';

const Messages = ({ navigation }) => {
  const [messageList, setMessageList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const now = new Date();
  const currentTime = firestore.Timestamp.fromDate(now);
  let v = currentTime.toDate();
  const [schoolName, setSchoolName] = useState('');
  const currentTimestamp = new Date().getTime();
  const dateObject = new Date(dateObject);
  const [fullPdfModal, setFullPdfModal] = useState(false);
  const [fullPdfUrl, setFullPdfUrl] = useState();

  useEffect(() => {
    getPostList();
    getSchoolName();
  }, []);

  const popupRef = useRef(null);

  console.log(global?.user);
  const getPostList = () => {
    firestore()
      .collection('post')
      .where('cid', '==', global.user.cid)

      .onSnapshot(querySnapshot => {
        if (querySnapshot.size > 0) {
          const list = [];
          querySnapshot.forEach(documentSnapshot => {
            console.log(documentSnapshot.data());
            list.push(documentSnapshot.data());
          });
          list.reverse();
          setMessageList(list);
        } else {
          Toast.show('no data found');
        }
      });
  };


  const getUsersList = async () => {
    firestore()
      .collection('user')
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          const list = [];
          querySnapshot.forEach(documentSnapshot => {
            if (
              documentSnapshot.data().gmail == global?.user?.gmail &&
              documentSnapshot.data().password == global?.user?.password
            ) {
              // console.log('match',documentSnapshot.data());
            } else {
              // console.log('not  match',documentSnapshot.data());
              list.push(documentSnapshot.data());
            }
          });
          setMessageList(list);
        } else {
          Alert.alert('no data found');
        }
      });
  };



  const properties = () => {
    setModalVisible(true);
  };
  const getSchoolName = async () => {
    await firestore()
      .collection('schools')
      .where('sid', '==', global?.user?.sid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(documentSnapshot => {
            console.log(documentSnapshot.data().SchoolName);

            setSchoolName(documentSnapshot.data().SchoolName);
          });
        } else {
          Alert.alert('no data found');
        }
      });
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
  const getReceiverToken = async id => {
    return new Promise(async (resolve, reject) => {
      firestore()
        .collection('user')
        .where('id', '==', id)
        .get()
        .then(async querySnapshot => {
          let datokenFcm;

          if (querySnapshot.size > 0) {
            querySnapshot.forEach(documentSnapshot => {
              datokenFcm = documentSnapshot.data().token;
            });

            resolve(datokenFcm);
          } else {
            reject('not found');
          }
        });
    });
  };

  const startChat = async item => {
    let id = 'id-' + new Date().getTime();
    let token = await getReceiverToken(item.id);

    let senderReceiver = global?.user?.id + ',' + item?.id;
    let receiverSender = item?.id + ',' + global?.user?.id;
    let threadId;

    firestore()
      .collection('threads')
      .where('senderReceiver', 'in', [senderReceiver, receiverSender])
      .onSnapshot(querySnapshot => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach(documentSnapshot => {
            threadId = documentSnapshot.data().threadId;
            navigation.navigate('ChatScreen', { item, threadId, token });
          });
        } else {
          let result = saveData('threads', id, {
            sender: global.user.id,
            reciver: item.id,
            threadId: id,
            senderReceiver: senderReceiver,
          });
          if (result) {
          }
        }
      });

    return;
  };
  const openFullPdf = item => {
    setFullPdfModal(true);
    setFullPdfUrl(item.pdfUri);
  };
  const renderList = ({ item }) => {

    console.log('//////////////');
    console.log(item);

    const _seconds = item?.dateTime?.seconds;
    const _nanoseconds = item?.dateTime?.nanoseconds;

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
      <View style={styles.rw}>
        {item?.isAdmin ?
          <Row style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
            <StarYellow style={{ marginRight: mvs(10) }} />
            <Bold label='School Management' size={12} color={colorsTheme.primary} />

          </Row>
          : <Row style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
            <StarBlue style={{ marginRight: mvs(10) }} />
            <Bold label='class Teacher' size={12} color={colorsTheme.primary} />

          </Row>}
        <View style={styles.desc}>
          <Bold label={item?.post} />
          {
            item.imgUri != null ?
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
              /> : item.pdfUri != null ?(
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
              ):null

          }



          <View style={{ marginTop: mvs(20), alignSelf: 'flex-end', }}>
            <Label label={date} color="gray" size={12} />
            <Label label={timeResult} color="gray" size={12} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <Row style={{ alignItems: 'center' }}>
        <Bold label={'News Feed'} size={20} color={colorsTheme.primary} />
        <Bold label={schoolName} size={15} />
        <TouchableOpacity onPress={properties}>
          <ThreeDots style={styles.icons} />
        </TouchableOpacity>
      </Row>
      <Row style={{ marginVertical: mvs(20), marginHorizontal: mvs(20), justifyContent: 'flex-start', alignItems: 'center' }}>
        <Image
          style={styles.img}
          source={require('../../assets/images/user.png')}
        />
        <Bold label={global?.user?.name} style={{ marginHorizontal: mvs(15) }} size={18} />
      </Row>

      <FlatList
        data={messageList}
        renderItem={renderList}
        keyExtractor={(item, index) => index.toString()}
      />

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
export default Messages;