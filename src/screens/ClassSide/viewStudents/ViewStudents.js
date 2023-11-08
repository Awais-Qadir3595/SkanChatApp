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
import {ThreeDots} from '../../../assets/svgs';
import {Alert} from 'react-native';
import Modal from 'react-native-modal';
import PrimaryButton from '../../../components/core/button';
import {colorsTheme} from '../../../services/color';
import {mvs} from '../../../services/metrices';
import Clipboard from '@react-native-clipboard/clipboard';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import Label from '../../../components/core/Label';

const ViewStudents = props => {
  const [usersList, setUsersList] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [userShow, setUserShow] = useState();
  const [showUserIndex, setShowUserIndex] = useState();
  const [isNoData, setIsNoData] = useState(false);
  const [modalIsDelete, setModalIsDelete] = useState(false);
  const focus = useIsFocused();

  useEffect(() => {
    console.log(' = = ', global?.user?.sid);
    getUsers();
  }, [focus]);

  const getUsers = () => {
    firestore()
      .collection('user')
      .where('role', '==', 'User')
      .where('sid', '==', global?.user?.sid)
      .where('cid', '==', global?.user?.id)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          console.log(querySnapshot.size);
          const list = [];
          querySnapshot.forEach(documentSnapshot => {
            console.log(documentSnapshot.data());
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

  const studentsPage = (item, index) => {
    props?.navigation?.navigate('ChatScreen', {item, check: 'Class'});
  };
  const renderList = ({item, index}) => {
    // console.log('index = ',index);
    return (
      <Row style={styles.rw}>
        <TouchableOpacity style={{flex:2,paddingVertical: mvs(10),}} onPress={() => studentsPage(item)}>
          <Row style={{alignItems: 'center',justifyContent:'flex-start',alignItems:'center'}}>
            <View>
              <Image
                style={styles.img}
                source={require('../../../assets/images/user.png')}
              />
            </View>
            <View style={styles.desc}>
              <Bold label={item.name} />
            </View>
          </Row>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.student}
          onPress={() => toggleModal(item, index)}>
          <Bold label={'Detail'} color="white" />
        </TouchableOpacity>
      </Row>
    );
  };
  const copyPaste = async () => {
    console.log('----', userShow);
    // var userObj={userName:userShow.gmail,password:userShow.password}
    var userCredentials = `Email : ${userShow.gmail}\n password : ${userShow.password}`;

    await Clipboard.setString(userCredentials);
    Toast.show(
      'userName : ' + userShow.gmail + '\n Password : ' + userShow.password,
    );
  };

  const deleteUser = async item => {
    // console.log(item);
    await firestore()
      .collection('user')
      .doc(item.id)
      .delete()
      .then(() => {
        let arr = [];
        arr = [...usersList];
        //console.log('length = ', arr.length);
        if (arr.length == 1) {
          setIsNoData(true);
        }
        arr.splice(showUserIndex, 1);
        setUsersList(arr);
        setModalVisible(false);
        setModalIsDelete(false);
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
            <Bold label="Messages" size={27} />
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
                  <View style={styles.linewise}>
                    <Bold label="Name" />
                  </View>
                  <View style={styles.linewise}>
                    <Bold label={userShow?.name} />
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
            </View>
          </Modal>
          <Modal
            isVisible={modalIsDelete}
            onBackButtonPress={() => setModalIsDelete(false)}
            onBackdropPress={() => setModalIsDelete(false)}
            backdropOpacity={0.7}>
            <View style={styles.deleteModal}>
              <Bold label="Do You want to delete this student ?" />
              <Row>
                <TouchableOpacity
                  style={styles.yessNo}
                  onPress={() => deleteUser(userShow)}>
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
export default ViewStudents;
