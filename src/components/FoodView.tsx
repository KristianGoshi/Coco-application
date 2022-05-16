import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {View, StyleSheet, Text, Image} from 'react-native';
import {APP_COLORS} from '../assets/styles/colors';
import StyledButton, { EButtonType } from './Button';

export interface FoodViewProps {
  icon: string;
  name: string;
  price: number;
  id: number;
  regular: boolean;
}

const FoodView: React.FC<FoodViewProps> = React.memo(
  ({icon, name, id, regular, price}) => {
    const {t} = useTranslation('menu');

    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/krepa/krepa_coko.jpeg')}
          style={{
            width: 180,
            height: 150,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        />
        <View style={{marginTop: 15, alignSelf: 'flex-start', marginLeft: 20}}>
          <Text style={styles.textStyle}>{name}</Text>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            alignSelf: 'flex-start',
            marginLeft: 20,
          }}>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>
            {price + 'L'}
          </Text>
          <StyledButton
            type={EButtonType.PRIMARY}
            spinner={APP_COLORS.typography.body_text}
            height={20}
            width={'80%'}
            //onPress={() => onSubmit()}
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
    height: 250,
    width: 180,
    backgroundColor: APP_COLORS.background.elements_secondary,
    marginRight: 20,
  },
  textStyle: {
    //fontFamily: 'DMSans-Regular',
    fontSize: 15,
    fontWeight: 'bold',
    color: APP_COLORS.typography.body_text,
  },
});

export default FoodView;
