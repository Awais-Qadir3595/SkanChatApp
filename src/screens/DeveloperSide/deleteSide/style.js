import { StyleSheet } from "react-native";
import {mvs} from '../../../services/metrices';
import { colorsTheme } from "../../../services/color";
const styles=StyleSheet.create({
    main:{
        flex:1
    },
    upper:{
            flex:1.5,backgroundColor:colorsTheme.primary,
            borderBottomRightRadius:mvs(50),borderBottomLeftRadius:mvs(50),
            justifyContent:'center',alignItems:'center'
    },
    body:{
        flex:1,marginHorizontal:mvs(10),marginTop:mvs(20)
    },
    rw:{
        width:'100%', marginVertical:mvs(20),justifyContent:'space-around'
    },
    boxes:{
        width:'40%',backgroundColor:colorsTheme.primary,height:mvs(150),borderRadius:20,
        justifyContent:'center',alignItems:'center',padding:mvs(5)
    },
    SchoolStyle:{
        marginTop:mvs(30), 
    }
})
export {styles};