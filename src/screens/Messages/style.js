import {StyleSheet} from 'react-native';
import {mvs} from '../../services/metrices';
const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding:mvs(10),
    paddingVertical: mvs(20),
    backgroundColor:'ghostwhite'
  },
  img: {
    height: mvs(30),
    width: 20,
    
  },
  rw: {
     
    padding: mvs(10),
    marginVertical: mvs(20),
    borderRadius:6,backgroundColor:'white',elevation:3
  },
  desc: {
    marginLeft: mvs(20),marginTop:mvs(10), 
    
  },
});
export default styles;
