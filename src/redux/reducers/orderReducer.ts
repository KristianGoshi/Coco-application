import { IOrder } from "./../../models/IOrder";
import {Reducer} from 'redux';
import { OrderActions, OrderActionTypes } from '../actions/orderActions';

export interface IOrderState {
  userOrders: Array<IOrder>;
}

const initialOrderState: IOrderState = {
  userOrders: [],
};


export const orderReducer: Reducer = (
  state = initialOrderState,
  action,
) => {
  switch (action.type) {
    case OrderActionTypes.SET_ORDER:
      return {
        ...state,
        userOrders: [action.userOrders, ...state.userOrders],
      };
    case OrderActionTypes.REMOVE_ORDER:
      return {
        ...state,
        userOrders: state.userOrders.filter(
          (order: IOrder) => order.emri !== action.userOrders.emri,
        ),
      };
    case OrderActionTypes.COMPLETE_ORDER:
      return {
        ...state,
        userOrders: [],
      };
    default:
      return state;
  }
};
