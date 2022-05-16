import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import SafeAreaView from 'react-native-safe-area-view';
import { APP_COLORS } from '../../assets/styles/colors';

export enum EProfileStack {
  EXAMPLE = 'Example',
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
        initialRouteName={EProfileStack.EXAMPLE}
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: APP_COLORS.background.container_primary,
          },
        }}>

      </Stack.Navigator>
    </SafeAreaView>
  );
};
export default ProfileStack;
