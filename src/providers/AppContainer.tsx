import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AsyncStorage, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect, useState} from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AuthStack from '../navigation/stacks/AuthStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { checkLoggedUser } from '../redux/actions/userActions';
import { userLoggedSelector } from '../redux/selectors/userSelectors';

const Stack = createNativeStackNavigator();

const App: React.FC = React.memo(() => {

  const userLogged = useSelector(userLoggedSelector);

  useEffect(() => {
    checkLoggedUser();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} />
      <Stack.Navigator>
        {!userLogged ? (
          // No token found, user isn't signed in
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{
              headerShown: false,
              //title: '',
              // When logging out, a pop animation feels intuitive
              // You can remove this if you want the default 'push' animation
              //animationTypeForReplace: state.isSignout ? 'pop' : 'push',
            }}
          />
        ) : (
          // User is signed in
          <Stack.Screen
            name="Main"
            component={AuthStack}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});
App.displayName = 'App';
export default App;
