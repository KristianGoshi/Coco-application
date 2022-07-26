import { IOrder } from "./../../models/IOrder";
// Import redux types
import {Dispatch} from 'redux';
import { IMenu } from "../../models/IMenu";

// Create Action Constants
export enum OrderActionTypes {
  SET_ORDER = 'SET_ORDER',
  REMOVE_ORDER = 'REMOVE_ORDER',
  COMPLETE_ORDER = 'COMPLETE_ORDER',
  SEARCH_FOOD = 'SEARCH_FOOD',
  ADD_COUNT = 'ADD_COUNT',
  REMOVE_COUNT = 'REMOVE_COUNT'
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
    dispatch({
      userOrders: userOrder,
      type: OrderActionTypes.REMOVE_ORDER,
    });
  };

export const completeOrder =
  () => async (dispatch: Dispatch) => {
    dispatch({
      type: OrderActionTypes.COMPLETE_ORDER,
    });
  };

export const addCount = (userOrder: IOrder) => async (dispatch: Dispatch) => {
  dispatch({
    userOrders: userOrder,
    type: OrderActionTypes.ADD_COUNT,
  });
};

export const removeCount = (userOrder: IOrder) => async (dispatch: Dispatch) => {
  dispatch({
    userOrders: userOrder,
    type: OrderActionTypes.REMOVE_COUNT,
  });
};

export const setSearchFood = (searchMenu: IMenu[]) => async (dispatch: Dispatch) => {
  dispatch({
    searchFood: searchMenu,
    type: OrderActionTypes.SEARCH_FOOD,
  });
};


