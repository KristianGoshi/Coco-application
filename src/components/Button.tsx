import * as React from 'react';
import {View, StyleSheet, ActivityIndicator, Platform} from 'react-native';
import {Button, ButtonProps} from '@ui-kitten/components';
import { APP_COLORS } from '../assets/styles/colors';

export enum EButtonType {
  PRIMARY = 'primary',
  DISABLED = 'disabled',
  SECONDARY = 'secondary',
  TRINARY = 'trinary',
  TEXT = 'text',
  REQUESTS = 'requests',
  DISABLED_SEARCH = 'disabled_search',
}

export enum EButtonSize {
  SMALL = 'small',
  MEDIUM = 'medium',
}

export interface StyledButtonProps extends ButtonProps {
  type?: EButtonType;
  spinner?: any;
  size?: EButtonSize;
  appearance?: string;
  loading?: boolean;
  height?: number;
  width?: any;
}

const StyledButton: React.FC<StyledButtonProps> = React.memo(
  ({
    appearance = 'ghost',
    spinner = APP_COLORS.background.container_primary,
    loading,
    type = EButtonType.TEXT,
    size = EButtonSize.MEDIUM,
    disabled,
    height = 56,
    width = '90%',
    ...props
  }) => {
    return (
      <View
        style={[
          styles.container,
          {opacity: type === EButtonType.DISABLED ? 0.2 : 1},
        ]}>
        {!loading ? (
          <Button
            {...props}
            appearance={appearance}
            style={[(styles as any)[type], {height: height, width: width}]}
          />
        ) : (
          <Button
            {...props}
            appearance={appearance}
            style={[(styles as any)[type], {height: height, width: width}]}
          />
        )}
      </View>
    );
  },
);

StyledButton.displayName = 'StyledButton';

const styles = StyleSheet.create({
  label: {
    //fontFamily: 'DMSans-Regular',
    fontWeight: 'bold',
    color: APP_COLORS.typography.body_text,
  },
  container: {
    alignItems: 'center',
  },
  spinnerStyle: {
    color: APP_COLORS.typography.body_text,
  },
  [EButtonType.PRIMARY]: {
    backgroundColor: APP_COLORS.buttons.primary,
    borderRadius: 40,
  },
  [EButtonType.DISABLED]: {
    backgroundColor: APP_COLORS.buttons.inactive,
    borderRadius: 40,
  },
  [EButtonType.SECONDARY]: {
    backgroundColor: APP_COLORS.buttons.secondary,
    borderRadius: 40,
  },
  [EButtonType.TRINARY]: {
    backgroundColor: APP_COLORS.buttons.triary,
    borderRadius: 40,
  },
  [EButtonType.TEXT]: {
    // backgroundColor: theme.colors.secondary,
  },
});

export default StyledButton;
