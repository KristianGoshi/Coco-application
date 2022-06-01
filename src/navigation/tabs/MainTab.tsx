import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View} from 'react-native';
import MenuStack from '../stacks/MenuStack';
import OrderStack from '../stacks/OrderStack';
import ProfileStack from '../stacks/ProfileStack';
import ReserveStack from '../stacks/ReserveStack';
import { APP_COLORS } from '../../assets/styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { userOrderSelector } from '../../redux/selectors/orderSelectors';

const Tab = createBottomTabNavigator();

export enum ETabs {
  MENU = 'Menu',
  ORDER = 'Order',
  RESERVE = 'Reserve',
  PROFILE = 'Profile'
}

const MainTab: React.FC = () => {
  const userOrder = useSelector(userOrderSelector);

  const menuIcon = (icon: {focused: boolean}) => (
    <View style={[styles.iconBaseContainer]} accessibilityLabel="menu">
      <Icon
        name="restaurant"
        style={icon.focused ? styles.activeLogo : styles.inActiveLogo}
        size={25}
      />
      <Text
        style={[
          icon.focused ? styles.activeLogo : styles.inActiveLogo,
          {fontSize: 10},
        ]}>
        Menu
      </Text>
    </View>
  );

  const orderIcon = (icon: {focused: boolean}) => (
    <View style={[styles.iconBaseContainer]} accessibilityLabel="order">
      <Icon
        name="call"
        style={icon.focused ? styles.activeLogo : styles.inActiveLogo}
        size={25}
      />
      <Text
        style={[
          icon.focused ? styles.activeLogo : styles.inActiveLogo,
          {fontSize: 10},
        ]}>
        Order
      </Text>
      {userOrder.length !== 0 && (
        <View
          style={{
            position: 'absolute',
            right: 0,
            top: -3,
            backgroundColor: 'red',
            paddingHorizontal: 3,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
            }}>
            {userOrder.length}
          </Text>
        </View>
      )}
    </View>
  );

  const reserveIcon = (icon: {focused: boolean}) => (
    <View style={[styles.iconBaseContainer]} accessibilityLabel="reserve">
      <Icon
        name="calendar"
        style={icon.focused ? styles.activeLogo : styles.inActiveLogo}
        size={25}
      />
      <Text
        style={[
          icon.focused ? styles.activeLogo : styles.inActiveLogo,
          {fontSize: 10},
        ]}>
        Reserve
      </Text>
    </View>
  );

  const profileIcon = (icon: {focused: boolean}) => (
    <View style={[styles.iconBaseContainer]} accessibilityLabel="profile">
      <Icon
        name="person"
        style={icon.focused ? styles.activeLogo : styles.inActiveLogo}
        size={25}
      />
      <Text
        style={[
          icon.focused ? styles.activeLogo : styles.inActiveLogo,
          {fontSize: 10},
        ]}>
        Profile
      </Text>
    </View>
  );

  return (
    <Tab.Navigator
      initialRouteName={ETabs.MENU}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: APP_COLORS.background.container_primary,
          borderTopColor: APP_COLORS.background.container_secondary,
          paddingTop: 10,
        },
      }}>
      <Tab.Screen
        name={ETabs.MENU}
        component={MenuStack}
        options={{
          tabBarIcon: menuIcon,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name={ETabs.ORDER}
        component={OrderStack}
        options={{
          tabBarIcon: orderIcon,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name={ETabs.RESERVE}
        component={ReserveStack}
        options={{
          tabBarIcon: reserveIcon,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name={ETabs.PROFILE}
        component={ProfileStack}
        options={{
          tabBarIcon: profileIcon,
          tabBarShowLabel: false,
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
    color: APP_COLORS.tabs_logos.active,
  },
  inActiveLogo: {
    color: APP_COLORS.tabs_logos.inactive,
  },
});

export default MainTab;
