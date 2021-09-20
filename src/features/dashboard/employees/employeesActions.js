import axios from "axios";
import { toast } from "react-toastify";
import { fetchSampleData } from "../../../app/api/mockApi";
import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../app/async/asyncReducer";
import { delay } from "../../../app/util/util";
import { createCounterparty } from "../settings/counterparty/counterpartyActions";
// import { delay } from "../../../app/common/util/util";

import {
  CREATE_EMPLOYEES,
  DELETE_EMPLOYEES,
  FETCH_EMPLOYEES,
  UPDATE_EMPLOYEES,
} from "./employeesConstants";
const url = "employee";

export function loadEmployees(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${url}`, {
        params: { ...data },
      })
      .then((datas) => {
        console.log(datas);
        dispatch({
          type: FETCH_EMPLOYEES,
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

export function listenToEmployees(employees) {
  return {
    type: FETCH_EMPLOYEES,
    payload: employees,
  };
}

export function createEmployees(employee) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .post(`${url}/create`, employee, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch({ type: CREATE_EMPLOYEES, payload: data.data.data });
        dispatch(
          createCounterparty({
            name: `${employee.name} ${employee.surname}`,
            about:"İşçilərdən gələn kontragentdir",
            contact: employee.phone,
          })
        );
        dispatch(asyncActionFinish());
        toast.success("Uğurla əlavə edildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}

export function updateEmployees(employees) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    await axios
      .put(`/${url}/update`, employees)
      .then((data) => {
        dispatch({
          type: UPDATE_EMPLOYEES,
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

export function deleteEmployees(employeesId) {
  return async function (dispatch) {
    await axios
      .delete(`/${url}/delete?id=${employeesId}`)
      .then((data) => {
        dispatch({ type: DELETE_EMPLOYEES, payload: employeesId });
        dispatch(asyncActionFinish());
        toast.info("Uğurla silindi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}
