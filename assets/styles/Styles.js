import { Colors } from "../colors/Colors";
import { Dims } from "../dimensions/Dimemensions";
import { StyleSheet } from "react-native";

export const inputGroup = StyleSheet.create({
    container: {
        width: "100%",
        borderColor: Colors.primaryColor,
        borderWidth: .6,
        marginTop: 5,
        borderRadius: Dims.borderradius,
        height: 46,
        flexDirection: "row",
        overflow: "hidden"
    },
    iconcontainer: {
        width: "20%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        height: "100%"
    },
    inputcontainer: {
        width: "80%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        color: "lime"
    },
    input: {
        color: Colors.primaryColor,
        backgroundColor: Colors.pillColor,
        height: "100%",
        width: "100%",
        paddingLeft: 25,
        fontSize: Dims.iputtextsize
    },
    incon: {
        width: "20%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        height: "100%"
    },
    label: {
        fontFamily: "mons",
        paddingLeft: 10,
        color: Colors.primaryColor
    }
});

export const shadowBox = StyleSheet.create({
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 10,
    // Elevation for Android
    elevation: 5,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
})

export const SpinerStyle = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

export const btn = StyleSheet.create({ width: "100%", backgroundColor: Colors.primaryColor, height: 46, borderRadius: Dims.borderradius, justifyContent: "center", alignContent: "center", alignItems: "center" })

export const cel = StyleSheet.create({
    color: Colors.primaryColor,
    backgroundColor: Colors.pillColor,
    height: 38,
    width: "16%",
    textAlign: "center",
    fontSize: Dims.iputtextsize + 8,
    justifyContent: "center"
});