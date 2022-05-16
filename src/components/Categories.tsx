import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {APP_COLORS} from '../assets/styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

    const onCategorie = () => {

    }

    return (
      <TouchableOpacity style={styles.container} onPress={() => onCategorie()}>
        <Icon name={icon} size={20} style={{marginTop: 10}} />
        <View style={{marginTop: 15}}>
          <Text style={styles.textStyle}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  },
);

Categories.displayName = 'Categories';

const styles = StyleSheet.create({
  label: {
    //fontFamily: 'DMSans-Regular',
    fontWeight: 'bold',
    color: APP_COLORS.typography.body_text,
  },
  container: {
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    width: 40,
    backgroundColor: APP_COLORS.typography.body_text,
    marginRight: 20,
  },
  textStyle: {
    //fontFamily: 'DMSans-Regular',
    fontSize: 12,
    fontWeight: 'bold',
    color: APP_COLORS.typography.body_text,
    textAlign: 'center',
  },
});

export default Categories;
