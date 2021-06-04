import { toast } from "react-toastify";
import { fetchSampleDataCrm } from "../../../app/api/mockApi";
import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../app/async/asyncReducer";
import { delay } from "../../../app/util/util";
import { CREATE_CRM, DELETE_CRM, FETCH_CRM, UPDATE_CRM } from "./crmConstants";

export function loadCrm() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const crms = await fetchSampleDataCrm();
      dispatch({ type: FETCH_CRM, payload: crms });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
export function listenToCrm(crms){
    return {
        type:FETCH_CRM,
        payload:crms
    }
}

export function createCrm(crm){
    return async function(dispatch){
        dispatch(asyncActionStart());
        try {
            await delay(1000);
            dispatch({type:CREATE_CRM,payload:crm});
            dispatch(asyncActionFinish());

        } catch (error) {
            asyncActionError(error)
        }
    }
}

export function updateCrm(crm){
    return async function(dispatch){
        dispatch(asyncActionStart)
        try {
            await delay(1000);
            dispatch({type:UPDATE_CRM,payload:crm});
            dispatch(asyncActionFinish());
        } catch (error) {
            asyncActionError(error);
        }
    }
}

export function deleteCrm(crmId){
    return async function(dispatch){
        try {
            await delay(1000)
            dispatch({type:DELETE_CRM, payload:crmId});
            // dispatch(asyncActionFinish())
            toast.success("Uğurla silindi")
        } catch (error) {
            dispatch(asyncActionError(error))
        }
    }
}