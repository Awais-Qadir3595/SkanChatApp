import {StyleSheet} from 'react-native';
import {mvs} from '../../../services/metrices';
import {colorsTheme} from '../../../services/color';
const styles = StyleSheet.create({
  main: {
    flex: 1,
     
    backgroundColor:'whitesmog'
  },
  upper: {
    flex: 1.4,
    backgroundColor: colorsTheme.primary,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomLeftRadius:20,borderBottomRightRadius:20,
    
    
  },
  body: {
    flex: 3, backgroundColor:'white',margin:mvs(10)
  },
  textInput: {
    height:mvs(100),
    width:'90%',
    borderColor: colorsTheme.primary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    borderWidth:1,
    backgroundColor:'white',
    alignSelf:'center',
    elevation:10
    
  },
  imgpdfRow: {
    margin: 10,


  },
  touchableStyle:{
  
      alignItems: 'center', justifyContent: "flex-start",
      width: '45%', justifyContent: 'space-evenly', backgroundColor: 'powderblue',
      padding: 10, borderRadius: 10, flexDirection: 'row',eleveation:10,
      borderWidth:1,borderColor:colorsTheme.primary,
    
 },
 innerData: {
  alignItems: 'center', justifyContent: "flex-start",   
},
itemMargin: {
  marginLeft: 10
}
});
export {styles};