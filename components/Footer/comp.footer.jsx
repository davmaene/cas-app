import * as React from 'react';
import { View, Text, Keyboard } from "react-native";
import { Colors } from '../../assets/colors/Colors';
import { appname, longappname } from "../../assets/configs/configs";

export const Footer = () => {
    const [shown, setshown] = React.useState(true);

    React.useEffect(() => {

        Keyboard.addListener("keyboardDidHide", e => {
            setshown(true)
        });
        Keyboard.addListener("keyboardDidShow", e => {
            setshown(false)
        });

    }, []);

    return(
        <>
        {
        shown 
        ? 
            <View style={{position: "absolute", bottom: "0%", width: "100%", backgroundColor: Colors.whiteColor, paddingVertical: 10, alignItems: "center", alignSelf: "center"}}>
                <Text style={{ fontFamily: "mons-e", fontSize: 10, textAlign: "center" }}>&copy; {appname} | {longappname} {new Date().getFullYear()} </Text>
            </View> 
        :
            <></> 
        }
        </>
    )
}