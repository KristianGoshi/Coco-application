import { IReservation } from "./../../models/IReservation";
// Import redux types
import {Dispatch} from 'redux';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create Action Constants
export enum ReserveActionTypes {
  SET_RESERVATIONS = 'SET_RESERVATIONS'
}
// Interface to Get All Action Type
export interface IReserveGetAllReservesAction {
  type: ReserveActionTypes;
  userReservations: Array<IReservation>;
}

/*
Combine the action types with a union (we assume there are more)
example: export type FilterActions = IGetAllAction | IGetOneAction ...
*/
export type ReserveActions = IReserveGetAllReservesAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */

export const setReservations =
  (userReservations: Array<IReservation>) => async (dispatch: Dispatch) => {
    const storageReservations = await AsyncStorage.getItem('userReservations');
    if (storageReservations != null) {
      //if there are previous saved items
      const newReservations = userReservations.concat(JSON.parse(storageReservations));
      await AsyncStorage.setItem('userReservations', JSON.stringify(newReservations));
      dispatch({
        userReservations: newReservations,
        type: ReserveActionTypes.SET_RESERVATIONS,
      });
    } else {
      //if there are no previous saved items
      await AsyncStorage.setItem(
        'userReservations',
        JSON.stringify(userReservations),
      );
      dispatch({
        userReservations: userReservations,
        type: ReserveActionTypes.SET_RESERVATIONS,
      });
    }
  };

export const removeReservations = (emri: string) => async (dispatch: Dispatch) => {
  const storageReservations = await AsyncStorage.getItem('userReservations');
  let newReservations;
  const index = JSON.parse(storageReservations).findIndex((o: any) => {
    return o.emri === emri;
  });
  if (index > -1) {
    newReservations = JSON.parse(storageReservations);
    newReservations.splice(index, 1);
  }
  await AsyncStorage.setItem('userReservations', JSON.stringify(newReservations));
  dispatch({
    userReservations: newReservations,
    type: ReserveActionTypes.SET_RESERVATIONS,
  });
};

export const getUserReservations = () => async (dispatch: Dispatch) => {
  const userReservations = await AsyncStorage.getItem('userReservations');

  if (userReservations != null) {
    //check if there are any reservations saved
    dispatch({
      userReservations: JSON.parse(userReservations),
      type: ReserveActionTypes.SET_RESERVATIONS,
    });
  }
}
