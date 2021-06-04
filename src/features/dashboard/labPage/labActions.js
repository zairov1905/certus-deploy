import { toast } from "react-toastify";
import { fetchSampleDataLab } from "../../../app/api/mockApi";
import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../app/async/asyncReducer";
import { delay } from "../../../app/util/util";
import { CREATE_LAB, DELETE_LAB, FETCH_LAB, UPDATE_LAB } from "./labConstants";

export function loadLab() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const labs = await fetchSampleDataLab();
      dispatch({ type: FETCH_LAB, payload: labs });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
export function listenToLab(labs){
    return {
        type:FETCH_LAB,
        payload:labs
    }
}

export function createLab(lab){
    return async function(dispatch){
        dispatch(asyncActionStart());
        try {
            await delay(1000);
            dispatch({type:CREATE_LAB,payload:lab});
            dispatch(asyncActionFinish());

        } catch (error) {
            asyncActionError(error)
        }
    }
}

export function updateLab(lab){
    return async function(dispatch){
        dispatch(asyncActionStart)
        try {
            await delay(1000);
            dispatch({type:UPDATE_LAB,payload:lab});
            dispatch(asyncActionFinish());
        } catch (error) {
            asyncActionError(error);
        }
    }
}

export function deleteLab(labId){
    return async function(dispatch){
        try {
            await delay(1000)
            dispatch({type:DELETE_LAB, payload:labId});
            // dispatch(asyncActionFinish())
            toast.success("Uğurla silindi")
        } catch (error) {
            dispatch(asyncActionError(error))
        }
    }
}