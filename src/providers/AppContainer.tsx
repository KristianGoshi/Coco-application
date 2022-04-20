import * as React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {AsyncStorage, StatusBar, useColorScheme} from 'react-native';
import {useDispatch} from 'react-redux';
import {useCallback, useEffect, useState} from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AuthStack from '../navigation/stacks/AuthStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App: React.FC = React.memo(() => {

  const isDarkMode = useColorScheme() === 'dark';

  const [user, setUser] = useState('');
  const fetchUserName = useCallback(async () => {
    const userName = await AsyncStorage.getItem('userName');
    userName == null ? setUser('') : setUser(userName);
  }, []);

  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
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
          <Stack.Screen name="Main" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});
App.displayName = 'App';
export default App;
