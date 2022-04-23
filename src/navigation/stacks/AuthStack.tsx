import * as React from 'react';
import {createNativeStackNavigator, NativeStackHeaderProps} from '@react-navigation/native-stack';
import SafeAreaView from 'react-native-safe-area-view';
import { APP_COLORS } from '../../assets/styles/colors';
import Login from '../../views/auth/Login';
import SignUp from '../../views/auth/SignUp';
import ResetPassword from '../../views/auth/ResetPassword';

export enum EAuthStack {
  LOGIN = 'Login',
  SIGNUP = 'SignUp',
  RESET_PASSWORD = 'Reset Password'
}
export interface AuthStackProps {
  navigation: NativeStackHeaderProps;
}
const Stack = createNativeStackNavigator();

const AuthStack: React.FC<AuthStackProps> = ({navigation}) => {
  return (
    <SafeAreaView
      forceInset={{top: 'never', bottom: 'never'}}
      style={{flex: 1}}>
      <Stack.Navigator
        initialRouteName={EAuthStack.LOGIN}
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: APP_COLORS.background.main_background,
          },
          headerTintColor: APP_COLORS.typography.body_text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          contentStyle: {
            backgroundColor: APP_COLORS.background.main_background,
          },
        }}>
        <Stack.Screen name={EAuthStack.LOGIN} component={Login} />
        <Stack.Screen name={EAuthStack.SIGNUP} component={SignUp} />
        <Stack.Screen name={EAuthStack.RESET_PASSWORD} component={ResetPassword} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};
export default AuthStack;
