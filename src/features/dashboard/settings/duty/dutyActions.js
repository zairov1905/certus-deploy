import { toast } from "react-toastify";
import {fethcSampleDataDuties} from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import { CREATE_DUTY, DELETE_DUTY, FETCH_DUTY, UPDATE_DUTY } from "./dutyConstants";

export function loadDuties() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const duties = await fethcSampleDataDuties();
      dispatch({ type: FETCH_DUTY, payload: duties });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
export function listenToDuty(duties){
    return {
        type:FETCH_DUTY,
        payload:duties
    }
}

export function createDuty(duty){
    return async function(dispatch){
        dispatch(asyncActionStart());
        try {
            await delay(1000);
            dispatch({type:CREATE_DUTY,payload:duty});
            dispatch(asyncActionFinish());

        } catch (error) {
            asyncActionError(error)
        }
    }
}

export function updateDuty(duty){
    return async function(dispatch){
        dispatch(asyncActionStart)
        try {
            await delay(1000);
            dispatch({type:UPDATE_DUTY,payload:duty});
            dispatch(asyncActionFinish());
        } catch (error) {
            asyncActionError(error);
        }
    }
}

export function deleteDuty(dutyId){
    return async function(dispatch){
        try {
            await delay(1000)
            dispatch({type:DELETE_DUTY, payload:dutyId});
            // dispatch(asyncActionFinish())
            toast.success("Uğurla silindi")
        } catch (error) {
            dispatch(asyncActionError(error))
        }
    }
}