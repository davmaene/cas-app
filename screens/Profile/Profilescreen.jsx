import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { View, Text, TouchableHighlight, ScrollView, StatusBar } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Colors } from '../../assets/colors/Colors';
import { AntDesign, Entypo, Ionicons, Feather, MaterialIcons, Fontisto, FontAwesome, FontAwesome5, MaterialCommunityIcons, Zocial, Octicons } from '@expo/vector-icons';
import { Dims } from '../../assets/dimensions/Dimemensions';
import DialogBox from 'react-native-dialogbox';
import Toast from 'react-native-toast-message';
import { onDeconnextion, onRunExternalRQST, onRunInsertQRY, onRunRemoveQRY } from '../../services/communications';
import * as Updates from 'expo-updates';
import * as Linking from 'expo-linking';
import { appname, baseURL, endpoint } from '../../assets/configs/configs';
import { emailValidator, returnInitialOfNames } from '../../assets/helpers/helpers.helpers';
import { Footer } from '../../components/Footer/comp.footer';
import { SpinerStyle, containerIcon } from '../../assets/styles/Styles';
import Spinner from 'react-native-loading-spinner-overlay';
import { Loader } from '../../components/Loader/comp.loader';
import { nowInInix } from '../../assets/helpers/helpers.all';
import RNRestart from 'react-native-restart';

export const ProfileScreen = ({ navigation }) => {

    if (user && !emailValidator({ email: user['email'] })) user['email'] = "#"
    const user = global && global['user'];
    const type = global && global['type'];
    const ref = React.useRef();
    const [showmore, setshowmore] = React.useState(true);
    const [isloading, setisloading] = React.useState(false);

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

    const handlEraseAllFiles = async () => {
        ref.current.confirm({
            title: <Text style={{ fontFamily: "mons", fontSize: Dims.titletextsize }}>Suppression</Text>,
            content: [<Text style={{ fontFamily: "mons-e", fontSize: Dims.subtitletextsize, marginHorizontal: 25 }} >Vous êtes sur le point de vouloir supprimer toute votre historique </Text>],
            ok: {
                text: 'Continuer',
                style: {
                    color: Colors.primaryColor,
                    fontFamily: 'mons'
                },
                callback: () => {
                    setisloading(true)
                    onRunRemoveQRY({
                        table: '__tbl_historiques',
                        clause: ' where id <> 0'
                    }, (err, done) => {
                        setisloading(false)
                        if (done) {
                            Toast.show({
                                type: 'success',
                                text1: 'Suppression',
                                text2: 'Votre historique a été supprimé avec succès !',
                            });
                        } else {
                            Toast.show({
                                type: 'error',
                                text1: 'Suppression',
                                text2: 'Une erreur vient de se produire lors de la suppression des vos informations',
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

    const handleSynchronisation = async () => {
        const { lsname, fsname, email, phone } = user;
        const table = "__tbl_historiques";

        setisloading(true);
        onRunExternalRQST({
            url: `/users/user/gethistory/${phone}`,
            method: `GET`
        }, (err, done) => {
            if (done) {
                const { message, status, data } = done;
                if (status === 200) {
                    onRunRemoveQRY({
                        table,
                        clause: ' where id <> 0'
                    }, (err, d) => {
                        if (d) {
                            const { rows, count } = data;
                            rows.forEach(h => {
                                const { ref: refsaved, dayin, dayout, ellapsedtowork, observation, createdon, dayclosed } = h
                                const chaine = JSON.stringify(h)
                                onRunInsertQRY({
                                    table,
                                    columns: `'dayin', 'dayout', 'observation', 'dayclosed', 'ellapsedtowork', 'chaine', 'ref', 'crearedon', 'crearedonunix', 'status'`,
                                    dot: "?, ?, ?, ?, ?, ?, ?, ?, ?, ?",
                                    values: [dayin.toString(), dayout.toString(), observation.toString(), dayclosed.toString(), ellapsedtowork.toString(), chaine, refsaved.toString(), createdon, nowInInix({}), 0]
                                }, (err, insert) => {
                                    console.log("Line from synch is ==> ", err, insert);
                                })
                            });
                            setisloading(false);
                        } else {
                            setisloading(false)
                            Toast.show({
                                type: 'error',
                                text1: 'Synchronisation',
                                text2: 'Une erreur vient de se produire lors de la synchronisation',
                            });
                        }
                    })
                } else {
                    setisloading(false)
                    Toast.show({
                        type: "error",
                        text1: "Synchronisation",
                        text2: "Une erreur vient de se produire lors de la synchronisation"
                    })
                }
            } else {
                setisloading(false)
                Toast.show({
                    type: "error",
                    text1: "Synchronisation",
                    text2: "Une erreur vient de se produire lors de la synchronisation"
                })
            }
        })
    };

    React.useEffect(() => {
    }, [])

    return (
        <>
            <StatusBar animated={true} barStyle={'light-content'} backgroundColor={Colors.primaryColor} />
            <View style={{ flexDirection: "row", paddingTop: 10, backgroundColor: Colors.primaryColor, paddingHorizontal: 12, alignContent: "center", alignItems: "center", justifyContent: "space-between", paddingVertical: 10 }}>
                <Text style={{ fontFamily: "mons", fontSize: Dims.titletextsize, paddingLeft: 10, color: Colors.whiteColor }}>Profile </Text>
                {/* <TouchableHighlight
                    style={{ padding: 5, flexDirection: "row", alignContent: "center", alignItems: "center" }}
                    onPress={() => navigation.navigate("edit-profile")}
                    underlayColor={"transparent"}
                >
                    <>
                        <AntDesign name="edit" size={Dims.iconsize} color={Colors.pillColor} />
                    </>
                </TouchableHighlight> */}
            </View>
            <LinearGradient
                colors={[Colors.primaryColor, Colors.primaryColor]}
                style={{ width: "100%", height: "auto", paddingBottom: 20, flexDirection: "row", alignContent: "center", alignItems: "center", paddingTop: 10 }}
            >
                {user && user['id'] && (
                    <View style={{ width: "100%", alignContent: "center", alignItems: "center", flexDirection: "column", paddingHorizontal: 20 }}>
                        <Avatar
                            source={{ uri: `${baseURL}/${user && user['photo']}` }}
                            rounded
                            // title={<Text style={{ fontFamily: "mons-b", textTransform: "uppercase", color: Colors.primaryColor }}>{returnInitialOfNames({ fsname: user && user['fullname'], lsname: user && user['fullname'] })}</Text>}
                            size={60}
                            containerStyle={{ backgroundColor: Colors.pillColor, borderColor: Colors.primaryColor }}
                        />
                        <View style={{ marginTop: 10, alignContent: "center", alignItems: "center" }}>
                            <Text style={{ fontFamily: "mons-b", fontSize: Dims.titletextsize, textTransform: "uppercase", color: Colors.pillColor }}>{user && user['fullname']}</Text>
                            <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                                {/* <Zocial name="call" size={Dims.iconsize - 5} color={Colors.whiteColor} /> */}
                                <Text style={{ fontFamily: "mons", textTransform: "capitalize", color: Colors.pillColor, fontSize: Dims.subtitletextsize, paddingHorizontal: 5, textAlign: "center" }}>
                                    {user && user['username']}
                                </Text>
                            </View>
                            {/* {showmore &&
                                (
                                    <View>
                                        {user && user['email'] && emailValidator({ email: user && user['email'] }) &&
                                            (
                                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", alignSelf: "center" }}>
                                                    <MaterialIcons name="email" size={Dims.iconsize - 5} color={Colors.whiteColor} />
                                                    <Text style={{ fontFamily: "mons", color: Colors.pillColor, fontSize: Dims.subtitletextsize - 2, paddingHorizontal: 5, textAlign: "center" }}>
                                                        {user && user['email'] && emailValidator({ email: user && user['email'] }) ? user['email'] : "---"}
                                                    </Text>
                                                </View>
                                            )
                                        }
                                        {user && user['datenaissance'] &&
                                            (
                                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", alignSelf: "center" }}>
                                                    <MaterialIcons name="date-range" size={Dims.iconsize - 5} color={Colors.whiteColor} />
                                                    <Text style={{ fontFamily: "mons", color: Colors.pillColor, fontSize: Dims.subtitletextsize - 2, paddingHorizontal: 5, textAlign: "center" }}>
                                                        {user && user['datenaissance']}
                                                    </Text>
                                                </View>
                                            )
                                        }
                                        {user && user['genre'] &&
                                            (
                                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", alignSelf: "center" }}>
                                                    <Octicons name="dot-fill" size={Dims.iconsize - 5} color={Colors.whiteColor} />
                                                    <Text style={{ fontFamily: "mons", color: Colors.pillColor, fontSize: Dims.subtitletextsize - 2, paddingHorizontal: 5, textAlign: "center" }}>
                                                        {user && user['genre']}
                                                    </Text>
                                                </View>
                                            )
                                        }
                                    </View>
                                )
                            } */}
                            {/* <View style={{ marginTop: 0 }}>
                                <TouchableHighlight
                                    style={{ padding: 10 }}
                                    underlayColor={Colors.primaryColor}
                                    onPress={() => setshowmore(!showmore)}
                                >
                                    <Feather name={showmore ? "arrow-up-circle" : "arrow-down-circle"} size={Dims.iconsize} color={Colors.whiteColor} />
                                </TouchableHighlight>
                            </View> */}
                        </View>
                    </View>
                )}
            </LinearGradient>
            <ScrollView
                style={{ paddingHorizontal: 10, backgroundColor: Colors.pillColor }}
                contentContainerStyle={{ paddingBottom: "50%" }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={{ marginTop: 30, display: "none" }}>
                    <View style={{ padding: 5, marginBottom: 10 }}>
                        <Text style={{ fontFamily: "mons-b", textTransform: "uppercase", color: Colors.darkColor }}>Compte</Text>
                        <Text style={{ fontFamily: "mons-e", textTransform: "lowercase", color: Colors.darkColor, fontSize: Dims.subtitletextsize }}>Personalisation de mon compte | Modification</Text>
                    </View>
                    <View style={{ padding: 5, marginTop: 4, backgroundColor: Colors.whiteColor }}>
                        <TouchableHighlight
                            style={{ flexDirection: "row", alignItems: "center" }}
                            underlayColor={"transparent"}
                            onPress={() => navigation.navigate("edit-profile")}
                        >
                            <>
                                <View style={[containerIcon, { padding: 8, backgroundColor: Colors.primaryColor }]}>
                                    <MaterialIcons name="edit" size={Dims.iconsize} color={Colors.whiteColor} />
                                </View>
                                <View style={{ paddingHorizontal: 10 }}>
                                    <Text style={{ fontFamily: "mons-b", fontSize: Dims.subtitletextsize }}>Modifier les informations de mon compte </Text>
                                </View>
                            </>
                        </TouchableHighlight>
                    </View>
                </View>
                {/* ------------------------------------------------ */}
                <View style={{ marginTop: 30, display: "none" }}>
                    <View style={{ padding: 5, marginBottom: 10 }}>
                        <Text style={{ fontFamily: "mons-b", textTransform: "uppercase", color: Colors.darkColor }}>Synchronisation</Text>
                        <Text style={{ fontFamily: "mons-e", textTransform: "lowercase", color: Colors.darkColor, fontSize: Dims.subtitletextsize }}>Synchronisation des information sauvegardées localement</Text>
                    </View>
                    <View style={{ padding: 5, marginTop: 4, backgroundColor: Colors.whiteColor }}>
                        <TouchableHighlight
                            style={{ flexDirection: "row", alignItems: "center" }}
                            underlayColor={"transparent"}
                            onPress={() => {
                                handleSynchronisation()
                            }}
                        >
                            <>
                                <View style={[containerIcon, { backgroundColor: Colors.successColor }]}>
                                    <MaterialIcons name="sync" size={Dims.iconsize} color={Colors.whiteColor} />
                                </View>
                                <View style={{ paddingHorizontal: 10 }}>
                                    <Text style={{ fontFamily: "mons-b", fontSize: Dims.subtitletextsize }}>Synchronisation des informations</Text>
                                </View>
                                <View>
                                    <Text>&nbsp;</Text>
                                </View>
                            </>
                        </TouchableHighlight>
                    </View>
                    <View style={{ padding: 5, marginTop: 4, backgroundColor: Colors.whiteColor }}>
                        <TouchableHighlight
                            style={{ flexDirection: "row", alignItems: "center" }}
                            underlayColor={"transparent"}
                            onPress={handlEraseAllFiles}
                        >
                            <>
                                <View style={[containerIcon]}>
                                    <FontAwesome5 name="trash-alt" size={Dims.iconsize} color={Colors.whiteColor} />
                                </View>
                                <View style={{ paddingHorizontal: 10 }}>
                                    <Text style={{ fontFamily: "mons-b", fontSize: Dims.subtitletextsize }}>Reinitialiser l'historique</Text>
                                </View>
                                <View>
                                    <Text>&nbsp;</Text>
                                </View>
                            </>
                        </TouchableHighlight>
                    </View>
                </View>
                {/* ------------------------------------------------ */}
                <View style={{ marginTop: 30, display: "none" }}>
                    <View style={{ padding: 5, marginBottom: 10 }}>
                        <Text style={{ fontFamily: "mons-b", textTransform: "uppercase", color: Colors.darkColor }}>utilisation</Text>
                        <Text style={{ fontFamily: "mons-e", textTransform: "lowercase", color: Colors.darkColor, fontSize: Dims.subtitletextsize }}>Manuelle d'utilisation | A propos de {appname} | Condition d'utilisation</Text>
                    </View>
                    <View style={{ padding: 5, marginTop: 4, backgroundColor: Colors.whiteColor }}>
                        <TouchableHighlight
                            underlayColor={"transparent"}
                            onPress={() => navigation.navigate("about")}
                            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
                        >
                            <>
                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                                    <View style={[containerIcon, { padding: 8, backgroundColor: Colors.primaryColor }]}>
                                        <AntDesign name="infocirlce" size={Dims.iconsize} color={Colors.whiteColor} />
                                    </View>
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <Text style={{ fontFamily: "mons-b", fontSize: Dims.subtitletextsize }}>A propos de {appname} </Text>
                                    </View>
                                </View>
                                <View style={{ paddingHorizontal: 10 }}>
                                    <AntDesign name="doubleright" size={Dims.iconsize - 8} color={Colors.primaryColor} />
                                </View>
                            </>
                        </TouchableHighlight>
                    </View>
                    {/* ---------------------------------------------- */}
                    <View style={{ padding: 5, marginTop: 4, backgroundColor: Colors.whiteColor }}>
                        <TouchableHighlight
                            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
                            underlayColor={Colors.whiteColor}
                            onPress={() => {
                                Linking.openURL("https://presenceapp.buhendje.com")
                            }}
                        >
                            <>
                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                                    <View style={[containerIcon, { padding: 8, backgroundColor: Colors.pillColor }]}>
                                        <MaterialIcons name="file-copy" size={Dims.iconsize} color={Colors.primaryColor} />
                                    </View>
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <Text style={{ fontFamily: "mons-b", fontSize: Dims.subtitletextsize }}>Manuelle d'utilisation</Text>
                                    </View>
                                </View>
                                <View style={{ paddingHorizontal: 10 }}>
                                    <AntDesign name="doubleright" size={Dims.iconsize - 8} color={Colors.darkColor} />
                                </View>
                            </>
                        </TouchableHighlight>
                    </View>
                    {/* ---------------------------------------------- */}
                    <View style={{ padding: 5, marginTop: 4, backgroundColor: Colors.whiteColor }}>
                        <TouchableHighlight
                            underlayColor={Colors.whiteColor}
                            onPress={() => {
                                Linking.openURL("https://presenceapp.buhendje.com")
                            }}
                            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
                        >
                            <>
                                <View style={[, { flexDirection: "row", alignContent: "center", alignItems: "center" }]}>
                                    <View style={[containerIcon, { padding: 8, backgroundColor: Colors.pillColor }]}>
                                        <MaterialIcons name="privacy-tip" size={Dims.iconsize} color={Colors.primaryColor} />
                                    </View>
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <Text style={{ fontFamily: "mons-b", fontSize: Dims.subtitletextsize }}>Conditions d'utilisation </Text>
                                    </View>
                                </View>
                                <View style={{ paddingHorizontal: 10 }}>
                                    <AntDesign name="doubleright" size={Dims.iconsize - 8} color={Colors.darkColor} />
                                </View>
                            </>
                        </TouchableHighlight>
                    </View>
                    {/* ---------------------------------------------- */}
                    <View style={{ padding: 5, marginTop: 4, backgroundColor: Colors.whiteColor }}>
                        <TouchableHighlight
                            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
                        >
                            <>
                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                                    <View style={[containerIcon, { padding: 8, backgroundColor: Colors.primaryColor }]}>
                                        <FontAwesome name="universal-access" size={Dims.iconsize} color={Colors.whiteColor} />
                                    </View>
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <Text style={{ fontFamily: "mons-b", fontSize: Dims.subtitletextsize }}>Signaler un compte </Text>
                                    </View>
                                </View>
                                <View style={{ paddingHorizontal: 10 }}>
                                    <AntDesign name="doubleright" size={Dims.iconsize - 8} color={Colors.primaryColor} />
                                </View>
                            </>
                        </TouchableHighlight>
                    </View>
                </View>
                {/* ------------------------------------------------ */}
                <View style={{ marginTop: 30 }}>
                    <View style={{ padding: 5, marginBottom: 10 }}>
                        <Text style={{ fontFamily: "mons-b", textTransform: "uppercase", color: Colors.darkColor }}>Paramètres</Text>
                        <Text style={{ fontFamily: "mons-e", textTransform: "lowercase", color: Colors.darkColor, fontSize: Dims.subtitletextsize }}>Personalisation de mon compte | les autorisation</Text>
                    </View>
                    {/* ---------------------------------------------- */}
                    <View style={{ padding: 5, marginTop: 4, backgroundColor: Colors.whiteColor }}>
                        <TouchableHighlight
                            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
                            underlayColor={"transparent"}
                            onPress={() => Linking.openSettings()}
                        >
                            <>
                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                                    <View style={[containerIcon, { padding: 8, backgroundColor: Colors.primaryColor }]}>
                                        <FontAwesome5 name="map-marker-alt" size={Dims.iconsize} color={Colors.whiteColor} />
                                    </View>
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <Text style={{ fontFamily: "mons-b", fontSize: Dims.subtitletextsize }}>Géolocalisation et Map </Text>
                                    </View>
                                </View>
                                <View style={{ paddingHorizontal: 10 }}>
                                    <AntDesign name="doubleright" size={Dims.iconsize - 8} color={Colors.primaryColor} />
                                </View>
                            </>
                        </TouchableHighlight>
                    </View>
                    {/* ---------------------------------------------- */}
                    <View style={{ padding: 5, marginTop: 4, backgroundColor: Colors.whiteColor }}>
                        <TouchableHighlight
                            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
                            underlayColor={"transparent"}
                            onPress={() => Linking.openSettings()}
                        >
                            <>
                                <View style={{ flexDirection: "row", alignContent: 'center', alignItems: "center" }}>
                                    <View style={[containerIcon, { padding: 8, backgroundColor: Colors.primaryColor }]}>
                                        <MaterialIcons name="notifications" size={Dims.iconsize} color={Colors.whiteColor} />
                                    </View>
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <Text style={{ fontFamily: "mons-b", fontSize: Dims.subtitletextsize }}>Push notifications </Text>
                                    </View>
                                </View>
                                <View style={{ paddingHorizontal: 10 }}>
                                    <AntDesign name="doubleright" size={Dims.iconsize - 8} color={Colors.primaryColor} />
                                </View>
                            </>
                        </TouchableHighlight>
                    </View>
                    {/* ---------------------------------------------- */}
                    <View style={{ padding: 5, marginTop: 4, backgroundColor: Colors.whiteColor }}>
                        <TouchableHighlight
                            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
                            underlayColor={Colors.whiteColor}
                            onPress={() => { navigation.navigate("settings") }}
                        >
                            <>
                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                                    <View style={[containerIcon, { padding: 8, backgroundColor: Colors.pillColor }]}>
                                        <Entypo name="tools" size={Dims.iconsize} color={Colors.primaryColor} />
                                    </View>
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <Text style={{ fontFamily: "mons-b", fontSize: Dims.subtitletextsize }}>Configurations </Text>
                                    </View>
                                </View>
                                <View style={{ paddingHorizontal: 10 }}>
                                    <AntDesign name="doubleright" size={Dims.iconsize - 8} color={Colors.primaryColor} />
                                </View>
                            </>
                        </TouchableHighlight>
                    </View>
                    {/* ---------------------------------------------- */}
                    {/* <View style={{ padding: 5, marginTop: 4, backgroundColor: Colors.whiteColor }}>
                        <TouchableHighlight
                            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
                        >
                            <>
                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                                    <View style={[containerIcon, { padding: 8, backgroundColor: Colors.primaryColor }]}>
                                        <Fontisto name="world" size={Dims.iconsize} color={Colors.whiteColor} />
                                    </View>
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <Text style={{ fontFamily: "mons-b", fontSize: Dims.subtitletextsize }}>Langage </Text>
                                    </View>
                                </View>
                                <View style={{ paddingHorizontal: 10 }}>
                                    <AntDesign name="doubleright" size={Dims.iconsize - 8} color={Colors.primaryColor} />
                                </View>
                            </>
                        </TouchableHighlight>
                    </View> */}
                    {/* ------------------------------------------------ */}
                    <View style={{ padding: 5, marginTop: 4, backgroundColor: Colors.whiteColor }}>
                        <TouchableHighlight
                            style={{ flexDirection: "row", alignItems: "center" }}
                            underlayColor={"transparent"}
                            onPress={handlDeconnexion}
                        >
                            <>
                                <View style={[containerIcon, { padding: 8, backgroundColor: Colors.inactiveColor }]}>
                                    <AntDesign name="logout" size={Dims.iconsize} color={Colors.pillColor} />
                                </View>
                                <View style={{ paddingHorizontal: 10 }}>
                                    <Text style={{ fontFamily: "mons-b", fontSize: Dims.subtitletextsize }}>Déconnexion | Suppression compte</Text>
                                </View>
                                <View>
                                    <Text>&nbsp;</Text>
                                </View>
                            </>
                        </TouchableHighlight>
                    </View>
                    {/* ---------------------------------------------- */}
                </View>
                {/* <Footer /> */}
            </ScrollView>
            {/* < */}
            <DialogBox ref={ref} isOverlayClickClose={false} />
            <Spinner
                visible={isloading}
                textContent={
                    <View style={{ width: 300, alignSelf: "center" }} >
                        <Text style={{ fontFamily: "mons", fontSize: Dims.titletextsize, color: Colors.primaryColor, textAlign: "center" }}>Chargement ecnours</Text>
                        <Text style={{ textAlign: "center", fontFamily: "mons-e", marginTop: 10 }}>La synchronisation est encours veillez patienter le temps que nous finissons le Configuration pour vous</Text>
                    </View>
                }
                animation='fade'
                color={Colors.primaryColor}
                size={"large"}
                overlayColor={'#cfc9c9'}
                customIndicator={<Loader size={100} color={Colors.primaryColor} />}
                textStyle={[SpinerStyle, { color: Colors.primaryColor }]}
            />
        </>
    )
}