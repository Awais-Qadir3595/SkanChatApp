import {StyleSheet} from 'react-native';
import {mvs} from '../../../services/metrices';
import { colorsTheme } from '../../../services/color';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upper: {
    flex: 0.3,
    backgroundColor:colorsTheme.primary,
    padding: mvs(10),
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: 'center',alignItems:'center'

  },
  lower: {
    flex: 5,
    alignItems: 'center',
    paddingHorizontal: mvs(20),
  },
  touchableStyle:{
    width:'50%',marginVertical:20
 }
 ,
  
 innerData: {
   alignItems: 'center', justifyContent: "flex-start",  
 },
 itemMargin: {
   marginLeft: 10
 }
});

export default styles;