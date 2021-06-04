import { toast } from "react-toastify";
import { fetchSampleDataControlSystem } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import { CREATE_CONTROL_SYSTEM, DELETE_CONTROL_SYSTEM, FETCH_CONTROL_SYSTEM, UPDATE_CONTROL_SYSTEM } from "./controlSystemConstants";

export function loadControlSystem() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const controlSystems = await fetchSampleDataControlSystem();
      dispatch({ type: FETCH_CONTROL_SYSTEM, payload: controlSystems });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
export function listenToControlSystem(controlSystems){
    return {
        type:FETCH_CONTROL_SYSTEM,
        payload:controlSystems
    }
}

export function createControlSystem(controlSystem){
    return async function(dispatch){
        dispatch(asyncActionStart());
        try {
            await delay(1000);
            dispatch({type:CREATE_CONTROL_SYSTEM,payload:controlSystem});
            dispatch(asyncActionFinish());

        } catch (error) {
            asyncActionError(error)
        }
    }
}

export function updateControlSystem(controlSystem){
    return async function(dispatch){
        dispatch(asyncActionStart)
        try {
            await delay(1000);
            dispatch({type:UPDATE_CONTROL_SYSTEM,payload:controlSystem});
            dispatch(asyncActionFinish());
        } catch (error) {
            asyncActionError(error);
        }
    }
}

export function deleteControlSystem(controlSystemId){
    return async function(dispatch){
        try {
            await delay(1000)
            dispatch({type:DELETE_CONTROL_SYSTEM, payload:controlSystemId});
            // dispatch(asyncActionFinish())
            toast.success("Uğurla silindi")
        } catch (error) {
            dispatch(asyncActionError(error))
        }
    }
}