import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {APP_COLORS} from '../../assets/styles/colors';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { userOrderSelector } from '../../redux/selectors/orderSelectors';
import OrderView from './OrderView';

export interface MyOrdersProps {
  navigation: any;
  onPress(): () => void;
}

const MyOrders: React.FC<MyOrdersProps> = React.memo(({navigation}) => {
  const userOrder = useSelector(userOrderSelector);
  const {t} = useTranslation('user');

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {userOrder.length ? (
            <View style={styles.listView}>
              <FlatList
                data={userOrder}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <OrderView
                    emri={item.emri}
                    foto={item.foto}
                    sasia={item.sasia}
                    cmimi={item.cmimi}
                  />
                )}
              />
            </View>
          ) : (
            <View style={{marginTop: 180, marginHorizontal: 30}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: APP_COLORS.background.container_secondary,
                  textAlign: 'center',
                }}>
                {t('none.order')}
              </Text>
              <View>
                <Icon
                  name="restaurant"
                  size={150}
                  style={styles.settingsIconStyle}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
});

MyOrders.displayName = 'MyOrders';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  titleStyle: {
    //fontFamily: 'DMSans-Regular',
    fontSize: 22,
    fontWeight: 'bold',
    color: APP_COLORS.typography.body_text,
    textAlign: 'center',
  },
  textStyle: {
    //fontFamily: 'DMSans-Regular',
    fontSize: 18,
    fontWeight: 'bold',
    color: APP_COLORS.typography.body_text,
    textAlign: 'center',
  },
  addButton: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: APP_COLORS.background.container_triary,
    backgroundColor: APP_COLORS.background.container_triary,
    width: 60,
    height: 60,
    position: 'absolute',
    right: 30,
    bottom: 25,
  },
  addSign: {
    alignItems: 'center',
    marginTop: 5,
  },
  listView: {
    marginTop: 15,
    borderWidth: 2,
    borderColor: APP_COLORS.background.container_secondary,
    padding: 5,
    borderRadius: 16,
    backgroundColor: APP_COLORS.background.container_triary,
  },
  settingsIconStyle: {
    color: APP_COLORS.background.container_secondary,
    alignSelf: 'center',
    marginTop: 50,
  },
});

export default MyOrders;
