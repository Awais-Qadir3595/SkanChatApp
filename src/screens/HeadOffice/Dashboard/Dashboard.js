import React, { useEffect, useState } from 'react';
import { View, Text, Image, Touchable, TouchableOpacity, BackHandler, FlatList } from 'react-native';
import { styles } from './style';
import Row from '../../../components/core/Row';
import Bold from '../../../components/core/bold';
import { colorsTheme } from '../../../services/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { mvs } from '../../../services/metrices';
import { Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import MarqueeText from 'react-native-marquee';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AddPost, Banner, Logout, Messenger, PostSvg, School, SchoolIcon, Speaker, StudentDegree, ThreeDotsWhite, ViewPost } from '../../../assets/svgs';
import notifee from '@notifee/react-native';
import LinearGradient from 'react-native-linear-gradient';
import PrimaryButton from '../../../components/core/button';
import Boxes from '../../../components/appComponents/boxes';
import Modal from 'react-native-modal';
import Label from '../../../components/core/Label';

const DashBoard = ({ navigation }) => {

    const [schoolData, setSchoolData] = useState('loading..');
    const [modalIsDelete, setModalIsDelete] = useState(false);
    const [modalLogout, setModalLogout] = useState(false);
    const [banners, setBanners] = useState();
    //console.log('global', global?.user);
    const sid = global?.user?.sid;
    //console.log('sid====',sid);




    useEffect(() => {
        getData();
        getBanners();
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

    }, [])


    const getBanners = async () => {
        let data = [];
        await firestore()
            .collection('media')
            .get()
            .then(querySnapshot => {
                if (querySnapshot.size > 0) {
                    querySnapshot.forEach(documentSnapshot => {
                        //console.log(documentSnapshot.data());
                        data.push(documentSnapshot.data())

                    });
                    setBanners(data)
                } else {
                   console.log('no data found');
                }
            });
    }
    const getData = async () => {
        await firestore()
            .collection('schools')
            .where('sid', '==', sid)
            .get()
            .then(querySnapshot => {
                if (querySnapshot.size > 0) {
                    querySnapshot.forEach(documentSnapshot => {
                        // console.log(documentSnapshot.data());

                        setSchoolData(documentSnapshot.data());
                    });
                } else {
                    Alert.alert('no data found');
                }
            });
    };

    const logout = async () => {

        try {
            await AsyncStorage.removeItem('userLogin');
            navigation.navigate('Login');
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
            );
            console.log('Removed object');
        } catch (error) {
            console.error(`Error removing object with key`, error);
        }
    };

    const renderBanners = ({ item }) => {
        console.log('innnn');
        console.log(item);
        return (

            <Image
            resizeMode="contain"
            style={{
              height: mvs(200),
              width: 300,
             borderRadius:10,
              margin: mvs(10),
            }}
            source={{
              uri: item.banner,
            }}
          />


        )
    }

    const onAddPost = () => {
        navigation.navigate('AddPostHeadOffice')
    }

    const onAnnouncementClick = () => {
        navigation.navigate('Announcement');
    }

    const onStudentPortalClick = () => {
        navigation.navigate('StudentPortal');

    }
    return (
        <View style={styles.main}>



            <LinearGradient
                style={styles.upper}
                colors={['darkblue', 'darkblue', 'rgba(0,212,255,1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1.4 }}>


                <Row style={styles.SchoolStyle}>

                    <Bold label={schoolData?.SchoolName} color={'white'} size={20} />
                    <TouchableOpacity onPress={() => setModalLogout(true)}>
                        <Icon name="logout" size={25} color="white" />
                    </TouchableOpacity>

                    {/* <Icon name="bus-school" size={30} color="#900" /> */}
                </Row>

                <FlatList
                    style={styles.banner}
                    horizontal
                    data={banners}
                    renderItem={renderBanners}
                />
                 
            </LinearGradient>
            <View style={styles.body}>

                <Row style={styles.rowIcon}>
                    <TouchableOpacity style={styles.menuActionView} onPress={onAddPost}>
                        <View style={styles.roundButton}>
                            <AddPost height={30} width={30}/>
                        </View>
                        <Bold label='Add Post' size={12} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuActionView} onPress={onAnnouncementClick}>
                        <View style={styles.roundButton}>
                            <ViewPost height={30}  width={30}/>
                        </View>
                        <Bold label='View Posts' size={12} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuActionView}  >
                        <View style={styles.roundButton}>
                            <School  width={30}/>
                        </View>
                        <Bold label='Schools' size={12} />
                    </TouchableOpacity>

                    

                    {/* <TouchableOpacity style={styles.menuActionView} onPress={onStudentPortalClick}>
                        <View style={styles.roundButton}>
                            <StudentDegree />
                        </View>
                        <Bold label='student Portal' size={12} />
                    </TouchableOpacity> */}


                    <TouchableOpacity style={styles.menuActionView} >
                        {/* <TouchableOpacity style={styles.roundButton}>
                            <Speaker/>
                        </TouchableOpacity>
                        <Bold label='Announcement' size={12}/> */}
                    </TouchableOpacity>

                </Row>


            </View>


            <Modal
                isVisible={modalIsDelete}
                onBackButtonPress={() => setModalIsDelete(false)}
                onBackdropPress={() => setModalIsDelete(false)}
                backdropOpacity={0.7}>
                <View style={styles.deleteModal}>
                    <Bold label="Do you want to logout?" />
                    <Row style={{ alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>
                        <PrimaryButton label='Yes' height={mvs(45)} width={'40%'} color={'white'}
                            onclick={() => logout()} />

                        <PrimaryButton label='No' height={mvs(45)} width={'40%'} color={'white'}
                            onclick={() => setModalIsDelete(false)} />
                    </Row>
                </View>
            </Modal>

            {/* logout modal */}

            <Modal
                style={{ alignSelf: 'center' }}
                isVisible={modalLogout}
                onBackButtonPress={() => setModalLogout(false)}
                onBackdropPress={() => setModalLogout(false)}
                backdropOpacity={0.7}>
                <View style={styles.deleteModal}>
                    <Row style={styles.logoutModal}>
                        <Logout style={{ marginHorizontal: 10 }} />
                        <Bold label="Do you want to logout?" />

                    </Row>
                    <Row style={{ alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>
                        <PrimaryButton label='Yes' height={mvs(45)} width={'40%'} color={'white'}
                            onclick={() => logout()} />

                        <PrimaryButton label='No' height={mvs(45)} width={'40%'} color={'white'}
                            onclick={() => setModalLogout(false)} />
                    </Row>
                </View>
            </Modal>



        </View>
    );
};
export default DashBoard;
