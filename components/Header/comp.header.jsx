import * as React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Divider } from 'react-native-paper';
import { Colors } from '../../assets/colors/Colors';

export const Header = ({ colors }) => {
    return(
        <>
            <StatusBar backgroundColor={ Colors.primaryColor } barStyle={ colors ? "light-content" : "default" } />
            <View style={{ padding: 10, alignContent: "center", alignSelf: "center", marginTop: 12, height: 150, justifyContent: "center" }}>
                <Text style={{ fontFamily: "mons-b", textAlign: "center", fontSize: 35, color: colors ? colors : Colors.primaryColor }}>SOS <Text>Afia.</Text></Text>
                <Text style={{ textAlign: "center", fontFamily: "mons-e", color: colors ? colors : Colors.primaryColor }} >Sauvez une vie en lançant un <Text style={{fontFamily: "mons"}}>SOS</Text>, en cas d'une urgence sanitaire </Text>
                <Divider style={{ marginVertical: 10, backgroundColor: Colors.whiteColor }} />
                <Text style={{ textAlign: "center", fontFamily: "mons-e", color: colors ? colors : Colors.primaryColor }} >SOS Afia, vous permet de lancer une alerte et de sauver une vie grace à cette alerte, car elle permettra à un etablissement sanitaire d'être au courant d'un cas d'urgence </Text>
            </View>
        </>
    )
}