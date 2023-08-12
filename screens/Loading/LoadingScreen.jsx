import * as React from 'react';
import { View, Text, StatusBar } from 'react-native';
import * as Fonts from 'expo-font';
import { onRunRemoveQRY, onRunRetrieveQRY } from '../../services/communications';
import { Loader } from '../../components/Loader/comp.loader';
import { appname } from '../../assets/configs/configs';
import { Colors } from '../../assets/colors/Colors';

export const LoadingSceen = ({ navigation }) => {

    const [ appready, setappready ] = React.useState(false);

    const loadFonts = async () => {

      await Fonts.loadAsync({
        "mons-e": require("../../assets/fonts/MontserratAlternates-ExtraLight.ttf"),
        "mons-a": require("../../assets/fonts/MontserratAlternates-Bold.ttf"),
        "mons": require("../../assets/fonts/MontserratAlternates-SemiBold.ttf"),
        "mons-b": require("../../assets/fonts/Montserrat-SemiBold.ttf")
      });

      await onRunRetrieveQRY({ table: "__tbl_users", limit: 1 }, (er, done) => {
        if(done && done['length'] > 0){
          global.user = done[0];
          navigation.replace("tabs");
          // console.log(done);
        }else navigation.replace("signin");
      });
      setappready(true);
    };
  
    React.useEffect(() => {
        loadFonts();
    }, [loadFonts]);

    return(
      <View style={{flex: 1}}>
        <StatusBar barStyle={"light-content"} backgroundColor={ Colors.primaryColor } />
        <Loader size={72} color={Colors.primaryColor} />
        <View style={{position: "absolute", bottom: "2%", width: "98%"}}>
          <Text style={{ textAlign: "center" }}>&copy; {appname} | {appname} {new Date().getFullYear()} </Text>
        </View>
      </View>
    )
}