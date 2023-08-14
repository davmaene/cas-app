import * as React from 'react';
import { Title } from '../../components/Title/Title';
import { Dims } from '../../assets/dimensions/Dimemensions';
import { Divider, Image } from 'react-native-elements';
import { View, Text, TouchableHighlight } from 'react-native';
import { Colors } from '../../assets/colors/Colors';
import { AntDesign, Entypo, Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';


export const DetailflightScreen = ({ route, navigation }) => {
    const { item } = route['params'];
    const { from, to, dep, arr } = item;

    React.useEffect(() => {

    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <Title navigation={navigation} title={`${from} - ${to}`} subtitle={"Détails d'un vol"} />
            <View style={{ flexDirection: "column", alignContent: "center", alignItems: "center", justifyContent: "center", height: "auto", backgroundColor: Colors.whiteColor, marginTop: 10, borderRadius: Dims.borderradius, paddingHorizontal: 30 }}>
                <View style={{ width: "100%" }}>
                    <Image source={{ uri: item && item['src'] }} resizeMode='contain' style={{ width: "100%", height: 60, alignSelf: "center" }} />
                </View>
                <View style={{ width: "100%" }}>
                    <Divider style={{ marginVertical: 20 }} />
                    <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", alignContent: "center", alignItems: "center", alignSelf: "center" }}>
                        <View style={{ flexDirection: "column" }}>
                            <View>
                                <Text style={{ fontFamily: "mons-e", textAlign: "center", fontSize: Dims.subtitletextsize }}>{item && item['from']}</Text>
                            </View>
                            <View>
                                <Text style={{ fontFamily: "mons-b", textAlign: "center", fontSize: Dims.bigtitletextsize }}>{dep && dep['time']}</Text>
                            </View>
                            <View>
                                <Text style={{ fontFamily: "mons-e", textAlign: "center", fontSize: Dims.subtitletextsize }}>{dep && dep['date']}</Text>
                            </View>
                        </View>
                        <View>
                            <Ionicons name="ios-airplane" size={24} color={Colors.inactiveColor} />
                        </View>
                        <View style={{ flexDirection: "column" }}>
                            <View>
                                <Text style={{ fontFamily: "mons-e", textAlign: "center", fontSize: Dims.subtitletextsize }}>{item && item['to']}</Text>
                            </View>
                            <View>
                                <Text style={{ fontFamily: "mons-b", textAlign: "center", fontSize: Dims.bigtitletextsize }}>{arr && arr['time']}</Text>
                            </View>
                            <View>
                                <Text style={{ fontFamily: "mons-e", textAlign: "center", fontSize: Dims.subtitletextsize }}>{arr && arr['date']}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}