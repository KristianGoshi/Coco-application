import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
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
import TextInput from '../../components/Input';
import KeyboardAwareContainer from '../../components/Keyboard';

export interface MyOrdersProps {}

const MyOrders: React.FC<MyOrdersProps> = React.memo(() => {
  const userOrder = useSelector(userOrderSelector);
  const {t} = useTranslation('order');
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState(false);
  const [total, setTotal] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setCompleted(false);
    }, [])
  );

  useEffect(() => {
    const totalSum = userOrder.reduce((partialSum, a: any) => partialSum + a.cmimi * a.sasia, 0);
    setTotal(totalSum);
  }, [userOrder]);

  const onSubmit = useCallback(async () => {
    setCompleted(true);
    await dispatch(completeOrder());
  }, []);

  return (
    <KeyboardAwareContainer>
      <View style={styles.container}>
        {userOrder.length !== 0 && !completed && (
          <>
            <ScrollView
              style={[
                styles.listView,
                {height: Dimensions.get('window').height - 400},
              ]}>
              <FlatList
                data={userOrder}
                scrollEnabled={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <OrderView
                    emri={item.emri || 'Unknown'}
                    foto={
                      item.foto ||
                      require('../../assets/images/Ushqimet/krepa_coko.jpeg')
                    }
                    sasia={item.sasia || 0}
                    cmimi={item.cmimi || 0}
                  />
                )}
              />
            </ScrollView>
            <View style={{marginTop: -5}}>
              <TextInput
                placeholder={t('order.specialRequest')}
                autoCapitalize="none"
                autoCorrect={false}
                multiline
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 5,
                marginTop: -5,
                alignSelf: 'center',
              }}>
              <View style={{alignSelf: 'center'}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: APP_COLORS.background.container_triary,
                    alignSelf: 'center',
                  }}>
                  Total (Lek)
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    color: APP_COLORS.background.container_triary,
                  }}>
                  {total}
                </Text>
              </View>
              <View style={styles.buttonWrapper}>
                <StyledButton
                  type={EButtonType.PRIMARY}
                  spinner={APP_COLORS.typography.body_text}
                  onPress={() => onSubmit()}
                  children={() => (
                    <Text style={{color: 'white', fontSize: 16}}>
                      {t('order.submit')}
                    </Text>
                  )}
                />
              </View>
            </View>
          </>
        )}
        {userOrder.length === 0 && !completed && (
          <View style={{marginTop: 180, marginHorizontal: 18}}>
            <Text style={styles.textStyle}>{t('order.none')}</Text>
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
          <View style={{marginTop: 150, marginHorizontal: 18}}>
            <View style={[styles.successLogoWrapper]}>
              <Icon
                name="checkmark-circle-outline"
                size={200}
                style={styles.iconStyle}
              />
            </View>
            <View>
              <Text style={styles.textStyle}>{t('order.success')}</Text>
              <Text style={styles.textStyle}>{t('order.contact')}</Text>
            </View>
          </View>
        )}
      </View>
    </KeyboardAwareContainer>
  );
});

MyOrders.displayName = 'MyOrders';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: APP_COLORS.background.container_secondary,
    textAlign: 'center',
    maxWidth: '80%',
    alignSelf: 'center',
  },
  listView: {
    marginTop: 15,
    borderWidth: 2,
    borderColor: APP_COLORS.background.container_secondary,
    padding: 5,
    borderRadius: 16,
    backgroundColor: '#e1e4eb',
  },
  settingsIconStyle: {
    color: APP_COLORS.background.container_secondary,
    alignSelf: 'center',
    marginTop: 50,
  },
  buttonWrapper: {
    width: '70%',
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
