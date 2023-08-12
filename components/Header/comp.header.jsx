import * as React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Divider } from 'react-native-paper';
import { Colors } from '../../assets/colors/Colors';
import { appname, longappname } from '../../assets/configs/configs';

export const Header = ({ colors }) => {
    return(
        <>
            <StatusBar backgroundColor={ Colors.whiteColor } barStyle={ colors ? "dark-content" : "default" } />
            <View style={{ padding: 10, alignContent: "center", alignSelf: "center", marginTop: 12, height: 150, justifyContent: "center" }}>
                <Text style={{ fontFamily: "mons-b", textAlign: "center", fontSize: 20, color: colors ? colors : Colors.primaryColor }}>{appname} <Text>{longappname}</Text></Text>
                <Text style={{ textAlign: "center", fontFamily: "mons-e", color: colors ? colors : Colors.primaryColor }} >Faites vos booking, avec nous et vous ne serez jamais deçu</Text>
                <Divider style={{ marginVertical: 10, backgroundColor: Colors.whiteColor }} />
                {/* <Text style={{ textAlign: "center", fontFamily: "mons-e", color: colors ? colors : Colors.primaryColor }} >SOS Afia, vous permet de lancer une alerte et de sauver une vie grace à cette alerte, car elle permettra à un etablissement sanitaire d'être au courant d'un cas d'urgence </Text> */}
            </View>
        </>
    )
}