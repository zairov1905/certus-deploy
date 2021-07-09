import { toast } from "react-toastify";
import { fetchSampleDataOrder } from "../../../app/api/mockApi";
import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../app/async/asyncReducer";
import { delay } from "../../../app/util/util";
import { CREATE_OPERATION, DELETE_OPERATION, FETCH_OPERATION, UPDATE_OPERATION } from "./operationConstants";

export function loadOperation() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const operations = await fetchSampleDataOrder();
      dispatch({ type: FETCH_OPERATION, payload: operations });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
export function listenToOperation(operations){
    return {
        type:FETCH_OPERATION,
        payload:operations
    }
}

export function createOperation(operation){
    return async function(dispatch){
        dispatch(asyncActionStart());
        try {
            await delay(1000);
            dispatch({type:CREATE_OPERATION,payload:operation});
            dispatch(asyncActionFinish());

        } catch (error) {
            asyncActionError(error)
        }
    }
}

export function updateOperation(operation){
    return async function(dispatch){
        dispatch(asyncActionStart)
        try {
            await delay(1000);
            dispatch({type:UPDATE_OPERATION,payload:operation});
            dispatch(asyncActionFinish());
        } catch (error) {
            asyncActionError(error);
        }
    }
}

export function deleteOperation(operationId){
    return async function(dispatch){
        try {
            await delay(1000)
            dispatch({type:DELETE_OPERATION, payload:operationId});
            // dispatch(asyncActionFinish())
            toast.success("Uğurla silindi")
        } catch (error) {
            dispatch(asyncActionError(error))
        }
    }
}