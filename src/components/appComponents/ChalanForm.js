import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity ,Image} from "react-native";
 
import Label from "./Label";
import Bold from "./components/core/bold";
import Row from '/components/core/Row';
import DrawHorizentalLine from "./components/core/drawHorizentalLine";
import { width } from "../../../services/metrices";
import PrimaryButton from "./components/core/button";
import Icon from 'react-native-vector-icons/AntDesign';
import { colorsTheme } from "../../../services/color";
import { captureRef } from "react-native-view-shot";
 
const ChalanForm = () => {

    const viewRef = React.useRef(null);

    const ChangeToPdf=()=>{
        
        
        captureRef(viewRef, {
            format: "jpg",
            quality: 0.8,
          }).then(
            (uri) => console.log("Image saved to", uri),
            (error) => console.error("Oops, snapshot failed", error)
          );


    }
    return (
        <View style={style.main}>

           





            <View ref={viewRef} style={style.body}>
                <Label label="Bank copy" style={style.typeOfChalan} />
                <Row style={style.rw}>
                    <View style={style.right}>
                        <Bold label="Habib Metropolitan Bank, Ltd" size={11} color={'black'} />
                        <Bold label="F8 markaz , branch" size={11} color={'black'} />
                        <Bold label="Islamabad" size={11} color={'black'} />
                        <Bold label="Corporate ID 382 ZAINAB K " size={11} color={'black'} />
                        <Bold label="BAKHASH PVT LTD" size={11} color={'black'} />
                    </View>

                    <View style={style.right}>
                        <DrawHorizentalLine style={style.lineDraw} />
                        <Bold label="SKANS" style={{ textAlign: 'center' }} color={'black'} size={18} />
                        <DrawHorizentalLine style={style.lineDraw} />
                    </View>



                </Row>

                <Row>
                    <Label label="Session :" size={11} />
                    <Label label="SSS-GQ - Sep 2024" size={11} />
                    <Label label="G-1" size={11} />
                    <Label label="A" size={11} />
                </Row>

                <Row style={style.rw}>
                    <Label label="Challan # :" size={11} />
                    <Label label="736335" size={11} />
                    <Label label="Due Date:" size={11} />
                    <Label label="10-May-2024" size={11} />
                </Row>

                <Row style={{ width: '40%', marginBottom: 10 }}>
                    <Label label="Issue Date" size={11} />
                    <Label label="10-May-24" size={11} />
                </Row>
                <Bold label="Rs. 100 per day will be charged by bank after due date" size={11} color={'black'} />
                <Bold label="The Bank accepts both the Cheques and Cash
 Fee is accepted in all branches of Habib Metropolitan" size={11} color={'black'} style={style.txtCenter} />
                <Bold label="SKANS" size={11} color={'black'} style={style.txtCenter} />

                <Row style={{ width: '50%' }}>
                    <Label label="Name" style={style.nm} size={11} />
                    <Label label="Imran" size={11} />
                </Row>
                <Bold label="Fee Challan" style={style.txtCenter} color={'black'} size={18} />

                <Row>
                    <View style={style.box}>
                        <Label label="Ch.No" size={11} style={style.nm} />
                        <Label label="736335" size={11} />
                    </View>

                    <View style={style.box}>
                        <Label label="Billing Month" size={11} style={style.nm} />
                        <Label label="ay 2024" size={11} />
                    </View>

                    <View style={style.box}>
                        <Label label="Fine" size={11} style={style.nm} />
                        <Label label="0" size={11} />
                    </View>

                    <View style={style.box}>
                        <Label label="Amount" size={11} style={style.nm} />
                        <Label label="1000" size={11} />
                    </View>

                    <View style={style.box}>
                        <Label label="Description" size={11} style={style.nm} />
                        <Label label="Tution Fee" size={11} />
                    </View>



                </Row>


                <Row style={{ ...style.rw, width: '50%', alignSelf: 'center' }}>
                    <Bold label="Grand Total" color={'black'} />
                    <Bold label="1000" color={'black'} />
                </Row>
            </View>

         
 
 



</View>

         
    )
}
export default ChalanForm;



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
        width: '80%', alignSelf: 'center',padding:10, marginTop:10
    },
    btnDownload: {
    
    }

})


