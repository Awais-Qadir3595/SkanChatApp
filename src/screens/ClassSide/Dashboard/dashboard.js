import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Touchable,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {styles} from './style';
import Row from '../../../components/core/Row';
import Bold from '../../../components/core/bold';
import {colorsTheme} from '../../../services/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {mvs} from '../../../services/metrices';
import {Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CommonActions} from '@react-navigation/native';
import {AddStudent, StudentsIcon, ThreeDots} from '../../../assets/svgs';
import Boxes from '../../../components/appComponents/boxes';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Modal from 'react-native-modal';
import Label from '../../../components/core/Label';
import Iconimp from 'react-native-vector-icons/MaterialIcons'; 


const ClassDashboard = ({navigation}) => {
  const [schoolData, setSchoolData] = useState('loading..');
  const [classData, setClassData] = useState('loading..');
  const [options, setOption] = useState(false);
  const [version,setVersion]=useState();

  const sid = global?.user?.sid;
  console.log('...../////......', options);

  useEffect(() => {
    getVersion();
    getDataSchool();
  }, []);

  const getVersion = async () => {
    let data = [];
    await firestore()
      .collection('app_info')
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(documentSnapshot => {
            //console.log(documentSnapshot.data());
            data.push(documentSnapshot.data())

          });
          setVersion(data[0].version)
          console.log(data[0].version);


        } else {
          setIsBanners(false);
          console.log('no data found', data);
        }
      });
  }
  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        BackHandler.exitApp();

        return true;
      }

      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const getDataSchool = async () => {
    await firestore()
      .collection('schools')
      .where('sid', '==', sid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(documentSnapshot => {
            console.log(documentSnapshot.data());

            setSchoolData(documentSnapshot.data());
          });
        } else {
          Alert.alert('no School found');
        }
      });
  };

  const logout = async () => {
    console.log('mhr');
    try {
      await AsyncStorage.removeItem('userLogin');
      navigation.navigate('Login');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
      console.log('Removed object');
    } catch (error) {
      console.error(`Error removing object with key`, error);
    }
  };

  const toggleModalOptions = () => {
    setOption(!options);
  };
  const ViewStudents = () => {
    navigation.navigate('ViewStudents');
  };
  const addStudent = () => {
    navigation.navigate('AddStudent', schoolData);
  };

  const addPost = () => {
    navigation.navigate('AddPost', schoolData);
  };

  const ViewPosts = () => {
    navigation.navigate('ViewPosts');
    console.log('ye sary gham sada rehty nahi hen');
  
};
  return (
    <View style={styles.main}>
      <LinearGradient
        style={styles.upper}
        colors={['darkblue', 'darkblue', 'rgba(0,212,255,1)']}
        start={{x: 0, y: 0}}
        end={{x: 0.5, y: 1.4}}>
        <Image
          source={require('../../../assets/images/skan2.png')}
          style={{borderRadius: 90, height: mvs(120), width: mvs(120)}}
        />
        <View style={styles.SchoolStyle}>
          <Bold label={schoolData.SchoolName} color={'white'} size={20} />
          <Bold
            label={global?.user?.CName}
            color={'white'}
            size={16}
            style={{marginTop: mvs(10)}}
          />
        </View>
        {
                    version!=8?
                    <View style={styles.version}>
                         <Iconimp name="label-important" size={25} color={colorsTheme.primary} />
                    <Label label='Please Update , new version is available'   style={styles.version}/>
                    </View>
                    :null
                }
      </LinearGradient>
      <View style={styles.body}>
        <Row style={styles.rw}>
          <Boxes
            label={'Add Student'}
            icon={'AddStudent'}
            onClick={addStudent}
          />
          <Boxes
            label={'View Students'}
            icon={'StudentsIcon'}
            onClick={ViewStudents}
          />
        </Row>
        <Row style={styles.rw}>
          <Boxes label={'Add Post'} icon={'AddPost'} onClick={addPost} />
          <Boxes
            label={'View Posts'}
            icon={'ViewPost'}
            onClick={ViewPosts}
          />
        </Row>
      </View>
      <TouchableOpacity
        style={{position: 'absolute', top: 20, right: 10}}
        onPress={toggleModalOptions}>
        <Icon name="options-vertical" size={25} color="white" />
      </TouchableOpacity>

      <Modal
        isVisible={options}
        onBackButtonPress={() => toggleModalOptions()}
        onBackdropPress={() => toggleModalOptions()}
        backdropOpacity={0.7}>
        <View style={styles.ModalView}>
          <TouchableOpacity
            style={{
              width: '100%',
              borderBottomWidth: 1,
              borderBottomColor: 'lightgray',
              paddingVertical: mvs(10),
            }}
            onPress={logout}>
            <Row style={{width: '100%', justifyContent: 'space-evenly'}}>
              <Icon name="logout" size={25} color="darkblue" />
              <Label label={'Logout'} size={18} />
            </Row>
          </TouchableOpacity>
          
        </View>
      </Modal>
    </View>
  );
};
export default ClassDashboard;
