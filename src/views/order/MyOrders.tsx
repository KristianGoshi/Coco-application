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
import StyledButton, { EButtonType } from '../../components/Button';
import { completeOrder } from '../../redux/actions/orderActions';
import { useFocusEffect } from '@react-navigation/native';

export interface MyOrdersProps {
  navigation: any;
  onPress(): () => void;
}

const MyOrders: React.FC<MyOrdersProps> = React.memo(({navigation}) => {
  const userOrder = useSelector(userOrderSelector);
  const {t} = useTranslation('order');
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setCompleted(false);
    }, [])
  );

  const onSubmit = useCallback(async () => {
    setCompleted(true);
    await dispatch(completeOrder());
  }, []);

  return (
    <>
      <View style={styles.container}>
        {userOrder.length !== 0 && !completed && (
          <>
            <ScrollView style={styles.listView}>
              <FlatList
                data={userOrder}
                keyExtractor={(item, index) => item.emri}
                renderItem={({item, index}) => (
                  <OrderView
                    emri={item.emri}
                    foto={item.foto}
                    sasia={item.sasia}
                    cmimi={item.cmimi}
                  />
                )}
              />
            </ScrollView>
            <View style={styles.buttonWrapper}>
              <StyledButton
                type={EButtonType.SECONDARY}
                spinner={APP_COLORS.typography.body_text}
                onPress={() => onSubmit()}
                children={() => (
                  <Text style={{color: 'white'}}>{t('order.submit')}</Text>
                )}
              />
            </View>
          </>
        )}
        {userOrder.length === 0 && !completed && (
          <View style={{marginTop: 180, marginHorizontal: 30}}>
            <Text
              style={styles.textStyle}>
              {t('order.none')}
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
        {completed && (
          <>
            <View style={[styles.successLogoWrapper, {marginTop: 150}]}>
              <Icon name="checkmark-circle-outline" size={200} style={styles.iconStyle} />
            </View>
            <View>
              <Text style={styles.textStyle}>{t('order.success')}</Text>
            </View>
          </>
        )}
      </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: APP_COLORS.background.container_secondary,
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
  buttonWrapper: {
    paddingBottom: 25,
    paddingTop: 20,
    width: '70%',
    alignSelf: 'center',
  },
  successLogoWrapper: {
    paddingTop: 20,
    alignSelf: 'center',
  },
  iconStyle: {
    color: APP_COLORS.background.container_secondary,
  },
});

export default MyOrders;
