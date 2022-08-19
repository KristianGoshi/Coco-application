import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {APP_COLORS} from '../assets/styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import { EMenuStack } from '../navigation/stacks/MenuStack';

export interface CategoriesProps {
  icon: string,
  name: string,
  id: number
}

const Categories: React.FC<CategoriesProps> = React.memo(
  ({
    icon,
    name
  }) => {

    const navigation: any = useNavigation();

    const onCategorie = () => {
      navigation.navigate(EMenuStack.SELECTED_CATEGORIE, {
        title: name
      });
    }

    return (
      <TouchableOpacity style={styles.container} onPress={() => onCategorie()}>
        <Icon name={icon} size={28} style={{marginTop: 13, color: APP_COLORS.background.extra}} />
        <View style={{marginTop: 20, marginLeft: -2}}>
          <Text style={styles.textStyle}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  },
);

Categories.displayName = 'Categories';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 30,
    height: 55,
    width: 55,
    backgroundColor: APP_COLORS.background.container_secondary,
    marginRight: 20,
  },
  textStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: APP_COLORS.background.container_secondary,
  },
});

export default Categories;
