import {StyleSheet} from 'react-native';
import {mvs} from '../../../services/metrices';
import {colorsTheme} from '../../../services/color';
const styles = StyleSheet.create({
  main: {
    flex: 1,backgroundColor:'white'
  },
  upper: {
    flex: 1.5,
    backgroundColor: colorsTheme.primary,
    borderBottomRightRadius: mvs(50),
    borderBottomLeftRadius: mvs(50),
    justifyContent: 'center',
    alignItems: 'center',
    elevation:10,
    shadowColor:'black'
  },
  body: {
    flex: 3,
    marginHorizontal: mvs(10),
  },
  rw: {
    width: '100%',
    marginVertical: mvs(20),
    justifyContent: 'space-around',
  },
  boxes: {
    width: '40%',
    backgroundColor: colorsTheme.primary,
    height: mvs(150),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SchoolStyle: {
    marginTop: mvs(30),alignItems:'center'
  },
  ModalView:{
    height:mvs(200),width:'45%', position:'absolute',top:20,backgroundColor:"white",
    borderRadius:10,padding:mvs(5),alignItems:'center',
    borderRadius:3,right:10
  },
});
export {styles};
