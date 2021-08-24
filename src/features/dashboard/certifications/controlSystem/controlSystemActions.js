import axios from "axios";
import { toast } from "react-toastify";
import { fetchSampleDataControlSystem } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import {
  CREATE_CONTROL_SYSTEM,
  DELETE_CONTROL_SYSTEM,
  FETCH_CONTROL_SYSTEM,
  UPDATE_CONTROL_SYSTEM,
} from "./controlSystemConstants";
const url = "control_sistem";
export function loadControlSystem(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${url}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_CONTROL_SYSTEM,
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
export function listenToControlSystem(controlSystems) {
  return {
    type: FETCH_CONTROL_SYSTEM,
    payload: controlSystems,
  };
}

export function createControlSystem(controlSystem) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .post(`${url}/create`, controlSystem, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch({ type: CREATE_CONTROL_SYSTEM, payload: data.data.data });
        dispatch(asyncActionFinish());
        toast.success("Uğurla əlavə edildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}

export function updateControlSystem(controlSystem) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    await axios
      .put(`/${url}/update`, controlSystem)
      .then((data) => {
        dispatch({
          type: UPDATE_CONTROL_SYSTEM,
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

export function deleteControlSystem(controlSystemId) {
  return async function (dispatch) {
    await axios
      .delete(`/${url}/delete?id=${controlSystemId}`)
      .then((data) => {
        dispatch({ type: DELETE_CONTROL_SYSTEM, payload: controlSystemId });
        dispatch(asyncActionFinish());
        toast.info("Uğurla silindi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}
