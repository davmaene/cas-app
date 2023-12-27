import * as React from 'react';
import { StatusBar, View, Text, Animated, TouchableHighlight, Modal, TextInput, ScrollView } from 'react-native';
import { Colors } from '../../assets/colors/Colors';
import { Dims } from '../../assets/dimensions/Dimemensions';
import { btn, inputGroup, shadowBox } from '../../assets/styles/Styles';
import { AntDesign, Entypo, Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { Header } from '../../components/Header/comp.header';
import { Divider, Image } from 'react-native-elements';
import { flights, now, shuffleArray } from '../../helpers/helpers.all';
import { RefreshControl } from 'react-native';
import { FlatList } from 'react-native';
import { handleSearch } from 'dm-handlesearch';
import { appname, longappname } from '../../assets/configs/configs';

export const HomeScreen = ({ navigation }) => {

    const ref = React.useRef();
    const [canshow, setcanshow] = React.useState(false);
    const [isloading, setisloading] = React.useState(false);
    const [flghts, setflights] = React.useState(shuffleArray({ array: flights }));
    const [temp, settemp] = React.useState([]);

    const renderItem = ({ item }) => {
        const { dep } = item;
        const { arr } = item;
        return (
            <>
                <TouchableHighlight
                    underlayColor={Colors.whiteColor}
                    onPress={() => navigation.navigate("detailflighht", { item })}
                >
                    <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", justifyContent: "center", height: 100, elevation: 3, backgroundColor: Colors.whiteColor, marginTop: 10, borderRadius: Dims.borderradius, paddingHorizontal: 10 }}>
                        <View style={{ width: "30%" }}>
                            <Image source={{ uri: item && item['src'] }} resizeMode='center' style={{ width: 70, height: 60 }} />
                        </View>
                        <View style={{ width: "60%" }}>
                            <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", alignContent: "center", alignItems: "center", alignSelf: "center" }}>
                                <View style={{ flexDirection: "column" }}>
                                    <View>
                                        <Text style={{ fontFamily: "mons-e", textAlign: "center", fontSize: Dims.subtitletextsize }}>{item && item['from']}</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontFamily: "mons-b", textAlign: "center" }}>{dep && dep['time']}</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontFamily: "mons-e", textAlign: "center", fontSize: Dims.subtitletextsize }}>{dep && dep['date']}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Ionicons name="ios-airplane" size={24} color="black" />
                                </View>
                                <View style={{ flexDirection: "column" }}>
                                    <View>
                                        <Text style={{ fontFamily: "mons-e", textAlign: "center", fontSize: Dims.subtitletextsize }}>{item && item['to']}</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontFamily: "mons-b", textAlign: "center" }}>{arr && arr['time']}</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontFamily: "mons-e", textAlign: "center", fontSize: Dims.subtitletextsize }}>{arr && arr['date']}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </>
        )
    }

    const onLoadFligts = async () => {
        setisloading(true);
        setflights(shuffleArray({ array: flights }));
        settemp(flights)
        setisloading(false);
    }

    const _performSearch = async ({ keyword }) => {
        setisloading(true);
        handleSearch({
            rows: temp,
            columns: ['from', 'to'],
            keyword,
            cb: ({ rows, length, keyword }) => {
                setisloading(false)
                console.log("Table is ==> ", length);
                setflights(rows)
            }
        })
    }

    React.useEffect(() => {
        onLoadFligts()
    }, [])

    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={Colors.whiteColor} />
            <View style={{ backgroundColor: Colors.whiteColor, flex: 1 }}>
                <View style={{ width: "100%", height: 200 }}>
                    <View style={{ height: 80, padding: 10, width: "100%", flexDirection: "row", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                        <View style={{ width: "60%" }}>
                            <Text style={{ fontFamily: "mons-b", fontSize: 25 }}>{appname}</Text>
                            <Text style={{ fontFamily: "mons" }}>{longappname} application surveillance de entrées et sorties</Text>
                        </View>
                        <View style={{ width: "40%" }}>

                        </View>
                    </View>
                    <View style={[shadowBox, { height: 140, backgroundColor: Colors.primaryColor, width: "95%", alignSelf: "center" },]}>

                    </View>
                </View>
                <View
                    style={{ paddingHorizontal: 20, marginTop: 20 }}
                >
                    <>
                        <Divider />
                        <>
                            <View style={{ paddingVertical: 5, marginTop: 20 }}>
                                <Text style={{ fontFamily: "mons-b", fontSize: Dims.titletextsize }}>Vols disponibles</Text>
                                <Text style={{ fontFamily: "mons-e" }}>Vols disponible pour | <Text>{now()}</Text></Text>
                            </View>
                            <View style={{}}>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ paddingBottom: "200%" }}
                                    refreshControl={<RefreshControl colors={[Colors.primaryColor]} refreshing={isloading} onRefresh={onLoadFligts} />}
                                    data={flghts}
                                    renderItem={renderItem}
                                />
                            </View>
                        </>
                    </>
                </View>
            </View>
        </>
    )
}