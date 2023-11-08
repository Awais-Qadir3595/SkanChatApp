import React from 'react';
import { View, Text, Button } from 'react-native';

function CustomNotification({ message, onClose }) {
   // console.log('==------==',message)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ backgroundColor: 'white', padding: 20 }}>
        <Text>{message}</Text>
        <Button title="Close" onPress={onClose} />
      </View>
    </View>
  );
}

export default CustomNotification;
