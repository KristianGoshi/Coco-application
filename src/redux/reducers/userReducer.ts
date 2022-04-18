import {Reducer} from 'redux';
import {UserActions, UserActionTypes} from '../actions/userActions';

export interface IUserState {
  example: any;
}

const initialUserState: IUserState = {
  example: '',
};

export const userReducer: Reducer<IUserState, UserActions> = (
  state = initialUserState,
  action,
) => {
  switch (action.type) {
    case UserActionTypes.EXAMPLE_TYPE:
      return {
        ...state,
        allCars: action.example,
      };
    default:
      return state;
  }
};
