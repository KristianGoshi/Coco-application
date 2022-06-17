import {createSelector} from '@reduxjs/toolkit';
import {IAppState} from '../store';

const selectSelf = (state: IAppState) => state;
export const userOrderSelector = createSelector(
  selectSelf,
  state => state?.orderState.userOrders,
);
export const userSearchSelector = createSelector(
  selectSelf,
  state => state?.orderState.searchFood,
);
