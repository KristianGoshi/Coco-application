import {createSelector} from '@reduxjs/toolkit';
import {IAppState} from '../store';

const selectSelf = (state: IAppState) => state;
export const userReservationsSelector = createSelector(
  selectSelf,
  state => state?.reserveState?.userReservations,
);
