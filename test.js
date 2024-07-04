import React from 'react';
import { View, Button, Alert, Platform, Linking,TouchableHighlight,Text,useWindowDimensions } from 'react-native';
import RNPrint from 'react-native-print';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RenderHTML from 'react-native-render-html';
const Test = () => {


  const { width } = useWindowDimensions();

 

  const DesignView= `
  <!DOCTYPE html>
<html lang="en">
<head>
 
 <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      
 

</head>
<body class="main">
    <div class="body" style="margin:10px">
        <div class="typeOfChalan" style="text-align: right;">Bank copy</div>

        <div class="rw" style="flex-direction:row;width:100%; justify-content: space-between;margin-bottom:10px">
            <div class="right" style="width:45%;">
                <div class="bold" style="font-size: 11px;color:black;font-weight:bold">Habib Metropolitan Bank, Ltd</div>
                <div class="bold" style="font-size: 11px;color:black;font-weight:bold">F8 markaz , branch</div>
                <div class="bold" style="font-size: 11px;color:black;font-weight:bold">Islamabad</div>
                <div class="bold" style="font-size: 11px;color:black;font-weight:bold">Corporate ID 382 ZAINAB K </div>
                <div class="bold" style="font-size: 11px;color:black;font-weight:bold">BAKHASH PVT LTD</div>
            </div>

            <div class="right" style="margin-right:20px;width:45%;justifyContent:center;">
            <div style="height:2px;background-color:black;margin-bottom:10px">
           </div>
                <div class="bold" style="font-size: 18px; text-align: center;font-weight:bold;color:black">SKANS</div>
           <div style="height:2px;background-color:black;margin-top:10px">
           </div>

            </div>
        </div>

        <div class="rw" style="align-items: center;">
            <span style="font-size: 11px;">Session :</span>
            <span style="font-size: 11px;">{{global?.school?.SchoolName}} - Sep 2024</span>
            <span style="font-size: 11px;">{{classData[0]}} - {{classData[1]}}</span>
            <span style="font-size: 11px;">{{classData[2]}}</span>
        </div>

        <div class="rw">
            <span style="font-size: 11px;">Challan # :</span>
            <span style="font-size: 11px;">{{feeDetail?.chalanNumber}}</span>
            <span style="font-size: 11px;">Due Date:</span>
            <span style="font-size: 11px;">{{feeDetail?.dueDate}}</span>
        </div>

        <div class="rw" style="width: 40%; margin-bottom: 10px;">
            <span style="font-size: 11px;">Issue Date</span>
            <span style="font-size: 11px;">{{currentDate.day}} - {{currentDate?.month}} - {{currentDate.year}}</span>
        </div>
        <div class="bold" style="font-size: 11px;">Rs. 100 per day will be charged by bank after due date</div>
        <div class="bold txtCenter" style="font-size: 11px;">The Bank accepts both the Cheques and Cash<br>Fee is accepted in all branches of Habib Metropolitan</div>
        <div class="bold txtCenter" style="font-size: 11px;">SKANS</div>

        <div class="rw" style="width: 50%; align-items: center;">
            <span class="nm" style="font-size: 11px;">Name</span>
            <span style="font-size: 11px;">{{global?.user?.name}}</span>
        </div>
        <div class="bold txtCenter" style="font-size: 18px;">Fee Challan</div>

        <div class="rw">
            <div class="box">
                <span class="nm" style="font-size: 11px;">Ch.No</span>
                <span style="font-size: 11px;">{{feeDetail?.chalanNumber}}</span>
            </div>
            <div class="box">
                <span class="nm" style="font-size: 11px;">Billing Month</span>
                <span style="font-size: 11px;">{{currentDate.month}} {{currentDate.year}}</span>
            </div>
            <div class="box">
                <span class="nm" style="font-size: 11px;">Fine</span>
                <span style="font-size: 11px;">0</span>
            </div>
            <div class="box">
                <span class="nm" style="font-size: 11px;">Amount</span>
                <span style="font-size: 11px;">{{feeDetail?.amount}}</span>
            </div>
            <div class="box">
                <span class="nm" style="font-size: 11px;">Description</span>
                <span style="font-size: 11px;">Tution Fee</span>
            </div>
        </div>

        <div class="rw" style="width: 50%; align-self: center;">
            <div class="bold" style="color: black;">Grand Total</div>
            <div class="bold" style="color: black;">{{feeDetail?.amount}}</div>
        </div>
    </div>
</body>
</html>

`;
  const  createPDF=async()=> {
    
    let options = {
      html:DesignView,
      fileName: 'mhrsb',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options)
    // console.log(file.filePath);
    console.log(file);
    alert(file.filePath);
  }

  const renderView={
    html:DesignView
  }
  return (
    <View>
        <TouchableHighlight onPress={createPDF} style={{padding:10,backgroundColor:'lightblue',alignItems:'center'}}>
          <Text>Create PDF</Text>
        </TouchableHighlight>

        <RenderHTML
      contentWidth={width}
      source={renderView}
    />
      </View>
  );
};

export default Test;






// import React, {useEffect, useState} from 'react';
// import {
//   View,useWindowDimensions,
//   Text,
//   Touchable,
//   TouchableOpacity,
// } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import Toast from 'react-native-simple-toast';
// import RenderHtml from 'react-native-render-html';
// import RNPrint from 'react-native-print';
// const Test=()=> {

//   const { width } = useWindowDimensions();

//   const source = {
//     html: `
    
//     <div style="background-color: white; padding: 10px; border-right-width: 1px;">
//     <div style="align-self: flex-end; margin: 10px 0;">Bank copy</div>
//     <div style="align-items: center; margin: 10px 0;">
//         <div style="width: 50%;">
//             <div style="font-weight: bold; font-size: 11px; color: black;">Habib Metropolitan Bank, Ltd</div>
//             <div style="font-weight: bold; font-size: 11px; color: black;">F8 markaz , branch</div>
//             <div style="font-weight: bold; font-size: 11px; color: black;">Islamabad</div>
//             <div style="font-weight: bold; font-size: 11px; color: black;">Corporate ID 382 ZAINAB K</div>
//             <div style="font-weight: bold; font-size: 11px; color: black;">BAKHASH PVT LTD</div>
//         </div>
//         <div style="width: 50%;">
//             <hr style="width: 100%; border-bottom-width: 2px;" />
//             <div style="text-align: center; font-weight: bold; color: black; font-size: 18px;">SKANS</div>
//             <hr style="width: 100%; border-bottom-width: 2px;" />
//         </div>
//     </div>
//     <div style="align-items: center;">
//         <div style="font-size: 11px;">Session :</div>
//         <div style="font-size: 11px;">{global?.school?.SchoolName + '- Sep 2024'}</div>
//         <div style="font-size: 11px;">{classData[0] + '-' + classData[1]}</div>
//         <div style="font-size: 11px;">{classData[2]}</div>
//     </div>
//     <div style="align-items: center; margin: 10px 0;">
//         <div style="font-size: 11px;">Challan # :</div>
//         <div style="font-size: 11px;">{feeDetail?.chalanNumber}</div>
//         <div style="font-size: 11px;">Due Date:</div>
//         <div style="font-size: 11px;">{feeDetail?.dueDate}</div>
//     </div>
//     <div style="width: 40%; margin-bottom: 10px;">
//         <div style="font-size: 11px;">Issue Date</div>
//         <div style="font-size: 11px;">{currentDate.day + ' - ' + currentDate?.month + ' - ' + currentDate.year}</div>
//     </div>
//     <div style="font-weight: bold; color: black; font-size: 11px;">Rs. 100 per day will be charged by bank after due date</div>
//     <div style="font-weight: bold; color: black; font-size: 11px; text-align: center; align-self: center; margin: 2px 20px;">
//         The Bank accepts both the Cheques and Cash<br />
//         Fee is accepted in all branches of Habib Metropolitan
//     </div>
//     <div style="font-weight: bold; color: black; font-size: 11px; text-align: center; align-self: center; margin: 2px 20px;">SKANS</div>
//     <div style="width: 50%; align-items: center;">
//         <div style="border-bottom-width: 1px; margin: 3px 0; font-size: 11px;">Name</div>
//         <div style="font-size: 11px;">{global?.user?.name}</div>
//     </div>
//     <div style="text-align: center; font-weight: bold; color: black; font-size: 18px;">Fee Challan</div>
//     <div style="display: flex; flex-direction: row;">
//         <div style="align-items: center;">
//             <div style="border-bottom-width: 1px; margin: 3px 0; font-size: 11px;">Ch.No</div>
//             <div style="font-size: 11px;">{feeDetail?.chalanNumber}</div>
//         </div>
//         <div style="align-items: center;">
//             <div style="border-bottom-width: 1px; margin: 3px 0; font-size: 11px;">Billing Month</div>
//             <div style="font-size: 11px;">{currentDate.month + ' ' + currentDate.year}</div>
//         </div>
//         <div style="align-items: center;">
//             <div style="border-bottom-width: 1px; margin: 3px 0; font-size: 11px;">Fine</div>
//             <div style="font-size: 11px;">0</div>
//         </div>
//         <div style="align-items: center;">
//             <div style="border-bottom-width: 1px; margin: 3px 0; font-size: 11px;">Amount</div>
//             <div style="font-size: 11px;">{feeDetail?.amount}</div>
//         </div>
//         <div style="align-items: center;">
//             <div style="border-bottom-width: 1px; margin: 3px 0; font-size: 11px;">Description</div>
//             <div style="font-size: 11px;">Tution Fee</div>
//         </div>
//     </div>
//     <div style="align-items: center; margin: 10px 0; width: 50%; align-self: center;">
//         <div style="font-weight: bold; color: black;">Grand Total</div>
//         <div style="font-weight: bold; color: black;">{feeDetail?.amount}</div>
//     </div>
// </div>


//   `
//   };

//   const printHTML = async () => {
//     await RNPrint.print({
//       html: '<h1>Hello, World!</h1><p>This is a sample print.</p>',
//     });
//   };
//   const downloadFile=()=>{
//     console.log('bbb');
//   }
   
//   return (
//     <View style={{flex:1,backgroundColor:'lightgray',justifyContent:'center',alignItems:'center'}}>
//       <TouchableOpacity onPress={()=>printHTML()}>
//         <Text>download</Text>
//       </TouchableOpacity>
//        <RenderHtml
//       contentWidth={width}
//       source={source}
//     />
//     </View>
//   );
// }
// export default Test;