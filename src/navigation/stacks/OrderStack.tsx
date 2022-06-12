import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import SafeAreaView from 'react-native-safe-area-view';
import { APP_COLORS } from '../../assets/styles/colors';
import MyOrders from '../../views/order/MyOrders';

export enum EOrderStack {
  MY_ORDERS = 'My Order',
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
        initialRouteName={EOrderStack.MY_ORDERS}
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
        <Stack.Screen name={EOrderStack.MY_ORDERS} component={MyOrders} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};
export default OrderStack;
