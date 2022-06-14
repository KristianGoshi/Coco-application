import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SafeAreaView from 'react-native-safe-area-view';
import { APP_COLORS } from '../../assets/styles/colors';
import Login from '../../views/auth/Login';
import SignUp from '../../views/auth/SignUp';
import ResetPassword from '../../views/auth/ResetPassword';

export enum EAuthStack {
  LOGIN = 'Login',
  SIGNUP = 'Sign Up',
  RESET_PASSWORD = 'Reset Password'
}
export interface AuthStackProps {

}
const Stack = createNativeStackNavigator();

const AuthStack: React.FC<AuthStackProps> = () => {
  return (
    <SafeAreaView
      forceInset={{top: 'never', bottom: 'never'}}
      style={{flex: 1}}>
      <Stack.Navigator
        initialRouteName={EAuthStack.LOGIN}
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: APP_COLORS.background.container_primary,
          },
          headerTintColor: APP_COLORS.background.container_triary,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 22,
          },
          headerTitleAlign: 'center',
          contentStyle: {
            backgroundColor: APP_COLORS.background.container_primary,
          },
        }}>
        <Stack.Screen name={EAuthStack.LOGIN} component={Login} />
        <Stack.Screen name={EAuthStack.SIGNUP} component={SignUp} />
        <Stack.Screen
          name={EAuthStack.RESET_PASSWORD}
          component={ResetPassword}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};
export default AuthStack;
