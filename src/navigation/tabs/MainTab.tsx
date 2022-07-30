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
import SafeAreaView from 'react-native-safe-area-view';

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
      <View style={icon.focused ? styles.activeTab : {}}>
        <Icon
          name="restaurant"
          style={icon.focused ? styles.activeLogo : styles.inActiveLogo}
          size={25}
        />
        {!icon.focused && (
          <Text
            style={[
              icon.focused ? styles.activeLogo : styles.inActiveLogo,
              {fontSize: 10},
            ]}>
            Menu
          </Text>
        )}
      </View>
    </View>
  );

  const orderIcon = (icon: {focused: boolean}) => (
    <View style={[styles.iconBaseContainer]} accessibilityLabel="order">
      <View style={icon.focused ? styles.activeTab : {}}>
        <Icon
          name="call"
          style={icon.focused ? styles.activeLogo : styles.inActiveLogo}
          size={25}
        />
        {!icon.focused && (
          <Text
            style={[
              icon.focused ? styles.activeLogo : styles.inActiveLogo,
              {fontSize: 10},
            ]}>
            Order
          </Text>
        )}
      </View>
      {userOrder.length !== 0 && (
        <View
          style={{
            position: 'absolute',
            right: 0,
            top: icon.focused ? 2 : -1,
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
      <View style={icon.focused ? styles.activeTab : {}}>
        <Icon
          name="calendar"
          style={icon.focused ? styles.activeLogo : styles.inActiveLogo}
          size={25}
        />
        {!icon.focused && (
          <Text
            style={[
              icon.focused ? styles.activeLogo : styles.inActiveLogo,
              {fontSize: 10},
            ]}>
            Reserve
          </Text>
        )}
      </View>
    </View>
  );

  const profileIcon = (icon: {focused: boolean}) => (
    <View style={[styles.iconBaseContainer]} accessibilityLabel="profile">
      <View style={icon.focused ? styles.activeTab : {}}>
        <Icon
          name="person"
          style={icon.focused ? styles.activeLogo : styles.inActiveLogo}
          size={25}
        />
        {!icon.focused && (
          <Text
            style={[
              icon.focused ? styles.activeLogo : styles.inActiveLogo,
              {fontSize: 10},
            ]}>
            Profile
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView
      forceInset={{top: 'never', bottom: 'never'}}
      style={{
        flex: 1,
        backgroundColor: APP_COLORS.background.container_primary,
      }}>
      <Tab.Navigator
        initialRouteName={ETabs.MENU}
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabContainer,
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
    </SafeAreaView>
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
    alignSelf: 'center',
  },
  inActiveLogo: {
    color: APP_COLORS.tabs_logos.inactive,
    alignSelf: 'center',
  },
  activeTab: {
    backgroundColor: APP_COLORS.background.container_triary,
    width: 75,
    height: 48,
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 10,
  },
  tabContainer: {
    backgroundColor: '#F9F9F9',
    borderTopColor: APP_COLORS.background.container_triary,
    borderColor: APP_COLORS.background.container_triary,
    borderTopWidth: 2,
    borderWidth: 2,
    paddingTop: 30,
    borderRadius: 24,
    width: '92%',
    height: 60,
    alignSelf: 'center',
    marginBottom: 15,
  },
});

export default MainTab;
