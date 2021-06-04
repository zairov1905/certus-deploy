import { toast } from "react-toastify";
import { fetchSampleDataExpense } from "../../../app/api/mockApi";
import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../app/async/asyncReducer";
import { delay } from "../../../app/util/util";
import { CREATE_EXPENSE, DELETE_EXPENSE, FETCH_EXPENSE, UPDATE_EXPENSE } from "./expenseConstants";

export function loadExpense() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const expenses = await fetchSampleDataExpense();
      dispatch({ type: FETCH_EXPENSE, payload: expenses });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
export function listenToExpense(expenses){
    return {
        type:FETCH_EXPENSE,
        payload:expenses
    }
}

export function createExpense(expense){
    return async function(dispatch){
        dispatch(asyncActionStart());
        try {
            await delay(1000);
            dispatch({type:CREATE_EXPENSE,payload:expense});
            dispatch(asyncActionFinish());

        } catch (error) {
            asyncActionError(error)
        }
    }
}

export function updateExpense(expense){
    return async function(dispatch){
        dispatch(asyncActionStart)
        try {
            await delay(1000);
            dispatch({type:UPDATE_EXPENSE,payload:expense});
            dispatch(asyncActionFinish());
        } catch (error) {
            asyncActionError(error);
        }
    }
}

export function deleteExpense(expenseId){
    return async function(dispatch){
        try {
            await delay(1000)
            dispatch({type:DELETE_EXPENSE, payload:expenseId});
            // dispatch(asyncActionFinish())
            toast.success("Uğurla silindi")
        } catch (error) {
            dispatch(asyncActionError(error))
        }
    }
}