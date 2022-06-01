import { IOrder } from "./../../models/IOrder";
// Import redux types
import {Dispatch} from 'redux';

// Create Action Constants
export enum OrderActionTypes {
  SET_ORDER = 'SET_ORDER',
  REMOVE_ORDER = 'REMOVE_ORDER',
}
// Interface to Get All Action Type
export interface IOrderGetAllOrdersAction {
  type: OrderActionTypes;
  userOrders: Array<IOrder>;
}

/*
Combine the action types with a union (we assume there are more)
example: export type FilterActions = IGetAllAction | IGetOneAction ...
*/
export type OrderActions = IOrderGetAllOrdersAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */

export const setOrder = (userOrder: IOrder) => async (dispatch: Dispatch) => {
  dispatch({
    userOrders: userOrder,
    type: OrderActionTypes.SET_ORDER,
  });
}

export const removeOrder =
  (userOrder: IOrder) => async (dispatch: Dispatch) => {
    console.log(userOrder)
    dispatch({
      userOrders: userOrder,
      type: OrderActionTypes.REMOVE_ORDER,
    });
  };


