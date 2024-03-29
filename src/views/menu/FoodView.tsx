import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {APP_COLORS} from '../../assets/styles/colors';
import { EMenuStack } from '../../navigation/stacks/MenuStack';
import { EProfileStack } from '../../navigation/stacks/ProfileStack';
import Icon from 'react-native-vector-icons/Entypo';

export interface FoodViewProps {
  name?: string;
  price?: number;
  regular?: boolean;
  width: any;
  height: number;
  categorie: keyof typeof FoodImage;
  pershkrimi?: string;
  favorite?: boolean;
  icon?: keyof typeof DailyImage;
}

export const FoodImage = {
  Pica: require('../../assets/images/Ushqimet/Pica.jpg'),
  Sallat: require('../../assets/images/Ushqimet/sallat.jpg'),
  Tavë: require('../../assets/images/Ushqimet/tave.jpg'),
  Krepa: require('../../assets/images/Ushqimet/krepa_coko.jpeg'),
  Pije: require('../../assets/images/Ushqimet/pije.jpg'),
  Pasta: require('../../assets/images/Ushqimet/pasta.jpg'),
  Rizoto: require('../../assets/images/Ushqimet/rizoto.jpg'),
  Sanduic: require('../../assets/images/Ushqimet/sanduic.jpg'),
  Ditore: require('../../assets/images/Ushqimet/musaka.jpg'),
  Bosh: require('../../assets/images/logo.png')
};

export const DailyImage = {
  'Perime ne avull': require('../../assets/images/Ushqimet/perime.jpg'),
  'Perime furre': require('../../assets/images/Ushqimet/ziera.jpg'),
  'Lazanja': require('../../assets/images/Ushqimet/lazanja.jpg'),
  'Kaneloni': require('../../assets/images/Ushqimet/kaneloni.jpg'),
  'Musaka': require('../../assets/images/Ushqimet/musaka.jpg'),
  'Supe kerpudhe': require('../../assets/images/Ushqimet/sup.jpg'),
  'Karkaleca deti': require('../../assets/images/Ushqimet/karkalec.jpg'),
  'Rizoto 4 djathrat': require('../../assets/images/Ushqimet/rizoto.jpg'),
};

const FoodView: React.FC<FoodViewProps> = React.memo(
  ({name, regular, price, width, height, categorie, pershkrimi, favorite = false, icon}) => {
    const navigation: any = useNavigation();

    const onSubmit = () => {
      if (favorite) {
        navigation.navigate(EProfileStack.FAVORITE_FOOD, {
          title: name,
          foto: icon ? DailyImage[icon] : FoodImage[categorie],
          price: price,
          regular: regular,
          categorie: categorie,
          pershkrimi: pershkrimi,
          width: width,
          height: height,
        });
      } else {
        navigation.navigate(EMenuStack.SELECTED_FOOD, {
          title: name,
          foto: icon ? DailyImage[icon] : FoodImage[categorie],
          price: price,
          regular: regular,
          categorie: categorie,
          pershkrimi: pershkrimi,
          width: width,
          height: height,
        });
      }
    }

    return (
      <View style={[styles.container, {width: width, height: height}]}>
        <Image
          source={icon ? DailyImage[icon] : FoodImage[categorie]}
          style={[styles.imageStyle, {height: height - 110}]}
        />
        <View style={styles.nameStyle}>
          <Text style={styles.textStyle}>{name}</Text>
        </View>
        <Text
          style={[
            styles.textStyle,
            {
              paddingTop: 10,
              alignSelf: 'flex-start',
              marginLeft: 10
            },
          ]}>
          {price + 'L'}
        </Text>
        <View
          style={{
            position: 'absolute',
            top: height - 50,
            right: 12
          }}>
          <TouchableOpacity style={styles.addButton} onPress={() => onSubmit()}>
            <View style={styles.addSign}>
              <Icon
                name="plus"
                size={28}
                style={{color: APP_COLORS.background.container_secondary}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

FoodView.displayName = 'FoodView';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: APP_COLORS.background.container_secondary,
    marginRight: 20,
    marginBottom: 20,
  },
  textStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: APP_COLORS.background.extra,
  },
  nameStyle: {
    marginTop: 15,
    alignSelf: 'flex-start',
    marginHorizontal: 10,
  },
  imageStyle: {
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  addButton: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: APP_COLORS.buttons.secondary,
    backgroundColor: APP_COLORS.buttons.secondary,
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
  },
  addSign: {
    alignItems: 'center',
    marginTop: 5,
  },
});

export default FoodView;
