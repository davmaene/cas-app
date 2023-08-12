import * as React from 'react';
import { View, Text, TextInput, TouchableHighlight, ScrollView, Keyboard, TouchableHighlightBase } from 'react-native';
import { Colors } from '../../assets/colors/Colors';
import { Dims } from '../../assets/dimensions/Dimemensions';
import { Footer } from '../../components/Footer/comp.footer';
import { Header } from '../../components/Header/comp.header';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { btn, inputGroup } from '../../assets/styles/Styles';
import { Divider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { onRunExternalRQST, onRunInsertQRY } from '../../services/communications';
import DialogBox from 'react-native-dialogbox';
import { LoadingSceen } from '../Loading/LoadingScreen';
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
        if(num.length > 0 && num.length < 10){
            if(password.length > 0){
                setisloading(true)
                try {
                    await onRunExternalRQST({
                        method: "POST",
                        url: "/users/user/signin",
                        data: {
                            phone: num,
                            password
                        }
                    }, (err, done) => {
                        if(done){
                            setisloading(false)
                            switch (done['status']) {
                                case 200:
                                    const u = done && done['data'];
                                    onRunInsertQRY({
                                        table: "__tbl_users",
                                        columns: `'fsname', 'lsname', 'nickname', 'age', 'gender', 'phone', 'crearedon', 'hospitalref'`,
                                        dot: "?, ?, ?, ?, ?, ?, ?, ?",
                                        values: [`${u['fsname']}`, `${u['lsname']}`, `${u['nickname']}`, `${u['age']}`, `${u['gender']}`, `${u['phone']}`, `${new Date().toLocaleString()}`, `${u['hospitalref']}`]
                                    }, (err, insert) => {
                                        if(insert) navigation.replace("tabs");
                                        else{
                                            setisloading(false);
                                            setcanverify(true);
                                            setValue("")
                                            Toast.show({
                                                type: 'error',
                                                text1: 'Erreur',
                                                text2: 'Une erreur est survenue lors de l\'activation du compte !',
                                            });
                                        }
                                    })
                                    break;
                                case 203:
                                    setoutput("Le mot de passe ou le nom d'utilisateur est incorect")
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Erreur',
                                        text2: 'Le mot de passe ou le nom d\'utilisateur incorect',
                                    });
                                    break;
                                case 402:
                                    setoutput("Votre compte n'est pas encore activé")
                                    ref.current.confirm({
                                        title: <Text style={{ fontFamily: "mons", fontSize: Dims.titletextsize }}>Vérification compte</Text>,
                                        content: [<Text style={{ fontFamily: "mons-e", fontSize: Dims.subtitletextsize, marginHorizontal: 25 }} >Votre compte n'est pas encore activé, voulez-vous activer le compte</Text>],
                                        ok: {
                                            text: 'Vérifier le compte',
                                            style: {
                                                color: Colors.primaryColor,
                                                fontFamily: 'mons'
                                            },
                                            callback: () => navigation.replace("verifyaccount", { item: done['data'] })
                                        },
                                        cancel: {
                                            text: 'Annuler',
                                            style: {
                                                color: Colors.darkColor,
                                                fontFamily: "mons-e"
                                            }
                                        },
                                    })
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Erreur',
                                        text2: 'Votre compte n\'est pas encore activé',
                                    });
                                    break;
                                default:
                                    setoutput("Une erreur inconue vient de se produire !")
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Erreur',
                                        text2: 'Une erreur inconue vient de se produire !',
                                    });
                                    break;
                            }
                        }else{
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
            }else{
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: 'Entrer le mot de passe',
                });
            }
        }else{
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Entrer un numéro de téléphone valide',
            });
        }
    };

    return(
        <>
            <View style={{flex: 1, backgroundColor: Colors.primaryColor}}>
                <Header colors={Colors.whiteColor} />
                    <ScrollView 
                        contentContainerStyle={{ paddingBottom: 0, backgroundColor: Colors.primaryColor }}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                    <View style={{ borderTopEndRadius: Dims.bigradius, borderTopStartRadius: Dims.bigradius, backgroundColor: Colors.whiteColor, height: Dims.height, marginTop: Dims.smallradius }}>
                        <View style={{width: "85%", alignSelf: "center", marginTop: Dims.bigradius }}>
                            <View style={{width: "100%", height: 65, flexDirection: "column"}}>
                                <Text style={{ fontFamily: "mons-b", paddingLeft: 10, color: Colors.primaryColor }}>Numéro de téléphone</Text>
                                <View style={[ inputGroup.container, { flexDirection: "row-reverse" } ]}>
                                    <View style={{ width: "80%", justifyContent: "center", alignContent: "center", alignItems: "center", flexDirection: "row" }}>
                                        <View style={{height: "100%", justifyContent: "center", backgroundColor: Colors.pillColor }}>
                                            <Text style={{ paddingLeft: 25, fontFamily: "mons", color: Colors.primaryColor }}>+243</Text>
                                        </View>
                                        <TextInput placeholder='000 000 000' maxLength={10} keyboardType={"number-pad"} onChangeText={(t) => setnum(t)} style={[ inputGroup.input, { fontFamily: "mons", width: "85%" }]} />
                                    </View>
                                    <View style={[ inputGroup.iconcontainer, { backgroundColor: Colors.primaryColor }]}>
                                        <Entypo name="phone" size={Dims.iconsize} color={ Colors.whiteColor } />
                                    </View>
                                </View>
                            </View>
                            {/* ------------------------ */}
                            <View style={{width: "100%", height: 65, flexDirection: "column", marginTop: 25}}>
                                <Text style={{ fontFamily: "mons-b", paddingLeft: 10, color: Colors.primaryColor }}>Mot de passe</Text>
                                <View style={[ inputGroup.container, { flexDirection: "row-reverse" }]}>
                                    <TouchableHighlight
                                        underlayColor={Colors.whiteColor}
                                        onPress={() => seteye(!eye)} 
                                        style={[ inputGroup.iconcontainer, { backgroundColor: Colors.pillColor }]}
                                    >
                                        <Ionicons name={eye ? "eye-off" : "eye"} size={ Dims.iconsize } color={ Colors.primaryColor } />
                                    </TouchableHighlight>
                                    <View style={[ inputGroup.inputcontainer, { width: "60%" } ]}>
                                        <TextInput placeholder='******' secureTextEntry={eye} enablesReturnKeyAutomatically onChangeText={(t) => setpassword(t)} style={[ inputGroup.input, { fontFamily: "mons" } ]} />
                                    </View>
                                    <View style={[ inputGroup.iconcontainer, { backgroundColor: Colors.primaryColor }]}>
                                        <Entypo name="lock" size={ Dims.iconsize } color={ Colors.whiteColor } />
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
                                    underlayColor={ Colors.whiteColor }
                                    style={btn}
                                >
                                    {isloading 
                                    ?
                                        <Loader/>
                                    :
                                        <Text style={{ color: Colors.whiteColor, fontFamily: "mons" }}>Connexion</Text>    
                                    }
                                </TouchableHighlight>
                                <Text style={{fontFamily: "mons", fontSize: Dims.subtitletextsize, marginVertical: 10, color: Colors.dangerColor, textAlign: "center" }}>
                                    {output}
                                </Text>
                            </View>
                        </View>
                        <View style={{flexDirection: "row", width: "85%", alignSelf: "center", alignContent: "center", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ width: "45%" }}>
                                <Divider/>
                            </View>
                            <View>
                                <Text style={{ fontFamily: "mons-b", color: Colors.primaryColor }}>OU</Text>
                            </View>
                            <View style={{ width: "45%" }}>
                                <Divider/>
                            </View>
                        </View>
                        <View style={{ width: "85%", alignSelf: "center" }}>
                            <View style={{ width: "100%", height: 65, flexDirection: "column", marginTop: 25 }}>
                                <TouchableHighlight 
                                    onPress={() => navigation.navigate("signup")}
                                    style={{ width: "100%", backgroundColor: Colors.secondaryColor, height: 46, borderRadius: Dims.borderradius, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: Colors.whiteColor, fontFamily: "mons" }}>Créer un compte</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={{ width: "85%", alignSelf: "center" }}>
                            <View style={{ width: "100%", height: 65, flexDirection: "column", marginTop: 2 }}>
                                <TouchableHighlight style={{ width: "100%", backgroundColor: Colors.pillColor, height: 46, borderRadius: Dims.borderradius, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: Colors.primaryColor, fontFamily: "mons-b" }}>Mot de passe oublié ?</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Footer/>
                <DialogBox ref={ref} isOverlayClickClose={false} />
            </View>
        </>
    )
}