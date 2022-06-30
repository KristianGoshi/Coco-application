import { IMenu } from "./../../models/IMenu";
import { IOrder } from "./../../models/IOrder";
import {Reducer} from 'redux';
import { OrderActionTypes } from '../actions/orderActions';

export interface IOrderState {
  userOrders: Array<IOrder>;
  searchFood: Array<IMenu>;
}

const initialOrderState: IOrderState = {
  userOrders: [],
  searchFood: []
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
    case OrderActionTypes.ADD_COUNT:
      return {
        ...state,
        userOrders: state.userOrders.map((order: IOrder) => {
          if (order.emri !== action.userOrders.emri) {
            return order;
          }

          return {
            ...order,
            sasia: order.sasia + action.userOrders.sasia,
          };
        }),
      };
    case OrderActionTypes.REMOVE_COUNT:
      return {
        ...state,
        userOrders: state.userOrders.map((order: IOrder) => {
          if (order.emri !== action.userOrders.emri) {
            return order;
          }

          return {
            ...order,
            sasia: order.sasia - 1,
          };
        }),
      };
    case OrderActionTypes.SEARCH_FOOD:
      return {
        ...state,
        searchFood: action.searchFood,
      };
    default:
      return state;
  }
};
