import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {APP_COLORS} from '../../assets/styles/colors';
import {useDispatch, useSelector} from 'react-redux';
import FoodView from '../menu/FoodView';
import RegularFood from '../../assets/menu/RegularFood.json';
import {useRoute} from '@react-navigation/native';
import { userFavoritesSelector } from '../../redux/selectors/userSelectors';

export interface FavoritesProps {
  navigation: any;
  onPress(): () => void;
}

const Favorites: React.FC<FavoritesProps> = React.memo(
  ({navigation}) => {
    const userFavorites = useSelector(userFavoritesSelector);

    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <View style={{marginTop: 30, alignSelf: 'flex-start'}}>
              <FlatList
                data={userFavorites}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                renderItem={({item, index}) => (
                  <FoodView
                    icon={require('../../assets/images/krepa/krepa_coko.jpeg')}
                    name={item.emri}
                    price={item.cmimi}
                    regular={true}
                    width={'46%'}
                    height={230}
                    categorie={item.categorie}
                    favorite
                  />
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  },
);

Favorites.displayName = 'Favorites';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
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
});

export default Favorites;
