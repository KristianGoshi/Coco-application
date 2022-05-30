import { IMenu } from "./../../models/IMenu";
import { IProfile } from "./../../models/IProfile";
// Import redux types
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch} from 'redux';

// Create Action Constants
export enum UserActionTypes {
  GET_USER = 'GET_USER',
  CHECK_LOGGED = 'CHECK_LOGGED',
  SET_FAVORITES = 'SET_FAVORITES',
}
// Interface to Get All Action Type
export interface IUserGetAllUsersAction {
  type: UserActionTypes;
  userProfile: IProfile;
  userLogged: string;
  userFavorites: Array<IMenu>
}

/*
Combine the action types with a union (we assume there are more)
example: export type FilterActions = IGetAllAction | IGetOneAction ...
*/
export type UserActions = IUserGetAllUsersAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */

export const getUserDetails = () => async (dispatch: Dispatch) => {
  const userProfile = await AsyncStorage.getItem('userProfile');

  if (userProfile != null) { //check if there is a user profile in storage
    dispatch({
      userProfile: JSON.parse(userProfile),
      type: UserActionTypes.GET_USER,
    });
  }
}

export const registerUser = (userData: IProfile) => async (dispatch: Dispatch) => {
  await AsyncStorage.setItem('userProfile', JSON.stringify(userData))
  //register the user in the storage

  dispatch({
    userProfile: userData,
    type: UserActionTypes.GET_USER,
  });
};

export const checkLoggedUser = () => async (dispatch: Dispatch) => {
  let userLogged = await AsyncStorage.getItem('userLogged');
  if (userLogged == null) {
    userLogged = 'false';
  } //if there is no item it means the user is not logged in

  dispatch({
    userLogged: userLogged,
    type: UserActionTypes.CHECK_LOGGED,
  });
};

export const loginUser = () => async (dispatch: Dispatch) => {
  await AsyncStorage.setItem('userLogged', 'true');
  //add the item in the storage to be used for the logged-in check

  dispatch({
    userLogged: 'true',
    type: UserActionTypes.CHECK_LOGGED,
  });
};

export const logoutUser = () => async (dispatch: Dispatch) => {
  await AsyncStorage.setItem('userLogged', 'false');

  dispatch({
    userLogged: 'false',
    type: UserActionTypes.CHECK_LOGGED,
  });
};

export const editUser =
  (userData: IProfile) => async (dispatch: Dispatch) => {
    await AsyncStorage.setItem('userProfile', JSON.stringify(userData));

    dispatch({
      userProfile: userData,
      type: UserActionTypes.GET_USER,
    });
  };

export const setFavorites = (userFavorites: Array<IMenu>, add: boolean, emri: string) => async (dispatch: Dispatch) => {
  const storageFavorites = await AsyncStorage.getItem('userFavorites');
  if (storageFavorites != null) { //if there are previous saved items
    let newFavorites;
    if (add) { //for adding an item to the favorites list
      newFavorites = userFavorites.concat(JSON.parse(storageFavorites));
    } else { //for removing an item from the favorites list
      const index = JSON.parse(storageFavorites).findIndex((o: any) => {
        return o.emri === emri;
      });
      if (index > -1) {
        newFavorites = JSON.parse(storageFavorites)
        newFavorites.splice(index, 1);
      }
    }
    await AsyncStorage.setItem(
      'userFavorites',
      JSON.stringify(newFavorites),
    );
    dispatch({
      userFavorites: newFavorites,
      type: UserActionTypes.SET_FAVORITES,
    });
  } else { //if there are no previous saved items
    await AsyncStorage.setItem(
      'userFavorites',
      JSON.stringify(userFavorites),
    );
    dispatch({
      userFavorites: userFavorites,
      type: UserActionTypes.SET_FAVORITES,
    });
  }
  // await AsyncStorage.removeItem('userFavorites');
}

export const getUserFavorites = () => async (dispatch: Dispatch) => {
  const userFavorites = await AsyncStorage.getItem('userFavorites');

  if (userFavorites != null) { //check if there are any favorites items saved
    dispatch({
      userFavorites: JSON.parse(userFavorites),
      type: UserActionTypes.SET_FAVORITES,
    });
  }
};
