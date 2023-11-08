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
import Row from '../../../../components/core/Row';
import Bold from '../../../../components/core/bold';
import {Class, ThreeDots} from '../../../../assets/svgs';
import {Alert} from 'react-native';
import Modal from 'react-native-modal';
import PrimaryButton from '../../../../components/core/button';
import {colorsTheme} from '../../../../services/color';
import {mvs} from '../../../../services/metrices';
import Clipboard from '@react-native-clipboard/clipboard';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome5';
const ListOfClasses = props => {
  const [usersList, setUsersList] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [userShow, setUserShow] = useState();
  const [showUserIndex, setShowUserIndex] = useState();
  const [isNoData, setIsNoData] = useState(false);

  const focus = useIsFocused();
  useEffect(() => {
    //   console.log(' = = ',global?.user?.sid);
    getClasses();
  }, [focus]);

  const getClasses = () => {
    // console.log('id = ', global?.user?.sid);
    firestore()
      .collection('user')
      .where('role', '==', 'Class')
      .where('sid', '==', global?.user?.sid)
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
  const postView = (item, index) => {
    props?.navigation?.navigate('ViewPosts', item);
  };
  const renderList = ({item, index}) => {
    // console.log('index = ',index);
    return (
      <TouchableOpacity onPress={() => postView(item, index)}>
        <Row style={styles.rw}>
          <View>
            <Class />
            {/* <Image
              style={styles.img}
              source={require('../../../../assets/images/user.png')}
            /> */}
          </View>
          <View style={styles.desc}>
            <Bold label={item.CName} />
          </View>
        </Row>
      </TouchableOpacity>
    );
  };
  const copyPaste = async () => {
    console.log('----', userShow);
    var userObj = {userName: userShow.gmail, password: userShow.password};

    await Clipboard.setString(JSON.stringify(userObj));
  };

  const deleteUser = item => {
    console.log(item);
    firestore()
      .collection('user')
      .doc(item.id)
      .delete()
      .then(() => {
        let arr = [];
        arr = [...usersList];
        arr.splice(showUserIndex, 1);
        setUsersList(arr);
        setModalVisible(false);
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
            <Bold label="Classes" size={27} style={{marginBottom: mvs(10)}} />
            {/* <TouchableOpacity>
              <ThreeDots style={styles.icons} />
            </TouchableOpacity> */}
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
export default ListOfClasses;
