import { toast } from "react-toastify";
import { fetchSampleDataDepartments} from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import { CREATE_DEPARTMENT, DELETE_DEPARTMENT, FETCH_DEPARTMENT, UPDATE_DEPARTMENT } from "./departmentConstants";

export function loadDepartments() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const departments = await fetchSampleDataDepartments();
      dispatch({ type: FETCH_DEPARTMENT, payload: departments });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
export function listenToDepartment(departments){
    return {
        type:FETCH_DEPARTMENT,
        payload:departments
    }
}

export function createDepartment(departments){
    return async function(dispatch){
        dispatch(asyncActionStart());
        try {
            await delay(1000);
            dispatch({type:CREATE_DEPARTMENT,payload:departments});
            dispatch(asyncActionFinish());

        } catch (error) {
            asyncActionError(error)
        }
    }
}

export function updateDepartment(department){
    return async function(dispatch){
        dispatch(asyncActionStart)
        try {
            await delay(1000);
            dispatch({type:UPDATE_DEPARTMENT,payload:department});
            dispatch(asyncActionFinish());
        } catch (error) {
            asyncActionError(error);
        }
    }
}

export function deleteDepartment(departmentId){
    return async function(dispatch){
        try {
            await delay(1000)
            dispatch({type:DELETE_DEPARTMENT, payload:departmentId});
            // dispatch(asyncActionFinish())
            toast.success("Uğurla silindi")
        } catch (error) {
            dispatch(asyncActionError(error))
        }
    }
}