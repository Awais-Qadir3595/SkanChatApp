import React from "react";
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Bold from "../../../components/core/bold";
import { styles } from "./style";
import { colorsTheme } from "../../../services/color";
import Row from '../../../components/core/Row';
import Label from '../../../components/core/Label';
import { Touchable } from "react-native";

const SkansSchoolList = ({navigation}) => {

    const schoolsNames = [
        { id: 1, name: 'Harley Street Campus', address: 'House No 53-B Harley Street Campus – Rawalpindi', email: 'school.info@skans.pk', mobile: '03328922225', telephone: '(+92)-51-5176138' },
        { id: 2, name: 'Junior Chakri Road Campus', address: 'Raja Bashir Plaza, Moza Hayal Ranail, Opposite Pir Mehar Ali Shah Town, Chakri Road Rawalpindi.', email: 'school.info@skans.pk', mobile:'03103331131', telephone: '051- 5575082' },
        { id: 3, name: 'Junior Westridge Campus', address: 'H.No. 9-B, Hali Road, Westridge-1, Rawalpindi', email: 'school.info@skans.pk', mobile:null, telephone: '051-8773091' },
        { id: 4, name: 'Senior westridge Campus', address: '91 Hali Road, Street no. 8, Westridge-1, Rawalpindi', email: 'school.info@skans.pk', mobile: null, telehone: '(051) 8355546' },
        { id: 5, name: 'Golra Mor Campus', address: 'Moaz Rd, Main Peshawar Rd, near Jamia Masjid Suqaina Golrah Morh, Islamabad', email: 'school.info@skans.pk', mobile:null, telephone: '(051) 2227475' },
        { id: 6, name: 'Peshawar Road Campus', address: 'House No. 308-A, Main Peshawar Road, Rawalpindi', email: 'school.info@skans.pk', mobile:null, telephone: '(051) 8890534' },
        { id: 7, name: 'SKANS PWD Campus', address: '233, Block A Sector A PWD, Islamabad, Punjab', email: 'school.info@skans.pk', mobile:null, telephone: '	(051) 8773775' },
        { id: 8, name: 'SKANS AECHS Campus', address: '337 Street 17, Sector 1 Airport Employees CHS, Rawalpindi', email: 'school.info@skans.pk', mobile:null, telephone: '(051) 8468475' },
        

    ];
    const renderSchools = ({ item }) => {
        return (
            <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('SchoolDescription',item)}>
                <Bold label={item.name} style={styles.heading}/>
               
            </TouchableOpacity>

        )
    }
    return (
        <View style={styles.main}>
            <Bold label="SKANS SCHOOLS" style={styles.heading} color={colorsTheme.primary} size={18} />
            <FlatList
                data={schoolsNames}
                numColumns={2}
                columnWrapperStyle={{ marginBottom: 15, justifyContent: 'space-between' }}
                renderItem={renderSchools}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

export default SkansSchoolList;