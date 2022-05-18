import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import SafeAreaView from 'react-native-safe-area-view';
import { APP_COLORS } from '../../assets/styles/colors';
import MainMenu from '../../views/menu/MainMenu';
import SelectedCategorie from '../../views/menu/SelectedCategorie';
import SelectedFood from '../../views/menu/SelectedFood';

export enum EMenuStack {
  MAIN_MENU = 'Coco',
  SELECTED_CATEGORIE = 'Selected Categorie',
  SELECTED_FOOD = 'Selected Food'
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
        initialRouteName={EMenuStack.MAIN_MENU}
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: APP_COLORS.background.container_primary,
          },
        }}>
        <Stack.Screen name={EMenuStack.MAIN_MENU} component={MainMenu} />
        <Stack.Screen
          name={EMenuStack.SELECTED_CATEGORIE}
          component={SelectedCategorie}
        />
        <Stack.Screen
          name={EMenuStack.SELECTED_FOOD}
          component={SelectedFood}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};
export default MenuStack;
