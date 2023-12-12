import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import styles from './style';
import Row from '../../../components/core/Row';
import Bold from '../../../components/core/bold';
import {ThreeDots} from '../../../assets/svgs';
import {Alert} from 'react-native';
import Modal from 'react-native-modal';
import PrimaryButton from '../../../components/core/button';
import {colorsTheme} from '../../../services/color';
import {mvs} from '../../../services/metrices';
import Clipboard from '@react-native-clipboard/clipboard';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
// import Label from '../../../components/core/Label';
import Label from '../../../components/core/Label'

const ViewSchools = () => {
  
  const [usersList, setUsersList] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [userShow, setUserShow] = useState();
  const [showUserIndex, setShowUserIndex] = useState();
  const [userCredientials, setUserCredientials] = useState();
  const [modalIsDelete, setModalIsDelete] = useState(false);

  const focus = useIsFocused();
  useEffect(() => {
    getSchool();
  }, []);

  const getSchool = async () => {
    await firestore()
      .collection('schools')
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          const list = [];
          querySnapshot.forEach(documentSnapshot => {
            list.push(documentSnapshot.data());
          });
          setUsersList(list);
        } else {
          Toast.show('no data found');
        }
      });
  };

  const getUserNamePasswd = async item => {
    await firestore()
      .collection('user')
      .where('role', '==', 'Admin')
      .where('sid', '==', item?.sid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(documentSnapshot => {
             
            setUserCredientials(documentSnapshot.data());
          });
           
        } else {
          Toast.show('no userName Password');
        }
      });
  };
  const toggleModal = (item, index) => {
    console.log('=------==', item);
    setShowUserIndex(index);
    getUserNamePasswd(item);
    setUserShow(item);
    setModalVisible(!modalVisible);
  };

  const renderList = ({item, index}) => {
    //console.log('index = ',item);
    return (
      <TouchableOpacity onPress={() => toggleModal(item, index)}>
        <Row style={styles.rw}>
          <View>
            <Image
              style={styles.img}
              source={require('../../../assets/images/user.png')}
            />
          </View>
          <View style={styles.desc}>
            <Bold label={item.SchoolName} />
          </View>
        </Row>
      </TouchableOpacity>
    );
  };
  const copyPaste = async () => {
    console.log('----', userShow);
    var userObj = {
      userName: userCredientials?.gmail,
      password: userCredientials?.password,
    };

    await Clipboard.setString(JSON.stringify(userObj));
    Toast.show('Copied');
  };

  const deleteSchool = async item => {
     

    await firestore()
      .collection('schools')
      .doc(item?.sid)
      .delete()
      .then(async () => {
        await deleteFromUser(item?.sid);
        await deleteclasses(item?.sid);
        await deletePosts(item?.sid);
        await deleteChat(item?.sid);

        setModalIsDelete(false);
        let arr = [];
        arr = [...usersList];
        arr.splice(showUserIndex, 1);
        setUsersList(arr);
        setModalVisible(false);
      });
  };

  const deleteFromUser = async id => {
    console.log('-----in user---', id);
    

    var arr = [];
    await firestore()
      .collection('user')
      .where('sid', '==', id)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(documentSnapshot => {
            arr.push(documentSnapshot.data());
          });
        } else {
          Toast.show('no data found');
        }
      });
      
    arr.map(item => {
      firestore()
        .collection('user')
        .doc(item.id)
        .delete()
        .then(async () => {
         
        });
    });
  };

  const deleteChat = async id => {
    //console.log('-----in chat-----', id);
   

    var arr = [];
    await firestore()
      .collection('chat')
      .where('sid', '==', id)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(documentSnapshot => {
            
            arr.push(documentSnapshot.data());
          });
        } else {
        }
      });

    arr.map(item => {
      firestore()
        .collection('chat')
        .doc(item.id)
        .delete()
        .then(async () => {
          //console.log('deleted======================');
          //Toast.show('deleted')
        });
    });
  };
  const deleteclasses = async id => {
    console.log('-----in classes-----', id);
   

    var arr = [];
    await firestore()
      .collection('class')
      .where('sid', '==', id)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(documentSnapshot => {
            
            arr.push(documentSnapshot.data());
          });
        } else {
        }
      });

    arr.map(item => {
      firestore()
        .collection('class')
        .doc(item.id)
        .delete()
        .then(async () => {
          //console.log('deleted======================');
          //Toast.show('deleted')
        });
    });
  };

  const deletePosts = async id => {
    console.log('-----in Posts-----', id);
     

    var arr = [];
    await firestore()
      .collection('post')
      .where('sid', '==', id)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(documentSnapshot => {
           
            arr.push(documentSnapshot.data());
          });
        } else {
        }
      });

    arr.map(item => {
       
      firestore()
        .collection('post')
        .doc(item?.id)
        .delete()
        .then(async () => {
           console.log('post Deleted');
        });
    });
  };

  const deleteToggle = item => {
    setModalIsDelete(true);
  };
  return (
    <View style={styles.main}>
      {usersList == '' ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={colorsTheme.primary} />
        </View>
      ) : (
        <>
          <Row>
            <Bold label="Schools" size={27} />
            <TouchableOpacity>
              <ThreeDots style={styles.icons} />
            </TouchableOpacity>
          </Row>

          <FlatList
            data={usersList}
            renderItem={renderList}
            keyExtractor={(item, index) => index.toString()}
          />
          <Modal
            isVisible={modalVisible}
            onBackButtonPress={() => setModalVisible(false)}
            onBackdropPress={() => setModalVisible(false)}
            backdropOpacity={0.3}>
            <View style={styles.modal}>
              <View>
                <Row style={styles.rwModal}>
                  <View style={{width: '30%'}}>
                    <Bold label="Name" />
                  </View>
                  <View style={{width: '50%'}}>
                    <Bold label={userShow?.SchoolName} color={'black'} />
                  </View>
                </Row>
                <Row style={styles.rwModal}>
                  <View style={{width: '30%'}}>
                    <Bold label="UserName" />
                  </View>
                  <View style={{width: '50%'}}>
                    <Bold label={userCredientials?.gmail} />
                  </View>
                </Row>
                <Row style={styles.rwModal}>
                  <View style={{width: '30%'}}>
                    <Bold label="Password" />
                  </View>
                  <View style={{width: '50%'}}>
                    <Bold label={userCredientials?.password} />
                  </View>
                </Row>
                <Row style={styles.rwModal}>
                  <PrimaryButton
                    bgColor={colorsTheme.primary}
                    height={mvs(50)}
                    width={'30%'}
                    label="delete"
                    color={'white'}
                    onclick={() => deleteToggle(userShow)}
                  />
                  <PrimaryButton
                    bgColor={colorsTheme.primary}
                    height={mvs(50)}
                    width={'30%'}
                    label="Copy"
                    color={'white'}
                    onclick={copyPaste}
                  />
                </Row>
              </View>
            </View>
          </Modal>

          <Modal
            isVisible={modalIsDelete}
            onBackButtonPress={() => setModalIsDelete(false)}
            onBackdropPress={() => setModalIsDelete(false)}
            backdropOpacity={0.7}>
            <View style={styles.deleteModal}>
              <Bold label="Do You Want To Delete School Parmanantly ?" />
              <Row>
                <TouchableOpacity
                  style={styles.yessNo}
                  onPress={() => deleteSchool(userShow)}>
                  <Label label="Yess" color="white" size={14} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.yessNo}>
                  <Label label="No" color="white" size={16} />
                </TouchableOpacity>
              </Row>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};
export default ViewSchools;
