import * as React from 'react';
import {View, StyleSheet, Text, Animated} from 'react-native';
import {Input, InputProps} from '@ui-kitten/components';
import {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { APP_COLORS } from '../assets/styles/colors';

export enum EInputType {
  INITIAL = 'initial',
  TYPING = 'typing',
  DISABLED = 'disabled',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface TextInputProps extends InputProps {
  type?: EInputType;
  errorText?: string;
  size?: string;
  label?: string;
  password?: boolean;
  multiline?: boolean;
  closing?: any;
  close?: any;
  inputRight?: number;
}

const TextInput: React.FC<TextInputProps> = React.memo(
  ({
    errorText,
    size = 'large',
    type = EInputType.INITIAL,
    label,
    password = false,
    multiline = false,
    closing = '',
    close,
    inputRight = 0,
    ...props
  }) => {
    const [isFocused, setInputFocus] = useState(false);
    const [isVisible, setVisible] = useState(true);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeIn = () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    };
    const fadeOut = () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View style={styles.container}>
        <Animated.Text style={[styles.labelText, {opacity: fadeAnim}]}>
          {label}
        </Animated.Text>
        <View style={{flexDirection: 'row'}}>
          <Input
            secureTextEntry={password && isVisible}
            {...props}
            size={size}
            multiline={multiline}
            onFocus={e => {
              setInputFocus(true);
              props.onFocus?.(e);
              fadeIn();
            }}
            onBlur={e => {
              setInputFocus(false);
              props.onBlur?.(e);
              if (closing == '' || closing == 0) fadeOut();
            }}
            selectionColor={APP_COLORS.typography.body_text}
            testID="input"
            style={[
              isFocused ? styles[EInputType.TYPING] : (styles as any)[type],
              {height: multiline ? 160 : 48},
            ]}
            textStyle={{
              //fontFamily: 'DMSans-Regular',
              marginRight: inputRight,
              height: multiline ? 160 : undefined,
              color:
                type === EInputType.ERROR
                  ? APP_COLORS.typography.error
                  : APP_COLORS.typography.body_text,
            }}
          />
          {type !== EInputType.INITIAL && (
            <View style={styles.iconStyle}>
              <Icon
                name={
                  type === EInputType.SUCCESS
                    ? 'book'
                    : 'book'
                }
                size={25}
                style={
                  type === EInputType.SUCCESS
                    ? styles.iconCheckStyle
                    : styles.iconErrorStyle
                }
              />
            </View>
          )}
          {password === true && (
            <View
              style={
                type === EInputType.ERROR || type === EInputType.SUCCESS
                  ? styles.iconEyeStyle
                  : styles.iconStyle
              }>
              <Icon
                name={!isVisible ? 'book' : 'book'}
                size={25}
                style={styles.iconPasswordStyle}
                onPress={() => setVisible(!isVisible)}
              />
            </View>
          )}
          {closing != '' && (
            <View style={styles.iconStyle}>
              <Icon
                name={'book'}
                size={25}
                style={styles.iconPasswordStyle}
                onPress={() => {
                  close();
                  fadeOut();
                }}
              />
            </View>
          )}
        </View>
        <Text
          style={[
            styles.errorText,
            {opacity: errorText ? 1 : 0, marginTop: multiline ? 30 : 4},
          ]}>
          {errorText}
        </Text>
      </Animated.View>
    );
  },
);

TextInput.displayName = 'TextInput';

const styles = StyleSheet.create({
  container: {},
  iconStyle: {
    position: 'absolute',
    right: 13,
    top: 12,
  },
  iconEyeStyle: {
    position: 'absolute',
    right: 45,
    top: 12,
  },
  iconCheckStyle: {
    color: APP_COLORS.typography.success,
  },
  iconPasswordStyle: {
    color: APP_COLORS.typography.body_text,
  },
  iconErrorStyle: {
    color: APP_COLORS.typography.error,
  },
  errorText: {
    fontSize: 10,
    color: APP_COLORS.typography.error,
  },
  labelText: {
    marginBottom: 3,
    fontSize: 10,
    fontWeight: 'bold',
    color: APP_COLORS.typography.body_text,
  },
  [EInputType.INITIAL]: {
    backgroundColor: APP_COLORS.background.container_background,
    borderColor: APP_COLORS.background.container_background,
    borderRadius: 8,
    flex: 1,
  },
  [EInputType.TYPING]: {
    backgroundColor: APP_COLORS.background.elements_background,
    borderColor: APP_COLORS.background.elements_background,
    borderRadius: 8,
    flex: 1,
  },
  [EInputType.DISABLED]: {
    backgroundColor: APP_COLORS.background.elements_background,
    borderColor: APP_COLORS.background.elements_background,
    opacity: 0.2,
    borderRadius: 8,
    flex: 1,
  },
  [EInputType.SUCCESS]: {
    backgroundColor: APP_COLORS.background.container_background,
    borderColor: APP_COLORS.background.container_background,
    borderRadius: 8,
    flex: 1,
  },
  [EInputType.ERROR]: {
    backgroundColor: APP_COLORS.typography.error,
    borderColor: APP_COLORS.typography.error,
    borderWidth: 2,
    borderRadius: 8,
    flex: 1,
  },
});

export default TextInput;
