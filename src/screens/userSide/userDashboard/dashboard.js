import React, { useEffect, useState } from 'react';
import {
    View, Text, Image, Touchable,
    TouchableOpacity, BackHandler, FlatList, Linking,
    Animated
} from 'react-native';
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
import { Banner, FeeStudent, Logout, Messenger, School, SchoolIcon, SchoolWhite, Speaker, StudentDegree, ThreeDotsWhite } from '../../../assets/svgs';
import notifee from '@notifee/react-native';
import LinearGradient from 'react-native-linear-gradient';
import PrimaryButton from '../../../components/core/button';
import Boxes from '../../../components/appComponents/boxes';
import Modal from 'react-native-modal';
import Label from '../../../components/core/Label';
import Iconimp from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';


const DashBoard = ({ navigation }) => {


    const scaleValue = new Animated.Value(0);
    const [schoolData, setSchoolData] = useState('loading..');
    const [classData, setClassData] = useState([]);
    const [modalIsDelete, setModalIsDelete] = useState(false);
    const [modalLogout, setModalLogout] = useState(false);
    const [banners, setBanners] = useState();
    const [isBanners, setIsBanners] = useState(true);
    const [version, setVersion] = useState();
    const [isGuest, setIsGuest] = useState(false);
    const [dataFee, setDataFee] = useState(null);
    const [showFee, setshowFee] = useState(false);
    //  console.log('global class = ', global?.class);
    const sid = global?.user?.sid;
    const cid = global?.user?.cid


    const animateScale = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };




    useEffect(() => {

        checkGuestOrNot();
        getVersion();
        getBanners();
        if (!isGuest) {
            // console.log('not a guest', isGuest);
            getClass();
            getFeeDetail();
        }


        animateScale();
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

    const getFeeDetail = async () => {

        let data = null;
        await firestore()
            .collection('fee')
            .where('studentId', '==', global?.user?.system_id)
            .get()
            .then(querySnapshot => {
                if (querySnapshot.size > 0) {
                    querySnapshot.forEach(documentSnapshot => {

                        setDataFee(documentSnapshot.data());

                        changeDate(documentSnapshot?.data()?.dueDate);
                    });
                } else {

                    console.log('no data found', data);
                }
            });
    }

    const changeDate = (serial) => {

        //const currentDate = 'oo'+ new Date().getTime();
        const today = new Date();
        const currentMonth = today.getMonth() + 1;
        const currentDate = today.getDate();


        const excelEpoch = new Date(Date.UTC(1900, 0, 1)); // Start date in UTC
        const jsDate = new Date(excelEpoch.getTime() + (serial - 2) * 86400000); // Subtract 2 to account for the leap year bug and correct days

        let date = jsDate;
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1; // Months are zero-based in JavaScript
        const year = date.getUTCFullYear();




        // Ensure the day and month are always two digits
        const dayString = day < 10 ? `0${day}` : day;
        const monthString = month < 10 ? `0${month}` : month;

        const monthName = getMonthName(monthString);

        let newDate = dayString + ' - ' + monthName + ' - ' + year;
        setDataFee(prevData => ({
            ...prevData, // Spread the previous state
            dueDate: newDate // Update the name property
        }));


        if (currentMonth > month || currentDate > day) {
            setshowFee(false);
        }
    }

    const getMonthName = (monthDigit) => {
        // console.log('ddddd =', monthDigit);

        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        // console.log('month nm');

        return months[parseInt(monthDigit, 10) - 1];
    };

    const getClass = async () => {

        // console.log('cid = ', cid);
        await firestore()
            .collection('class')
            .where('id', '==', cid)
            .get()
            .then(querySnapshot => {
                if (querySnapshot.size > 0) {
                    querySnapshot.forEach(documentSnapshot => {
                        console.log(documentSnapshot.data().CName.split('-'));
                        setClassData(documentSnapshot.data().CName.split('-'))
                        global.class = documentSnapshot.data().CName.split('-');

                    });
                } else {
                    // Alert.alert('no data found');
                }
            });
    }

    const checkGuestOrNot = async () => {
        const jsonValue = await AsyncStorage.getItem('userLogin');
        const myObject = JSON.parse(jsonValue);
        // console.log(myObject);

        if (myObject == null) {
            setIsGuest(true)
        }
        else {
            setIsGuest(false)
        }

    }
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



                } else {
                    setIsBanners(false);
                    console.log('no data found', data);
                }
            });
    }

    const getBanners = async () => {

        let banners = [];
        await firestore()
            .collection('media')
            .get()
            .then(querySnapshot => {
                if (querySnapshot.size > 0) {
                    querySnapshot.forEach(documentSnapshot => {
                        console.log(documentSnapshot.data());
                        banners.push(documentSnapshot.data())

                    });

                    setBanners(banners)
                } else {
                    // setIsBanners(false);
                    //console.log('no data found', data);
                }
            });
    }


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
                    borderRadius: 10,
                    margin: mvs(10),
                }}
                source={{
                    uri: item.banner,
                }}
            />
        )


    }

    const onMessengerClick = () => {
        if (isGuest) {
            navigation.navigate('Login');
            Toast.show('please login first')
        }

        else {
            navigation.navigate('Messenger')

        }

    }

    const onAnnouncementClick = () => {

        if (isGuest) {
            navigation.navigate('Login');
            Toast.show('please login first')
        }

        else {
            navigation.navigate('Announcement');


        }
    }
 

    const onSkansSchoolList = () => {
        navigation.navigate('SkansSchoolList');
    }

    const onFeeChalan = () => {
        if (isGuest) {
            navigation.navigate('Login');
            Toast.show('please login first')
        }

        else {
            if (showFee == true)
                navigation.navigate('Chalan');
            else
                navigation.navigate('Chalan');
            // Toast.show('Fee Date is over')



        }
    }

    const onPayFee = () => {
        Linking.openURL('https://skans.pk/onlinepayments/challans.php');
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
                    {isGuest ?
                        <Bold label={'Guest User'} color={'white'} size={20} /> :
                        <>
                            <Bold label={global?.school?.SchoolName} color={'white'} size={13} />
                            <Bold label={global?.user?.name} color={'white'} size={15} style={styles.name} />
                        </>

                    }
                    {isGuest ?
                        <TouchableOpacity onPress={() => logout()}>
                            <Bold label='Login?' color='white' />
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => setModalLogout(true)}>
                            <Icon name="logout" size={25} color="white" />
                        </TouchableOpacity>
                    }


                    {/* <Icon name="bus-school" size={30} color="#900" /> */}
                </Row>
                {isGuest ?
                    null :
                    <Row style={styles.SchoolStyle1}>
                        <Row style={{ width: '30%', alignItems: 'center' }}>
                            <Bold label={'class'} color={'white'} size={16} />

                            <Bold label={classData[0] + '-' + classData[1]} color={'white'} size={16} />
                        </Row>
                        <Row style={{ width: '30%', alignItems: 'center' }}>
                            <Bold label={'section'} color={'white'} size={16} />
                            <Bold label={classData[2]} color={'white'} size={16} />
                        </Row>

                    </Row>
                }


                {
                    isBanners ?
                        <FlatList
                            style={styles.banner}
                            horizontal
                            data={banners}
                            renderItem={renderBanners}
                        /> :
                        <Banner />
                }
                {/* {
                    version != 8 ?
                        <View style={styles.version}>
                            <Iconimp name="label-important" size={25} color={colorsTheme.primary} />
                            <Label label='Please Update , new version is available' style={styles.version} />
                        </View>
                        : null
                } */}
                {/* <MarqueeText
                    style={{ fontSize: 24 }}
                    speed={1}
                    marqueeOnStart={true}
                    loop={true}
                    delay={2000}

                >
                    <Bold label='Welcome back students! Have a great school year see u happy! we are going to arrange a wellcome party for freshers , wait for our plan thanks stay tune' color='white' size={22} />
                </MarqueeText> */}
                {

                }
                {
                    showFee ?
                        <View style={styles.feeDescription}>

                            <Row style={styles.rwFee} >
                                <Bold label={'Amount'} size={12} color='white' />
                                <Bold label={dataFee?.amount} style={{ marginHorizontal: 10 }} size={12} color='white' />
                                <Bold label={'due Date'} size={12} color='white' />
                                <Bold label={dataFee?.dueDate} style={{ marginHorizontal: 20 }} size={12} color='white' />

                            </Row>



                        </View> : null
                }
            </LinearGradient>
            <View style={styles.body}>

                <Row style={styles.rowIcon}>





                    <TouchableOpacity style={styles.menuActionView}
                        onPress={onMessengerClick}
                    >
                        <View style={styles.roundButton}>
                            <Messenger />
                        </View>
                        <Bold label='Messenger' size={11} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuActionView}
                        onPress={onAnnouncementClick}
                    >

                        <View style={styles.roundButton}>
                            <Speaker />
                        </View>
                        <Bold label='Announcement' size={11} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuActionView} onPress={onFeeChalan}
                    >
                        <View style={styles.roundButton}>
                            <FeeStudent />
                        </View>
                        <Bold label='fee Chalan' size={11} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuActionView} onPress={onSkansSchoolList}
                    >
                        <View style={styles.roundButton}>
                            <SchoolWhite />
                        </View>
                        <Bold label='SKANS SCHOOLS' size={11} />
                    </TouchableOpacity>






                </Row>
                <TouchableOpacity style={styles.menuActionView} onPress={onPayFee}
                >
                    <View style={styles.roundButton}>
                        <Speaker />
                    </View>
                    <Bold label='Pay fee' size={11} />
                </TouchableOpacity>

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