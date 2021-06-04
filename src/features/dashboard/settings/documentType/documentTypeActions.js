import { toast } from "react-toastify";
import { fetchSampleDataDocumentTypes } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import { CREATE_DOCUMENTTYPE, DELETE_DOCUMENTTYPE, FETCH_DOCUMENTTYPE, UPDATE_DOCUMENTTYPE } from "./documentTypeConstants";

export function loadDocumentTypes() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const documentTypes = await fetchSampleDataDocumentTypes();
      dispatch({ type: FETCH_DOCUMENTTYPE, payload: documentTypes });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
export function listenToDocumentType(documentTypes){
    return {
        type:FETCH_DOCUMENTTYPE,
        payload:documentTypes
    }
}

export function createDocumentType(documentType){
    return async function(dispatch){
        dispatch(asyncActionStart());
        try {
            await delay(1000);
            dispatch({type:CREATE_DOCUMENTTYPE,payload:documentType});
            dispatch(asyncActionFinish());

        } catch (error) {
            asyncActionError(error)
        }
    }
}

export function updateDocumentType(documentType){
    return async function(dispatch){
        dispatch(asyncActionStart)
        try {
            await delay(1000);
            dispatch({type:UPDATE_DOCUMENTTYPE,payload:documentType});
            dispatch(asyncActionFinish());
        } catch (error) {
            asyncActionError(error);
        }
    }
}

export function deleteDocumentType(documentTypeId){
    return async function(dispatch){
        try {
            await delay(1000)
            dispatch({type:DELETE_DOCUMENTTYPE, payload:documentTypeId});
            // dispatch(asyncActionFinish())
            toast.success("Uğurla silindi")
        } catch (error) {
            dispatch(asyncActionError(error))
        }
    }
}