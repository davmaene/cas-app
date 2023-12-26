import * as React from 'react';
import { View, Text, TextInput, TouchableHighlight, ScrollView, Keyboard, TouchableHighlightBase } from 'react-native';
import { Colors } from '../../assets/colors/Colors';
import { Dims } from '../../assets/dimensions/Dimemensions';
import { Footer } from '../../components/Footer/comp.footer';
import { Header } from '../../components/Header/comp.header';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { btn, inputGroup } from '../../assets/styles/Styles';
import { Divider } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import { onRunExternalRQST, onRunInsertQRY } from '../../services/communications';
import DialogBox from 'react-native-dialogbox';
import { Loader } from '../../components/Loader/comp.loader';

export const SigninScreen = ({ navigation, route }) => {

    const [isloading, setisloading] = React.useState(false);
    const [num, setnum] = React.useState("");
    const [password, setpassword] = React.useState("");
    const [eye, seteye] = React.useState(true);
    const [output, setoutput] = React.useState("");
    const ref = React.useRef();

    const onSubmit = async () => {
        setoutput("");
        if (num.length > 0) {
            if (password.length > 0) {
                setisloading(true)
                try {
                    await onRunExternalRQST({
                        type: 1,
                        method: "POST",
                        url: "/app?op=login&",
                        data: 'username=' + num + '&password=' + password,
                    }, (err, done) => {
                        setisloading(false);
                        if (done) {
                            let { message, user } = done;
                            if (Array.isArray(user)) {
                                if (user.length > 0) {
                                    user = user[0]
                                    // delete user['4']
                                    // delete user['roles']
                                    if (message.toString() === "Success") {
                                        const u = user;
                                        const { username, userid, shops, photo, fullname, designationid } = user;
                                        onRunInsertQRY({
                                            table: "__tbl_users",
                                            columns: `'username', 'fullname', 'userid', 'shops', 'photo', 'designationid', 'crearedon'`,
                                            dot: "?, ?, ?, ?, ?, ?, ?",
                                            values: [`${username}`, `${fullname}`, `${userid}`, `${shops}`, `${photo}`, `${designationid}`, `${new Date().toLocaleString()}`]
                                        }, (err, insert) => {
                                            if (insert) {
                                                // console.log("Inserted line is ==> ", insert);
                                                global.user = insert
                                                navigation.replace("tabs");
                                            } else {
                                                setValue("")
                                                Toast.show({
                                                    type: 'error',
                                                    text1: 'Erreur',
                                                    text2: 'Une erreur est survenue lors de l\'activation du compte !',
                                                });
                                            }
                                        })
                                    } else {
                                        setoutput("Le mot de passe ou le nom d'utilisateur est incorect")
                                        Toast.show({
                                            type: 'error',
                                            text1: 'Erreur',
                                            text2: 'Le mot de passe ou le nom d\'utilisateur incorect',
                                        });
                                    }
                                } else {
                                    setoutput("Le mot de passe ou le nom d'utilisateur est incorect")
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Erreur',
                                        text2: 'Le mot de passe ou le nom d\'utilisateur incorect',
                                    });
                                }
                            } else {
                                setoutput("Le mot de passe ou le nom d'utilisateur est incorect !")
                                Toast.show({
                                    type: 'error',
                                    text1: 'Erreur',
                                    text2: 'Le mot de passe ou le nom d\'utilisateur incorect',
                                });
                            }
                        } else {
                            setisloading(false)
                            setoutput("Une erreur inconue vient de se produire !")
                            Toast.show({
                                type: 'error',
                                text1: 'Erreur',
                                text2: 'Une erreur inconue vient de se produire !',
                            });
                        }
                    })
                } catch (error) {
                    console.log("erreur => ", error);
                }
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: 'Entrer le mot de passe',
                });
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Entrer un nom d\'utilisateur !',
            });
        }
    };

    return (
        <>
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <Header colors={Colors.primaryColor} />
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 0, backgroundColor: Colors.whiteColor }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ borderTopEndRadius: Dims.bigradius, borderTopStartRadius: Dims.bigradius, backgroundColor: Colors.whiteColor, height: Dims.height, marginTop: Dims.smallradius }}>
                        <View style={{ width: "85%", alignSelf: "center", marginTop: Dims.bigradius }}>
                            <View style={{ width: "100%", height: 65, flexDirection: "column" }}>
                                <Text style={{ fontFamily: "mons-b", paddingLeft: 10, color: Colors.primaryColor }}>Nom d'utilisateur</Text>
                                <View style={[inputGroup.container, { flexDirection: "row-reverse" }]}>
                                    <View style={{ width: "80%", justifyContent: "center", alignContent: "center", alignItems: "center", flexDirection: "row" }}>
                                        {/* <View style={{ height: "100%", justifyContent: "center", backgroundColor: Colors.pillColor }}>
                                            <Text style={{ paddingLeft: 25, fontFamily: "mons", color: Colors.primaryColor }}>+243</Text>
                                        </View> */}
                                        <TextInput placeholder='Utilisateur' keyboardType={"ascii-capable"} onChangeText={(t) => setnum(t)} style={[inputGroup.input, { fontFamily: "mons", width: "100%" }]} />
                                    </View>
                                    <View style={[inputGroup.iconcontainer, { backgroundColor: Colors.primaryColor }]}>
                                        <Entypo name="user" size={Dims.iconsize} color={Colors.whiteColor} />
                                    </View>
                                </View>
                            </View>
                            {/* ------------------------ */}
                            <View style={{ width: "100%", height: 65, flexDirection: "column", marginTop: 25 }}>
                                <Text style={{ fontFamily: "mons-b", paddingLeft: 10, color: Colors.primaryColor }}>Mot de passe</Text>
                                <View style={[inputGroup.container, { flexDirection: "row-reverse" }]}>
                                    <TouchableHighlight
                                        underlayColor={Colors.whiteColor}
                                        onPress={() => seteye(!eye)}
                                        style={[inputGroup.iconcontainer, { backgroundColor: Colors.pillColor }]}
                                    >
                                        <Ionicons name={eye ? "eye-off" : "eye"} size={Dims.iconsize} color={Colors.primaryColor} />
                                    </TouchableHighlight>
                                    <View style={[inputGroup.inputcontainer, { width: "60%" }]}>
                                        <TextInput placeholder='******' secureTextEntry={eye} enablesReturnKeyAutomatically onChangeText={(t) => setpassword(t)} style={[inputGroup.input, { fontFamily: "mons" }]} />
                                    </View>
                                    <View style={[inputGroup.iconcontainer, { backgroundColor: Colors.primaryColor }]}>
                                        <Entypo name="lock" size={Dims.iconsize} color={Colors.whiteColor} />
                                    </View>
                                </View>
                            </View>
                            {/* ------------------------ */}
                            <View style={{ width: "100%", height: 65, flexDirection: "column", marginVertical: 25 }}>
                                <TouchableHighlight
                                    onPress={() => {
                                        onSubmit()
                                    }}
                                    disabled={isloading}
                                    underlayColor={Colors.primaryColor}
                                    style={btn}
                                >
                                    {isloading
                                        ?
                                        <Loader />
                                        :
                                        <Text style={{ color: Colors.whiteColor, fontFamily: "mons-b" }}>Connexion</Text>
                                    }
                                </TouchableHighlight>
                                <Text style={{ fontFamily: "mons", fontSize: Dims.subtitletextsize, marginVertical: 10, color: Colors.dangerColor, textAlign: "center" }}>
                                    {output}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", width: "85%", alignSelf: "center", alignContent: "center", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ width: "25%" }}>
                                <Divider />
                            </View>
                            <View>
                                <Text style={{ fontFamily: "mons-b", color: Colors.primaryColor }}>OU</Text>
                            </View>
                            <View style={{ width: "25%" }}>
                                <Divider />
                            </View>
                        </View>
                        <View style={{ width: "85%", alignSelf: "center" }}>
                            <View style={{ width: "100%", height: 65, flexDirection: "column", marginTop: 20 }}>
                                <TouchableHighlight
                                    underlayColor={Colors.pillColor}
                                    onPress={() => {
                                        // navigation.navigate("tabs")
                                        Toast.show({
                                            type: 'info',
                                            text1: 'Non permis',
                                            text2: 'Cette fonctionnalité ne pas pris en charge ! pour le moment',
                                        })
                                    }}
                                    style={{ width: "100%", backgroundColor: Colors.pillColor, height: 46, borderRadius: Dims.borderradius, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: Colors.primaryColor, fontFamily: "mons-b" }}>Créer un compte</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        {/* <View style={{ width: "85%", alignSelf: "center", display: "none" }}>
                            <View style={{ width: "100%", height: 65, flexDirection: "column", marginTop: 10 }}>
                                <TouchableHighlight
                                    onPress={() => {
                                        navigation.push("tabs")
                                    }}
                                    style={{ width: "100%", backgroundColor: Colors.pillColor, height: 46, borderRadius: Dims.borderradius, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: Colors.whiteColor, fontFamily: "mons" }}>Créer un compte</Text>
                                </TouchableHighlight>
                            </View>
                        </View> */}
                    </View>
                </ScrollView>
                <Footer />
                <DialogBox ref={ref} isOverlayClickClose={false} />
            </View>
        </>
    )
}