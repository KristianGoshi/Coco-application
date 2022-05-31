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

export interface SelectedFoodProps {}

const SelectedFood: React.FC<SelectedFoodProps> = React.memo(
  () => {
    const {t} = useTranslation('menu');
    const dispatch = useDispatch();
    const userFavorites = useSelector(userFavoritesSelector);
    const params = useRoute().params;
    const [counter, setCounter] = useState(1);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
      if (userFavorites.some(e => e.emri === params.title)) {
        setFavorite(true);
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

    return (
      <ScrollView>
        <Image
          source={params.foto}
          style={{
            width: '100%',
            height: 400,
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
              flexDirection: 'row',
              alignSelf: 'flex-start',
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => onDecrease()}
              style={styles.increase}>
              <Text
                style={styles.increaseIcon}>
                -
              </Text>
            </TouchableOpacity>
            <View style={{width: 25, alignSelf: 'center'}}>
              <Text
                style={styles.increaseIcon}>
                {counter}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => onIncrease()}
              style={styles.increase}>
              <Text
                style={styles.increaseIcon}>
                +
              </Text>
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
                marginTop: 40,
                alignSelf: 'flex-start',
              }}>
              <StyledButton
                type={EButtonType.SECONDARY}
                width={'100%'}
                //onPress={() => onSubmit()}
                children={() => (
                  <Text style={{color: APP_COLORS.typography.body_text}}>
                    {t('food.order')}
                  </Text>
                )}
              />
            </View>
            {params.regular && (
              <View
                style={styles.heartView}>
                <Icon
                  name={favorite ? 'heart' : 'heart-outline'}
                  style={styles.icon}
                  size={35}
                  onPress={() => onFavorite([{emri: params.title, categorie: params.categorie, foto: params.foto, cmimi: params.price}])}
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
  label: {
    //fontFamily: 'DMSans-Regular',
    fontWeight: 'bold',
    color: APP_COLORS.typography.body_text,
  },
  container: {
    marginHorizontal: 30,
    marginTop: 20,
  },
  nameStyle: {
    //fontFamily: 'DMSans-Regular',
    fontSize: 25,
    fontWeight: 'bold',
    color: APP_COLORS.typography.body_text,
  },
  categorieStyle: {
    //fontFamily: 'DMSans-Regular',
    fontSize: 16,
    color: APP_COLORS.typography.body_text,
  },
  priceStyle: {
    //fontFamily: 'DMSans-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    color: APP_COLORS.typography.body_text,
  },
  icon: {
    color: APP_COLORS.background.elements_triary,
  },
  increase: {
    marginHorizontal: 15,
    borderColor: APP_COLORS.background.elements_secondary,
    borderWidth: 2,
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  increaseIcon: {
    fontSize: 20,
    textAlign: 'center',
    color: APP_COLORS.background.elements_triary,
  },
  heartView: {
    marginTop: 40,
    alignSelf: 'center',
    marginLeft: 40,
  },
});

export default SelectedFood;
