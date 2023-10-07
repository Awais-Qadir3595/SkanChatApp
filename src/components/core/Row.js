import React from "react";
import {StyleSheet,View} from "react-native";

const Row=({children,style})=>{
    return(
           
            <View style={{...styles.main,...style}}>
            {children}
            </View>
          
    )
}
export default Row;

const styles=StyleSheet.create({
    main:{flexDirection:'row',justifyContent:'space-between',}
    
})