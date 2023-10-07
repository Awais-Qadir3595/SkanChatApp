import React, { } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { mvs } from 'config/metrices';
import { colors } from 'config/colors';

const TextArea = ({placeHolder='Write Comment',onChange,style,linesCount=20}) => {

    return (
        <TextInput 
            onChangeText={onChange}
            placeholder={placeHolder}
            placeholderTextColor={colors.lightgrey1}
            multiline
            numberOfLines={linesCount}
            style={{...styles.container,...style}}
         />
    );
}
const styles = StyleSheet.create({
    container:{
        height:mvs(220),
        ...colors.shadow,backgroundColor:colors.white,
        borderRadius:mvs(15),color:colors.black,
        paddingHorizontal:mvs(20),paddingTop:mvs(13),
        textAlignVertical:'top',
        marginTop:mvs(25)
    },
    
});
export default TextArea;