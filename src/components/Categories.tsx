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
    name,
    id,
    ...props
  }) => {

    const navigation = useNavigation();

    const onCategorie = () => {
      navigation.navigate(EMenuStack.SELECTED_CATEGORIE, {
        title: name
      });
    }

    return (
      <TouchableOpacity style={styles.container} onPress={() => onCategorie()}>
        <Icon name={icon} size={20} style={{marginTop: 10, color: APP_COLORS.background.extra}} />
        <View style={{marginTop: 15}}>
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
    borderRadius: 20,
    height: 40,
    width: 40,
    backgroundColor: APP_COLORS.background.container_secondary,
    marginRight: 20,
  },
  textStyle: {
    //fontFamily: 'DMSans-Regular',
    fontSize: 12,
    fontWeight: 'bold',
    color: APP_COLORS.background.container_secondary,
    textAlign: 'center',
  },
});

export default Categories;
