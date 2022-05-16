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
import FoodView from '../../components/FoodView';
import RegularFood from '../../assets/menu/RegularFood.json';
import { useRoute } from '@react-navigation/native';

export interface SelectedCategorieProps {
  navigation: any;
  onPress(): () => void;
}

const SelectedCategorie: React.FC<SelectedCategorieProps> = React.memo(({navigation}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation('menu');
  const params = useRoute().params;


  useEffect(() => {}, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <View style={{marginTop: 20, alignSelf: 'flex-start'}}>
            <Text style={styles.titleStyle}>{params.title}</Text>
          </View>
          <View style={{marginTop: 20, alignSelf: 'flex-start'}}>
            <FlatList
              data={RegularFood[0][params.title]}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              renderItem={({item, index}) => (
                <FoodView
                  icon={item.foto}
                  name={item.emri}
                  id={item.id}
                  price={item.cmimi}
                  regular={false}
                  width={'46%'}
                  height={230}
                />
              )}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
});

SelectedCategorie.displayName = 'SelectedCategorie';

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

export default SelectedCategorie;
