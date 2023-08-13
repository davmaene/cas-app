import * as React from 'react';
import { Appbar, Button, Menu, Divider, Provider } from 'react-native-paper';
import { Platform, Text, View, StatusBar } from 'react-native';
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

    return (
        <>
            <StatusBar barStyle={"light-content"} backgroundColor={Colors.primaryColor} />
            <Appbar.Header
                style={{ backgroundColor: Colors.primaryColor }}
            >
                {navigation

                    ?
                    <Appbar.Action
                        icon="arrow-left-circle" onPress={() => {
                            if (typeof action === "function") action();
                            else navigation.goBack();
                        }}
                    />
                    :
                    <></>
                }
                <Appbar.Content
                    title={<Text style={{ fontFamily: "mons-b", fontSize: Dims.subtitletextsize }}>{title}</Text>}
                    subtitle={<Text style={{ fontFamily: "mons-e", fontSize: Dims.subtitletextsize }}>{subtitle}</Text>} />
                <Appbar.Action icon={MORE_ICON} onPress={() => openMenu()} />
            </Appbar.Header>
        </>
    )
};