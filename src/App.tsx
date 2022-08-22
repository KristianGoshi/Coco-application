import React, { useEffect } from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {Provider} from 'react-redux';
import store from './redux/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CocoLoadProvider from './providers/CocoLoadProvider';
import AppContainer from './providers/AppContainer';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 1000);
  }, []);
  console.disableYellowBox = true;

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <CocoLoadProvider />
        <ApplicationProvider {...eva} theme={eva.dark}>
          <AppContainer />
        </ApplicationProvider>
      </Provider>
    </SafeAreaProvider>
  );
};


