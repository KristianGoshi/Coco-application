import * as React from 'react';
import {Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {APP_COLORS} from '../../assets/styles/colors';
import {useDispatch, useSelector} from 'react-redux';
import { userProfileSelector } from '../../redux/selectors/userSelectors';
import Categories from '../../components/Categories';
import FoodView from './FoodView';
import DailyFood from '../../assets/menu/DailyFood.json'
import RegularFood from '../../assets/menu/RegularFood.json';
import FoodCategories from '../../assets/menu/FoodCategories.json';
import SearchBar from '../../components/SearchBar';
import { useCallback, useState } from 'react';
import { userSearchSelector } from '../../redux/selectors/orderSelectors';
import { setSearchFood } from '../../redux/actions/orderActions';
import { IMenu } from '../../models/IMenu';
import TouchableText from '../../components/TouchableText';
import { EMenuStack } from '../../navigation/stacks/MenuStack';

export interface MainMenuProps {
  navigation: any;
}

const MainMenu: React.FC<MainMenuProps> = React.memo(({navigation}) => {
  const {t} = useTranslation('menu');
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const windowWidth = Dimensions.get('window').width;

  const userName = useSelector(userProfileSelector).userName;
  const food = useSelector(userSearchSelector);

  let allFoods: Array<IMenu> = []
  allFoods = allFoods.concat(
    RegularFood[0].Krepa,
    RegularFood[0].Pasta,
    RegularFood[0].Pica,
    RegularFood[0].Pije,
    RegularFood[0].Rizoto,
    RegularFood[0].Sallat,
    RegularFood[0].Sanduic,
    RegularFood[0].Tavë
  );

  const onSearch = useCallback(
    async (searchVal: string) => {
      setSearch(searchVal);

      const newData: IMenu[] = allFoods?.filter((item: any) => {
        // Applying filter for the inserted text in search bar
        const itemData = item?.emri
          ? item?.emri
              ?.toUpperCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
          : ''
              .toUpperCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '');
        const textData = searchVal.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      await dispatch(
        setSearchFood(newData),
      );
    },
    [],
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Image
              source={require('../../assets/images/logo.png')}
              style={{width: 120, height: 120}}
            />
          </View>
          <View style={{paddingTop: 30, maxWidth: windowWidth - 140}}>
            <Text style={styles.motoStyle}>
              {'Tradicionalja me aromë moderne'}
            </Text>
          </View>
        </View>
        <View style={{marginTop: 10, alignSelf: 'flex-start'}}>
          <Text style={styles.helloStyle}>
            {t('main.hello') + ' ' + userName + '!'}
          </Text>
        </View>
        <View style={{marginTop: 15}}>
          <SearchBar
            placeholder={t('main.search')}
            autoCapitalize="none"
            autoCorrect={false}
            label={t('main.search')}
            onChangeText={onSearch}
          />
        </View>
        {search == '' && (
          <>
            <View>
              <View style={{marginTop: 40, alignSelf: 'flex-start'}}>
                <Text style={styles.subTitleStyle}>{t('main.categories')}</Text>
              </View>
              <View style={styles.list}>
                <FlatList
                  data={FoodCategories}
                  horizontal
                  keyExtractor={(item, index) => item.id.toString()}
                  renderItem={({item, index}) => (
                    <Categories
                      icon={item.icon}
                      name={item.name}
                      id={item.id}
                    />
                  )}
                />
              </View>
            </View>
            <View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{marginTop: 20}}>
                  <Text style={styles.subTitleStyle}>{t('main.ditore')}</Text>
                </View>
                <View style={{marginTop: 20}}>
                  <TouchableText
                    touchableText={t('main.seeAll')}
                    onPress={() =>
                      navigation.navigate(EMenuStack.SELECTED_CATEGORIE, {
                        title: 'Ditore',
                        daily: true
                      })
                    }
                    fontSize={14}
                  />
                </View>
              </View>
              <View style={{marginTop: 15, alignSelf: 'flex-start'}}>
                <FlatList
                  data={DailyFood}
                  horizontal
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => {
                    return (
                      <FoodView
                        name={item.emri}
                        price={item.cmimi}
                        regular={false}
                        width={180}
                        height={250}
                        categorie={'Ditore'}
                        pershkrimi={item.pershkrimi}
                        // @ts-ignore
                        icon={item.emri}
                      />
                    );
                  }}
                />
              </View>
            </View>
          </>
        )}
        {search != '' && (
          <>
            <View style={styles.searchList}>
              <FlatList
                data={food}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <FoodView
                    name={item.emri}
                    price={item.cmimi}
                    regular={true}
                    width={'46%'}
                    height={230}
                    categorie={'Ditore'}
                  />
                )}
              />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
});

MainMenu.displayName = 'Coco';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 18,
  },
  helloStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: APP_COLORS.background.container_triary,
    textAlign: 'center',
  },
  motoStyle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: APP_COLORS.background.container_secondary,
    textAlign: 'center',
  },
  subTitleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: APP_COLORS.background.container_triary,
    textAlign: 'center',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: APP_COLORS.background.container_triary,
    textAlign: 'center',
  },
  list: {
    marginTop: 15,
    alignSelf: 'flex-start',
    height: 80,
  },
  searchList: {
    marginTop: 30
  }
});

export default MainMenu;
