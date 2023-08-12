import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AboutScreen } from '../../screens/About/AboutScreen';
import { ChatScreen } from '../../screens/Chat/ChatScreen';
import { FeedScreen } from '../../screens/Feeds/FeedScreen';
import { HomeScreen } from '../../screens/Home/Home.screen';
import { IntervationScreen } from '../../screens/Intervation/IntervationScreen';
import { AntDesign, Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { Colors } from '../../assets/colors/Colors';
import { View, Image } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { ProfileScreen } from '../../screens/Profile/Profilescreen';

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
          size = 17;
          let iconName;
          switch (route.name) {
              case 'Acceuil'://<Ionicons name={iconName} size={size} color={color} />;
                  iconName = focused
                  ? 'apps'
                  : 'apps-outline';
                  return (
                    <>
                      { focused 
                      ? 
                      ( <View style={{ backgroundColor: Colors.whiteColor, padding: 8, borderTopEndRadius: 20, borderTopStartRadius: 20, elevation: 2 }}>
                            <Image source={require("../../assets/icon.png")} style={{width: 40, resizeMode: "contain"}} /> 
                        </View>
                      )
                      : <Ionicons name='apps' size={32} color={color} style={{marginTop: 2}} /> }
                    </>
                  )
                  break;
              case 'Messagerie':
                  iconName = focused
                  ? 'md-chatbubbles'
                  : 'md-chatbubbles-outline';
                  return <Ionicons name={iconName} size={size} color={color} />;
                  break;
              case 'Intervation':
                iconName = focused
                  ? "ambulance"
                  : "ambulance";
                  return <MaterialCommunityIcons name={iconName} size={size} color={color} />
                  break;
              case 'Profile':
                iconName = focused
                  ? "user"
                  : "user";
                  return <Feather name={iconName} size={size} color={color} />
                  break;
              case 'Actualités':
                  iconName = focused
                  ? 'newspaper'
                  : 'newspaper-outline';
                  return <Ionicons name={iconName} size={size} color={color} />;
                  break;
              default:
                  iconName = focused
                  ? 'information-circle-outline'
                  : 'information-circle';
                  return <Ionicons name={iconName} size={size} color={color} />;
                  break;
          }
          // return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarVisibilityAnimationConfig: {
          show: true
        },
        tabBarActiveTintColor: Colors.secondaryColor,
        tabBarInactiveTintColor: Colors.primaryColor,
        tabBarLabelPosition: "below-icon",
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          flexDirection: "column-reverse",
          fontFamily: "mons-e",
          fontSize: 10,
          marginBottom: 6
        }
      })}
    >
      <Tab.Screen name="Messagerie" component={ChatScreen} />
      {/* <Tab.Screen name="intervation" component={IntervationScreen} /> */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Acceuil" component={HomeScreen} options={{tabBarLabel: ""}} />
      <Tab.Screen name="Actualités" component={FeedScreen} />
      <Tab.Screen name="A Propos" component={AboutScreen} />
    </Tab.Navigator>
  );
};

async function schedulePushNotification(numberoflines = new Array()) {
  numberoflines.forEach(elem => {
      if(elem['pushed'] === 1){
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