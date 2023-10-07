import { StyleSheet } from "react-native";
import { mvs } from "../../services/metrices";
const styles=StyleSheet.create({
    main:{
        flex:1,margin:10, 
    },
 
    img:{
        height:40,width:40,borderRadius:30
      },
      rw:{
        justifyContent:'flex-start',alignItems:'center',marginVertical:mvs(5),borderBottomColor:'lightgray',borderBottomWidth:1,
        paddingVertical:mvs(10)
      },
      desc:{
        marginLeft:mvs(20)
      },
      Options:{
          marginLeft:mvs(80)
      },
      icons:{
        marginHorizontal:mvs(10)
      },
      msgReceived:{
        width:'70%',backgroundColor:'lightblue',padding:mvs(5),borderRadius:10,marginVertical:mvs(5)
      },
      msgSend:{
        backgroundColor:'navajowhite',width:'70%',marginVertical:mvs(5),borderRadius:10,padding:mvs(5),
        alignSelf:'flex-end'
      },
      input:{
         borderWidth:1,width:'60%',borderRadius:20,backgroundColor:'white'
      },
      rwLast:{
        position:'absolute',bottom:0,width:'100%',alignItems:'center'
      },
      msgView:{
                 paddingBottom:mvs(180),
      },
      modal:{
        
      }
    
      
    
})

export default styles;