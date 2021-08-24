import axios from "axios";
import { toast } from "react-toastify";
import { fetchSampleDataReference } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import {
  CREATE_REFERENCE,
  DELETE_REFERENCE,
  FETCH_REFERENCE,
  UPDATE_REFERENCE,
} from "./referenceConstants";
const url = "rreference";
export function loadReference(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${url}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_REFERENCE,
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
export function listenToReference(reference) {
  return {
    type: FETCH_REFERENCE,
    payload: reference,
  };
}

export function createReference(reference) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .post(`${url}/create`, reference, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch({ type: CREATE_REFERENCE, payload: data.data.data });
        dispatch(asyncActionFinish());
        toast.success("Uğurla əlavə edildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };

}

export function updateReference(reference) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    await axios
      .put(`/${url}/update`, reference)
      .then((data) => {
        dispatch({
          type: UPDATE_REFERENCE,
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

export function deleteReference(referenceId) {
  return async function (dispatch) {
    await axios
      .delete(`/${url}/delete?id=${referenceId}`)
      .then((data) => {
        dispatch({ type: DELETE_REFERENCE, payload: referenceId });
        dispatch(asyncActionFinish());
        toast.info("Uğurla silindi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}
