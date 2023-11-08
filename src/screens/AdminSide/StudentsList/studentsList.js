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

const StudentList = (props) => {
  const [usersList, setUsersList] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [userShow, setUserShow] = useState();
  const [showUserIndex, setShowUserIndex] = useState();
  const [isNoData, setIsNoData] = useState(false);
  const [modalIsDelete, setModalIsDelete] = useState(false);
  const focus = useIsFocused();



  useEffect(() => {
 
    getUsers();
  }, [focus]);

  const getUsers = () => {
    firestore()
      .collection('user')
      .where('role', '==', 'User')
      .where('sid', '==', global?.user?.sid)
      .where('cid', '==', props?.route?.params?.id)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          
          const list = [];
          querySnapshot.forEach(documentSnapshot => {
           
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
  const nextChatScreen = (item, index) => {
     props?.navigation?.navigate('ChatScreen',{item,check:'Management'})
  };
  const renderList = ({item, index}) => {
    // console.log('index = ',index);
    return (
      <TouchableOpacity onPress={() => nextChatScreen(item, index)}>
        <Row style={styles.rw}>
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
    );
    }
 
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
            <Bold label="Students List" size={27} />
            <TouchableOpacity>
              <ThreeDots style={styles.icons} />
            </TouchableOpacity>
          </Row>

          <FlatList
            data={usersList}
            renderItem={renderList}
            keyExtractor={(item, index) => index.toString()}
          />
          
       
        </>
      )}
    </View>
  );
};
export default StudentList;
