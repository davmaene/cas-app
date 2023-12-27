import * as React from 'react';
import { StatusBar, View, Text, Animated, TouchableHighlight, Modal, TextInput, ScrollView } from 'react-native';
import { Colors } from '../../assets/colors/Colors';
import { Dims } from '../../assets/dimensions/Dimemensions';
import { SpinerStyle, btn, inputGroup, shadowBox } from '../../assets/styles/Styles';
import { AntDesign, Entypo, Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { Header } from '../../components/Header/comp.header';
import { Divider, Image } from 'react-native-elements';
import { flights, now, shuffleArray } from '../../helpers/helpers.all';
import { RefreshControl } from 'react-native';
import { FlatList } from 'react-native';
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
                    Toast.show({
                        type: 'error',
                        text1: 'Chargement',
                        text2: 'Erreur de chargement des services',
                    });
                }
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Chargement',
                    text2: 'Erreur de chargement des services',
                });
            }
        })
    }

    const __loadInfos = async () => {
        onLoadServices()
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
                        <View>

                        </View>
                        <View>

                        </View>
                        <View style={{ position: "absolute", zIndex: 100, padding: 5, bottom: -20, width: "100%", flexDirection: "row", alignContent: "center", alignItems: "center", justifyContent: "center" }} >
                            <TouchableHighlight
                                style={{
                                    padding: 8,
                                    height: 40,
                                    width: 40,
                                    borderRadius: 5,
                                    alignContent: "center",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: Colors.pillColor
                                }}
                                underlayColor={Colors.pillColor}
                                onPress={(e) => {
                                    alert("Entrees")
                                }}
                            >
                                <AntDesign name="arrowdown" size={Dims.iconsize} color={Colors.primaryColor} />
                            </TouchableHighlight>
                            <View style={{ padding: 12 }} />
                            <TouchableHighlight
                                style={{
                                    padding: 8,
                                    height: 40,
                                    width: 40,
                                    borderRadius: 5,
                                    alignContent: "center",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: Colors.pillColor
                                }}
                                underlayColor={Colors.pillColor}
                                onPress={(e) => {
                                    alert("Dettes")
                                }}
                            >
                                <MaterialIcons name="request-page" size={24} color={Colors.dangerColor} />
                            </TouchableHighlight>
                            <View style={{ padding: 12 }} />
                            <TouchableHighlight
                                style={{
                                    padding: 8,
                                    height: 40,
                                    width: 40,
                                    borderRadius: 5,
                                    alignContent: "center",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: Colors.pillColor
                                }}
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