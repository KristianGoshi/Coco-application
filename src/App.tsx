import React, { useCallback, useEffect, useState } from 'react';
import {
  AsyncStorage,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
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


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator();

  const [user, setUser] = useState('');
  const fetchUserName = useCallback(async () => {
    const userName = await AsyncStorage.getItem('userName');
    userName == null ? setUser('') : setUser(userName);
  }, []);

  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <CocoLoadProvider />
        <SafeAreaView style={backgroundStyle}>
          <NavigationContainer>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <Stack.Navigator>
              {!user ? (
                // No token found, user isn't signed in
                <Stack.Screen
                  name="Auth"
                  component={AuthStack}
                  options={{
                    title: 'Authentication',
                    // When logging out, a pop animation feels intuitive
                    // You can remove this if you want the default 'push' animation
                    //animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                />
              ) : (
                // User is signed in
                <Stack.Screen name="Main" component={MainTab} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
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

export default App;
