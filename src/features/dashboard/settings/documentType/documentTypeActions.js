import axios from "axios";
import { toast } from "react-toastify";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import {
  CREATE_DOCUMENTTYPE,
  DELETE_DOCUMENTTYPE,
  FETCH_DOCUMENTTYPE,
  UPDATE_DOCUMENTTYPE,
} from "./documentTypeConstants";
const url = "document_type"
export function loadDocumentTypes(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${url}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_DOCUMENTTYPE,
          payload: datas.data.data,
          totalCount: datas.data.message,
        });
        dispatch(asyncActionFinish());
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi");
      });
  };
}
export function listenToDocumentType(documentTypes) {
  return {
    type: FETCH_DOCUMENTTYPE,
    payload: documentTypes,
  };
}

export function createDocumentType(documentType) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .post(`${url}/create`, documentType, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch({ type: CREATE_DOCUMENTTYPE, payload: data.data.data });
        dispatch(asyncActionFinish());
        toast.success("Uğurla əlavə edildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}

export function updateDocumentType(documentType) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    await axios
      .put(`/${url}/update`, documentType)
      .then((data) => {
        dispatch({
          type: UPDATE_DOCUMENTTYPE,
          payload: data.data.data,
        });
        dispatch(asyncActionFinish());
        toast.success("Dəyişiklik uğurlar yerinə yetirildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}

export function deleteDocumentType(documentTypeId) {
  return async function (dispatch) {
    await axios
      .delete(`/${url}/delete?id=${documentTypeId}`)
      .then((data) => {
        dispatch({ type: DELETE_DOCUMENTTYPE, payload: documentTypeId });
        dispatch(asyncActionFinish());
        toast.info("Uğurla silindi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}
