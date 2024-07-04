import React, { useEffect, useState } from "react";
import {
    View, ScrollView,
    TouchableOpacity,
    Image, Platform,
    PermissionsAndroid, Alert,
    Linking,
    useWindowDimensions,
    Text
} from "react-native";
import style from "./style";
import Label from "../../../components/core/Label";
import Bold from "../../../components/core/bold";
import Row from '../../../components/core/Row';
import DrawHorizentalLine from "../../../components/core/drawHorizentalLine";
import { width } from "../../../services/metrices";
import PrimaryButton from "../../../components/core/button";
import Icon from 'react-native-vector-icons/AntDesign';
import { colorsTheme } from "../../../services/color";
import { captureRef } from "react-native-view-shot";
import RNImageToPdf from 'react-native-image-to-pdf';
import ImagePicker from 'react-native-image-crop-picker';
import { WebView } from 'react-native-webview';
import Toast from 'react-native-simple-toast';
import RNFS from 'react-native-fs';
import firestore from '@react-native-firebase/firestore';
import { BackgroundImage } from "react-native-elements/dist/config";
import PDFLib, { PDFDocument, PDFPage, } from 'react-native-pdf';
import Pdf from "react-native-pdf";
import storage from '@react-native-firebase/storage';
import { useRef } from "react";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RenderHTML from 'react-native-render-html';
import { Notifications } from 'react-native-notifications';
import Modal from 'react-native-modal';
import Share from 'react-native-share';
// import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';


const Chalan = () => {

    const [feeDetail, setDetailFee] = useState(null);
    const [currentDate, setCurrentDate] = useState({});
    // console.log('0987   ',global.class);
    const [classData, setClassData] = useState(global?.class)
    const viewRef = useRef(null);
    const [modalPdfVisible, setModalPdfVisible] = useState(false);
    const [generatedPdf, setGeneratedPdf] = useState(null);
    const { width } = useWindowDimensions();
    useEffect(() => {

        getFeeDetail();
        getCurrentDate();



    }, [])












    const getCurrentDate = () => {
        const date = new Date();

        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1; // Months are zero-based in JavaScript
        const year = date.getUTCFullYear();

        // Ensure the day and month are always two digits
        const dayString = day < 10 ? `0${day}` : day;
        const monthString = month < 10 ? `0${month}` : month;

        const monthName = getMonthName(monthString)

        // console.log(monthName, 'iuiuiu');



        setCurrentDate({
            day: day,
            month: monthName,
            year: year
        })

    }
    const getFeeDetail = async () => {

        let data = null;
        await firestore()
            .collection('fee')
            .where('studentId', '==', global?.user?.system_id)
            .get()
            .then(querySnapshot => {
                if (querySnapshot.size > 0) {
                    querySnapshot.forEach(documentSnapshot => {

                        setDetailFee(documentSnapshot.data());
                        // console.log(documentSnapshot?.data());
                        //console.log(currentDate);
                        changeDate(documentSnapshot?.data());
                    });





                } else {

                    console.log('no data found', data);
                }
            });
    }










    const getMonthName = (monthDigit) => {
        // console.log('ddddd =', monthDigit);

        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        // console.log('month nm');

        return months[parseInt(monthDigit, 10) - 1];
    };

    const changeDate = (data) => {

        console.log(data, 'fffffffffd');

        let fine = 0;
        const excelEpoch = new Date(Date.UTC(1900, 0, 1)); // Start date in UTC
        const jsDate = new Date(excelEpoch.getTime() + (data?.dueDate - 2) * 86400000); // Subtract 2 to account for the leap year bug and correct days

        let date = jsDate;
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1; // Months are zero-based in JavaScript
        const year = date.getUTCFullYear();

        // Ensure the day and month are always two digits
        const dayString = day < 10 ? `0${day}` : day;
        const monthString = month < 10 ? `0${month}` : month;

        const monthName = getMonthName(monthString);

        let newDate = dayString + ' - ' + monthName + ' - ' + year;
        setDetailFee(prevData => ({
            ...prevData, // Spread the previous state
            dueDate: newDate // Update the name property
        }));
        const CurrDate = new Date();

        const currDay = CurrDate.getUTCDate();
        const currMonth = CurrDate.getUTCMonth() + 1; // Months are zero-based in JavaScript
        const currYear = CurrDate.getUTCFullYear();
        console.log(currDay, day);
        if (currDay > day) {
            let result = currDay - day;
            fine = result * 100;
        }

        setDetailFee(prevData => ({
            ...prevData, // Spread the previous state
            amount: data?.amount + fine // Update the name property
        }));

    }

    const bankCopy = `
    
   
    <div class="body" style="border-right: 1px solid black;padding:5px">
        <div class="typeOfChalan" style="text-align: right;">Bank copy</div>

        <table style=" ">
           <tr >
               <td style="width:50%">
                 <div class="right" >
                <div class="bold" style="font-size: 11px;color:black;font-weight:bold;width:100%; ">Habib Metropolitan Bank</div>
                <div class="bold" style="font-size: 11px;color:black;font-weight:bold">Ltd F8 markaz , branch</div>
                <div class="bold" style="font-size: 11px;color:black;font-weight:bold">Islamabad</div>
                <div class="bold" style="font-size: 11px;color:black;font-weight:bold">Corporate ID 382 ZAINAB K </div>
                <div class="bold" style="font-size: 11px;color:black;font-weight:bold">BAKHASH PVT LTD</div>
            </div>
               </td>

               <td style="width:50%;justify-content:center">
                         <div class="right" style="justifyContent:center;">
                <hr style="border-width:2px;border-color:black"/>
                <div class="bold" style="font-size: 18px; text-align: center;font-weight:bold;color:black">SKANS</div>
                <hr style=" border-width:2px;border-color:black"/>

            </div>
               </td>

           </tr>
        </table>
       

<table style="width:100%;border-collapse: collapse; table-layout: fixed;">

      <tr style="width:100%;word-wrap: break-word;align-items:center">
          <td style="justify-content:center;align-items:center;text-align: center; vertical-align: middle;">
              <span style="font-size: 10px;">Session :</span>
          </td>
            <td colspan=2 style="justify-content:center;align-items:center;text-align: center;  vertical-align: middle; ">
                 <span style="font-size: 10px; ">${global?.school?.SchoolName} - Sep 2024</span>
          </td>
            <td style="justify-content:center;align-items:center;text-align: center; vertical-align: middle;">
               <span style="font-size: 10px; ">${classData[0]} - ${classData[1]}</span>
          </td>
            <td style="justify-content:center;align-items:center;text-align: center; vertical-align: middle;">
              <span style="font-size: 10px;margin-right:20px">${classData[2]}</span>
          </td>
      </tr>

       <tr style="width:100%;word-wrap: break-word;align-items:center; ">
          <td style="justify-content:center;align-items:center;text-align: center; vertical-align: middle;">
              <span style="font-size: 10px;">Challan # :</span>
          </td>
            <td  style="justify-content:center;align-items:center;text-align: center; vertical-align: middle;">
                  <span style="font-size: 10px; ">${feeDetail?.chalanNumber}</span>
          </td>
            <td style="justify-content:center;align-items:center;text-align: center; vertical-align: middle;">
               <span style="font-size: 10px;">Due Date:</span>
          </td>
            <td style="justify-content:center;align-items:center;text-align: center; vertical-align: middle; ">
                 <span style="font-size: 10px; ">${feeDetail?.dueDate}</span>
          </td>
      </tr>

</table>
        

        <table style="width:60%;">
             <tr>
                <td style="justify-content:center;align-items:center;text-align: center; width:30%">
                     <span style="font-size: 10px;">Issue Date</span>
                </td>
                  <td style="justify-content:center;align-items:center;text-align: center;width:70%">
                      <span style="font-size: 10px;">${currentDate.day} - ${currentDate?.month} - ${currentDate.year}</span>
                </td>
            <tr>

        </table>

        
        <p style="text-align:center;font-size:10px;font-weight:bold">
                        Rs. 100 per day will be charged by bank after due date The Bank accepts both the Cheques and Cash Fee is accepted in all branches of Habib Metropolitan
                       <br/> SKANS
           </p>
        

        <div class="rw" style="width: 50%; align-items: center;">
            <span class="nm" style="font-size: 10px;">Name : </span>
            <span style="font-size: 10px;">${global?.user?.name}</span>
        </div>
        <div class="bold txtCenter" style="font-size: 18px;font-weight:bold;text-align:center;margin-top:10px">Fee Challan</div>
 
        <table style="width:100%;">
             

               <tr>
                  <th style="alignItems:center ">
                       <span class="nm" style="font-size: 10px;">Ch.No</span>
                  </th>
                  <th style="alignItems:center ">
                       <span class="nm" style="font-size: 10px;">Billing Month</span>
                  </th>
                  <th style="alignItems:center ">
                  <span class="nm" style="font-size: 10px;">Fine</span>
                     
                  </th>
                  <th style="alignItems:center ">
                       <span class="nm" style="font-size: 10px;">Amount</span>
                  </th>
                    <th style="alignItems:center ">
                      <span class="nm" style="font-size: 11px;">Description</span>
                  </th>
              </tr>

               <tr>
                  <td style="alignItems:center ">
                       <span style="font-size: 11px;">${feeDetail?.chalanNumber}</span>
                  </td>
                  <td style="alignItems:center ">
                      <span style="font-size: 11px;">${currentDate.month} ${currentDate.year}</span>
                  </td>
                  <td style="alignItems:center ">
                   <span style="font-size: 11px;">0</span>
                     
                  </td>
                  <td style="alignItems:center ">
                       <span style="font-size: 11px;">${feeDetail?.amount}</span>
                  </td>
                    <td style="alignItems:center ">
                      <span style="font-size: 11px;">Tution Fee</span>
                  </td>
              </tr>

        </table>



        <table style="width:70%;margin-top:10px;align-self:center">

                 <tr>
                      <td style="font-weight:bold">
                          Grand total
                      </td>
                      <td style="font-weight:bold">
                      ${feeDetail?.amount}
                      </td>         
                </tr>
        </table>

       

        
          

     <table style="width:100%;margin-top:100px">

          <tr>
               <td style="width:20%">
               <div style="width:100%;border-width:thin;height:100px;marginTop:30px;justifyContent:flex-end; border:1px solid black;">

                    <p style="font-size: 8px"> Bank Stamp</p>
               </div>
    </td>
               <td style="width:10%;margin-left:10px">

                      <div style="width:100%;height:100px;marginTop:30px;border-bottom:1px solid black;border-bottom-width:thin">
            </div>
                      <p style="font-size: 8px">
                        Head of institution
                       </p>

               </td>

         </tr>


</table>

         

    </div>


`;
    const schoolCopy = `

  
   
    <div class="body" style="border-right: 1px solid black;padding:5px">
        <div class="typeOfChalan" style="text-align: right;">School copy</div>

        <table style=" ">
           <tr >
               <td style="width:50%">
                 <div class="right" >
                <div class="bold" style="font-size: 11px;color:black;font-weight:bold;width:100%; ">Habib Metropolitan Bank</div>
                <div class="bold" style="font-size: 11px;color:black;font-weight:bold">Ltd F8 markaz , branch</div>
                <div class="bold" style="font-size: 11px;color:black;font-weight:bold">Islamabad</div>
                <div class="bold" style="font-size: 11px;color:black;font-weight:bold">Corporate ID 382 ZAINAB K </div>
                <div class="bold" style="font-size: 11px;color:black;font-weight:bold">BAKHASH PVT LTD</div>
            </div>
               </td>

               <td style="width:50%;justify-content:center">
                         <div class="right" style="justifyContent:center;">
                <hr style="border-width:2px;border-color:black"/>
                <div class="bold" style="font-size: 18px; text-align: center;font-weight:bold;color:black">SKANS</div>
                <hr style=" border-width:2px;border-color:black"/>

            </div>
               </td>

           </tr>
        </table>
       

<table style="width:100%;border-collapse: collapse;table-layout: fixed;">

      <tr style="width:100%;word-wrap: break-word;align-items:center">
          <td style="justify-content:center;align-items:center;text-align: center;">
              <span style="font-size: 10px;">Session :</span>
          </td>
            <td colspan=2 style="justify-content:center;align-items:center;text-align: center;  ">
                 <span style="font-size: 10px;">${global?.school?.SchoolName} - Sep 2024</span>
          </td>
            <td style="justify-content:center;align-items:center;text-align: center;">
               <span style="font-size: 10px; ">${classData[0]} - ${classData[1]}</span>
          </td>
            <td style="justify-content:center;align-items:center;text-align: center;">
              <span style="font-size: 10px;margin-right:20px">${classData[2]}</span>
          </td>
      </tr>

       <tr style="width:100%;word-wrap: break-word;align-items:center">
          <td style="justify-content:center;align-items:center;text-align: center;">
              <span style="font-size: 10px;">Challan # :</span>
          </td>
            <td  style="justify-content:center;align-items:center;text-align: center;">
                  <span style="font-size: 10px;">${feeDetail?.chalanNumber}</span>
          </td>
            <td style="justify-content:center;align-items:center;text-align: center;">
               <span style="font-size: 10px;">Due Date:</span>
          </td>
            <td style="justify-content:center;align-items:center;text-align: center; ">
                 <span style="font-size: 10px;">${feeDetail?.dueDate}</span>
          </td>
      </tr>

</table>
        

        <table style="width:60%;">
             <tr>
                <td style="justify-content:center;align-items:center;text-align: center; width:30%">
                     <span style="font-size: 10px;">Issue Date</span>
                </td>
                  <td style="justify-content:center;align-items:center;text-align: center;width:70%">
                      <span style="font-size: 10px;">${currentDate.day} - ${currentDate?.month} - ${currentDate.year}</span>
                </td>
            <tr>

        </table>

        
        <p style="text-align:center;font-size:10px;font-weight:bold">
                        Rs. 100 per day will be charged by bank after due date The Bank accepts both the Cheques and Cash Fee is accepted in all branches of Habib Metropolitan
                       <br/> SKANS
           </p>
        

        <div class="rw" style="width: 50%; align-items: center;">
            <span class="nm" style="font-size: 10px;">Name : </span>
            <span style="font-size: 10px;">${global?.user?.name}</span>
        </div>
        <div class="bold txtCenter" style="font-size: 18px;font-weight:bold;text-align:center;margin-top:10px">Fee Challan</div>
 
        <table style="width:100%">
             

               <tr>
                  <th>
                       <span class="nm" style="font-size: 10px;">Ch.No</span>
                  </th>
                  <th>
                       <span class="nm" style="font-size: 10px;">Billing Month</span>
                  </th>
                  <th>
                  <span class="nm" style="font-size: 10px;">Fine</span>
                     
                  </th>
                  <th>
                       <span class="nm" style="font-size: 10px;">Amount</span>
                  </th>
                    <th>
                      <span class="nm" style="font-size: 11px;">Description</span>
                  </th>
              </tr>

               <tr>
                  <td>
                       <span style="font-size: 11px;">${feeDetail?.chalanNumber}</span>
                  </td>
                  <td>
                      <span style="font-size: 11px;">${currentDate.month} ${currentDate.year}</span>
                  </td>
                  <td>
                   <span style="font-size: 11px;">0</span>
                     
                  </td>
                  <td>
                       <span style="font-size: 11px;">${feeDetail?.amount}</span>
                  </td>
                    <td>
                      <span style="font-size: 11px;">Tution Fee</span>
                  </td>
              </tr>

        </table>



        <table style="width:70%;margin-top:10px;align-self:center">

                 <tr>
                      <td style="font-weight:bold">
                          Grand total
                      </td>
                      <td style="font-weight:bold">
                      ${feeDetail?.amount}
                      </td>         
                </tr>
        </table>

       

        
          

     <table style="width:100%;margin-top:100px">

          <tr>
               <td style="width:20%">
               <div style="width:100%;border-width:thin;height:100px;marginTop:30px;justifyContent:flex-end; border:1px solid black;">

                    <p style="font-size: 8px"> Bank Stamp</p>
               </div>
    </td>
               <td style="width:10%;margin-left:10px">

                      <div style="width:100%;height:100px;marginTop:30px;border-bottom:1px solid black;border-bottom-width:thin">
            </div>
                      <p style="font-size: 8px">
                        Head of institution
                       </p>

               </td>

         </tr>


</table>

         

    </div>

`;

    const studentCopy = `
    
   
   
    <div class="body" style="border-right: 1px solid black;padding:5px">
        <div class="typeOfChalan" style="text-align: right;">Student copy</div>

        <table style=" ">
           <tr >
               <td style="width:50%">
                 <div class="right" >
                <div class="bold" style="font-size: 11px;color:black;font-weight:bold;width:100%; ">Habib Metropolitan Bank</div>
                <div class="bold" style="font-size: 11px;color:black;font-weight:bold">Ltd F8 markaz , branch</div>
                <div class="bold" style="font-size: 11px;color:black;font-weight:bold">Islamabad</div>
                <div class="bold" style="font-size: 11px;color:black;font-weight:bold">Corporate ID 382 ZAINAB K </div>
                <div class="bold" style="font-size: 11px;color:black;font-weight:bold">BAKHASH PVT LTD</div>
            </div>
               </td>

               <td style="width:50%;justify-content:center">
                         <div class="right" style="justifyContent:center;">
                <hr style="border-width:2px;border-color:black"/>
                <div class="bold" style="font-size: 18px; text-align: center;font-weight:bold;color:black">SKANS</div>
                <hr style=" border-width:2px;border-color:black"/>

            </div>
               </td>

           </tr>
        </table>
       

<table style="width:100%;border-collapse: collapse;table-layout: fixed;">

      <tr style="width:100%;word-wrap: break-word;align-items:center">
          <td style="justify-content:center;align-items:center;text-align: center;">
              <span style="font-size: 10px;">Session :</span>
          </td>
            <td colspan=2 style="justify-content:center;align-items:center;text-align: center; ">
                 <span style="font-size: 10px;">${global?.school?.SchoolName} - Sep 2024</span>
          </td>
            <td style="justify-content:center;align-items:center;text-align: center;">
               <span style="font-size: 10px; ">${classData[0]} - ${classData[1]}</span>
          </td>
            <td style="justify-content:center;align-items:center;text-align: center;">
              <span style="font-size: 10px;margin-right:20px">${classData[2]}</span>
          </td>
      </tr>

       <tr style="width:100%;align-items:center">
          <td style="justify-content:center;align-items:center;text-align: center;">
              <span style="font-size: 10px;">Challan # :</span>
          </td>
            <td  style="justify-content:center;align-items:center;text-align: center;">
                  <span style="font-size: 10px;">${feeDetail?.chalanNumber}</span>
          </td>
            <td style="justify-content:center;align-items:center;text-align: center;">
               <span style="font-size: 10px;">Due Date:</span>
          </td>
            <td style="justify-content:center;align-items:center;text-align: center; ">
                 <span style="font-size: 10px;">${feeDetail?.dueDate}</span>
          </td>
      </tr>

</table>
        

        <table style="width:60%;">
             <tr>
                <td style="justify-content:center;align-items:center;text-align: center; width:30%">
                     <span style="font-size: 10px;">Issue Date</span>
                </td>
                  <td style="justify-content:center;align-items:center;text-align: center;width:70%">
                      <span style="font-size: 10px;">${currentDate.day} - ${currentDate?.month} - ${currentDate.year}</span>
                </td>
            <tr>

        </table>

        
        <p style="text-align:center;font-size:10px;font-weight:bold">
                        Rs. 100 per day will be charged by bank after due date The Bank accepts both the Cheques and Cash Fee is accepted in all branches of Habib Metropolitan
                       <br/> SKANS
           </p>
        

        <div class="rw" style="width: 50%; align-items: center;">
            <span class="nm" style="font-size: 10px;">Name : </span>
            <span style="font-size: 10px;">${global?.user?.name}</span>
        </div>
        <div class="bold txtCenter" style="font-size: 18px;font-weight:bold;text-align:center;margin-top:10px">Fee Challan</div>
 
        <table style="width:100%">
             

               <tr>
                  <th>
                       <span class="nm" style="font-size: 10px;">Ch.No</span>
                  </th>
                  <th>
                       <span class="nm" style="font-size: 10px;">Billing Month</span>
                  </th>
                  <th>
                  <span class="nm" style="font-size: 10px;">Fine</span>
                     
                  </th>
                  <th>
                       <span class="nm" style="font-size: 10px;">Amount</span>
                  </th>
                    <th>
                      <span class="nm" style="font-size: 11px;">Description</span>
                  </th>
              </tr>

               <tr>
                  <td>
                       <span style="font-size: 11px;">${feeDetail?.chalanNumber}</span>
                  </td>
                  <td>
                      <span style="font-size: 11px;">${currentDate.month} ${currentDate.year}</span>
                  </td>
                  <td>
                   <span style="font-size: 11px;">0</span>
                     
                  </td>
                  <td>
                       <span style="font-size: 11px;">${feeDetail?.amount}</span>
                  </td>
                    <td>
                      <span style="font-size: 11px;">Tution Fee</span>
                  </td>
              </tr>

        </table>



        <table style="width:70%;margin-top:10px;align-self:center">

                 <tr>
                      <td style="font-weight:bold">
                          Grand total
                      </td>
                      <td style="font-weight:bold">
                      ${feeDetail?.amount}
                      </td>         
                </tr>
        </table>

       

        
          

     <table style="width:100%;margin-top:100px">

          <tr>
               <td style="width:20%">
               <div style="width:100%;border-width:thin;height:100px;marginTop:30px;justifyContent:flex-end; border:1px solid black;">

                    <p style="font-size: 8px"> Bank Stamp</p>
               </div>
    </td>
               <td style="width:10%;margin-left:10px">

                      <div style="width:100%;height:100px;marginTop:30px;border-bottom:1px solid black;border-bottom-width:thin">
            </div>
                      <p style="font-size: 8px">
                        Head of institution
                       </p>

               </td>

         </tr>


</table>

         

    </div>
`;


    const designToShow = `

<!DOCTYPE html>
  <html lang="en">
  <head>
   
   <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fee Challan</title>
         
  </head>


  <body class="main">
      <div class="body" style="margin:10px,width:100%">
           
         ${bankCopy}
           
         
      </div>
  </body>
  </html>
`;
    const main_design =
        `
     <!DOCTYPE html>
  <html lang="en">
  <head>
   
  <style>

   @page {
            size: A4 landscape;
          }
  </style>
   <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fee Challan</title>
         
  </head>


  <body class="main">
      <div class="body" style="margin:10px,">
           
        <table style="width:100%">
           <tr>
                <td>
                       ${bankCopy}
                </td>
                 <td>
                        ${schoolCopy}
                 </td>
                 <td>
                         ${studentCopy}
                  </td>
           </tr>
      </table>

     
           
         
      </div>
  </body>
  </html>
    `


    const createPDFw = async () => {

        let name = (new Date().getTime()).toString();


        let options = {
            html: main_design,
            fileName: name,
            directory: 'Documents',
            pageSize: 'A4',
            orientation: 'landscape',

        };

        let file = await RNHTMLtoPDF.convert(options)
        // console.log(file.filePath);
        Notifications.postLocalNotification({
            title: 'Download Complete',
            body: 'Tap to open the downloaded PDF',
            extra: { filePath: file.filePath },
        });
        // console.log(file);

    }


    const createPDF = async () => {

        let name = (new Date().getTime()).toString();
        let options = {
            html: main_design,
            fileName: 'challanFees-' + name,
            directory: 'Documents',
            pageSize: 'A4',
            orientation: 'landscape',
        };

        let file = await RNHTMLtoPDF.convert(options)
        // console.log(file.filePath);
        setGeneratedPdf(file.filePath)
        setModalPdfVisible(true);
        // alert(file.filePath);
    }


    Notifications.events().registerNotificationOpened((notification, completion) => {
        const { filePath } = notification.payload.extra;
        if (filePath) {
            FileViewer.open(filePath)
                .then(() => {
                    // success
                })
                .catch((error) => {
                    console.error('Failed to open file:', error);
                });
        }
        completion();
    });

    const renderView = {
        html: designToShow
    }

    const sharePdf = async () => {
        let pdfPath = generatedPdf;

        const options = {
            title: 'Share PDF',
            url: `file://${pdfPath}`,
            type: 'application/pdf',
            failOnCancel: false,
        };

        try {
            const result = await Share.open(options);
            // console.log(result);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to share PDF');
        }

    }


    return (
        <ScrollView style={style.main}>

            <Row style={style.rwBtn}>
                <Bold label='Fee chalan' style={{ alignSelf: 'center', justifyContent: 'space-between' }} />
                <TouchableOpacity onPress={() => createPDF()}>
                    <Icon name={'download'} size={25} color={colorsTheme.primary} style={{ alignSelf: 'center', }} />
                    <Label label="Download" size={10} style={{ alignSelf: 'center', marginTop: 5 }} />

                </TouchableOpacity>
            </Row>


            <View style={style.body}>
                <RenderHTML
                    contentWidth={width}
                    source={renderView}
                />
            </View>




            {/* <View style={{ width: '100%', height: 700, }}>



                  <Pdf
                    style={{ width: '100%', height: 600 }}
                    source={{ uri: generatedPdf, cache: true }}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                />  

            </View> */}

            <Modal isVisible={modalPdfVisible} onBackButtonPress={() => setModalPdfVisible(false)} >
                <View style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>
                    <Pdf
                        style={{ width: '100%', height: 600 }}
                        source={{ uri: generatedPdf, cache: true }}
                        onLoadComplete={(numberOfPages, filePath) => {
                            // console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            // console.log(`Current page: ${page}`);
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                        onPressLink={(uri) => {
                            console.log(`Link pressed: ${uri}`);
                        }}
                    />

                    <PrimaryButton label="share" color={'white'} height={50}
                        onclick={() => sharePdf()} />
                </View>
            </Modal>


        </ScrollView>
    )
}
export default Chalan;

{/* <View ref={viewRef} style={style.body}>
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

<Row style={{ alignItems: 'center' }}>
    <Label label="Session :" size={11} />
    <Label label={global?.school?.SchoolName + '- Sep 2024'} size={11} />
    <Label label={classData[0] + '-' + classData[1]} size={11} />
    <Label label={classData[2]} size={11} />
</Row>

<Row style={style.rw}>
    <Label label="Challan # :" size={11} />
    <Label label={feeDetail?.chalanNumber} size={11} />

    <Label label="Due Date:" size={11} />
    <Label label={feeDetail?.dueDate} size={11} />
</Row>

<Row style={{ width: '40%', marginBottom: 10 }}>
    <Label label="Issue Date" size={11} />
    <Label label={currentDate.day + ' - ' + currentDate?.month + ' - ' + currentDate.year} size={11} />
</Row>
<Bold label="Rs. 100 per day will be charged by bank after due date" size={11} color={'black'} />
<Bold label="The Bank accepts both the Cheques and Cash
Fee is accepted in all branches of Habib Metropolitan" size={11} color={'black'} style={style.txtCenter} />
<Bold label="SKANS" size={11} color={'black'} style={style.txtCenter} />

<Row style={{ width: '50%', alignItems: 'center' }}>
    <Label label="Name" style={style.nm} size={11} />
    <Label label={global?.user?.name} size={11} />
</Row>
<Bold label="Fee Challan" style={style.txtCenter} color={'black'} size={18} />

<Row>
    <View style={style.box}>
        <Label label="Ch.No" size={11} style={style.nm} />
        <Label label={feeDetail?.chalanNumber} size={11} />
    </View>

    <View style={style.box}>
        <Label label="Billing Month" size={11} style={style.nm} />
        <Label label={currentDate.month + ' ' + currentDate.year} size={11} />
    </View>

    <View style={style.box}>
        <Label label="Fine" size={11} style={style.nm} />
        <Label label="0" size={11} />
    </View>

    <View style={style.box}>
        <Label label="Amount" size={11} style={style.nm} />
        <Label label={feeDetail?.amount} size={11} />
    </View>

    <View style={style.box}>
        <Label label="Description" size={11} style={style.nm} />
        <Label label="Tution Fee" size={11} />
    </View>



</Row>


<Row style={{ ...style.rw, width: '50%', alignSelf: 'center' }}>
    <Bold label="Grand Total" color={'black'} />
    <Bold label={feeDetail?.amount} color={'black'} />
</Row>
</View> */}