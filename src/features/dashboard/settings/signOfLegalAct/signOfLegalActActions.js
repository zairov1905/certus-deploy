import axios from "axios";
import { toast } from "react-toastify";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import {
  CREATE_SIGN_OF_LEGAL_ACT,
  DELETE_SIGN_OF_LEGAL_ACT,
  FETCH_SIGN_OF_LEGAL_ACT,
  UPDATE_SIGN_OF_LEGAL_ACT,
} from "./signOfLegalActConstants";
const url = "legal_act";

export function loadSignOfLegalAct(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${url}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_SIGN_OF_LEGAL_ACT,
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
export function listenToSignOfLegalAct(counterparties) {
  return {
    type: FETCH_SIGN_OF_LEGAL_ACT,
    payload: counterparties,
  };
}

export function createSignOfLegalAct(signOfLegalAct) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .post(`${url}/create`, signOfLegalAct, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch({ type: CREATE_SIGN_OF_LEGAL_ACT, payload: data.data.data });
        dispatch(asyncActionFinish());
        toast.success("Uğurla əlavə edildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}

export function updateSignOfLegalAct(signOfLegalAct) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    await axios
      .put(`/${url}/update`, signOfLegalAct)
      .then((data) => {
        dispatch({
          type: UPDATE_SIGN_OF_LEGAL_ACT,
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

export function deleteSignOfLegalAct(signOfLegalActId) {
  return async function (dispatch) {
    await axios
      .delete(`/${url}/delete?id=${signOfLegalActId}`)
      .then((data) => {
        dispatch({ type: DELETE_SIGN_OF_LEGAL_ACT, payload: signOfLegalActId });
        dispatch(asyncActionFinish());
        toast.info("Uğurla silindi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}
