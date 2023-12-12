import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {mvs} from '../../services/metrices';
import LinearGradient from 'react-native-linear-gradient';
import Row from './Row';
//import { useTheme } from "../config/theme";

const PrimaryButton = ({
  onclick,
  label = '',
  color,
  width,
  height,
  style,
  bgColor,
  loading,
  disabled,
  iconName,
  iconColor='white',
}) => {
  console.log('.,.,', iconName);
  return (
    <TouchableOpacity
      style={{...styles.main, width: width, height: height, ...style}}
      onPress={onclick}>
      <LinearGradient
        style={{width: '100%', height: height, ...styles.main}}
        colors={['darkblue', 'darkblue', 'rgba(0,212,255,1)']}
        start={{x: 0, y: 0}}
        end={{x: 0.8, y: 1}}
        disabled={disabled}>
        <Row style={{alignItems: 'center'}}>
          {loading ? (
            <ActivityIndicator size={'small'} color={'white'} />
          ) : (
            <>
              {iconName != null ? (
                <Icon name={iconName} size={25} color={iconColor} />
              ) : null}
              <Text style={{color: color}}>{label}</Text>
            </>
          )}
        </Row>
      </LinearGradient>
    </TouchableOpacity>
  );
};
export default PrimaryButton;
const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: mvs(10),
    marginVertical: mvs(20),
  },
});
