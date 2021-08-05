import axios from "axios";
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
const url = 'operation';

export function loadOperation(data) {
    return async function (dispatch) {
        dispatch(asyncActionStart());
    
        const operations = await axios.get(`/${url}`, {
          params: { ...data },
        });
        console.log(operations,'Operation')
        if (operations.status === 200) {
          dispatch({
            type: FETCH_OPERATION,
            payload: operations.data.data,
            totalCount: operations.data.message,
          });
          dispatch(asyncActionFinish());
        } else {
          dispatch(asyncActionError());
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
    return async function (dispatch) {
        const documentDeleted = await axios.delete(
          `/${url}/delete?id=${operationId}`
        );
        if (documentDeleted.status === 200) {
          dispatch({ type: DELETE_OPERATION, payload: operationId });
          // dispatch(asyncActionFinish())
          toast.info("Uğurla silindi");
        } else {
          dispatch(asyncActionError());
        }
      };
}