import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Linking, Image, ScrollView } from 'react-native';
import Bold from "../../../components/core/bold";
import { styles } from "./style";
import { colorsTheme } from "../../../services/color";
import Row from '../../../components/core/Row';
import Label from '../../../components/core/Label';
import Fontawesome from 'react-native-vector-icons/dist/FontAwesome';
import { mvs } from "../../../services/metrices";

const SchoolDescription = (props) => {
    console.log('qqq', props.route.params.pics);
    const picsArray = props?.route?.params?.pics;

    const [data, setData] = useState(props?.route?.params)
    console.log(data.mobile);
    const renderSchools = ({ item }) => {
        return (
            <TouchableOpacity style={styles.box}  >
                <Bold label={item.name} style={styles.heading} />

            </TouchableOpacity>

        )
    }
    const onWhatsapp = () => {
        Linking.openURL(`https://wa.me/${data.mobile}`);
    }



    const renderBanners = ({ item }) => {


         

        return (
            <Image
                resizeMode="contain"
                style={{
                    height: mvs(200),
                    width: 270,
                    borderRadius: 10,
                    margin: mvs(10),
                }}
                source={item}
            />
        )


    }


    return (
        <View style={styles.main}>
            {
                data?.mobile != null ?
                    <TouchableOpacity style={styles.whatsapp} onPress={() => onWhatsapp()}>
                        <Fontawesome name="whatsapp" size={60} color="green" />

                    </TouchableOpacity> :
                    null
            }

            <Bold label={data?.name} style={styles.heading} color={colorsTheme.primary} size={18} />


            
            <View style={styles.boxView}>

            <FlatList
                style={styles.banner}
                horizontal
                data={picsArray}
                renderItem={renderBanners}
            />
            
                <Row style={styles.rowBox}>
                    <View style={styles.left}>
                        <Bold label="Address" />

                    </View>
                    <View style={styles.right}>
                        <Label label={data.address} />

                    </View>
                </Row>
                <Row style={styles.rowBox}>
                    <View style={styles.left}>
                        <Bold label="Email" />

                    </View>
                    <View style={styles.right}>
                        <Label label={data.email} />

                    </View>
                </Row>

                <Row style={styles.rowBox}>
                    <View style={styles.left}>
                        <Bold label="Mobile" />

                    </View>
                    <View style={styles.right}>
                        {
                            data.mobile == null ?
                                <Label label={'N/A'} /> :
                                <Label label={data.mobile} />


                        }

                    </View>
                </Row>

                <Row style={styles.rowBox}>
                    <View style={styles.left}>
                        <Bold label="Telephone" />

                    </View>
                    <View style={styles.right}>
                        <Label label={data.telephone} />

                    </View>
                </Row>



            </View>

        </View>
    )
}

export default SchoolDescription;