import { toast } from "react-toastify";
import { fethcSampleDataDocs } from "../../../app/api/mockApi";
import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../app/async/asyncReducer";
import { delay } from "../../../app/util/util";
import { CREATE_DOC, DELETE_DOC, FETCH_DOC, UPDATE_DOC } from "./docConstants";

export function loadDocs() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const docs = await fethcSampleDataDocs();
      dispatch({ type: FETCH_DOC, payload: docs });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
export function listenToDoc(docs) {
  return {
    type: FETCH_DOC,
    payload: docs,
  };
}

export function createDoc(doc) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      await delay(1000);
      dispatch({ type: CREATE_DOC, payload: doc });
      dispatch(asyncActionFinish());
    } catch (error) {
      asyncActionError(error);
    }
  };
}

export function updateDoc(doc) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    try {
      await delay(1000);
      dispatch({ type: UPDATE_DOC, payload: doc });
      dispatch(asyncActionFinish());
    } catch (error) {
      asyncActionError(error);
    }
  };
}

export function deleteDoc(docId) {
  return async function (dispatch) {
    try {
      await delay(1000);
      dispatch({ type: DELETE_DOC, payload: docId });
      // dispatch(asyncActionFinish())
      toast.success("Uğurla silindi");
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
