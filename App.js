import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SigninScreen } from './screens/Signin/Signinscreen';
import { SignupScreen } from './screens/Signup/Signupscreen';
import { SettingScreen } from './screens/Settings/SettingScreen';
import { TabBottom } from './components/Tabbottomnavigation/com.tabbottomnavigation';
import { LoadingSceen } from './screens/Loading/LoadingScreen';

import { VerifyaccountScreen } from './screens/Verifyqccount/VerifyaccountScreen';
import { Provider } from 'react-native-paper';
import { toastConfig } from './assets/Toast/Toastconfig';
import Toast from 'react-native-toast-message';
import { DetailflightScreen } from './screens/Detailsflight/Detailsflights';
import { ProfileScreen } from './screens/Profile/Profilescreen';
import { DetailsStore } from './screens/DetailsStore/DetailStore';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='loading'
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="loading" component={LoadingSceen} />
          <Stack.Screen name="tabs" component={TabBottom} />
          <Stack.Screen name="signin" component={SigninScreen} />
          <Stack.Screen name="signup" component={SignupScreen} />
          <Stack.Screen name="settings" component={SettingScreen} />
          <Stack.Screen name="verifyaccount" component={VerifyaccountScreen} />
          <Stack.Screen name="profile" component={ProfileScreen} />
          <Stack.Screen name="detailflighht" component={DetailflightScreen} />
          <Stack.Screen name="detailstore" component={DetailsStore} />

        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </Provider>
  );
};
