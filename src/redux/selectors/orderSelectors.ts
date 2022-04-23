import {createSelector} from '@reduxjs/toolkit';
import {IAppState} from '../store';

const selectSelf = (state: IAppState) => state;
export const exampleSelector = createSelector(
  selectSelf,
  state => state?.userState?.userDetails,
);
