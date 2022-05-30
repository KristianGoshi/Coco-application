import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {View, StyleSheet, Text, Image} from 'react-native';
import {APP_COLORS} from '../../assets/styles/colors';
import { EMenuStack } from '../../navigation/stacks/MenuStack';
import StyledButton, { EButtonType } from '../../components/Button';
import { EProfileStack } from '../../navigation/stacks/ProfileStack';

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
  ({icon, name, regular, price, width, height, categorie = 'Ditore', favorite = false}) => {
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
        <View
          style={styles.priceView}>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>
            {price + 'L'}
          </Text>
          <StyledButton
            type={EButtonType.PRIMARY}
            spinner={APP_COLORS.typography.body_text}
            height={20}
            width={'80%'}
            onPress={() => onSubmit()}
            children={() => (
              <Text style={{color: 'gray'}}>{t('food.order')}</Text>
            )}
          />
        </View>
      </View>
    );
  },
);

FoodView.displayName = 'FoodView';

const styles = StyleSheet.create({
  label: {
    //fontFamily: 'DMSans-Regular',
    fontWeight: 'bold',
    color: APP_COLORS.typography.body_text,
  },
  container: {
    alignItems: 'center',
    borderRadius: 16,
    // height: 250,
    // width: 180,
    backgroundColor: APP_COLORS.background.elements_secondary,
    marginRight: 20,
    marginBottom: 20,
  },
  textStyle: {
    //fontFamily: 'DMSans-Regular',
    fontSize: 15,
    fontWeight: 'bold',
    color: APP_COLORS.typography.body_text,
  },
  nameStyle: {
    marginTop: 15,
    alignSelf: 'flex-start',
    marginHorizontal: 15,
  },
  imageStyle: {
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  priceView: {
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 15,
  },
});

export default FoodView;
