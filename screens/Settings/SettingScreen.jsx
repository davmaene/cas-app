import * as React from 'react';
import { View, Text } from 'react-native';
import { Title } from '../../components/Title/Title';

export const SettingScreen = ({ navigation }) => {
    return(
        <>
           <Title navigation={navigation} title={"Paramètres"} subtitle={"Personalisation de l'appication"} />
        </>
    )
}