import * as React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '../../assets/colors/Colors';
import { appname } from '../../assets/configs/configs';
import { Dims } from '../../assets/dimensions/Dimemensions';
import { Footer } from '../../components/Footer/comp.footer';
import { Title } from '../../components/Title/Title';

export const AboutScreen = ({ navigation }) => {
    return(
        <View style={{ backgroundColor: Colors.whiteColor, flex: 1 }}>
            <Title 
                title={`A propos de ${appname}`} 
                subtitle={`Ce qu'il faut savoir sur ${appname}`} 
                navigation={undefined} 
            /> 
            <View style={{ padding: 20, alignSelf: "center" }}>
                <Text style={{ fontFamily: "mons-b", fontSize: Dims.bigtitletextsize, textAlign: "center" }}>A propos de {appname}</Text>
                <Text style={{ textAlign: "center", fontFamily: "mons-e" }} >{appname} est une application ...</Text>
            </View>  
            <Footer/>
        </View>
    )
}