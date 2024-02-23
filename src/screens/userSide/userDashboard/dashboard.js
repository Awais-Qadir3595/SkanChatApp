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
import { Banner, Logout, Messenger, School, Speaker, ThreeDotsWhite } from '../../../assets/svgs';
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

    console.log('global', global?.user);
    const sid = global?.user?.sid;
    //console.log('sid====',sid);

    const bannerList = [
        { id: 0, name: 'banner' },
        { id: 1, name: 'banner2' }
    ]


    useEffect(() => {
        getData();

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

    const ViewUsers = () => {
        navigation.navigate('ViewClasses')
    }
    const addUsers = () => {
        navigation.navigate('AddClass');
    };

    const addPost = () => {

        navigation.navigate('CreatePost', schoolData)
    }

    const ListOfClasses = () => {
        navigation.navigate('ListOfClasses')
    }

    const renderBanners = ({ item }) => {


        return (

            <Banner />


        )
    }

    const onMessengerClick = () => {
        navigation.navigate('Messenger')
    }

    const onAnnouncementClick = () => {
        navigation.navigate('Announcement');
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
                    data={bannerList}
                    renderItem={renderBanners}
                />
                <MarqueeText
                    style={{ fontSize: 24 }}
                    speed={1}
                    marqueeOnStart={true}
                    loop={true}
                    delay={1000}
                >
                    <Bold label='Welcome back students! Have a great school year see u happy!' color='white' size={22} />
                </MarqueeText>
            </LinearGradient>
            <View style={styles.body}>

                <Row style={styles.rowIcon}>
                    <TouchableOpacity style={styles.menuActionView} onPress={onMessengerClick}>
                        <View style={styles.roundButton}>
                            <Messenger />
                        </View>
                        <Bold label='Messenger' size={12} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuActionView} onPress={onAnnouncementClick}>
                        <View style={styles.roundButton}>
                            <Speaker />
                        </View>
                        <Bold label='Announcement' size={12} />
                    </TouchableOpacity>

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
