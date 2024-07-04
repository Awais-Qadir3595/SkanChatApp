import { StyleSheet } from "react-native";
import { mvs } from '../../../services/metrices';
import { colorsTheme } from "../../../services/color";
const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    upper: {
        backgroundColor: colorsTheme.primary,
        paddingVertical: 10,

    },
    banner: {
        width: '97%', marginVertical: 10
    },
    body: {
        flex: 5, marginHorizontal: mvs(10)
    },
    rw: {
        width: '100%', marginVertical: mvs(20), justifyContent: 'space-around'
    },
    boxes: {
        width: '40%', backgroundColor: colorsTheme.primary, height: mvs(150), borderRadius: 20,
        justifyContent: 'center', alignItems: 'center'
    },
    SchoolStyle: {
        alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 10, padding: 10
    },
    SchoolStyle1: {
        alignItems: 'center',   width: '90%', 
          padding: 10,marginHorizontal:20,
        // backgroundColor:'pink',
    },
    deleteModal: {
        height: mvs(200), width: '80%', backgroundColor: 'white',
        borderRadius: 10, padding: mvs(20), alignItems: 'center', justifyContent: 'center'
    },
    yessNo: {
        width: '40%', alignItems: 'center', backgroundColor: colorsTheme.primary, marginHorizontal: mvs(10), marginTop: mvs(10), borderRadius: 5,
        marginTop: mvs(30), height: mvs(40), justifyContent: 'center'
    },
    roundButton: {
        backgroundColor: colorsTheme.primary, padding: 5, borderRadius: 25, width: 50,
         height: 50, justifyContent: 'center', alignItems: 'center',
    },
    rowIcon:{
        marginVertical:20,alignItems:'center',marginHorizontal:10
    },
    menuActionView:{
        alignItems:'center',justifyContent:'center',
    },
    logoutModal:{
        alignItems:'center',
    },
    version:{
        marginHorizontal:10,backgroundColor:'yellow',padding:3,borderRadius:10,flexDirection:'row',
        alignItems:'center'
    },
    name:{
        backgroundColor:'teal',padding:10,borderRadius:10
    },
    feeDescription:{
        width:'100%',backgroundColor:'teal'
    },
    rwFee:{
        alignItems:"center",margin:10,justifyContent:'flex-start'
    },




    
})
export { styles };