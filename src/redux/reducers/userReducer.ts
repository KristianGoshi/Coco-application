import { IMenu } from "./../../models/IMenu";
import { IProfile } from "./../../models/IProfile";
import {Reducer} from 'redux';
import {UserActions, UserActionTypes} from '../actions/userActions';

export interface IUserState {
  userDetails: IProfile;
  userLogged: string;
  userFavorites: Array<IMenu>
}

const initialUserState: IUserState = {
  userDetails: {},
  userLogged: 'false',
  userFavorites: []
};

export const userReducer: Reducer<IUserState, UserActions> = (
  state = initialUserState,
  action,
) => {
  switch (action.type) {
    case UserActionTypes.GET_USER:
      return {
        ...state,
        userDetails: action.userProfile,
      };
    case UserActionTypes.CHECK_LOGGED:
      return {
        ...state,
        userLogged: action.userLogged,
      };
    case UserActionTypes.SET_FAVORITES:
      return {
        ...state,
        userFavorites: action.userFavorites,
      };
    default:
      return state;
  }
};
