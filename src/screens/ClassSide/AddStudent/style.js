import {StyleSheet} from 'react-native';
import {mvs} from '../../../services/metrices';
import { colorsTheme } from '../../../services/color';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upper: {
    flex: 4,
    backgroundColor:colorsTheme.primary,
    padding: mvs(10),
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: 'space-around',
  },
  lower: {
    flex: 7,
    alignItems: 'center',
    paddingHorizontal: mvs(20),
  },
});

export default styles;
