import React, { useRef } from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';

export default function MyWebView() {
  const webViewRef = useRef(null);

   

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
      
        source={{ uri: 'http://58.65.172.36/parentslogin/login.aspx' }}
      
        style={{ flex: 1 }}
        
      />
    </View>
  );
}
