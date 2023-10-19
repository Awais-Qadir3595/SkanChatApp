import {StyleSheet} from 'react-native';
import {mvs} from '../../../services/metrices';
const styles = StyleSheet.create({
  main: {
    flex: 1,
    margin: mvs(10),
    paddingVertical: mvs(20),
  },
  img: {
    height: mvs(40),
    width: 40,
    borderRadius: 30,
  },
  rw: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: mvs(10),
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    paddingVertical: mvs(10),
  },
  desc: {
    marginLeft: mvs(20),
  },
});
export default styles;
