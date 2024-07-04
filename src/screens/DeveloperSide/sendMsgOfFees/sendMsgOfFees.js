

import React, { useState } from 'react';
import { FlatList, Touchable, TouchableOpacity, } from 'react-native';
import { Button, StyleSheet, Text, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { readFile } from 'react-native-fs';
import * as XLSX from 'xlsx';
import Label from '../../../components/core/Label';
import Row from '../../../components/core/Row';
import { colorsTheme } from '../../../services/color';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';
let msg = null;
const SendMSgOfFees = () => {
    const [data, setData] = useState([]);
    const [schoolsName, setSchoolNames] = useState([]);
    const [classNames, setClassName] = useState([]);
    const generate = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });

            console.log(res);

            const fileUri = res[0].uri;
            const fileContent = await readFile(fileUri, 'ascii');

            const wb = XLSX.read(fileContent, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

            console.log('Data Length:', jsonData.length);
            console.log('////////////////////////////////////////////////////////////');
            console.log('Data ', jsonData);
            console.log('////////////////////////////////////////////////////////////');

            const temp = [];

            for (let i = 1; i < jsonData.length; ++i) {
                let object = {
                    id: jsonData[i][0],
                    name: jsonData[i][1],
                    chalanNumber: jsonData[i][2],
                    dueDate: jsonData[i][3],
                    amount: jsonData[i][4],
                    class: jsonData[i][5],
                    section: jsonData[i][6],
                    campus: jsonData[i][7],





                };
                temp.push(object);
                console.log(object);

            }

            setData(temp);
            Toast.show('data loaded')
            // notifyEveryUser(temp);
        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                console.log('User cancelled the picker');
            } else {
                console.error('Error reading file:', error);
            }
        }
    };


    const renderData = ({ item, index }) => {

        msg = item.name + ' your fee is ' + item.amount + ' and Challan number is ' + item.chalanNumber +
            ' your due date is ' + item.dueDate;
        // console.log(msg);
        return (

            <Row style={styles.rw}>

                <Label label={index + 1} />
                <Label label={item.name} />
                <Label label={item.class} />

                <Label label={item.id} />


            </Row>
        )
    }


    const sendMessages = () => {

        for (let i = 0; i < data.length; i++) {
            msg = data[i].name + ' your fee is ' + data[i].amount + ' and Challan number is '
                + data[i].chalanNumber +
                ' your due date is ' + data[i].dueDate;
            console.log(msg);





        }
    }

    const saveFeeData = async () => {

        for (let i = 0; i < data.length; i++) {
            let id = new Date().getTime().toString()
            let amount = data[i].amount;
            let studentId = data[i].id;
            let chalanNumber=data[i].chalanNumber;
            let dueDate=data[i].dueDate;
          

            await firestore()
                .collection('fee')
                .doc(id)
                .set({
                    id,
                    amount,
                    studentId,
                    chalanNumber,
                    dueDate
                })
                .then(() => {
                     
                    Toast.show('saved')
                });
                console.log([i]);
        }
        

    }
    return (
        <View style={styles.main}>

            <Row style={styles.rw}>
                <TouchableOpacity style={styles.btn} onPress={generate}>
                    <Label label='Upload File' color='white' />
                </TouchableOpacity>

                <Text>Loaded Records: {data?.length}</Text>
            </Row>

            <TouchableOpacity style={styles.btn} onPress={saveFeeData}>
                <Label label='save in database' color='white' />
            </TouchableOpacity>
            {/* <ActivityIndicator size={'small'} color={'white'} /> */}
            <TouchableOpacity style={styles.btn} onPress={sendMessages}>
                <Label label='send Messages' color='white' />
            </TouchableOpacity>
            {/* <FlatList
                data={data}
                renderItem={renderData}
            /> */}









        </View>
    );
};

export default SendMSgOfFees;

const styles = StyleSheet.create({
    main: {
        flex: 1, alignItems: 'center',
    },
    btn: {
        alignSelf: "center", backgroundColor: 'pink', margin: 10, padding: 10, borderRadius: 10,
        backgroundColor: colorsTheme.primary
    },
    rw: {
        alignItems: 'center', marginTop: 10
    }
})

