import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {APP_COLORS} from '../../assets/styles/colors';
import StyledButton, {EButtonType} from '../../components/Button';
import KeyboardAwareContainer from '../../components/Keyboard';
import {EAuthStack} from '../../navigation/stacks/AuthStack';
import TextInput from '../../components/Input';
import TouchableText from '../../components/TouchableText';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {getUserDetails, loginUser} from '../../redux/actions/userActions';
import { userProfileSelector } from '../../redux/selectors/userSelectors';
import Categories from '../../components/Categories';
import FoodView from '../../components/FoodView';
import DailyFood from '../../assets/menu/DailyFood.json'

export interface MainMenuProps {
  navigation: any;
  onPress(): () => void;
}

const MainMenu: React.FC<MainMenuProps> = React.memo(({navigation}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation('menu');

  const userName = useSelector(userProfileSelector).userName;

  const foodCategories = [
    {
      id: 0,
      icon: 'pasta',
      name: 'Pasta',
    },
    {
      id: 1,
      icon: 'rice',
      name: 'Rizoto',
    },
    {
      id: 2,
      icon: 'baguette',
      name: 'Sanduic',
    },
    {
      id: 3,
      icon: 'pizza',
      name: 'Pica',
    },
    {
      id: 4,
      icon: 'leaf',
      name: 'Sallat',
    },
    {
      id: 5,
      icon: 'food-steak',
      name: 'Tave',
    },
    {
      id: 6,
      icon: 'cupcake',
      name: 'Krepa',
    },
    {
      id: 7,
      icon: 'beer',
      name: 'Pije',
    },
  ];

  useEffect(() => {

  }, []);


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View style={{alignSelf: 'flex-start', width: '30%'}}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={{width: 100, height: 100}}
            />
          </View>
          <View style={{paddingTop: 30, width: '70%'}}>
            <Text style={styles.motoStyle}>
              {'Tradicionalja me arome moderne'}
            </Text>
          </View>
        </View>
        <View style={{marginTop: 10, alignSelf: 'flex-start'}}>
          <Text style={styles.helloStyle}>
            {t('user.hello') + ' ' + userName}
          </Text>
        </View>
        <View>
          <View style={{marginTop: 40, alignSelf: 'flex-start'}}>
            <Text style={styles.subTitleStyle}>{t('user.categories')}</Text>
          </View>
          <View style={{marginTop: 20, alignSelf: 'flex-start', height: 80}}>
            <FlatList
              data={foodCategories}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <Categories icon={item.icon} name={item.name} id={item.id} />
              )}
            />
          </View>
        </View>
        <View>
          <View style={{marginTop: 20, alignSelf: 'flex-start'}}>
            <Text style={styles.subTitleStyle}>{t('user.ditore')}</Text>
          </View>
          <View style={{marginTop: 20, alignSelf: 'flex-start'}}>
            <FlatList
              data={DailyFood}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <FoodView
                  icon={item.foto}
                  name={item.emri}
                  id={item.id}
                  price={item.cmimi}
                  regular={false}
                  width={180}
                  height={250}
                />
              )}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
});

MainMenu.displayName = 'Coco';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
  },
  iconStyle: {
    color: APP_COLORS.background.container_primary,
  },
  helloStyle: {
    //fontFamily: 'DMSans-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    color: APP_COLORS.typography.body_text,
    textAlign: 'center',
  },
  motoStyle: {
    //fontFamily: 'DMSans-Regular',
    fontSize: 19,
    fontWeight: 'bold',
    color: APP_COLORS.typography.body_text,
    textAlign: 'center',
  },
  subTitleStyle: {
    //fontFamily: 'DMSans-Regular',
    fontSize: 16,
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
  textInput: {
    alignSelf: 'center',
    width: '90%',
  },
});

export default MainMenu;