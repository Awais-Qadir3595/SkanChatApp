import React from "react";
import {View, Text, Touchable, TouchableOpacity,StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { mvs } from "../../services/metrices";
import { StudentsIcon } from "../../assets/svgs";
import Bold from "../core/bold";
import * as SVG from '../../assets/svgs';

const Boxes=({label,onClick,icon})=>{
    const Icon = SVG[icon];
    return(
        <TouchableOpacity onPress={onClick} style={styles.btn}>

 
        <LinearGradient   colors={['darkblue' , 'rgba(0,212,255,1)']} 
         start={{ x: 0, y: 0 }} end={{ x: 0.5, y: 1.5 }}
       style={styles.gradient}>
         {Icon ? <Icon /> : null}
            <Bold label={label} color={'white'} size={18} />

             
        </LinearGradient>
        
        </TouchableOpacity>
    )
}
export default Boxes;

const styles=StyleSheet.create({
 btn:{
    width:'40%', alignItems:'center',height:mvs(150), borderRadius:7,
    elevation:20,shadowColor:'black',shadowOpacity:3
 },
 gradient:{justifyContent:'space-evenly',alignItems:'center',height:mvs(150),width:'100%',borderRadius:7, 
 },
 border:{
    position:'absolute', 
 }
})