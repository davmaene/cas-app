import * as React from 'react';
import { Appbar,  Button, Menu, Divider, Provider } from 'react-native-paper';
import { Platform, Text, View } from 'react-native';
import { Colors } from '../../assets/colors/Colors';
import { Dims } from '../../assets/dimensions/Dimemensions';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { onRunRemoveQRY } from '../../services/communications';
import * as  Updates from 'expo-updates';
import DialogBox from 'react-native-dialogbox';
import * as Linking from 'expo-linking';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export const Title = ({ title, subtitle, action, navigation }) => {
    const [visible, setVisible] = React.useState(false);
    const ref = React.useRef();
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const ondeconnexion = async () => {
        await onRunRemoveQRY({table: "__tbl_users"}, (e, d) => {
            if(d){
                ref.current.tip({
                    title: <Text style={{ fontFamily: "mons", fontSize: Dims.titletextsize }}>Paramètres</Text>,
                    content: [<Text style={{ fontFamily: "mons-e", fontSize: Dims.subtitletextsize, marginHorizontal: 25 }} >Vos informations sont bien supprimées de cet appareil</Text>],
                    btn: {
                        text: 'D\'accord',
                        style: {
                            color: Colors.primaryColor,
                            fontFamily: 'mons'
                        },
                        callback: () => Updates.reloadAsync()
                    }
                })
            }
        })
    }
    
    return(
        <>
            <Appbar.Header
                style={{backgroundColor: Colors.primaryColor}}
            >
                {navigation 
                
                ?
                    <Appbar.Action 
                        icon="arrow-left-circle" onPress={() => {
                            if(typeof action === "function") action();
                            else navigation.goBack();
                        }} 
                    />
                : 
                    <></>
                }
                <Appbar.Content 
                    title={<Text style={{ fontFamily: "mons", fontSize: Dims.subtitletextsize }}>{title}</Text>} 
                    subtitle={<Text style={{ fontFamily: "mons-e", fontSize: Dims.subtitletextsize }}>{subtitle}</Text>} />
                <Appbar.Action icon={MORE_ICON} onPress={() => openMenu()} />
                {/* <Appbar.Header>
                <Provider>
                    <Menu
                        style={{ }}
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={<Text style={{backgroundColor: "lime"}} onPress={openMenu}>hbhbhbhbhb</Text>}
                    >
                        <Menu.Item 
                            icon={() => (<Feather name="user" size={Dims.iconsize - 5} color="black" />) }
                            onPress={() => navigation.navigate("profile")} 
                            title={<Text style={{fontFamily: "mons-e"}}>Profile</Text>}
                        />
                        <Menu.Item 
                            icon={() => (<FontAwesome name="cogs" size={Dims.iconsize - 5} color="black" />) }
                            onPress={() => Linking.openSettings() || navigation.navigate("settings")} 
                            title={<Text style={{fontFamily: "mons-e"}}>Paramètres</Text>}
                        />
                        <Divider />
                        <Menu.Item 
                            icon={() => (<FontAwesome name="sign-out" size={Dims.iconsize - 5} color="black" />) }
                            onPress={() => {
                                ref.current.confirm({
                                    title: <Text style={{ fontFamily: "mons", fontSize: Dims.titletextsize }}>Déconnexion</Text>,
                                    content: [<Text style={{ fontFamily: "mons-e", fontSize: Dims.subtitletextsize, marginHorizontal: 25 }} >Vous êtes sur le point de vous déconnectez de cet appareil, voulez-vous vraiement continuer </Text>],
                                    ok: {
                                        text: 'Continuer',
                                        style: {
                                            color: Colors.primaryColor,
                                            fontFamily: 'mons'
                                        },
                                        callback: () => ondeconnexion()
                                    },
                                    cancel: {
                                        text: 'Annuler',
                                        style: {
                                            color: Colors.darkColor,
                                            fontFamily: "mons-e"
                                        }
                                    },
                                })
                            }} 
                            title={<Text style={{fontFamily: "mons-e"}}>Déconnexion</Text>}
                        />
                    </Menu>
                </Provider>
                </Appbar.Header> */}
            </Appbar.Header>
            <DialogBox ref={ref} isOverlayClickClose={false} />
        </>
    )
};