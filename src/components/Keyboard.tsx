import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export interface KeyboardAwareContainerProps {
  children: React.ReactNode;
}

const KeyboardAwareContainer: React.FC<KeyboardAwareContainerProps> =
  React.memo(({children}) => {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={{flexGrow: 1}}
          enableOnAndroid={true}
          keyboardShouldPersistTaps={'never'}>
          {children}
        </KeyboardAwareScrollView>
      </View>
    );
  });

KeyboardAwareContainer.displayName = 'KeyboardAwareContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

export default KeyboardAwareContainer;
