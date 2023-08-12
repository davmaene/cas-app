import * as React from 'react';
import { View, Text } from 'react-native';
import { Title } from '../../components/Title/Title';

export const ProfileScreen = ({ navigation }) => {
    return(
        <>
            <Title navigation={undefined} title={"Profile"} subtitle={"Personalisation du profile"} />
        </>
    )
}