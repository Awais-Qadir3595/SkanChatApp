

import React, { useState } from 'react';
import { FlatList, Touchable, TouchableOpacity ,} from 'react-native';
import { Button, StyleSheet, Text, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { readFile } from 'react-native-fs';
import * as XLSX from 'xlsx';
import Label from '../../components/core/Label';
import Row from '../../components/core/Row';
import { colorsTheme } from '../../services/color';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';
const App = () => {
  const [data, setData] = useState([]);
  const [schoolsName,setSchoolNames]=useState([]);
const [classNames,setClassName]=useState([]);



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
            id:jsonData[i][0],
          campus: jsonData[i][7],
          class:jsonData[i][5],
          section:jsonData[i][6],
          name:jsonData[i][1]
        };
        temp.push(object);
       console.log(object);
       // console.log();
      }
      
      setData(temp);
      notifyEveryUser(temp);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User cancelled the picker');
      } else {
        console.error('Error reading file:', error);
      }
    }
  };

  const notifyEveryUser = (data) => {
    // Your notification logic here using the `data` array
  };

  const renderData=({item,index})=>{
    return(

        <Row style={styles.rw}>

              <Label label={index+1} />
              <Label label={item.campus} />
            <Label label={item.class}/>
            <Label label={item.section}/>
            <Label label={item.id}/>
          
            </Row>
    )
  }

  
 const generateRandomNumber = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  
 
  const insertAllSchools=async()=>{

    console.log(schoolsName);
     
 console*('//////////////// inserting ////////////////')
    for (let i=0;i<schoolsName.length;i++)
      {
        let dateTime=new Date().getTime();
        let sid = 'sid-' + dateTime;
       console.log('school name = ',schoolsName[i]?.campus);
        let SchoolName=schoolsName[i].campus;
        await firestore()
        .collection('schools')
        .doc(sid)
        .set({
          SchoolName,
          sid,
        })
        .then(async() => {
           console.log('enter in school');
           let system_id=generateRandomNumber();
           let password=schoolsName[i].campus;
           let name=schoolsName[i].campus;
           let role='Admin'
            await firestore()
            .collection('user')
            .doc(sid)
            .set({
               id:new Date().getTime(),
               system_id,
               password,
               name,
               role,
               sid,
            })
            .then(() => {
               
               console.log('enter user',[i]);
              
             
           
              
              
            });
       
        });
      }

      Toast.show('Schools Added');
  }
const insertAllClasses = async () => {

    console.log(classNames.length);
 
  const peopleinSchool = classNames.filter(obj => obj.campus === 'Golra College');
console.log(peopleinSchool.length);
   

    for(let i=0;i<peopleinSchool.length;i++){

    
      
      let id = 'class-' + new Date().getTime();
      let sid = 'sid-1716794747574'
      let password = peopleinSchool[i].class;
      let CName=peopleinSchool[i].class+'-'+peopleinSchool[i].section;
      let system_id=generateRandomNumber();
 
      let role = 'Class'
      await firestore()
        .collection('user')
        .doc(id)
        .set({
          CName,
          system_id,
          password,
          id:new Date().getTime(),
          sid,
          role,
          cid:id
        })
        .then(async () => {
          await firestore()
            .collection('class')
            .doc(id)
            .set({
              CName,
              id,
              sid,
            })
            .then(() => {
             
            
               console.log('added = ',[i]);

            });
          

        });


      }
      Toast.show('user Added');
  };

  const removeDuplicatesSchools = () => {

    const uniqueArray = data.reduce((acc, current) => {
      const x = acc?.find(item => 
        item.campus === current.campus 
      
      );
      if (!x) {
        acc?.push(current);
      }
      return acc;
    }, []);
    // return uniqueArray;
    console.log('length = ',uniqueArray.length);
    setSchoolNames(uniqueArray)

  };
  const removeDuplicatesClasses = () => {
    const uniqueArray = data.reduce((acc, current) => {
      const x = acc?.find(item => 
        item.campus === current.campus &&
        item.class === current.class &&
        item.section === current.section 
      
      );
      if (!x) {
        acc?.push(current);
      }
      return acc;
    }, []);
    // return uniqueArray;
    console.log('length = ',uniqueArray.length);
    setClassName(uniqueArray);

  };
  

  

 

const getCid=async(sid,cname)=>
{
  // console.log('in function');
  // console.log(sid);
  // console.log(cname);

let sd=null;
  await firestore()
  .collection('class')
  .where('sid', '==', sid)
  .where('CName', '==', cname)
  .get()
  .then(querySnapshot => {
    //  console.log(querySnapshot.size, 'sizee======');
   if(querySnapshot.size==1)
    querySnapshot.forEach(documentSnapshot => {
      // console.log(documentSnapshot?.data()?.id);
      sd=documentSnapshot?.data()?.id
      
    })
  });
// console.log(sd);
return sd;

  
}
const searchstudent=async()=>{

  // await firestore()
  // .collection('user')
  // .where('role', '==', 'Class')
 
  // .get()
  // .then(querySnapshot => {
  //   console.log(querySnapshot.size, 'sizee======')
    // querySnapshot.forEach(data=>
    //   {
    //     console.log(data._data);
    //   }
    // )
  
    
  // });

  // const usersRef = firestore().collection('user');
  // const snapshot = await usersRef.where('role','==','User').get();

  // const batch = firestore().batch();

  // snapshot.forEach(doc => {
  //   batch.delete(doc.ref);
  // });

  // await batch.commit();
  // console.log('All users with role User have been deleted.');

}
const insertAllStudents=async()=>{

// console.log('mhrrr');
  const peopleinSchool = data.filter(obj => obj.campus === 'Golra College');
console.log(peopleinSchool.length);
 
  for(let i=0;i<peopleinSchool.length;i++)
    {
      // console.log(data[i].class+'-'+data[i].section);
  
  let name=peopleinSchool[i].name;
  let system_id=peopleinSchool[i].id;
let password=generateRandomNumber();
let id='id-' + new Date().getTime();
let sid='sid-1716794747574';
let role='User';
// console.log(sid,peopleinSchool[i].class+'-'+peopleinSchool[i].section);
let cid=await getCid(sid,peopleinSchool[i].class+'-'+peopleinSchool[i].section);
  // console.log('return wali = ',cid);
 
  await firestore()
  .collection('user')
  .doc(id)
  .set({
    name,
    system_id,
    password,
    id,
    sid,
    role,
    cid,
  })
  .then(() => {
   
    
  });

  console.log(i);
}

Toast.show('students Added');
}
 

async function convertFieldsToString() {
  try {
    const snapshot = await firestore().collection('fee').get();

    snapshot.forEach(async (doc) => {
      const data = doc.data();
      const id = data.studentId;
     

      // Check if the fields are numbers and convert them to strings
      if (typeof id === 'number') {
        const newId = id.toString();
      

        // Update the document
        await doc.ref.update({
          studentId: newId,
       
        });

        console.log(`Updated document ${doc.id}`);
      }
    });

    console.log('Conversion completed');
  } catch (error) {
    console.error('Error converting fields: ', error);
  }
}


const resolveCidIssue=()=>{


}
 


  return (
    <View style={styles.main}>
       
       <Row style={styles.rw}>
       <TouchableOpacity style={styles.btn} onPress={generate}>
        <Label label='Upload File' color='white'/>
      </TouchableOpacity>

      <Text>Loaded Records: {data?.length}</Text>
       </Row>
     
     <FlatList 
     data={data}
     renderItem={renderData}
     />


  <TouchableOpacity style={styles.btn} onPress={()=>removeDuplicatesClasses()}>
        <Label label='Remove duplicate' color='white'/>
      </TouchableOpacity> 
{/* 
      <TouchableOpacity style={styles.btn} onPress={()=>insertClasses()}>
        <Label label='insert All Values' color='white'/>
      </TouchableOpacity> */}
      
      
      {/* <TouchableOpacity style={styles.btn} onPress={()=>removeDuplicatesSchools()}>
        <Label label='Remove Schools' color='white'/>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.btn} onPress={()=>insertAllSchools()}>
        <Label label='insert Schools' color='white'/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={()=>insertAllClasses()}>
        <Label label='insert Classes' color='white'/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={()=>insertAllStudents()}>
        <Label label='insert All User' color='white'/>
      </TouchableOpacity>
     

      <TouchableOpacity style={styles.btn} onPress={()=>searchstudent()}>
        <Label label='searchStu' color='white'/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={()=>resolveCidIssue()}>
        <Label label='resolve cid issue' color='white'/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={()=>convertFieldsToString()}>
        <Label label='change to string' color='white'/>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles=StyleSheet.create({
    main:{
        flex:1,alignItems:'center',
    },
    btn:{
        alignSelf:"center",backgroundColor:'pink',margin:10,padding:10,borderRadius:10,
        backgroundColor:colorsTheme.primary
    },
    rw:{
        alignItems:'center',marginTop:10
    }
})

/////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from 'react';
// import { Alert, ScrollView, Touchable, TouchableOpacity } from 'react-native';
// import { View, Text, Button } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';
// import { readFile, writeFile } from 'react-native-fs';
// import XLSX from 'xlsx';
// import Row from '../../components/core/Row';
// import firestore from '@react-native-firebase/firestore';
// import SendNotification from '../../hooks/notification';

// // import csvToJson from 'convert-csv-to-json';

// const ShareFile = () => {

//     console.log('//////////////////');
//     console.log(dataSet);
//     console.log('//////////////////////////////////');
//     let ids = [];
//     const [dataSet, setData] = useState(null);


//     const generate = async () => {
//         const res = await DocumentPicker.pick({
//             type: [DocumentPicker.types.allFiles],
//         });

//         console.log(res);

//         const fileUri = res[0].uri;
//         readFile(res[0].uri, 'ascii').then(res => {
//             const wb = XLSX.read(res, { type: 'binary' });
//             const wsname = wb.SheetNames[0];
//             const ws = wb.Sheets[wsname]
//             const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

//             console.log('-------------------------------');
//             console.log(data);
//             console.log('length = ',data.length);
//             console.log('------------------------------');
//             setData(data);
            
//             var temp = [];
//             for (let i = 1; i < data.length; ++i) {

//                 let object = {
//                     id: data[i][0],
//                     message1: data[i][1],
//                     name: data[i][2],
//                     message2: data[i][3],
//                     challanNo: data[i][4],
//                     messageDate: data[i][5],
//                     lastDate: data[i][6],

//                 };
//                 // console.log(data[i][0]);
//                 ids.push(object);




//             }
//             notifyEveryUser();
//         })
//         //  console.log('file uri', fileUri);

//     }

//     const checkIfUserExist = async (data) => {

//         // console.log('...//////.....');
//         //  console.log('id = is = ',id);

//         //  const idAsInt = parseInt(id, 10); // base 10

//         // const querySnapshot = await firestore()
//         // .collection('user')
//         // .where('system_id', '==', id)
//         // .get();

//         // console.log('the data is');
//         // querySnapshot.forEach(documentSnapshot => {
//         //     console.log(documentSnapshot?.data());
//         //   });

//         await firestore()
//             .collection('user')
//             .where('system_id', '==', data.id.toString())
//             .get()
//             .then(querySnapshot => {
//                 // console.log(querySnapshot.size);
//                 if (querySnapshot.size > 0) {
//                     querySnapshot.forEach(documentSnapshot => {
//                         console.log(documentSnapshot.data().token);
//                         let token = documentSnapshot.data().token;
//                         // console.log(data.name);

//                         //   setSchoolData(documentSnapshot.data());
//                         SendNotification(token, 'this is message for fees ', 'Fee Submission');
//                     });
//                 } else {

//                 }
//             });

//     }
//     const notifyEveryUser = async () => {



//         for (let i = 0; i < ids.length; i++) {

//             let success = await checkIfUserExist(ids[i])

//         }


         
//         await firestore()
//             .collection('user')
//             .where('system_id', '==', global?.user?.id)
//             .onSnapshot(querySnapshot => {
//                 const arr = [];
//                 querySnapshot.forEach(documentSnapshot => {

//                     arr?.push(documentSnapshot.data().token);
//                     SendNotification(
//                         documentSnapshot.data().token,
//                         'aws',
//                         'SKANS',
//                     );
//                 });
//                 // setListOfToken(arr);
//             });

//         // SendNotification(
//         //     global?.user?.token,
//         //     message,
//         //     'SKANS',
//         // );
//     };


//     return (

//         <View style={{ flex: 1, backgroundColor: 'white', }}>

//             <TouchableOpacity onPress={() => generate()}
//                 style={{ padding: 10, backgroundColor: 'lightgray', borderWidth: 1 }}>
//                 <Text style={{ color: 'black' }}>pick file</Text>
//             </TouchableOpacity>
//             {
//                 dataSet?.map((item) => {
//                     const baseDate = new Date('1899-12-30');
//                     const milliseconds = item[6] * 24 * 60 * 60 * 1000;
//                     let str = item[1] + item[0] + 'due date' + item[3] + 'is' + item[6];
//                     const date = new Date(baseDate.getTime() + milliseconds);
//                     const options = { day: 'numeric', month: 'long', year: 'numeric' };
//                     const formattedDate = date.toLocaleDateString('en-GB', options);
//                     return (
//                         <Row style={{ padding: 10 }}>
//                             <Text style={{ color: 'black' }}>{item[1] + item[2] + 'due date' + item[3] + 'is' + formattedDate}</Text>
//                             {/* <Text>{item[1]}</Text>
//                                 <Text>{item[2]}</Text> */}
//                         </Row>
//                     )
//                 })
//             }

//         </View>
//     );
// };

// export default ShareFile;
