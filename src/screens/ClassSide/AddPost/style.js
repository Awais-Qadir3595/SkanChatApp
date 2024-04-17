import {StyleSheet} from 'react-native';
import {mvs} from '../../../services/metrices';
import {colorsTheme} from '../../../services/color';
const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding:mvs(10),
    backgroundColor:'white'
  },
  upper: {
    flex: 1.4,
    backgroundColor: colorsTheme.primary,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    
  },
  body: {
    flex: 3, backgroundColor:'white',marginTop:mvs(10)
  },
  textInput: {
    height:mvs(100),
    width:'90%',
    borderColor: colorsTheme.primary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    borderWidth:1,
    backgroundColor:'#f0f8ff',
    alignSelf:'center',
    
  },
  imgpdfRow: {
    margin: 10,


  },
  touchableStyle:{
    width:'50%'
 },
 innerData: {
  alignItems: 'center', justifyContent: "flex-start",  
},
itemMargin: {
  marginLeft: 10
}
});
export {styles};
