import * as React from 'react';
import {createNativeStackNavigator, NativeStackHeaderProps} from '@react-navigation/native-stack';
import SafeAreaView from 'react-native-safe-area-view';

export enum EAuthStack {
  EXAMPLE = 'Example'
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
        initialRouteName={EAuthStack.EXAMPLE}
        screenOptions={{
          headerShown: true,
          headerStyle: {
            //backgroundColor: theme.backgroundsColor.offBlack,
          },
          //headerTintColor: theme.typographyColor.bodyText,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          title: 'Example',
        }}>
        {/* <Stack.Screen name={EAuthStack.EXAMPLE} component={HomeScreen} /> */}
      </Stack.Navigator>
    </SafeAreaView>
  );
};
export default AuthStack;
