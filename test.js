import React from "react";
import { View, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const Test = () => {
    return (
        <View style={{ flex: 1 }}>
            <WebView source={{ uri: 'http://58.65.172.36/parentslogin/login.aspx' }} />
        </View>
    );
};

export default Test;
