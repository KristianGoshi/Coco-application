import * as React from 'react';
import {createNativeStackNavigator, NativeStackHeaderProps} from '@react-navigation/native-stack';
import SafeAreaView from 'react-native-safe-area-view';
import { APP_COLORS } from '../../assets/styles/colors';
import Login from '../../views/auth/Login';

export enum EAuthStack {
  LOGIN = 'Login',
  SIGNUP = 'Signup',
  RESET_PASSWORD = 'ResetPassword'
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
          title: 'Example',
        }}>
        <Stack.Screen name={EAuthStack.LOGIN} component={Login} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};
export default AuthStack;
