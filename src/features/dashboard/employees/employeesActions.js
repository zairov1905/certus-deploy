import { toast } from "react-toastify";
import { fetchSampleData } from "../../../app/api/mockApi";
import {
    APP_LOADED,
    asyncActionError,
    asyncActionFinish,
    asyncActionStart,
  } from "../../../app/async/asyncReducer";
import { delay } from "../../../app/util/util";
// import { delay } from "../../../app/common/util/util";


import { CREATE_EMPLOYEES, DELETE_EMPLOYEES, FETCH_EMPLOYEES, UPDATE_EMPLOYEES } from "./employeesConstants";


export function loadEmployees(){
    return async function(dispatch){
        dispatch(asyncActionStart())

        try {
            const employees = await fetchSampleData();
            dispatch({type:FETCH_EMPLOYEES,payload:employees})
            dispatch(asyncActionFinish())
            dispatch({ type: APP_LOADED });
            

        } catch (error) {
            dispatch(asyncActionError(error))
        }
    }
}


export function listenToEmployees(employees){
    return {
        type:FETCH_EMPLOYEES,
        payload:employees
    }
}


export function createEmployees(employees){
    return async function(dispatch){
        dispatch(asyncActionStart())
        try {
            await delay(1000)
            dispatch({type:CREATE_EMPLOYEES, payload:employees});
            dispatch(asyncActionFinish())
        } catch (error) {
            dispatch(asyncActionError(error))
        }
    }
}


export function updateEmployees(employees){
    return async function(dispatch){
        dispatch(asyncActionStart())
        try {
            await delay(1000)
            dispatch({type:UPDATE_EMPLOYEES, payload:employees});
            dispatch(asyncActionFinish())
        } catch (error) {
            dispatch(asyncActionError(error))
        }
    }
}

export function deleteEmployees(employeesId){
    return async function(dispatch){
        // dispatch(asyncActionStart())
        try {
            await delay(1000)
            dispatch({type:DELETE_EMPLOYEES, payload:employeesId});
            // dispatch(asyncActionFinish())
            toast.success("Uğurla silindi")
        } catch (error) {
            dispatch(asyncActionError(error))
        }
    }
}