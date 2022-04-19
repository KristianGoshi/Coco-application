import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import SafeAreaView from 'react-native-safe-area-view';

export enum EOrderStack {
  EXAMPLE = 'Example',
}
export interface OrderStackProps {
  navigation: NativeStackHeaderProps;
}
const Stack = createNativeStackNavigator();

const OrderStack: React.FC<OrderStackProps> = ({navigation}) => {
  return (
    <SafeAreaView
      forceInset={{top: 'never', bottom: 'never'}}
      style={{flex: 1}}>
      <Stack.Navigator
        initialRouteName={EOrderStack.EXAMPLE}
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
export default OrderStack;
