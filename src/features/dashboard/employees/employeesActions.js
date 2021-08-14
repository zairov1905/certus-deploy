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


import { CREATE_EMPLOYEES, DELETE_EMPLOYEES, FETCH_EMPLOYEES, UPDATE_EMPLOYEES } from "./employeesConstants";
const url = "employee"

export function loadEmployees(data){
    return async function (dispatch) {
        dispatch(asyncActionStart());
    
        const employee = await axios.get(`/${url}`, {
          params: { ...data },
        });
        console.log(employee);
        if (employee.status === 200) {
          dispatch({
            type: FETCH_EMPLOYEES,
            payload: employee.data.data,
            totalCount: employee.data.message,
          });
          dispatch(asyncActionFinish());
        } else {
          dispatch(asyncActionError());
        }
      };
}


export function listenToEmployees(employees){
    return {
        type:FETCH_EMPLOYEES,
        payload:employees
    }
}


export function createEmployees(employee){
    return async function (dispatch) {
        dispatch(asyncActionStart());
        const data = await axios.post(`${url}/create`, employee, {
          withCredentials: true,
        });
        if (data.status === 201) {
          toast.success("Uğurla əlavə edildi");
          dispatch({ type: CREATE_EMPLOYEES, payload: data.data.data });
          dispatch(createCounterparty({name:employee.name,about:"işçidən gələn",contact:employee.phone}))
          dispatch(asyncActionFinish());
        } else {
          toast.danger("Xəta baş verdi, yenidən cəht edin.");
        }
      };
}


export function updateEmployees(employees){
    return async function (dispatch) {
        dispatch(asyncActionStart);
    
        const employeesUpdated = await axios.put(
          `/${url}/update`,
          employees
        );
        if (employeesUpdated.status === 200) {
          toast.success("Dəyişiklik uğurlar yerinə yetirildi");
          dispatch({
            type: UPDATE_EMPLOYEES,
            payload: employeesUpdated.data.data,
          });
          dispatch(asyncActionFinish());
        } else {
          asyncActionError();
        }
      };
}

export function deleteEmployees(employeesId){
    return async function (dispatch) {
        const employeeDeleted = await axios.delete(
          `/${url}/delete?id=${employeesId}`
        );
        if (employeeDeleted.status === 200) {
          dispatch({ type: DELETE_EMPLOYEES, payload: employeesId });
          // dispatch(asyncActionFinish())
          toast.info("Uğurla silindi");
        } else {
          dispatch(asyncActionError());
        }
      };
}