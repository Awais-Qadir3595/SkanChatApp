import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import styles from './style';
import Row from '../../../components/core/Row';
import Bold from '../../../components/core/bold';
import {Class, ThreeDots} from '../../../assets/svgs';
import {Alert} from 'react-native';
import Modal from 'react-native-modal';
import PrimaryButton from '../../../components/core/button';
import {colorsTheme} from '../../../services/color';
import {mvs} from '../../../services/metrices';
import Clipboard from '@react-native-clipboard/clipboard';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import Label from '../../../components/core/Label';

const ViewClasses = (props) => {
  const [usersList, setUsersList] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [userShow, setUserShow] = useState();
  const [showUserIndex, setShowUserIndex] = useState();
  const [isNoData, setIsNoData] = useState(false);
  const [modalIsDelete, setModalIsDelete] = useState(false);

  const focus = useIsFocused();
  useEffect(() => {
    // console.log(' = = ', global?.user?.sid);
    getClasses();
  }, [focus]);

  const getClasses = () => {
    firestore()
      .collection('user')
      .where('role', '==', 'Class')
      .where('sid', '==', global?.user?.sid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          //console.log(querySnapshot.size);
          const list = [];
          querySnapshot.forEach(documentSnapshot => {
           // console.log(documentSnapshot.data());
            list.push(documentSnapshot.data());
          });
          setIsNoData(false);
          setUsersList(list);
        } else {
          Toast.show('no data found');
          setIsNoData(true);
        }
      });
  };
  const toggleModal = (item, index) => {
    setShowUserIndex(index);
    setUserShow(item);
    setModalVisible(!modalVisible);
  };

  const studentsPage=(item)=>{
     
   // console.log('----',item);
    props.navigation.navigate('StudentList',item)
    
  }
  const renderList = ({item, index}) => {
   
    return (
       
        <Row style={styles.rw}>
           
          <Row  style={{alignItems:'center'}}>
            <Class />
            <View style={styles.desc}>
              <Bold label={item.CName} />
            </View>
          </Row>
           
          
          <TouchableOpacity style={styles.student} onPress={() => toggleModal(item, index)}>
            <Bold label={'Detail'} color='white'/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.student} onPress={() => studentsPage(item)}>
            <Bold label={'Students'}  color="white"/>
          </TouchableOpacity>
        </Row>
       
    );
  };
  const copyPaste = async () => {
    
    var userCredentials = `Email : ${userShow.gmail}\n password : ${userShow.password}`;
    await Clipboard.setString(userCredentials);
  };

  const deleteClass = async item => {
    setModalVisible(false);

    var arr = [];
    await firestore()
      .collection('user')
      .where('cid', '==', item.id)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(documentSnapshot => {
            arr.push(documentSnapshot.data());
          });
        } else {
        }
      });

    arr?.map(async item => {
      await firestore()
        .collection('user')
        .doc(item.id)
        .delete()
        .then(async () => {
          console.log('all users deleted');
        });
    });
    await deleteFromClass(item.id);
  };

  const deleteFromClass = async id => {
    await firestore()
      .collection('class')
      .doc(id)
      .delete()
      .then(async () => {
        console.log('delete class from class');
        await firestore()
          .collection('user')
          .doc(id)
          .delete()
          .then(async () => {
            console.log('delete class from users');

            var tempData = [...usersList];
            const index = tempData.findIndex(item => item.id === id);
            tempData.splice(index, 1);
            setUsersList(tempData);
            setModalIsDelete(false);
            getClasses();
            await deletePosts(id);
          });
      });
  };

  const deletePosts = async id => {
    var arr = [];
    await firestore()
      .collection('post')
      .where('cid', '==', id)
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
        .doc(item.id)
        .delete()
        .then(async () => {
          console.log('post deleted');
          setModalVisible(false);
        });
    });
  };
  return (
    <View style={styles.main}>
      {isNoData ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Bold label="No Data Found" />
        </View>
      ) : usersList == '' ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={colorsTheme.primary} />
        </View>
      ) : (
        <>
          <Row>
            <Bold label="Classes" size={27} />
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
              <Row style={styles.rwModal}>
                <View style={styles.linewise}>
                  <Bold label="Name" />
                </View>
                <View style={styles.linewise}>
                  <Bold label={userShow?.CName} />
                </View>
              </Row>
              <Row style={styles.rwModal}>
                <View style={styles.linewise}>
                  <Bold label="UserName" />
                </View>
                <View style={styles.linewise}>
                  <Bold label={userShow?.gmail} />
                </View>
              </Row>
              <Row style={styles.rwModal}>
                <View style={styles.linewise}>
                  <Bold label="Password" />
                </View>
                <View style={styles.linewise}>
                  <Bold label={userShow?.password} />
                </View>
              </Row>
              <Row style={styles.rwModal}>
                <PrimaryButton
                  bgColor={colorsTheme.primary}
                  height={mvs(40)}
                  width={'30%'}
                  label="delete"
                  color={'white'}
                  // onclick={() => deleteClass(userShow)}
                  onclick={() => setModalIsDelete(true)}
                />
                <PrimaryButton
                  bgColor={colorsTheme.primary}
                  height={mvs(40)}
                  width={'30%'}
                  label="Copy"
                  color={'white'}
                  onclick={copyPaste}
                />
              </Row>
            </View>
          </Modal>
          <Modal
            isVisible={modalIsDelete}
            onBackButtonPress={() => setModalIsDelete(false)}
            onBackdropPress={() => setModalIsDelete(false)}
            backdropOpacity={0.7}>
            <View style={styles.deleteModal}>
              <Bold label="It will delete all students and All Posts Related to this class, do you want to delete ?" />
              <Row>
                <TouchableOpacity
                  style={styles.yessNo}
                  onPress={() => deleteClass(userShow)}>
                  <Label label="Yess" color="white" size={14} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.yessNo}
                  onPress={() => setModalIsDelete(false)}>
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
export default ViewClasses;
