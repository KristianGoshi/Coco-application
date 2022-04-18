// Import redux types
import {Dispatch} from 'redux';

// Create Action Constants
export enum ReserveActionTypes {
  EXAMPLE_TYPE = 'EXAMPLE_TYPE',
}
// Interface to Get All Action Type
export interface IReserveGetAllReservesAction {
  type: ReserveActionTypes;
  example: any;
}

/*
Combine the action types with a union (we assume there are more)
example: export type FilterActions = IGetAllAction | IGetOneAction ...
*/
export type ReserveActions = IReserveGetAllReservesAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */

export const setExample = (isFiltered: boolean) => (dispatch: Dispatch) =>
  dispatch({
    isFiltered: isFiltered,
    type: ReserveActionTypes.EXAMPLE_TYPE,
  });
