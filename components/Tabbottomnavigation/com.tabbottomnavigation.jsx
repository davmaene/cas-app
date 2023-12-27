import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AboutScreen } from '../../screens/About/AboutScreen';
import { ChatScreen } from '../../screens/Chat/ChatScreen';
import { FeedScreen } from '../../screens/Feeds/FeedScreen';
import { HomeScreen } from '../../screens/Home/Home.screen';
import { IntervationScreen } from '../../screens/Intervation/IntervationScreen';
import { AntDesign, Ionicons, MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../assets/colors/Colors';
import { View, Image } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { ProfileScreen } from '../../screens/Profile/Profilescreen';
import { InnersScren } from '../../screens/Inners/InnersScreen';
import { OutersScreen } from '../../screens/Outers/OutersScreen';
import { shadowBox } from '../../assets/styles/Styles';

const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const TabBottom = () => {

  const notificationListener = React.useRef();
  const responseListener = React.useRef();
  const [expoPushToken, setExpoPushToken] = React.useState('');
  const [notification, setNotification] = React.useState(false);


  React.useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
      global.token = token;
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const cs = response['notification']['request']['content']['data']['cs']; // cs ie. case ou le type de notification
      const res = response['notification']['request']['content']['data'];

      switch (cs) {

        default:
          navigation.navigate("notif", { response })
          break;
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

  }, [])

  return (
    <Tab.Navigator
      initialRouteName='Acceuil'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          size = 20;
          let iconName;
          switch (route.name) {
            case 'home':
              iconName = focused
                ? 'apps'
                : 'apps-outline';
              return (
                <>
                  {focused
                    ?
                    (
                      <View style={[{
                        backgroundColor: Colors.whiteColor,
                        borderWidth: .2,
                        borderColor: Colors.primaryColor,
                        padding: 8,
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        borderTopEndRadius: 60,
                        width: 80,
                        height: 80,
                        borderTopStartRadius: 60,
                        elevation: 2,
                      }, shadowBox]}>
                        <Image source={require("../../assets/keyicon.png")} style={{ marginTop: 10, width: 55, resizeMode: "center" }} />
                      </View>
                    )
                    :
                    (
                      <View style={[{
                        backgroundColor: Colors.whiteColor,
                        padding: 8,
                        justifyContent: "center",
                        width: 80,
                        alignContent: "center",
                        alignItems: "center",
                        borderTopEndRadius: 60,
                        height: 80,
                        borderTopStartRadius: 60,
                        elevation: 2
                      }, shadowBox]}>
                        <Image source={require("../../assets/keyicondark.png")} style={{ marginTop: 10, width: 55, resizeMode: "center" }} />
                      </View>
                    )
                  }
                </>
              )
              break;
            case 'profile':
              iconName = focused
                ? "user"
                : "user";
              return <Feather name={iconName} size={size} color={color} />
              break;
            case 'inners':
              iconName = focused
                ? 'arrow-down'
                : 'arrow-down';
              return <FontAwesome name={iconName} size={size} color={color} />;
              break;
            case 'outers':
              iconName = focused
                ? 'arrow-up'
                : 'arrow-up';
              return <FontAwesome name={iconName} size={size} color={color} />;
              break;
            case 'about':
              iconName = focused
                ? 'information-circle-outline'
                : 'information-circle';
              return <Ionicons name={iconName} size={size} color={color} />;
              break;
            default:
              iconName = focused
                ? 'information-circle-outline'
                : 'information-circle';
              return <Ionicons name={iconName} size={size} color={color} />;
              break;
          }
        },
        tabBarVisibilityAnimationConfig: {
          show: true
        },
        tabBarActiveTintColor: Colors.primaryColor,
        tabBarInactiveTintColor: Colors.inactiveColor,
        tabBarLabelPosition: "below-icon",
        tabBarStyle: {
          height: 65
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          flexDirection: "column-reverse",
          fontFamily: "mons-n",
          fontSize: 10,
          marginBottom: 6
        }
      })}
    >
      <Tab.Screen name="home" component={HomeScreen} options={{ tabBarLabel: "" }} />
      <Tab.Screen name="inners" component={InnersScren} options={{ tabBarLabel: "Entrées" }} />
      <Tab.Screen name="outers" component={OutersScreen} options={{ tabBarLabel: "Sortie" }} />
      <Tab.Screen name="about" component={AboutScreen} options={{ tabBarLabel: "A propos" }} />
    </Tab.Navigator>
  );
};

async function schedulePushNotification(numberoflines = new Array()) {
  numberoflines.forEach(elem => {
    if (elem['pushed'] === 1) {
      let nm = elem['clientname']; nm = nm.toString(); nm = nm.toUpperCase();
      Notifications.scheduleNotificationAsync({
        content: {
          title: `${appname}`,
          subtitle: `Une Opération vient de s'effectuer`,
          body: `L'opération ${elem['operationid']} a ${elem['status'] === 'success' || elem['status'] === 'succes' ? "réussie" : "échouée"}`,
          data: {
            response: elem,
            cs: "operation-done"
          },
        },
        trigger: { seconds: 2 },
      });
    }
  });
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
    global.token = token;
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: Colors.primaryColor,
    });
  }
  return token;
};