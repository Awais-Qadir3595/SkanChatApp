import { StyleSheet } from 'react-native';
import { mvs } from '../../../services/metrices';
import { colorsTheme } from '../../../services/color';
const styles = StyleSheet.create({
  main: {
    flex: 1,

    backgroundColor: 'whitesmoke'
  },
  upper: {
    flex: 1.4,
    backgroundColor: colorsTheme.primary,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomRightRadius: 30, borderBottomLeftRadius: 30
  },
  body: {
    flex: 3, backgroundColor: 'whitesmoke', marginTop: mvs(10)
  },
  textInput: {
    height: mvs(100),
    width: '90%',
    borderColor: colorsTheme.primary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    backgroundColor: '#f0f8ff',
    alignSelf: 'center',

  },
  imgpdfRow: {
    margin: 10,


  },
  itemMargin: {
    margin: 3
  },
  innerData: {
    alignItems: 'center', justifyContent: "flex-start",
    width: '45%', justifyContent: 'space-evenly', backgroundColor: 'powderblue',
    padding: 10, borderRadius: 10, flexDirection: 'row',eleveation:10,
    borderWidth:1,borderColor:colorsTheme.primary
  }

});
export { styles };
