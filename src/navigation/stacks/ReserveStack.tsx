import * as React from 'react';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import SafeAreaView from 'react-native-safe-area-view';
import { APP_COLORS } from '../../assets/styles/colors';
import Reservations from '../../views/reserve/Reservations';

export enum EReserveStack {
  RESERVATIONS = 'Reservations',
}
export interface ReserveStackProps {
}
const Stack = createNativeStackNavigator();

const ReserveStack: React.FC<ReserveStackProps> = () => {
  return (
    <SafeAreaView
      forceInset={{top: 'never', bottom: 'never'}}
      style={{flex: 1}}>
      <Stack.Navigator
        initialRouteName={EReserveStack.RESERVATIONS}
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
        <Stack.Screen
          name={EReserveStack.RESERVATIONS}
          component={Reservations}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};
export default ReserveStack;
