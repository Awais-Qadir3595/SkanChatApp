import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Text, View, ActivityIndicator, TouchableOpacity ,Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Posts from '../../../../components/appComponents/posts';
import Label from '../../../../components/core/Label';
import { styles } from './style';
import Bold from '../../../../components/core/bold';
import { mvs } from '../../../../services/metrices';
import { colorsTheme } from '../../../../services/color';
import Toast from 'react-native-simple-toast';
import { Touchable } from 'react-native';
import Modal from 'react-native-modal';
import Row from '../../../../components/core/Row';
import PrimaryButton from '../../../../components/core/button';
import { StarBlue, StarYellow } from '../../../../assets/svgs';
import { WebView } from 'react-native-webview';

const ViewPosts = props => {

  const [postsList, setPostList] = useState([]);
  const [isNoData, setIsNoData] = useState(false);
  const [modalPost, setModalPost] = useState(false);
  const [postToBeDelete, setPostToBeDelete] = useState();
  const [postIndex, setPostIndex] = useState();
  const [fullImageModal, setFullImageModal] = useState(false);
  const [fullImageUrl, setFullImageUrl] = useState();

  const [fullPdfModal, setFullPdfModal] = useState(false);
  const [fullPdfUrl, setFullPdfUrl] = useState();

  useEffect(() => {

    getPost();

  }, []);

  const openFullPdf = item => {
    setFullPdfModal(true);
    setFullPdfUrl(item.pdfUri);
  };

  const getPost = () => {
    console.log(props?.route?.params);
    firestore()
      .collection('post')
      .where('cid', '==', props?.route?.params?.id)
      .onSnapshot(querySnapshot => {
        if (querySnapshot.size > 0) {
          let size = querySnapshot.size;
          if (size > 0) {
            const list = [];
            querySnapshot.forEach(documentSnapshot => {
              list.push(documentSnapshot.data());
              // console.log(documentSnapshot.data().dateTime);
            });
            list.reverse();
            setPostList(list);
          }
        } else {
          //  console.log('no data');
          Toast.show('no data found');
          setIsNoData(true);
        }
      });
  };

  const ModalDeletePost = () => {

    firestore()
      .collection('post')
      .doc(postToBeDelete.id)
      .delete()
      .then(() => {
        let arr = [];
        arr = [...postsList];
        arr.splice(postIndex, 1)
        setPostList(arr);
        setModalPost(false);
        Toast.show('post Deleted')


      });
  }

  const openImage = (url) => {
  
    setFullImageUrl(url);
    setFullImageModal(true);
  }
  
  const longPressPost = (item, index) => {
    //console.log('he longed pressed',index);
    setPostToBeDelete(item);
    setModalPost(true);
    setPostIndex(index);
  }
  const renderList = ({ item, index }) => {
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
    console.log('=======',item);
    return (

      // <TouchableOpacity style={styles.rw} onLongPress={() => longPressPost(item, index)}>
      //   {item?.isAdmin ?
      //     <Row style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
      //       <StarYellow style={{ marginRight: mvs(10) }} />
      //       <Bold label='School Management' size={12} color={colorsTheme.primary} />

      //     </Row>
      //     :
      //     <Row style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
      //       <StarBlue style={{ marginRight: mvs(10) }} />
      //       <Bold label='class Teacher' size={12} color={colorsTheme.primary} />

      //     </Row>}
      //   <View style={styles.desc}>

      //     <Bold label={item.post} />
      //     <View style={{ marginTop: mvs(20), alignSelf: 'flex-end' }}>
      //       <Label label={date} color="gray" size={12} />
      //       <Label label={timeResult} color="gray" size={12} />
      //     </View>
      //   </View>
      // </TouchableOpacity>

      <TouchableOpacity style={styles.rw} onLongPress={() => longPressPost(item, index)}>
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
            <TouchableOpacity onPress={() => openImage(item.imgUri)}>
              <Image
                resizeMode="contain"
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
          
              : null}
              { item.pdfUri != null ?(
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
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.main}>
      {isNoData ? (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Bold label="No Data Found" />
        </View>
      ) : postsList == '' ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colorsTheme.primary} />
        </View>
      ) : (
        <FlatList
          data={postsList}
          renderItem={renderList}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      <Modal
        isVisible={modalPost}
        onBackButtonPress={() => setModalPost(false)}
        onBackdropPress={() => setModalPost(false)}
        backdropOpacity={0.3}>
        <View style={styles.modal}>
          <View>


            <View style={{ width: '100%', padding: mvs(10) }}>

              <Bold label="Do you want to delete this post ?" />
            </View>


            <Row style={styles.rwModal}>
              <PrimaryButton
                bgColor={colorsTheme.primary}
                height={mvs(40)}
                width={'30%'}
                label="delete"
                color={'white'}
                onclick={() => ModalDeletePost()}
              />
              <PrimaryButton
                bgColor={colorsTheme.primary}
                height={mvs(40)}
                width={'30%'}
                label="cancel"
                color={'white'}
                onclick={() => setModalPost(false)}
              />
            </Row>
          </View>
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
    </View>
  );
};
export default ViewPosts;