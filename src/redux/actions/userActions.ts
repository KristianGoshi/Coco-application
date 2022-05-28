import { IProfile } from "./../../models/IProfile";
// Import redux types
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch} from 'redux';

// Create Action Constants
export enum UserActionTypes {
  GET_USER = 'GET_USER',
  CHECK_LOGGED = 'CHECK_LOGGED'
}
// Interface to Get All Action Type
export interface IUserGetAllUsersAction {
  type: UserActionTypes;
  userProfile: IProfile;
  userLogged: string;
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

  if (userProfile != null) {
    dispatch({
      userProfile: JSON.parse(userProfile),
      type: UserActionTypes.GET_USER,
    });
  }
}

export const registerUser = (userData: IProfile) => async (dispatch: Dispatch) => {
  await AsyncStorage.setItem('userProfile', JSON.stringify(userData))

  dispatch({
    userProfile: userData,
    type: UserActionTypes.GET_USER,
  });
};

export const checkLoggedUser = () => async (dispatch: Dispatch) => {
  let userLogged = await AsyncStorage.getItem('userLogged');
  if (userLogged == null) {
    userLogged = 'false';
  }

  dispatch({
    userLogged: userLogged,
    type: UserActionTypes.CHECK_LOGGED,
  });
};

export const loginUser = () => async (dispatch: Dispatch) => {
  await AsyncStorage.setItem('userLogged', 'true');

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

export const resetUserPassword = (userData: IProfile) => async (dispatch: Dispatch) => {
  //ketu do te behet vendosja e nje passwordi te ri nepermjet nje linku
};

export const editUser =
  (userData: IProfile) => async (dispatch: Dispatch) => {
    await AsyncStorage.setItem('userProfile', JSON.stringify(userData));

    dispatch({
      userProfile: userData,
      type: UserActionTypes.GET_USER,
    });
  };
