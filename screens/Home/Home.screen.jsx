import * as React from 'react';
import { StatusBar, View, Text, Animated, TouchableHighlight, Modal, TextInput } from 'react-native';
import { Colors } from '../../assets/colors/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Dims } from '../../assets/dimensions/Dimemensions';
import { Loaderonsignalsent } from '../../components/Loaderonsignalsent/Loaderonsignlasent';
import FadeInOut from 'react-native-fade-in-out';
import { btn, inputGroup } from '../../assets/styles/Styles';
import { AntDesign, Entypo, Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { Title } from '../../components/Title/Title';
import { Footer } from '../../components/Footer/comp.footer';
import * as Location from 'expo-location';
import DialogBox from 'react-native-dialogbox';
import { appname, umergencyphonenumber } from '../../assets/configs/configs';
import { onRunExternalRQST } from '../../services/communications';
import Toast from 'react-native-toast-message';
import { Loader } from '../../components/Loader/comp.loader';
import * as Linking from "expo-linking";
import { toastConfig } from '../../assets/Toast/Toastconfig';

const bradius = 100;
const aradius = 130;
const r = aradius / 2;

export const HomeScreen = ({ navigation }) => {
    const ref = React.useRef();


    return (
        <View style={{ backgroundColor: Colors.whiteColor, flex: 1 }}>
            <StatusBar barStyle={"dark-content"} backgroundColor={Colors.whiteColor} />
            <View style={{ paddingHorizontal: 20 }}>
                <View style={[inputGroup.container, { flexDirection: "row-reverse", borderRadius: 60 }]}>
                    <TouchableHighlight
                        underlayColor={Colors.whiteColor}
                        onPress={() => {}}
                        style={[inputGroup.iconcontainer, { backgroundColor: Colors.pillColor }]}
                    >
                        <Ionicons name={"search"} size={Dims.iconsize} color={Colors.primaryColor} />
                    </TouchableHighlight>
                    <View style={[inputGroup.inputcontainer, { width: "80%" }]}>
                        <TextInput placeholder='Entrer un mot de recherche ici...' enablesReturnKeyAutomatically onChangeText={(t) => setpassword(t)} style={[inputGroup.input, { fontFamily: "mons" }]} />
                    </View>
                    <View style={[inputGroup.iconcontainer, { backgroundColor: Colors.primaryColor }]}>
                        <Entypo name="lock" size={Dims.iconsize} color={Colors.whiteColor} />
                    </View>
                </View>
            </View>
        </View>
    )
}