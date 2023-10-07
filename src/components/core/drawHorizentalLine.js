import { mvs } from "../../services/metrices";
import React from "react";
import {StyleSheet,View} from "react-native";
 
const DrawHorizentalLine=({ style})=>{
    return(
           
            <View style={{...styles.main,...style}}>
               
            </View>
          
    )
}
export default DrawHorizentalLine;
const styles=StyleSheet.create({
    main:{borderBottomColor:'black',alignItems:'center',borderBottomWidth:1,marginVertical:mvs(10),width:'100%' }
    
})