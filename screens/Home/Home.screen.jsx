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
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const [message, setmessage] = React.useState("Un signal d'alerte est émis dans les établissements sanitaires");
    const [isloading, setisloading] = React.useState(false);
    const [showmodal, setshowmodal] = React.useState(false);
    const [shw, setshw] = React.useState(false);
    const [messagecustomer, setmessagecustomer] = React.useState("");
    const ref = React.useRef();
    const [before, setbefore] = React.useState(false);
    const [sending, setsending] = React.useState(false);

    const onConfirm = () => {
        if(isloading){
            setmessage("Un signal d'alerte est emis dans les établissements sanitaires")
            setisloading(false)
            setshw(false);
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
            }).start();
        }else{
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    ref.current.confirm({
                        title: <Text style={{ fontFamily: "mons", fontSize: Dims.titletextsize }}>Paramètres</Text>,
                        content: [<Text style={{ fontFamily: "mons-e", fontSize: Dims.subtitletextsize, marginHorizontal: 25 }} >{appname} N'arrive pas à avoir accès à votre position; vous ne pouvez pas envoyer une alerte sans cette fonctionnalité activée</Text>],
                        ok: {
                            text: 'Authoriser',
                            style: {
                                color: Colors.primaryColor,
                                fontFamily: 'mons'
                            },
                            callback: () => onConfirm()
                        },
                        cancel: {
                            text: 'Annuler',
                            style: {
                                color: Colors.darkColor,
                                fontFamily: "mons-e"
                            }
                        },
                    })
                  return;
                }else{
                    setbefore(true);         
                    let { coords } = await Location.getCurrentPositionAsync({});
                    const { speed, altitude, longitude, latitude } = coords;
                    await onRunExternalRQST({
                        url: "/users/user/sendsos",
                        data: {
                            latitude, 
                            longitude, 
                            hospitalref: global['user']['hospitalref'], 
                            phone: global['user']['phone'], 
                            fsname: global['user']['fsname'], 
                            lsname: global['user']['lsname'], 
                            altitude, 
                            speed
                        },
                        // !latitude || !longitude || !phone || !altitude || !speed
                        method: "POST"
                    }, (err, don) => {
                        // console.log(don);
                        if(don){
                            setbefore(false);
                            switch (don['status']) {
                                case 200:
                                    Toast.show({
                                        type: 'success',
                                        text1: 'Traitement en cours',
                                        text2: 'Votre requête est en cours de traitement !',
                                    });
                                    setisloading(!isloading);
                                    setTimeout(() => {
                                        Animated.timing(fadeAnim, {
                                            toValue: 1,
                                            duration: 1000,
                                            useNativeDriver: true
                                        }).start();
                                        setmessage("Ne vous déplacez pas; les sécours arrivent incessement !")
                                        setshw(true)
                                    }, 3200);
                                    break;
                                case 401:
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Erreur',
                                        text2: 'Quelques paramètres manques dans la requête envoyée ',
                                    });
                                    break;
                                default:
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Erreur',
                                        text2: 'Une erreur est survenue lors de l\'activation du compte !',
                                    });
                                    break;
                            }
                        }else{
                            setbefore(false);
                            Toast.show({
                                type: 'error',
                                text1: 'Erreur',
                                text2: 'Une erreur est survenue lors de l\'activation du compte !',
                            });
                        }
                    })
                }
            })();
        }
    };

    const onsendingCustomMessage = async () => {
        if(messagecustomer.length >= 3){
            setsending(true);
            let { coords } = await Location.getCurrentPositionAsync({});
            const { speed, altitude, longitude, latitude } = coords;
            await onRunExternalRQST({
                url: "/users/user/sendsos",
                data: {
                    latitude, 
                    longitude, 
                    hospitalref: global['user']['hospitalref'], 
                    phone: global['user']['phone'], 
                    fsname: global['user']['fsname'], 
                    lsname: global['user']['lsname'], 
                    description: messagecustomer,
                    altitude, 
                    speed
                },
                // !latitude || !longitude || !phone || !altitude || !speed
                method: "POST"
            }, (err, don) => {
                // console.log(don);
                if(don){
                    setbefore(false);
                    setsending(false);
                    switch (don['status']) {
                        case 200:
                            Toast.show({
                                type: 'success',
                                text1: 'Traitement en cours',
                                text2: 'Votre requête est en cours de traitement !',
                            });
                            setmessagecustomer("")
                            setisloading(!isloading);
                            setTimeout(() => {
                                Animated.timing(fadeAnim, {
                                    toValue: 1,
                                    duration: 1000,
                                    useNativeDriver: true
                                }).start();
                                setmessage("Ne vous déplacez pas; les sécours arrivent incessement !")
                                setshw(true)
                            }, 3200);
                            break;
                        case 401:
                            Toast.show({
                                type: 'error',
                                text1: 'Erreur',
                                text2: 'Quelques paramètres manques dans la requête envoyée ',
                            });
                            break;
                        default:
                            Toast.show({
                                type: 'error',
                                text1: 'Erreur',
                                text2: 'Une erreur est survenue lors de l\'activation du compte !',
                            });
                            break;
                    }
                }else{
                    setsending(false);
                    Toast.show({
                        type: 'error',
                        text1: 'Erreur',
                        text2: 'Une erreur est survenue lors de l\'activation du compte !',
                    });
                }
            })
        }else{
            Toast.show({
                type: 'error',
                text1: 'Champ obligatoire',
                text2: 'Ajouter le message à envoyer s\'il vous plait !',
            });
        }
    };

    return(
        <>
            <StatusBar barStyle={"light-content"} backgroundColor={ Colors.primaryColor } />
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <LinearGradient
                    colors={[ Colors.primaryColor, Colors.secondaryColor ]}
                    style={{height: 250, width: "100%", borderBottomLeftRadius: bradius, borderBottomRightRadius: bradius, elevation: 10 }}
                >
                    <View style={{ width: "80%", alignSelf: "center", paddingVertical: 15 }}>
                        <Text style={{ fontFamily: "mons", fontSize: 32, color: Colors.pillColor, textAlign: "center" }}>SOS Afia.</Text>
                        <Text style={{ textAlign: "center", color: Colors.pillColor, fontSize: Dims.titletextsize, paddingTop: 15, fontFamily: "mons-e" }}>Êtes-vous dans une urgence ?, cliquez juste le bouton en bas et une alerte atteindra les établissements sanitaires</Text>
                        <FadeInOut
                            scale={true}
                            visible={isloading}
                            useNativeDriver={true}
                            // duration={1000}
                        >
                            <Text style={{ marginTop: 10, fontFamily: "mons", textAlign: "center", color: Colors.whiteColor }}>{message}</Text>
                        </FadeInOut>
                    </View>
                    <View style={{ width: "100%", justifyContent: "center", alignContent: "center", alignItems: "center", position: "absolute", bottom: -r }}>
                        <TouchableHighlight style={{
                            width: aradius, 
                            height: aradius, 
                            zIndex: 898978782,
                            elevation: isloading ? 20 : 0,
                            backgroundColor: Colors.primaryColor, 
                            borderRadius: aradius, 
                            borderColor: Colors.pillColor, 
                            borderWidth: 6,
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                            underlayColor={Colors.primaryColor}
                            onPress={() => {
                               onConfirm()
                            }}
                        >
                            <Text style={{textAlign: "center", alignSelf: "center", color: Colors.whiteColor, fontSize: 35, fontFamily: "mons"}}>SOS</Text>
                        </TouchableHighlight>
                        <View style={{ position: "absolute" }}>
                           { isloading ?  <Loaderonsignalsent size={ 200 } color={ Colors.primaryColor } /> : <></> }
                        </View>
                        <View style={{ position: "absolute" }}>
                           { before ?  <Loader size={ 200 } color={ Colors.secondaryColor } /> : <></> }
                        </View>
                    </View>
                </LinearGradient>
                {
                before 
                ?
                    <View style={{ width: "100%", padding: 10, marginTop: r + 35, height: 250, }}>
                        <Text style={{ fontFamily: "mons-b", textAlign: "center", color: Colors.darkColor, fontSize: Dims.titletextsize }}>Etablissement de connexion en cours</Text>
                        <Text style={{ textAlign: "center", fontFamily: "mons-e" }}>Veuillez patienter le temps que nous etablissons une connexion au serveur de <Text style={{fontFamily: "mons-b"}}>{appname}</Text></Text>
                        <Loader color={ Colors.primaryColor } />
                    </View> 
                :
                    <></>    
                }
                <Animated.View 
                    style={{ width: "100%", padding: 10, marginTop: r + 35, height: 250, opacity: fadeAnim }}
                >
                    <Text style={{ textAlign: "center", fontFamily: "mons", fontSize: Dims.titletextsize }}>Options</Text>
                    <Text style={{ textAlign: "center", marginTop: 10, fontFamily: "mons-e"}}>Les sécours trennent passez un appel, ou envoyez un message personnalisé à l'éauipe de sécours</Text>
                    <View style={{ marginTop: 20, paddingHorizontal: 25 }}>
                        <TouchableHighlight 
                            style={[btn, { marginTop: 10, flexDirection: "row" }]}
                            underlayColor={"transparent"}
                            onPress={() => {
                                Linking.openURL(`tel:${umergencyphonenumber}`);
                            }}
                        >
                            <>
                                <Entypo name='phone' size={Dims.iconsize} color={ Colors.whiteColor } />
                                <Text style={{ fontFamily: "mons", color: Colors.whiteColor, paddingHorizontal: 10 }}>Passer un appel</Text>
                            </>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => setshowmodal(!showmodal)}
                            underlayColor={"transparent"}
                            style={[btn, { marginTop: 10, flexDirection: "row", backgroundColor: Colors.secondaryColor }]}
                        >
                            <>
                                <AntDesign name='message1' size={Dims.iconsize} color={ Colors.whiteColor } />
                                <Text style={{ fontFamily: "mons", color: Colors.whiteColor, paddingHorizontal: 10 }}>Ecrire un message personnalisé</Text>
                            </>
                        </TouchableHighlight>
                    </View>
                </Animated.View>
            </View>
            <Modal
                visible={showmodal}
                onDismiss={() => setshowmodal(false)}
            >
                <View>
                    <Title 
                        navigation={navigation}
                        title={"Message personalisé"} 
                        subtitle={"Personalisez votre message pour l'envoyer"} 
                        action={() => setshowmodal(false)}
                    />
                    <View style={{ padding: 20, height: 400 }}>
                        <View style={{width: "100%", height: 65, flexDirection: "column"}}>
                            <Text style={{ fontFamily: "mons-b", paddingLeft: 10, color: Colors.primaryColor }}>Message personalisé</Text>
                            <View style={[ inputGroup.container, { flexDirection: "row-reverse", height: 100 } ]}>
                                <View style={{ width: "80%", justifyContent: "center", alignContent: "center", alignItems: "center", flexDirection: "row" }}>
                                    <TextInput 
                                        multiline={true} 
                                        placeholder="J'ai besoin d'aide s'il vous plaît ..." 
                                        keyboardType={"default"} 
                                        value={messagecustomer}
                                        onChangeText={(t) => setmessagecustomer(t)} 
                                        style={[ inputGroup.input, { fontFamily: "mons", width: "100%" }]} />
                                </View>
                                <View style={[ inputGroup.iconcontainer, { backgroundColor: Colors.primaryColor }]}>
                                    <Feather name="edit" size={Dims.iconsize} color={ Colors.whiteColor } />
                                </View>
                            </View>
                        </View>
                        <TouchableHighlight
                            onPress={ onsendingCustomMessage }
                            underlayColor={"transparent"}
                            style={[btn, { marginTop: 65, position: "relative", flexDirection: "row", backgroundColor: Colors.primaryColor }]}
                        >
                            {
                            sending 
                            ?
                                <Loader color={ Colors.whiteColor }  />
                            :
                                <>
                                    <MaterialIcons name='send' size={Dims.iconsize} color={ Colors.whiteColor } />
                                    <Text style={{ fontFamily: "mons", color: Colors.whiteColor, paddingHorizontal: 10 }}>Envoyer le message</Text>
                                </>
                            }
                        </TouchableHighlight>
                    </View>
                </View>
                <Footer/>
                <Toast config={toastConfig} />
            </Modal>
            <DialogBox ref={ref} isOverlayClickClose={false} />
        </>
    )
}