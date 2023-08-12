import * as React from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import { Colors } from '../../assets/colors/Colors';
import { appname, longappname } from '../../assets/configs/configs';

export const Header = ({ colors }) => {
    return (
        <>
            <StatusBar backgroundColor={Colors.whiteColor} barStyle={colors ? "dark-content" : "default"} />
            <View style={{ padding: 10, alignContent: "center", alignSelf: "center", marginTop: 12, height: 150, justifyContent: "center" }}>
                <Image source={require("../../assets/banner.png")} style={{ height: 80, resizeMode: "center" }} />
                <Text style={{ fontFamily: "mons-b", textAlign: "center", fontSize: 20, color: colors ? colors : Colors.primaryColor }}><Text>{longappname}</Text></Text>
                <Text style={{ textAlign: "center", fontFamily: "mons-e", color: colors ? colors : Colors.primaryColor }} >Faites vos bookings, avec nous et vous ne serez jamais deçu</Text>
                <View style={{ width: 160, paddingTop: 0,  alignSelf: "center", height: 10 }}>
                    <Divider style={{ marginVertical: 10, backgroundColor: Colors.primaryColor, marginHorizontal: 3 }} />
                </View>
            </View>
        </>
    )
}