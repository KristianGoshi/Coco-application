import * as React from 'react';
import {View, StyleSheet, Text, Animated} from 'react-native';
import {Input, InputProps} from '@ui-kitten/components';
import {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { APP_COLORS } from '../assets/styles/colors';

export enum EInputType {
  INITIAL = 'initial',
  TYPING = 'typing',
  DISABLED = 'disabled',
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
      <Animated.View>
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
            selectionColor={APP_COLORS.background.container_triary}
            testID="input"
            style={[
              isFocused ? styles[EInputType.TYPING] : (styles as any)[type],
              {height: multiline ? 80 : 48},
            ]}
            textStyle={{
              //fontFamily: 'DMSans-Regular',
              marginRight: inputRight,
              height: multiline ? 80 : undefined,
              color: APP_COLORS.background.container_triary,
            }}
          />
          {password === true && (
            <View style={styles.iconStyle}>
              <Icon
                name={!isVisible ? 'eye' : 'eye-slash'}
                size={20}
                style={styles.iconPasswordStyle}
                onPress={() => setVisible(!isVisible)}
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
    borderRadius: 16,
    flex: 1,
  },
  [EInputType.TYPING]: {
    backgroundColor: APP_COLORS.background.fourth,
    borderColor: APP_COLORS.background.container_primary,
    borderRadius: 16,
    flex: 1,
  },
  [EInputType.DISABLED]: {
    backgroundColor: APP_COLORS.background.container_primary,
    borderColor: APP_COLORS.background.container_primary,
    opacity: 0.2,
    borderRadius: 16,
    flex: 1,
  },
});

export default TextInput;
