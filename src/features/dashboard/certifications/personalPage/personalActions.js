import { toast } from "react-toastify";
import { fetchSampleDataPersonal } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import { CREATE_PERSONAL, DELETE_PERSONAL, FETCH_PERSONAL, UPDATE_PERSONAL } from "./personalConstants";

export function loadPersonal() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const personals = await fetchSampleDataPersonal();
      dispatch({ type: FETCH_PERSONAL, payload: personals });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
export function listenToPersonal(personals){
    return {
        type:FETCH_PERSONAL,
        payload:personals
    }
}

export function createPersonal(personal){
    return async function(dispatch){
        dispatch(asyncActionStart());
        try {
            await delay(1000);
            dispatch({type:CREATE_PERSONAL,payload:personal});
            dispatch(asyncActionFinish());

        } catch (error) {
            asyncActionError(error)
        }
    }
}

export function updatePersonal(personal){
    return async function(dispatch){
        dispatch(asyncActionStart)
        try {
            await delay(1000);
            dispatch({type:UPDATE_PERSONAL,payload:personal});
            dispatch(asyncActionFinish());
        } catch (error) {
            asyncActionError(error);
        }
    }
}

export function deletePersonal(personalId){
    return async function(dispatch){
        try {
            await delay(1000)
            dispatch({type:DELETE_PERSONAL, payload:personalId});
            // dispatch(asyncActionFinish())
            toast.success("Uğurla silindi")
        } catch (error) {
            dispatch(asyncActionError(error))
        }
    }
}