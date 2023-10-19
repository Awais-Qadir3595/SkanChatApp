import {StyleSheet} from 'react-native';
import {mvs} from '../../services/metrices';
const styles = StyleSheet.create({
  main: {
    flex: 1,
    margin: mvs(10),
    paddingVertical: mvs(20),
  },
  img: {
    height: 60,
    width: 60,
    borderRadius: 30,
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
export default styles;
