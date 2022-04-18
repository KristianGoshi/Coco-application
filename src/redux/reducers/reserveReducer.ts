import {Reducer} from 'redux';
import {ReserveActions, ReserveActionTypes} from '../actions/reserveActions';

export interface IReserveState {
  example: any;
}

const initialReserveState: IReserveState = {
  example: '',
};

export const reserveReducer: Reducer<IReserveState, ReserveActions> = (
  state = initialReserveState,
  action,
) => {
  switch (action.type) {
    case ReserveActionTypes.EXAMPLE_TYPE:
      return {
        ...state,
        allCars: action.example,
      };
    default:
      return state;
  }
};
