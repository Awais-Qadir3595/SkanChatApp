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
        flex:3,marginHorizontal:mvs(10)
    },
    rw:{
        width:'100%', marginVertical:mvs(10),justifyContent:'space-around'
    },
    boxes:{
        backgroundColor:colorsTheme.primary, borderRadius:20,
        justifyContent:'center',alignItems:'center',
        padding:10
    },
    SchoolStyle:{
        marginTop:mvs(30), 
    }
})
export {styles};