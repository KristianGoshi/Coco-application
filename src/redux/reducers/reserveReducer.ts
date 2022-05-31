import {Reducer} from 'redux';
import { IReservation } from '../../models/IReservation';
import {ReserveActions, ReserveActionTypes} from '../actions/reserveActions';

export interface IReserveState {
  userReservations: Array<IReservation>;
}

const initialReserveState: IReserveState = {
  userReservations: [],
};

export const reserveReducer: Reducer<IReserveState, ReserveActions> = (
  state = initialReserveState,
  action,
) => {
  switch (action.type) {
    case ReserveActionTypes.SET_RESERVATIONS:
      return {
        ...state,
        userReservations: action.userReservations,
      };
    default:
      return state;
  }
};
