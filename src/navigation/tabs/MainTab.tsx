import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View} from 'react-native';
import MenuStack from '../stacks/MenuStack';
import OrderStack from '../stacks/OrderStack';
import ProfileStack from '../stacks/ProfileStack';
import ReserveStack from '../stacks/ReserveStack';
import { APP_COLORS } from '../../assets/styles/colors';

const Tab = createBottomTabNavigator();

export enum ETabs {
  MENU = 'Menu',
  ORDER = 'Order',
  RESERVE = 'Reserve',
  PROFILE = 'Profile'
}

const searchIcon = (icon: {focused: boolean}) => (
  <View style={[styles.iconBaseContainer]} accessibilityLabel="search">
    {/* <Icon
      name="search"
      style={icon.focused ? styles.activeLogo : styles.inActiveLogo}
      size={25}
    /> */}
  </View>
);

const startIcon = (icon: {focused: boolean}) => (
  <View style={[styles.iconBaseContainer]} accessibilityLabel="start">
    {/* <Icon
      name="star"
      style={icon.focused ? styles.activeLogo : styles.inActiveLogo}
      size={25}
    /> */}
  </View>
);

const homeIcon = (icon: {focused: boolean}) => (
  <View style={[styles.iconBaseContainer]} accessibilityLabel="homeIcon">
    {/* <Icon
      name="home"
      style={icon.focused ? styles.activeLogo : styles.inActiveLogo}
      size={25}
    /> */}
  </View>
);


const MainTab: React.FC = () => {
  return (
    <Tab.Navigator initialRouteName={ETabs.MENU}>
      <Tab.Screen
        name={ETabs.MENU}
        component={MenuStack}
        options={{
          tabBarIcon: searchIcon,
          //tabBarLabel: t('common:menu.search'),
        }}
      />
      <Tab.Screen
        name={ETabs.ORDER}
        component={OrderStack}
        options={{
          tabBarIcon: homeIcon,
          //tabBarLabel: t('common:menu.yourGarage'),
        }}
      />
      <Tab.Screen
        name={ETabs.RESERVE}
        component={ReserveStack}
        options={{
          tabBarIcon: startIcon,
          //tabBarLabel: t('common:menu.compare'),
        }}
      />
      <Tab.Screen
        name={ETabs.PROFILE}
        component={ProfileStack}
        options={{
          tabBarIcon: startIcon,
          //tabBarLabel: t('common:menu.compare'),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconBaseContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
  activeLogo: {
    color: APP_COLORS.main.extra,
  },
  inActiveLogo: {
    color: APP_COLORS.main.extra,
  },
});

export default MainTab;
