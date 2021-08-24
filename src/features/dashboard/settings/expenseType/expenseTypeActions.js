import axios from "axios";
import { toast } from "react-toastify";
import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import {
  CREATE_EXPENSE_TYPE,
  DELETE_EXPENSE_TYPE,
  FETCH_EXPENSE_TYPE,
  UPDATE_EXPENSE_TYPE,
} from "./expenseTypeConstants";
const url = 'expense_type'
export function loadExpenseType(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${url}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_EXPENSE_TYPE,
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
export function listenToExpenseType(expenseTypes) {
  return {
    type: FETCH_EXPENSE_TYPE,
    payload: expenseTypes,
  };
}

export function createExpenseType(expenseType) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .post(`${url}/create`, expenseType, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch({ type: CREATE_EXPENSE_TYPE, payload: data.data.data });
        dispatch(asyncActionFinish());
        toast.success("Uğurla əlavə edildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}

export function updateExpenseType(expenseType) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    await axios
      .put(`/${url}/update`, expenseType)
      .then((data) => {
        dispatch({
          type: UPDATE_EXPENSE_TYPE,
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

export function deleteExpenseType(expenseTypeId) {
  return async function (dispatch) {
    await axios
      .delete(`/${url}/delete?id=${expenseTypeId}`)
      .then((data) => {
        dispatch({ type: DELETE_EXPENSE_TYPE, payload: expenseTypeId });
        dispatch(asyncActionFinish());
        toast.info("Uğurla silindi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}
