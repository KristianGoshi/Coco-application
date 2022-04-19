import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import SafeAreaView from 'react-native-safe-area-view';

export enum EMenuStack {
  EXAMPLE = 'Example',
}
export interface MenuStackProps {
  navigation: NativeStackHeaderProps;
}
const Stack = createNativeStackNavigator();

const MenuStack: React.FC<MenuStackProps> = ({navigation}) => {
  return (
    <SafeAreaView
      forceInset={{top: 'never', bottom: 'never'}}
      style={{flex: 1}}>
      <Stack.Navigator
        initialRouteName={EMenuStack.EXAMPLE}
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
      </Stack.Navigator>
    </SafeAreaView>
  );
};
export default MenuStack;
