import axios from "axios";
import { toast } from "react-toastify";
import { fetchSampleDataDepartments } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import {
  CREATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  FETCH_DEPARTMENT,
  UPDATE_DEPARTMENT,
} from "./departmentConstants";
const url = 'structural_section'
export function loadDepartments(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${url}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_DEPARTMENT,
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
export function listenToDepartment(departments) {
  return {
    type: FETCH_DEPARTMENT,
    payload: departments,
  };
}

export function createDepartment(departments) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .post(`${url}/create`, departments, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch({ type: CREATE_DEPARTMENT, payload: data.data.data });
        dispatch(asyncActionFinish());
        toast.success("Uğurla əlavə edildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}

export function updateDepartment(department) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    await axios
      .put(`/${url}/update`, department)
      .then((data) => {
        dispatch({
          type: UPDATE_DEPARTMENT,
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

export function deleteDepartment(departmentId) {
  return async function (dispatch) {
    await axios
      .delete(`/${url}/delete?id=${departmentId}`)
      .then((data) => {
        dispatch({ type: DELETE_DEPARTMENT, payload: departmentId });
        dispatch(asyncActionFinish());
        toast.info("Uğurla silindi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}
