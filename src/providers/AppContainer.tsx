import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import AuthStack from '../navigation/stacks/AuthStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { checkLoggedUser } from '../redux/actions/userActions';
import { userLoggedSelector } from '../redux/selectors/userSelectors';
import MainTab from '../navigation/tabs/MainTab';

const Stack = createNativeStackNavigator();

const App: React.FC = React.memo(() => {

  const userLogged = useSelector(userLoggedSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLoggedUser());
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} />
      <Stack.Navigator>
        {userLogged == 'false' ? (
          // No token found, user isn't signed in
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          // User is signed in
          <Stack.Screen
            name="Main"
            component={MainTab}
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
