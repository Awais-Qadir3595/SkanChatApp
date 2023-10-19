import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import styles from './style';
import Row from '../../../components/core/Row';
import Bold from '../../../components/core/bold';
import {ThreeDots} from '../../../assets/svgs';
import { Alert } from 'react-native';

const ViewUsers = () => {
  const [usersList, setUsersList] = useState('');

  useEffect(() => {
    // console.log(global.user);
    getUsers();
  }, []);
  const getUsers = () => {
    firestore()
      .collection('user')
      .where('role', '==', 'User')
      .where('sid', '==', global?.user?.sid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          const list = [];
          querySnapshot.forEach(documentSnapshot => {
            list.push(documentSnapshot.data());
          });
          setUsersList(list);
        } else {
          Alert.alert('no data found');
        }
      });
  };
  const renderList = ({item}) => {
    console.log(item);
    return (
      <TouchableOpacity >
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
  };
  return (
    <View style={styles.main}>
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
    </View>
  );
};
export default ViewUsers;
