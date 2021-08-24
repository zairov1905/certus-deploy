import axios from "axios";
import { toast } from "react-toastify";
import { fethcSampleDataDuties } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import {
  CREATE_DUTY,
  DELETE_DUTY,
  FETCH_DUTY,
  UPDATE_DUTY,
} from "./dutyConstants";
const url = "position";
export function loadDuties(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${url}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_DUTY,
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
export function listenToDuty(duties) {
  return {
    type: FETCH_DUTY,
    payload: duties,
  };
}

export function createDuty(duty) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .post(`${url}/create`, duty, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch({ type: CREATE_DUTY, payload: data.data.data });
        dispatch(asyncActionFinish());
        toast.success("Uğurla əlavə edildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}

export function updateDuty(duty) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    await axios
      .put(`/${url}/update`, duty)
      .then((data) => {
        dispatch({
          type: UPDATE_DUTY,
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

export function deleteDuty(dutyId) {
  return async function (dispatch) {
    await axios
      .delete(`/${url}/delete?id=${dutyId}`)
      .then((data) => {
        dispatch({ type: DELETE_DUTY, payload: dutyId });
        dispatch(asyncActionFinish());
        toast.info("Uğurla silindi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}
