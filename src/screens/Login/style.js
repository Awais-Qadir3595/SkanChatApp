import { StyleSheet } from "react-native";
import { mvs } from "../../services/metrices";
const styles=StyleSheet.create({
    container:{
        flex:1, 
    },
    upper :{
          flex:5,  backgroundColor:'darkblue',padding:mvs(10),borderBottomRightRadius:30,borderBottomLeftRadius:30
    },
    lower:{
        flex:7, alignItems:'center',marginTop:mvs(20),paddingHorizontal:mvs(20)
    },
    signUpStyle:{
        marginLeft:mvs(10), marginTop:mvs(10)
    }
    
      
    
})

export default styles;