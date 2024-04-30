import { StyleSheet } from "react-native";
import { mvs } from "../../services/metrices";
import { colorsTheme } from "../../services/color";
const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    upper :{
             backgroundColor:colorsTheme.primary, borderBottomRightRadius:30,borderBottomLeftRadius:30,padding:mvs(20)

    },
    lower:{
          alignItems:'center',marginTop:mvs(20),paddingHorizontal:mvs(20),justifyContent:'space-evenly',
    },
    signUpStyle:{
        marginLeft:mvs(10), marginTop:mvs(10)
    }
    
      
    
})

export default styles;