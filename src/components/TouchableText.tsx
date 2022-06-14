import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { APP_COLORS } from '../assets/styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export interface TouchableTextProps {
  touchableText: string;
  leftAccessory?: string;
  rightAccessory?: string;
  onPress?: () => void;
  fontSize?: number;
}

const TouchableText: React.FC<TouchableTextProps> = React.memo(
  ({touchableText, onPress, rightAccessory, leftAccessory, fontSize = 16}) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.buttonWrapper}>
        {leftAccessory && (
          <Icon name={leftAccessory} size={30} style={styles.iconStyle} />
        )}
        <Text style={[styles.menuElements, {fontSize: fontSize}]}>
          {touchableText}
        </Text>
        {rightAccessory && (
          <Icon name={rightAccessory} size={30} style={styles.iconStyle} />
        )}
      </TouchableOpacity>
    );
  },
);

export const ClearTouchableText: React.FC<TouchableTextProps> = React.memo(
  ({touchableText, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.buttonWrapper}>
        <Text style={styles.clearText}>{touchableText}</Text>
      </TouchableOpacity>
    );
  },
);

TouchableText.displayName = 'TouchableText';

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuElements: {
    color: APP_COLORS.background.container_secondary,
    fontWeight: 'bold',
  },
  clearText: {
    fontSize: 14,
    color: APP_COLORS.typography.body_text,
    fontWeight: '600',
  },
  iconStyle: {
    color: APP_COLORS.typography.body_text,
  },
});

export default TouchableText;
