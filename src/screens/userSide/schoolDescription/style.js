import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    main: {
        flex: 1,margin:10
    },
    heading: {
        alignSelf: 'center', marginVertical: 10, 
    },
    boxView:{
         marginTop:10,borderTopWidth:0.3
    },
    rowBox:{
        padding:3,marginVertical:5
    },
    left:{
        width:'30%',
    },
    right:{
        width:'70%',
    },
    whatsapp:{
        position:'absolute',bottom:40,right:30,
    },
    pictures:{
        width:'80%',height:80,borderRadius:10
    },
    banner: {
        width: '100%', marginVertical: 10
    },
})
export { styles };