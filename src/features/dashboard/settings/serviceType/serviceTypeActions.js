import axios from "axios";
import { toast } from "react-toastify";
import { fetchSampleDataServiceTypes } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import {
  CREATE_SERVICE_TYPE,
  DELETE_SERVICE_TYPE,
  FETCH_SERVICE_TYPE,
  UPDATE_SERVICE_TYPE,
} from "./serviceTypeConstants";
const url = "service_type";
export function loadServiceType(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${url}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_SERVICE_TYPE,
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
export function listenToServiceType(serviceTypes) {
  return {
    type: FETCH_SERVICE_TYPE,
    payload: serviceTypes,
  };
}

export function createServiceType(serviceType) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .post(`${url}/create`, serviceType, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch({ type: CREATE_SERVICE_TYPE, payload: data.data.data });
        dispatch(asyncActionFinish());
        toast.success("Uğurla əlavə edildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}

export function updateServiceType(serviceType) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    await axios
      .put(`/${url}/update`, serviceType)
      .then((data) => {
        dispatch({
          type: UPDATE_SERVICE_TYPE,
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

export function deleteServiceType(serviceTypeId) {
  return async function (dispatch) {
    await axios
      .delete(`/${url}/delete?id=${serviceTypeId}`)
      .then((data) => {
        dispatch({ type: DELETE_SERVICE_TYPE, payload: serviceTypeId });
        dispatch(asyncActionFinish());
        toast.info("Uğurla silindi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}
