import React from "react";
import { TouchableOpacity ,StyleSheet,ActivityIndicator,Text} from "react-native";
 
import { mvs } from "../../services/metrices";
//import { useTheme } from "../config/theme";

const PrimaryButton=({onclick,label='',color,width,height,style,bgColor,loading})=>{

    


    return(
           <TouchableOpacity style={{...styles.main,width:width,height:height,backgroundColor:bgColor,...style}} onPress={onclick}
           disabled={loading}>
{loading?
    <ActivityIndicator size={'small'} color={'white'} />:
    <Text style={{color:color}}>{label}</Text>
}
           
           </TouchableOpacity>
    )
}
export default PrimaryButton;
const styles=StyleSheet.create({
    main:{
        backgroundColor:'#20D994', justifyContent:'center',alignItems:'center',borderRadius:mvs(10),marginVertical:mvs(20),
        

    }
})