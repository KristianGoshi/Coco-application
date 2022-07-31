import * as React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {APP_COLORS} from '../../assets/styles/colors';
import FoodView from './FoodView';
import RegularFood from '../../assets/menu/RegularFood.json';
import DailyFood from '../../assets/menu/DailyFood.json'
import { useRoute } from '@react-navigation/native';

export interface SelectedCategorieProps {
}

type Params = {
  [key: string]: any;
};

const SelectedCategorie: React.FC<SelectedCategorieProps> = React.memo(() => {
  const params: Params = useRoute().params!;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <View style={{marginTop: 20, alignSelf: 'flex-start'}}>
            <Text style={styles.titleStyle}>{params.title}</Text>
          </View>
          <View style={{marginTop: 20, alignSelf: 'flex-start'}}>
            <FlatList
              data={params.daily ? DailyFood : RegularFood[0][params.title]}
              keyExtractor={(item, index) => item.emri}
              numColumns={2}
              renderItem={({item, index}) => (
                <FoodView
                  icon={require('../../assets/images/krepa/krepa_coko.jpeg')}
                  name={item.emri}
                  price={item.cmimi}
                  regular={true}
                  width={'46%'}
                  height={230}
                  categorie={params.title}
                  pershkrimi={item.pershkrimi}
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
    fontSize: 22,
    fontWeight: 'bold',
    color: APP_COLORS.background.container_triary,
    textAlign: 'center',
  }
});

export default SelectedCategorie;
