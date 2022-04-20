import React, { useCallback, useEffect, useState } from 'react';
import {
  AsyncStorage,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import store from './redux/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CocoLoadProvider from './providers/CocoLoadProvider';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './navigation/stacks/AuthStack';
import MainTab from './navigation/tabs/MainTab';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppContainer from './providers/AppContainer';


export default function App() {

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <CocoLoadProvider />
        <ApplicationProvider {...eva} theme={eva.light}>
          <AppContainer />
        </ApplicationProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

