import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import SafeAreaView from 'react-native-safe-area-view';
import { APP_COLORS } from '../../assets/styles/colors';
import MyProfile from '../../views/profile/MyProfile';
import ChangeProfile from '../../views/profile/ChangeProfile';
import ChangePassword from '../../views/profile/ChangePassword';
import ChangeLanguage from '../../views/profile/ChangeLanguage';

export enum EProfileStack {
  MY_PROFILE = 'My Profile',
  EDIT_PROFILE = 'Edit Profile',
  CHANGE_PASSWORD = 'Change Password',
  CHANGE_LANGUAGE = 'Change Language'
}
export interface ProfileStackProps {
  navigation: NativeStackHeaderProps;
}
const Stack = createNativeStackNavigator();

const ProfileStack: React.FC<ProfileStackProps> = ({navigation}) => {
  return (
    <SafeAreaView
      forceInset={{top: 'never', bottom: 'never'}}
      style={{flex: 1}}>
      <Stack.Navigator
        initialRouteName={EProfileStack.MY_PROFILE}
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: APP_COLORS.background.container_primary,
          },
          headerTintColor: APP_COLORS.typography.body_text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          contentStyle: {
            backgroundColor: APP_COLORS.background.container_primary,
          },
        }}>
        <Stack.Screen name={EProfileStack.MY_PROFILE} component={MyProfile} />
        <Stack.Screen
          name={EProfileStack.EDIT_PROFILE}
          component={ChangeProfile}
        />
        <Stack.Screen
          name={EProfileStack.CHANGE_PASSWORD}
          component={ChangePassword}
        />
        <Stack.Screen
          name={EProfileStack.CHANGE_LANGUAGE}
          component={ChangeLanguage}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};
export default ProfileStack;
