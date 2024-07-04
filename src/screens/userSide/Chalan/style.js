import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    main: {
        flex: 1, backgroundColor: 'whitesmoke'
    },

    body: {
        backgroundColor: 'white', padding: 10,borderRightWidth:1
    },
    typeOfChalan: {
        alignSelf: 'flex-end', marginVertical: 10

    },
    rw: {
        alignItems: 'center', marginVertical: 10
    },
    lineDraw: {
        width: '100%', borderBottomWidth: 2
    },
    right: {
        width: '50%',
    },
    info: {
        backgroundColor: 'yellow'
    },
    txtCenter: {
        alignSelf: 'center', textAlign: 'center', marginHorizontal: 20, marginVertical: 2
    },
    nm: {
        borderBottomWidth: 1, marginVertical: 3,
    },
    rwBtn: {
        width: '80%', alignSelf: 'center',padding:10, marginTop:10,alignItems:'center'
    },
    box: {
    alignItems:'center'
    }

})

export default style;