import axios from "axios";
import { toast } from "react-toastify";
import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";

import {
  CREATE_EXPENSE_GROUP,
  DELETE_EXPENSE_GROUP,
  FETCH_EXPENSE_GROUP,
  UPDATE_EXPENSE_GROUP,
} from "./expenseGroupConstants";
const url = 'income_expense_group';
export function loadExpenseGroup(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${url}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_EXPENSE_GROUP,
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
export function listenToExpenseGroup(expenseGroups) {
  return {
    type: FETCH_EXPENSE_GROUP,
    payload: expenseGroups,
  };
}

export function createExpenseGroup(expenseGroup) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .post(`${url}/create`, expenseGroup, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch({ type: CREATE_EXPENSE_GROUP, payload: data.data.data });
        dispatch(asyncActionFinish());
        toast.success("Uğurla əlavə edildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}

export function updateExpenseGroup(expenseGroup) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    await axios
      .put(`/${url}/update`, expenseGroup)
      .then((data) => {
        dispatch({
          type: UPDATE_EXPENSE_GROUP,
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

export function deleteExpenseGroup(expenseGroupId) {
  return async function (dispatch) {
    await axios
      .delete(`/${url}/delete?id=${expenseGroupId}`)
      .then((data) => {
        dispatch({ type: DELETE_EXPENSE_GROUP, payload: expenseGroupId });
        dispatch(asyncActionFinish());
        toast.info("Uğurla silindi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}
