import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, InputProps} from '@ui-kitten/components';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {APP_COLORS} from '../assets/styles/colors';

export enum EInputType {
  INITIAL = 'initial',
  TYPING = 'typing',
  DISABLED = 'disabled',
}

export interface SearchBarProps extends InputProps {
  type?: EInputType;
  errorText?: string;
  size?: string;
  label?: string;
  password?: boolean;
  closing?: any;
  close?: any;
  inputRight?: number;
}

const SearchBar: React.FC<SearchBarProps> = React.memo(
  ({
    errorText,
    size = 'large',
    type = EInputType.INITIAL,
    label,
    closing = '',
    close,
    inputRight = 0,
    ...props
  }) => {
    const [isFocused, setInputFocus] = useState(false);
    const [isVisible, setVisible] = useState(true);

    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Input
            {...props}
            size={size}
            onFocus={e => {
              setInputFocus(true);
              props.onFocus?.(e);
            }}
            onBlur={e => {
              setInputFocus(false);
              props.onBlur?.(e);
            }}
            selectionColor={APP_COLORS.background.container_triary}
            testID="input"
            style={[
              isFocused ? styles[EInputType.TYPING] : (styles as any)[type],
              {height: 45},
            ]}
            textStyle={{
              marginRight: inputRight,
              color: APP_COLORS.background.container_triary,
            }}
          />
          <View style={styles.iconStyle}>
            <Icon
              name={'search'}
              size={20}
              style={styles.iconPasswordStyle}
            />
          </View>
        </View>
      </View>
    );
  },
);

SearchBar.displayName = 'SearchBar';

const styles = StyleSheet.create({
  iconStyle: {
    position: 'absolute',
    right: 13,
    top: 12,
  },
  iconPasswordStyle: {
    color: APP_COLORS.typography.body_text,
  },
  errorText: {
    fontSize: 10,
    color: APP_COLORS.typography.error,
  },
  labelText: {
    marginBottom: 3,
    fontSize: 10,
    fontWeight: 'bold',
    color: APP_COLORS.background.container_secondary,
  },
  [EInputType.INITIAL]: {
    backgroundColor: APP_COLORS.background.container_secondary,
    borderColor: APP_COLORS.background.container_triary,
    borderRadius: 26,
    flex: 1,
  },
  [EInputType.TYPING]: {
    backgroundColor: APP_COLORS.background.fourth,
    borderColor: APP_COLORS.background.container_primary,
    borderRadius: 26,
    flex: 1,
  },
  [EInputType.DISABLED]: {
    backgroundColor: APP_COLORS.background.container_primary,
    borderColor: APP_COLORS.background.container_primary,
    opacity: 0.2,
    borderRadius: 8,
    flex: 1,
  },
});

export default SearchBar;
