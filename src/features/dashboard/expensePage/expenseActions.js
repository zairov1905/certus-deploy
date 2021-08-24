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
import {
  CREATE_EXPENSE,
  DELETE_EXPENSE,
  FETCH_EXPENSE,
  UPDATE_EXPENSE,
} from "./expenseConstants";
const url = "expense";

export function loadExpense(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${url}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_EXPENSE,
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
export function listenToExpense(expenses) {
  return {
    type: FETCH_EXPENSE,
    payload: expenses,
  };
}

export function createExpense(expense) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .post(`${url}/create`, expense, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch({ type: CREATE_EXPENSE, payload: data.data.data });
        dispatch(asyncActionFinish());
        toast.success("Uğurla əlavə edildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}

export function updateExpense(expense) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    await axios
      .put(`/${url}/update`, expense)
      .then((data) => {
        dispatch({
          type: UPDATE_EXPENSE,
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

export function deleteExpense(expenseId) {
  return async function (dispatch) {
    await axios
      .delete(`/${url}/delete?id=${expenseId}`)
      .then((data) => {
        dispatch({ type: DELETE_EXPENSE, payload: expenseId });
        dispatch(asyncActionFinish());
        toast.info("Uğurla silindi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}
