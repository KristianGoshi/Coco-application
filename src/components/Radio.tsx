import * as React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import { APP_COLORS } from '../assets/styles/colors';

export enum ERadioType {
  PRIMARY = 'primary',
  DISABLED = 'disabled',
}

export interface StyledRadioProps {
  type?: ERadioType;
  onClick?: any;
  selected?: any;
}

const StyledRadio: React.FC<StyledRadioProps> = React.memo(
  ({type = ERadioType.PRIMARY, onClick, selected, ...props}) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{flexDirection: 'row', marginTop: 10}}
          onPress={onClick}>
          <View style={selected ? styles.circleFilled : styles.circle}>
            {selected && <View style={styles.smallCircle} />}
          </View>
        </TouchableOpacity>
      </View>
    );
  },
);

StyledRadio.displayName = 'StyledRadio';

const styles = StyleSheet.create({
  smallCircle: {
    alignSelf: 'center',
    marginTop: 7,
    height: 15,
    width: 15,
    borderRadius: 100,
    backgroundColor: APP_COLORS.background.container_secondary,
  },
  circle: {
    height: 30,
    width: 30,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: APP_COLORS.background.container_triary,
    backgroundColor: APP_COLORS.background.extra,
  },
  circleFilled: {
    height: 30,
    width: 30,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: APP_COLORS.background.container_triary,
    backgroundColor: APP_COLORS.background.container_triary,
  },
  container: {
    alignItems: 'center',
    marginTop: -5,
  },
  [ERadioType.PRIMARY]: {
    backgroundColor: APP_COLORS.background.container_secondary,
    borderRadius: 40,
    borderWidth: 0,
  },
  [ERadioType.DISABLED]: {
    backgroundColor: APP_COLORS.buttons.inactive,
    borderRadius: 40,
    borderWidth: 0,
  },
});

export default StyledRadio;
