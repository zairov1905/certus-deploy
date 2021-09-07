import axios from "axios";
import { toast } from "react-toastify";

import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import {
  CREATE_PERSONAL,
  DELETE_PERSONAL,
  FETCH_PERSONAL,
  UPDATE_PERSONAL,
} from "./personalConstants";
const url = "personal_certificate";

export function loadPersonal(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${url}`, {
        params: { ...data },
      })
      .then((datas) => {
        console.log(datas,"personal sertifikatlasma")
        dispatch({
          type: FETCH_PERSONAL,
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
export function listenToPersonal(personals) {
  return {
    type: FETCH_PERSONAL,
    payload: personals,
  };
}

export function createPersonal(personal) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .post(`${url}/create`, personal, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch({ type: CREATE_PERSONAL, payload: data.data.data });
        dispatch(asyncActionFinish());
        toast.success("Uğurla əlavə edildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };

}

export function updatePersonal(personal) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    await axios
      .put(`/${url}/update`, personal)
      .then((data) => {
        dispatch({
          type: UPDATE_PERSONAL,
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

export function deletePersonal(personalId) {
  return async function (dispatch) {
    await axios
      .delete(`/${url}/delete?id=${personalId}`)
      .then((data) => {
        dispatch({ type: DELETE_PERSONAL, payload: personalId });
        dispatch(asyncActionFinish());
        toast.info("Uğurla silindi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}
