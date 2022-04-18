// Import redux types
import {Dispatch} from 'redux';

// Create Action Constants
export enum UserActionTypes {
  EXAMPLE_TYPE = 'EXAMPLE_TYPE',
}
// Interface to Get All Action Type
export interface IUserGetAllUsersAction {
  type: UserActionTypes;
  example: any;
}

/*
Combine the action types with a union (we assume there are more)
example: export type FilterActions = IGetAllAction | IGetOneAction ...
*/
export type UserActions = IUserGetAllUsersAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */

export const setExample = (isFiltered: boolean) => (dispatch: Dispatch) =>
  dispatch({
    isFiltered: isFiltered,
    type: UserActionTypes.EXAMPLE_TYPE,
  });
