import {createSelector} from '@reduxjs/toolkit';
import { IAppState } from '../store';

const selectSelf = (state: IAppState) => state;
export const userProfileSelector = createSelector(
  selectSelf,
  state => state?.userState?.userDetails,
);
export const userLoggedSelector = createSelector(
  selectSelf,
  state => state?.userState?.userLogged,
);
export const userFavoritesSelector = createSelector(
  selectSelf,
  state => state?.userState?.userFavorites,
);