import { StyleSheet } from "react-native";
import {mvs} from '../../../services/metrices';
import { colorsTheme } from "../../../services/color";
const styles=StyleSheet.create({
    main:{
        flex:1
    },
    upper:{
            flex:1.5,backgroundColor:colorsTheme.primary,
            borderBottomRightRadius:mvs(35),borderBottomLeftRadius:mvs(35),
            justifyContent:'center',alignItems:'center',paddingTop:mvs(20)
    },
    body:{
        flex:3,marginHorizontal:mvs(10)
    },
    rw:{
        width:'100%', marginVertical:mvs(20),justifyContent:'space-around'
    },
    boxes:{
        width:'40%',backgroundColor:colorsTheme.primary,height:mvs(150),borderRadius:20,
        justifyContent:'center',alignItems:'center'
    },
    SchoolStyle:{
        marginTop:mvs(30), alignItems:'center'
    },
    deleteModal:{
        height:mvs(200),width:'80%',backgroundColor:'white',
        borderRadius:10,padding:mvs(20),alignItems:'center',justifyContent:'center'
      },
      yessNo:{
        width:'40%',alignItems:'center',backgroundColor:colorsTheme.primary,marginHorizontal:mvs(10),marginTop:mvs(10),borderRadius:5,
        marginTop:mvs(30),height:mvs(40),justifyContent:'center'
      }
})
export {styles};