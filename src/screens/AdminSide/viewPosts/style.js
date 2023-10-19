import {StyleSheet} from 'react-native';
import {mvs} from '../../../services/metrices';
import {colorsTheme} from '../../../services/color';
const styles = StyleSheet.create({
  main: {
    flex: 1,margin:mvs(10)
  },
 box:{
  width:'100%', marginVertical:mvs(10),padding:mvs(5),paddingVertical:mvs(10),
  borderWidth:1,borderColor:'lightgray',backgroundColor:'white',borderRadius:7
 },
 rw: {
     
  padding: mvs(10),
  marginVertical: mvs(20),
  borderRadius:6,backgroundColor:'white',elevation:3
},
desc: {
  marginLeft: mvs(20),
},
   
});
export {styles};
