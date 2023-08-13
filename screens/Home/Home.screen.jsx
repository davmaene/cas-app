import * as React from 'react';
import { StatusBar, View, Text, Animated, TouchableHighlight, Modal, TextInput, ScrollView } from 'react-native';
import { Colors } from '../../assets/colors/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Dims } from '../../assets/dimensions/Dimemensions';
import { btn, inputGroup } from '../../assets/styles/Styles';
import { AntDesign, Entypo, Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { Header } from '../../components/Header/comp.header';
import { Divider } from 'react-native-elements';
import { now } from '../../helpers/helpers.all';

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
                    <>
                        {canshow
                            ?
                            (
                                <View style={[inputGroup.container, { flexDirection: "row-reverse" }]}>
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
                            )
                            :
                            <></>
                        }
                        
                        <View View style={{ width: "100%", alignSelf: "center" }}>
                            <View style={{ width: "100%", height: 65, flexDirection: "column", marginTop: 10 }}>
                                <TouchableHighlight
                                    underlayColor={Colors.primaryColor}
                                    onPress={() => setcanshow(!canshow)}
                                    style={[{}, btn]}>
                                    <Text style={{ color: Colors.whiteColor, fontFamily: "mons-b" }}>{canshow ? "Annuler" : "Trouver un vol"}</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <Divider />
                        <>
                            <View style={{ paddingVertical: 5, marginTop: 20 }}>
                                <Text style={{ fontFamily: "mons-b", fontSize: Dims.titletextsize }}>Vols disponibles</Text>
                                <Text style={{ fontFamily: "mons-e" }}>Vols disponible pour | <Text>{now()}</Text></Text>
                            </View>
                            <View>

                            </View>
                        </>
                    </>
                </ScrollView>
            </View >
        </>
    )
}