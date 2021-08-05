import axios from "axios";
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
const url = 'expense';

export function loadExpense(data) {
    return async function (dispatch) {
        dispatch(asyncActionStart());
    
        const expenses = await axios.get(`/${url}`, {
          params: { ...data },
        });
        console.log(expenses);
        if (expenses.status === 200) {
          dispatch({
            type: FETCH_EXPENSE,
            payload: expenses.data.data,
            totalCount: expenses.data.message,
          });
          dispatch(asyncActionFinish());
        } else {
          dispatch(asyncActionError());
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
    return async function (dispatch) {
        dispatch(asyncActionStart());
        const data = await axios.post(`${url}/create`, expense, {
          withCredentials: true,
        });
        console.log(expense);
        if (data.status === 201) {
          toast.success("Uğurla əlavə edildi");
          dispatch({ type: CREATE_EXPENSE, payload: data.data.data });
          dispatch(asyncActionFinish());
        } else {
          toast.danger("Xəta baş verdi, yenidən cəht edin.");
        }
      };
}

export function updateExpense(expense){
    return async function (dispatch) {
        dispatch(asyncActionStart);
    
        const expenseUpdated = await axios.put(
          `/${url}/update`,
          expense
        );
        if (expenseUpdated.status === 200) {
          toast.success("Dəyişiklik uğurlar yerinə yetirildi");
          dispatch({
            type: UPDATE_EXPENSE,
            payload: expenseUpdated.data.data,
          });
          dispatch(asyncActionFinish());
        } else {
          asyncActionError();
        }
      };
}

export function deleteExpense(expenseId){
    return async function (dispatch) {
        const expenseDeleted = await axios.delete(
          `/${url}/delete?id=${expenseId}`
        );
        if (expenseDeleted.status === 200) {
          dispatch({ type: DELETE_EXPENSE, payload: expenseId });
          // dispatch(asyncActionFinish())
          toast.info("Uğurla silindi");
        } else {
          dispatch(asyncActionError());
        }
      };
}