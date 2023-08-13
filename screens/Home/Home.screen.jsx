import * as React from 'react';
import { StatusBar, View, Text, Animated, TouchableHighlight, Modal, TextInput, ScrollView } from 'react-native';
import { Colors } from '../../assets/colors/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Dims } from '../../assets/dimensions/Dimemensions';
import { btn, inputGroup } from '../../assets/styles/Styles';
import { AntDesign, Entypo, Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { Header } from '../../components/Header/comp.header';

export const HomeScreen = ({ navigation }) => {
    
    const ref = React.useRef();
    const [canshow, setcanshow] = React.useState(false);

    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={Colors.whiteColor} />
            <View style={{ backgroundColor: Colors.whiteColor, flex: 1 }}>
                <Header colors={Colors.primaryColor} />
                <ScrollView
                    contentContainerStyle={{ paddingBottom: "20%" }}
                    style={{ paddingHorizontal: 20, marginTop: 20 }}
                >
                    <View style={[inputGroup.container, { flexDirection: "row-reverse", borderRadius: 60 }]}>
                        <TouchableHighlight
                            underlayColor={Colors.whiteColor}
                            onPress={() => { }}
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
                </ScrollView>
            </View>
        </>
    )
}