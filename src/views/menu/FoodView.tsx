import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {APP_COLORS} from '../../assets/styles/colors';
import { EMenuStack } from '../../navigation/stacks/MenuStack';
import { EProfileStack } from '../../navigation/stacks/ProfileStack';
import Icon from 'react-native-vector-icons/Entypo';

export interface FoodViewProps {
  icon: any;
  name: string;
  price: number;
  regular: boolean;
  width: any;
  height: number;
  categorie?: string;
  favorite?: boolean;
}

const FoodView: React.FC<FoodViewProps> = React.memo(
  ({icon, name, regular, price, width, height, categorie, favorite = false}) => {
    const {t} = useTranslation('menu');
    const navigation = useNavigation();

    const onSubmit = () => {
      if (favorite) {
        navigation.navigate(EProfileStack.FAVORITE_FOOD, {
          title: name,
          foto: icon,
          price: price,
          regular: regular,
          categorie: categorie,
          width: width,
          height: height,
        });
      } else {
        navigation.navigate(EMenuStack.SELECTED_FOOD, {
          title: name,
          foto: icon,
          price: price,
          regular: regular,
          categorie: categorie,
          width: width,
          height: height,
        });
      }
    }

    return (
      <View style={[styles.container, {width: width, height: height}]}>
        <Image
          source={icon}
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
