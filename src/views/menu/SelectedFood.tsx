import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {APP_COLORS} from '../../assets/styles/colors';
import StyledButton, { EButtonType } from '../../components/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorites, setFavorites } from '../../redux/actions/userActions';
import { IMenu } from '../../models/IMenu';
import { userFavoritesSelector } from '../../redux/selectors/userSelectors';
import { addCount, setOrder } from '../../redux/actions/orderActions';
import { userOrderSelector } from '../../redux/selectors/orderSelectors';
import Snackbar from 'react-native-snackbar';

export interface SelectedFoodProps {}

type Params = {
  [key: string]: any;
};

const SelectedFood: React.FC<SelectedFoodProps> = React.memo(
  () => {
    const {t} = useTranslation('menu');
    const dispatch = useDispatch();
    const userFavorites = useSelector(userFavoritesSelector);
    const userOrder = useSelector(userOrderSelector);
    const params: Params = useRoute().params!;
    const [counter, setCounter] = useState(1);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
      if (userFavorites.some(e => e.emri === params.title)) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    }, [userFavorites]);

    const onDecrease = () => {
      if (counter <= 1) {
        return;
      }
      setCounter(counter - 1);
    }
    const onIncrease = () => {
      setCounter(counter + 1);
    };

    const onFavorite = useCallback(async (favoriteFood: Array<IMenu>) => {
      if (!favorite) {
        await dispatch(setFavorites(favoriteFood));
      } else {
        await dispatch(removeFavorites(params.title));
      }
      setFavorite(!favorite);
    }, [favorite]);

    const onOrder = useCallback(async () => {
      if (userOrder.some(e => e.emri === params.title)) {
        await dispatch(
          addCount({foto: params.foto, emri: params.title, cmimi: params.price, sasia: counter}),
        );
        Snackbar.show({
          text: t('order.old'),
          duration: 800,
          backgroundColor: APP_COLORS.background.container_secondary,
        });
      } else {
        await dispatch(
          setOrder({
            foto: params.foto,
            emri: params.title,
            cmimi: params.price,
            sasia: counter,
          }),
        );
        Snackbar.show({
          text: t('order.new'),
          duration: 800,
          backgroundColor: APP_COLORS.background.container_secondary,
        });
      }
      },
      [params, counter, userOrder],
    );

    return (
      <ScrollView>
        <Image
          source={params.foto}
          style={{
            width: '93%',
            height: 360,
            borderRadius: 16,
            alignSelf: 'center',
            marginTop: 15,
          }}
        />
        <View style={styles.container}>
          <View
            style={{
              marginTop: 10,
              alignSelf: 'flex-start',
            }}>
            <Text style={styles.categorieStyle}>{params.categorie}</Text>
          </View>
          <View
            style={{
              marginTop: 5,
              alignSelf: 'flex-start',
            }}>
            <Text style={styles.nameStyle}>{params.title}</Text>
          </View>
          <View
            style={{
              marginTop: 5,
              alignSelf: 'flex-start',
            }}>
            <Text style={styles.descriptionStyle}>{params.pershkrimi}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => onDecrease()}
              style={styles.increase}>
              <Text style={styles.increaseIcon}>-</Text>
            </TouchableOpacity>
            <View style={{width: 25, alignSelf: 'center'}}>
              <Text style={styles.increaseIcon}>{counter}</Text>
            </View>
            <TouchableOpacity
              onPress={() => onIncrease()}
              style={styles.increase}>
              <Text style={styles.increaseIcon}>+</Text>
            </TouchableOpacity>
            <View style={{alignSelf: 'center', marginLeft: 70}}>
              <Text style={styles.priceStyle}>
                {params.price * counter + ' LEK'}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <View
              style={{
                marginTop: 30,
                alignSelf: 'flex-start',
              }}>
              <StyledButton
                type={EButtonType.PRIMARY}
                width={'100%'}
                onPress={() => onOrder()}
                children={() => (
                  <Text
                    style={{
                      color: APP_COLORS.typography.body_text,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    {t('main.order')}
                  </Text>
                )}
              />
            </View>
            {params.regular && (
              <View style={styles.heartView}>
                <Icon
                  name={favorite ? 'heart' : 'heart-outline'}
                  style={styles.icon}
                  size={35}
                  onPress={() =>
                    onFavorite([
                      {
                        emri: params.title,
                        categorie: params.categorie,
                        foto: params.foto,
                        cmimi: params.price,
                      },
                    ])
                  }
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    );
  },
);

SelectedFood.displayName = 'SelectedFood';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginTop: 20,
  },
  nameStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: APP_COLORS.background.container_triary,
  },
  categorieStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: APP_COLORS.background.container_secondary,
  },
  descriptionStyle: {
    fontSize: 18,
    color: APP_COLORS.background.container_secondary,
  },
  priceStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: APP_COLORS.background.container_triary,
  },
  icon: {
    color: APP_COLORS.background.container_triary,
  },
  increase: {
    marginHorizontal: 15,
    borderColor: APP_COLORS.background.container_secondary,
    borderWidth: 2,
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  increaseIcon: {
    fontSize: 20,
    textAlign: 'center',
    color: APP_COLORS.background.container_triary,
  },
  heartView: {
    marginTop: 40,
    alignSelf: 'center',
    marginLeft: 40,
  },
});

export default SelectedFood;
