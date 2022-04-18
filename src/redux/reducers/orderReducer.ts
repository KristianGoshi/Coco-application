import {Reducer} from 'redux';
import { OrderActions, OrderActionTypes } from '../actions/orderActions';

export interface IOrderState {
  example: any;
}

const initialOrderState: IOrderState = {
  example: '',
};


export const orderReducer: Reducer<IOrderState, OrderActions> = (
  state = initialOrderState,
  action,
) => {
  switch (action.type) {
    case OrderActionTypes.EXAMPLE_TYPE:
      return {
        ...state,
        allCars: action.example,
      };
    default:
      return state;
  }
};
