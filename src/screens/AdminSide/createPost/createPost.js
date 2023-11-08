import React, {useEffect, useState} from 'react';
import {View, Text, Image, TextInput, Switch, FlatList} from 'react-native';
import {styles} from './style';
import Bold from '../../../components/core/bold';
import {mvs} from '../../../services/metrices';
import PrimaryButton from '../../../components/core/button';
import {colorsTheme} from '../../../services/color';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';
import SendNotification from '../../../hooks/notification';
import messaging from '@react-native-firebase/messaging';
import CheckBox from 'react-native-check-box';

const CreatePost = props => {
  useEffect(() => {
    getClasses();
  }, []);

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [listOfToken, setListOfToken] = useState();
  const [isChecked, setIsChecked] = useState(false);

  const [classes, setClasses] = useState([]);

  const getClasses = () => {
    //console.log(global.user);
    //get all the classes on basis of sid
    firestore()
      .collection('class')
      .where('sid', '==', global?.user?.sid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          const list = [];
          querySnapshot.forEach(documentSnapshot => {
            list.push(documentSnapshot.data());
          });

          const newList = list.map(item => ({...item, checked: false}));

          setClasses(newList);
        } else {
          Toast.show('no class found');
        }
      });
  };

  const toggleCheckBox = (item, index) => {
    var arr = [...classes];
    arr[index].checked = !arr[index].checked;
    setClasses(arr);
  };

  const handlePost = async () => {
    const notificationClassId = [];

    if (message == '') {
      Toast.show('please enter a message..');
      return;
    }
    let check = false;

    //map function for all checked classes
    classes.map(async item => {
      setLoading(true);
      if (item.checked) {
        check = true;
        notificationClassId.push(item.id);

        setLoading(true);
        let id = 'id-' + new Date().getTime();
        let post = message;
        let sid = global?.user?.sid;
        let cid = item.id;
        var date = new Date();
        let isAdmin=true;
        console.log(isAdmin,'---====---');
        await firestore()
          .collection('post')
          .doc(id)
          .set({
            sid,
            post,
            id,
            cid,
            dateTime: date,
            isAdmin,
          })
          .then(() => {
            setLoading(false);

            notifyEveryUser(notificationClassId);
            props.navigation.navigate('AdminDashBoard');
            //SendNotification(props?.route?.params?.item?.token,msgToSend,'skan school system');

            setLoading(false);
            setMessage('');
            Toast.show('post created');
          });
      }
    });
    if (!check) {
      console.log('check = ', check);
      Toast.show('please select any class ');
    }
  };

  const notifyEveryUser = async data => {
    try {
      let tokens = [];
// item contain classIds
      // Create an array of Promises for Firestore queries
      const queryPromises = data.map(async item => {
        const querySnapshot = await firestore()
          .collection('user')
          .where('cid', '==', item)
          .get();

          const querySnapshot2 = await firestore()
          .collection('user')
          .where('id', '==', item)
          .get();

        const arr1 = [];
        querySnapshot.forEach(documentSnapshot => {
          arr1.push(documentSnapshot.data()?.token);
        });

        const arr2 = [];
        querySnapshot2.forEach(documentSnapshot => {
          arr2.push(documentSnapshot.data()?.token);
        });
        const combinedArr = [...arr1, ...arr2];
        tokens.push(...combinedArr);


         

        return combinedArr; // Resolve the promise with the array of tokens
      });

      // Wait for all Firestore queries to complete
      await Promise.all(queryPromises);

      console.log('----+++++999009999----------', tokens.length);

      tokens.forEach(async item => {
        SendNotification(item, message, 'SKAN SCHOOL SYSTEM');
      });
    } catch (error) {
      console.error(error);
    }
  };

  //   const notifyEveryUser = async data => {
  //     //console.log('-----');
  //     let tokens=[];

  //     data?.map(async item => {

  //       await firestore()
  //       .collection('user')
  //       .where('cid', '==', item)

  //       .onSnapshot(querySnapshot => {
  //         let arr = [];

  //         querySnapshot.forEach(documentSnapshot => {

  //           tokens?.push(documentSnapshot.data().token);
  //         });

  //       });

  //     })

  // console.log('----+++++999009999----------',tokens);
  //     tokens?.map(async item => {

  //           SendNotification(
  //             item,
  //             message,
  //             'SKAN SCHOOL SYSTEM',
  //           );

  //     })

  //   };

  const renderClasses = ({item, index}) => {
    //console.log(item);

    return (
      <CheckBox
        style={{
          height: mvs(30),
          width: '30%',
          alignItems: 'center',
          marginHorizontal: mvs(20),
        }}
        onClick={() => toggleCheckBox(item, index)}
        isChecked={item.checked}
        leftText={item.CName}
      />
    );
  };
  return (
    <View style={styles.main}>
      <View style={styles.upper}>
        <Image
          source={require('../../../assets/images/skan2.png')}
          style={{borderRadius: 90, height: mvs(120), width: mvs(120)}}
        />
        <Bold
          label={props?.route?.params.SchoolName}
          color={'white'}
          size={20}
        />
      </View>
      <View style={styles.body}>
        <TextInput
          style={styles.textInput}
          multiline={true}
          numberOfLines={4} // Adjust the number of lines as needed
          placeholder="Enter your text here..."
          onChangeText={v => setMessage(v)}
          value={message}
          // Other props like onChangeText, value, etc. can be added here
        />

        <Bold
          style={{marginTop: mvs(10)}}
          label="Please Select Classes whome you want to show your post"
        />
        <FlatList
          style={{marginTop: mvs(20)}}
          numColumns={2}
          columnWrapperStyle={{
            marginBottom: 15,
            justifyContent: 'space-between',
          }}
          data={classes}
          renderItem={renderClasses}
          keyExtractor={(item, index) => index.toString()}
        />

        <PrimaryButton
          label="save"
          bgColor={colorsTheme.primary}
          width={'25%'}
          color={'white'}
          height={mvs(40)}
          style={{alignSelf: 'flex-end'}}
          onclick={handlePost}
          loading={loading}
        />
      </View>
    </View>
  );
};
export default CreatePost;
