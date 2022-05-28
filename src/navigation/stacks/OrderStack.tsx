import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import SafeAreaView from 'react-native-safe-area-view';
import { APP_COLORS } from '../../assets/styles/colors';

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

        </Stack.Navigator>
    </SafeAreaView>
  );
};
export default OrderStack;
