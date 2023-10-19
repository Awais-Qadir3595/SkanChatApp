import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Modal from 'react-native-modal';
import CustomNotification from './customNotification';
  

export default function BackgroundMessageHandler() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  console.log('Mesmmmmmmmmmmmmmmmmm');

  useEffect(() => {
    const unsubscribe = messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);

      setNotificationMessage('A new message: ' + remoteMessage.data?.message);
      setModalVisible(true);
    });

    return unsubscribe;
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <Modal isVisible={isModalVisible}>
        <CustomNotification message={notificationMessage} onClose={closeModal} />
      </Modal>
    </View>
  );
}
