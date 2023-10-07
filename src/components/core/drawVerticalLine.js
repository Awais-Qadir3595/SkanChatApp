import { mvs } from "../services/metrices";
import React from "react";
import { StyleSheet,View} from "react-native";
 
const DrawVerticalLine=({ style})=>{
    return(
           
            <View style={{...styles.main,...style}}>
               
            </View>
          
    )
}
export default DrawVerticalLine;
const styles=StyleSheet.create({
    main:{borderLeftColor:'lightgray',alignItems:'center' ,borderLeftWidth:1,marginLeft:mvs(27),height:mvs(30), }
    
})