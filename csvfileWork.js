import React, { useState } from 'react';
import { ScrollView, Touchable, TouchableOpacity } from 'react-native';
import { View, Text, Button } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { readFile, writeFile } from 'react-native-fs';
import XLSX from 'xlsx';
import Row from './src/components/core/Row';
// import csvToJson from 'convert-csv-to-json';

const ExcelFileReader = () => {

    const [dataSet,setData]=useState(null);
    const generate = async () => {

        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
        });
        console.log(res);

        const fileUri = res[0].uri;
        readFile(res[0].uri, 'ascii').then(res => {
            const wb = XLSX.read(res, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname]
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
             console.log(data.length);
             setData(data);
            var temp = [];
            // for(let i=0;i<data.length;++i)
            // {
            //     console.log(',,......');
            //    console.log(data[i][0]);
        
            // }

        })
        console.log('file uri', fileUri);
    }


    return (

        <View style={{ flex: 1, backgroundColor:'white',justifyContent:'center',alignItems:'center'  }}>
             
            <TouchableOpacity onPress={() => generate()}
            style={{padding:10,backgroundColor:'lightgray',borderWidth:1}}>
                <Text style={{color:'black'}}>pick file</Text>
                </TouchableOpacity>
                {
                    dataSet?.map((item)=>{
                        console.log('-----');
                        console.log(item);
                        let str=item[1]+item[0]+'due date'+item[3]+'is'+item[6];
                        return(
                            <Row style={{padding:10}}>
                                <Text>{item[1]+item[2]+'due date'+item[3]+'is'+item[6]}</Text>
                                {/* <Text>{item[1]}</Text>
                                <Text>{item[2]}</Text> */}
                            </Row>
                        )
                    })
                }
            
        </View>
    );
};

export default ExcelFileReader;
