import * as React from 'react';
import { StatusBar, View, Text, Animated, TouchableHighlight, Modal, TextInput, ScrollView, RefreshControl, FlatList } from 'react-native';
import { Colors } from '../../assets/colors/Colors';
import { Dims } from '../../assets/dimensions/Dimemensions';
import { SpinerStyle, btn, inputGroup, shadowBox } from '../../assets/styles/Styles';
import { AntDesign, Entypo, Ionicons, Feather, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Header } from '../../components/Header/comp.header';
import { Divider, Image, Tab, TabView } from 'react-native-elements';
import { flights, now, shuffleArray } from '../../helpers/helpers.all';
import { handleSearch } from 'dm-handlesearch';
import { appname, longappname } from '../../assets/configs/configs';
import { onDeconnextion, onRunExternalRQST, onRunInsertQRY } from '../../services/communications';
import RNRestart from 'react-native-restart';
import Toast from 'react-native-toast-message';
import DialogBox from 'react-native-dialogbox';
import Spinner from 'react-native-loading-spinner-overlay';
import { Loader } from '../../components/Loader/comp.loader';

export const HomeScreen = ({ navigation }) => {

    const ref = React.useRef();
    const [canshow, setcanshow] = React.useState(false);
    const [isloading, setisloading] = React.useState(false);
    const [flghts, setflights] = React.useState(shuffleArray({ array: flights }));
    const [temp, settemp] = React.useState([]);
    const [services, setservices] = React.useState([])
    const [stores, setstores] = React.useState([])
    const [pos, setpos] = React.useState(0)

    const RenderItem = ({ item }) => {
        const {
            createdby,
            createdon,
            datastatus,
            deletedby,
            icon,
            modifiedby,
            service_id,
            storeid21,
            storename,
        } = item
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
                                        {/* <Text style={{ fontFamily: "mons-b", textAlign: "center" }}>{dep && dep['time']}</Text> */}
                                    </View>
                                    <View>
                                        {/* <Text style={{ fontFamily: "mons-e", textAlign: "center", fontSize: Dims.subtitletextsize }}>{dep && dep['date']}</Text> */}
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
                                        {/* <Text style={{ fontFamily: "mons-b", textAlign: "center" }}>{arr && arr['time']}</Text> */}
                                    </View>
                                    <View>
                                        {/* <Text style={{ fontFamily: "mons-e", textAlign: "center", fontSize: Dims.subtitletextsize }}>{arr && arr['date']}</Text> */}
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

    const handlDeconnexion = () => {
        ref.current.confirm({
            title: <Text style={{ fontFamily: "mons", fontSize: Dims.titletextsize }}>Déconnexion compte</Text>,
            content: [<Text style={{ fontFamily: "mons-e", fontSize: Dims.subtitletextsize, marginHorizontal: 25 }} >Vous êtes sur le point de vouloir vous déconnecter de se téléphone voulez-vous vraiement continuer </Text>],
            ok: {
                text: 'Continuer',
                style: {
                    color: Colors.primaryColor,
                    fontFamily: 'mons'
                },
                callback: () => {
                    onDeconnextion((err, done) => {
                        if (done) {
                            Toast.show({
                                type: 'success',
                                text1: 'Déconnexion',
                                text2: 'Vos informations sont supprimées avec succès !',
                            });
                            RNRestart.Restart()
                        } else {
                            Toast.show({
                                type: 'error',
                                text1: 'Déconnexion',
                                text2: 'Une erreur vient de se produire lors de la déconnexion !',
                            });
                        }
                    })
                }
            },
            cancel: {
                text: 'Annuler',
                style: {
                    color: Colors.darkColor,
                    fontFamily: "mons-e"
                }
            },
        });
    };

    const onLoadServices = async () => {
        setisloading(true)
        onRunExternalRQST({
            url: `?op=services`,
            method: "GET",
            type: 1,
            data: null
        }, (err, done) => {
            setisloading(false)
            if (done) {
                if (Array.isArray(done) && done.length > 0) {
                    setservices([...done])
                } else {
                    setservices([])
                    Toast.show({
                        type: 'error',
                        text1: 'Chargement',
                        text2: 'Erreur de chargement des services',
                    });
                }
            } else {
                setservices([])
                Toast.show({
                    type: 'error',
                    text1: 'Chargement',
                    text2: 'Erreur de chargement des services',
                });
            }
        })
    };

    const onLoadStores = async () => {
        setisloading(true)
        onRunExternalRQST({
            url: `?op=stores`,
            method: "GET",
            type: 1,
            data: null
        }, (err, done) => {
            setisloading(false)
            if (done) {
                if (Array.isArray(done) && done.length > 0) {
                    setstores([...done])
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Chargement',
                        text2: 'Erreur de chargement des services',
                    });
                    setstores([])
                }
            } else {
                setstores([])
                Toast.show({
                    type: 'error',
                    text1: 'Chargement',
                    text2: 'Erreur de chargement des services',
                });
            }
        })
    };

    const __loadInfos = async () => {
        onLoadServices()
        onLoadStores()
    }

    React.useEffect(() => {
        __loadInfos()
    }, [])

    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={Colors.whiteColor} />
            <View style={{ backgroundColor: Colors.whiteColor, flex: 1 }}>
                <View style={{ width: "100%", height: 200 }}>
                    <View style={{ height: 80, padding: 10, width: "100%", flexDirection: "row", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                        <View style={{ width: "60%" }}>
                            <Text style={{ fontFamily: "mons-b", fontSize: 25, color: Colors.darkColor }}>{appname} | Caisse</Text>
                            <Text style={{ fontFamily: "mons", color: Colors.darkColor }}>{longappname} application surveillance de entrées et sorties</Text>
                        </View>
                        <View style={{ width: "40%", flexDirection: "row", alignContent: "flex-end", alignItems: "flex-end", justifyContent: "flex-end" }}>
                            <TouchableHighlight
                                style={{
                                    padding: 8,
                                    height: 40,
                                    width: 40,
                                    borderRadius: 5,
                                    alignContent: "center",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: Colors.primaryColor
                                }}
                                underlayColor={Colors.primaryColor}
                                onPress={(e) => {
                                    navigation.navigate('profile')
                                }}
                            >
                                <AntDesign name="user" size={Dims.iconsize} color={Colors.whiteColor} />
                            </TouchableHighlight>
                            <View style={{ padding: 5 }} />
                            <TouchableHighlight
                                style={{
                                    padding: 8,
                                    height: 40,
                                    width: 40,
                                    borderRadius: 5,
                                    alignContent: "center",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: Colors.primaryColor
                                }}
                                underlayColor={Colors.primaryColor}
                                onPress={(e) => {
                                    handlDeconnexion()
                                }}
                            >
                                <AntDesign name="login" size={Dims.iconsize} color={Colors.whiteColor} />
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={[shadowBox, { height: 140, backgroundColor: Colors.primaryColor, width: "95%", alignSelf: "center" },]}>
                        <View style={{ width: "100%", height: "auto", padding: 15 }} >
                            <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }} >
                                <FontAwesome name="calendar" size={24} color={Colors.whiteColor} />
                                <View style={{ flexDirection: "column" }} >
                                    <Text style={{ fontFamily: "mons", fontSize: 11, paddingLeft: 10, color: Colors.whiteColor }} >{"Aujourd'hui"}</Text>
                                    <Text style={{ fontFamily: "mons-b", fontSize: 14, paddingLeft: 10, color: Colors.whiteColor }} >{now()}</Text>
                                </View>
                            </View>
                        </View>
                        <Divider style={{ width: "92%", alignSelf: "center" }} />
                        <View style={{ width: "100%", height: 80, padding: 10 }}>
                            <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", alignSelf: "center" }}>
                                <View style={{ width: "30%", height: 70 }} >
                                    <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", alignSelf: "center" }} >
                                        <Text style={{ textAlign: "center", fontFamily: "mons", color: Colors.whiteColor }} >Entrees</Text>
                                        <MaterialIcons name="arrow-drop-down" size={24} color={Colors.warningColor} />
                                    </View>
                                    <View style={{ alignSelf: "center" }} >
                                        <Text style={{ fontFamily: "mons-b", fontSize: 20, color: Colors.whiteColor }} >91919.45<Text style={{ fontFamily: "mons", fontSize: 13 }}>{" "}$</Text></Text>
                                    </View>
                                </View>
                                {/* <View style={{ paddingHorizontal: 5, borderRightColor: Colors.whiteColor, borderRightWidth: .4, height: 70 }} /> */}
                                <View
                                    style={{
                                        width: "40%",
                                        height: 70,
                                        paddingHorizontal: 5,
                                        borderRightColor: Colors.whiteColor,
                                        borderLeftColor: Colors.whiteColor,
                                        borderRightWidth: .4,
                                        borderLeftWidth: .4,
                                        height: 70
                                    }}
                                >

                                </View>
                                {/* <View style={{ paddingHorizontal: 5, borderRightColor: Colors.whiteColor, borderRightWidth: .4, height: 70 }} /> */}
                                <View style={{ width: "30%", height: 70 }} >
                                    <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", alignSelf: "center" }} >
                                        <Text style={{ textAlign: "center", fontFamily: "mons", color: Colors.whiteColor }} >Sorties</Text>
                                        <MaterialIcons name="arrow-drop-up" size={24} color={Colors.dangerColor} />
                                    </View>
                                    <View style={{ alignSelf: "center" }} >
                                        <Text style={{ fontFamily: "mons-b", fontSize: 20, color: Colors.whiteColor }} >786.45<Text style={{ fontFamily: "mons", fontSize: 13 }}>{" "}$</Text></Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ display: "none", position: "absolute", zIndex: 100, padding: 5, bottom: -20, width: "100%", flexDirection: "row", alignContent: "center", alignItems: "center", justifyContent: "center" }} >
                            <TouchableHighlight
                                style={[shadowBox, {
                                    padding: 8,
                                    height: 40,
                                    width: 40,
                                    borderRadius: 5,
                                    alignContent: "center",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: Colors.pillColor
                                }]}
                                underlayColor={Colors.pillColor}
                                onPress={(e) => {
                                    alert("Entrees")
                                }}
                            >
                                <AntDesign name="arrowdown" size={Dims.iconsize} color={Colors.primaryColor} />
                            </TouchableHighlight>
                            <View style={{ padding: 12 }} />
                            <TouchableHighlight
                                style={[shadowBox, {
                                    padding: 8,
                                    height: 40,
                                    width: 40,
                                    borderRadius: 5,
                                    alignContent: "center",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: Colors.pillColor
                                }]}
                                underlayColor={Colors.pillColor}
                                onPress={(e) => {
                                    alert("Dettes")
                                }}
                            >
                                <MaterialIcons name="request-page" size={24} color={Colors.dangerColor} />
                            </TouchableHighlight>
                            <View style={{ padding: 12 }} />
                            <TouchableHighlight
                                style={[shadowBox, {
                                    padding: 8,
                                    height: 40,
                                    width: 40,
                                    borderRadius: 5,
                                    alignContent: "center",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: Colors.pillColor
                                }]}
                                underlayColor={Colors.pillColor}
                                onPress={(e) => {
                                    alert("Sorties")
                                }}
                            >
                                <AntDesign name="arrowup" size={Dims.iconsize} color={Colors.primaryColor} />
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 20, marginTop: 50 }}>
                    <>
                        <Divider />
                        <ScrollView
                            contentContainerStyle={{ paddingBottom: "100%" }}
                            style={{ backgroundColor: Colors.whiteColor, width: Dims.width, alignSelf: "center" }}
                        >
                            <View style={{ paddingVertical: 5, marginTop: 20, marginBottom: 20, paddingHorizontal: 10 }}>
                                <Text style={{ fontFamily: "mons-b", fontSize: Dims.titletextsize }}>Services</Text>
                                <Text style={{ fontFamily: "mons-e" }}>situation de la caisse par service | <Text style={{ fontFamily: "mons-b", color: Colors.primaryColor }}>{now()}</Text></Text>
                            </View>
                            <View style={{ paddingHorizontal: 10 }} >
                                {services.length > 0 && (
                                    <Tab
                                        value={pos}
                                        onChange={setpos}
                                        indicatorStyle={{ backgroundColor: Colors.primaryColor, height: 2 }}
                                        // disableIndicator
                                        variant='default'
                                    >
                                        {services.map((ser, indx) => {
                                            const { service_name, service_id, entryextrafiled } = ser;
                                            return (<Tab.Item
                                                style={{ borderColor: Colors.primaryColor }}
                                                title={<Text style={{ padding: 10, color: Colors.primaryColor, fontFamily: "mons" }} >{service_name}</Text>}
                                                key={`${Math.random() * (parseInt(service_id))}`}
                                                onPress={() => { alert(1) }}
                                            />)
                                        })}
                                    </Tab>
                                )}
                            </View>
                            <TabView
                                value={pos}
                                onChange={setpos}
                            >
                                <TabView.Item style={{ backgroundColor: Colors.whiteColor, width: Dims.width, height: 600, paddingHorizontal: 10 }}>
                                    {stores.map((s, index) => {
                                        return <RenderItem item={s} key={index * Math.random()} />
                                    })}
                                </TabView.Item>
                                <TabView.Item style={{ backgroundColor: Colors.whiteColor, width: Dims.width, height: 600, paddingHorizontal: 10 }}>
                                    <Text h1>Favorite</Text>
                                </TabView.Item>
                            </TabView>
                        </ScrollView>
                    </>
                </View>
            </View>
            <DialogBox ref={ref} isOverlayClickClose={true} />
            <Spinner
                visible={isloading}
                textContent={
                    <View style={{ width: 300, alignSelf: "center" }} >
                        <Text style={{ fontFamily: "mons-b", fontSize: Dims.titletextsize, color: Colors.primaryColor, textAlign: "center" }}>Chargement ecnours...</Text>
                        <Text style={{ textAlign: "center", fontFamily: "mons-e", marginTop: 10, width: 180, alignSelf: "center", color: Colors.whiteColor }}>La synchronisation est encours veillez patienter le temps que nous le chargeent termine</Text>
                    </View>
                }
                animation='fade'
                color={Colors.primaryColor}
                size={"large"}
                overlayColor={`rgba(0, 0, 0, .8)`}
                customIndicator={<Loader size={50} color={Colors.primaryColor} />}
                textStyle={[SpinerStyle, { color: Colors.primaryColor }]}
            />
        </>
    )
}