import React from "react";
import { StyleSheet,Text} from "react-native";

const Bold=({label='',size=16,style,color})=>{
    return(
           
            <Text style={{...styles.main,fontSize:size,color:color,...style}}>{label}</Text>
          
    )
}
export default Bold;
const styles=StyleSheet.create({
    main:{
        fontWeight:'bold',
    }
})