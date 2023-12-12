import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Button,ActivityIndicator ,Linking, Text,Animated,Easing} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';

const Test=()=> {

  //const audioFilePath = 'file:////data/user/0/com.chatapplication/cache/sound.mp4'; // Replace with your actual file path

  const [recordSecs, setRecordSecs] = useState(0);
  const [isRecording,setIsRecording]=useState(false);
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer());
  const sound = useRef(null);
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  const addRecordBackListener = useCallback((e) => {
    setRecordSecs(e.currentPosition);
  }, []);
  
  const generateFileName = () => {
    const date = new Date();
    return `sound_${date.getTime()}.mp4`; // Generate a unique file name using timestamp
  };

  useEffect(() => {
    audioRecorderPlayer.current.addRecordBackListener(addRecordBackListener);

    return () => {
      audioRecorderPlayer.current.removeRecordBackListener(addRecordBackListener);
    };
  }, [addRecordBackListener]);

  const onStartRecord = useCallback(async () => {
    try {
      let fileName=generateFileName();
      const result = await audioRecorderPlayer.current.startRecorder(fileName);
      setIsRecording(true);
      startPulseAnimation();
      console.log('recording start = ',result);
    } catch (error) {
      console.error('Error starting recorder:', error);
    }
  }, []);

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 0.7,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const stopPulseAnimation = () => {
    pulseAnimation.stopAnimation();
  };
  const onStopRecord = useCallback(async () => {
    try {
    
      const result = await audioRecorderPlayer.current.stopRecorder();
      audioRecorderPlayer.current.removeRecordBackListener();
      setRecordSecs(0);
      setIsRecording(false);
      stopPulseAnimation();
      console.log('recording stop = ',result);
    } catch (error) {
      console.error('Error stopping recorder:', error);
    }
  }, []);


  const playAudio = async () => {
    try {
      sound.current = new Sound(audioFilePath, '', (error) => {
        if (error) {
          console.error('Error loading sound:', error);
          return;
        }
        sound.current.play((success) => {
          if (success) {
            console.log('Audio played successfully');
          } else {
            console.error('Error playing audio');
          }
        });
      });
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };
   
  return (
    <View style={{flex:1,backgroundColor:'pink',justifyContent:'center',alignItems:'center'}}>
       <View style={{marginVertical:10}}>
       <Button onPress={()=>onStartRecord()} title='record'  />
       </View>

     
  
{
  isRecording?
  <View >
          <Animated.View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: 'blue', // Change color or use different styling
          transform: [{ scale: pulseAnimation }],
          marginBottom: 20,
        }}
      />
  </View>:null
}
  
   <View style={{marginVertical:10}}>
   <Button onPress={()=>onStopRecord()} title='exit'/>
   </View>

   <Button onPress={playAudio} title="Play Recorded Audio" />
    </View>
  );
}
export default Test;