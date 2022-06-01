import * as React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {APP_COLORS} from '../../assets/styles/colors';
import {useSelector} from 'react-redux';
import FoodView from '../menu/FoodView';
import { userFavoritesSelector } from '../../redux/selectors/userSelectors';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome5';

export interface FavoritesProps {
  navigation: any;
  onPress(): () => void;
}

const Favorites: React.FC<FavoritesProps> = React.memo(
  ({navigation}) => {
    const userFavorites = useSelector(userFavoritesSelector);
    const {t} = useTranslation('user');

    return (
      <ScrollView>
        <View style={styles.container}>
          {userFavorites.length ? (
            <View style={{marginTop: 30}}>
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
                    width={userFavorites.length == 1 ? 170 : '46%'}
                    height={230}
                    categorie={item.categorie}
                    favorite
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
                {t('none.favorite')}
              </Text>
              <View>
                <Icon name="star" size={150} style={styles.settingsIconStyle} />
              </View>
            </View>
          )}
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
  settingsIconStyle: {
    color: APP_COLORS.background.container_secondary,
    alignSelf: 'center',
    marginTop: 50,
  },
});

export default Favorites;
