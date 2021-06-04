import { toast } from "react-toastify";
import { fetchSampleDataExpenseTypes } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import {
  CREATE_EXPENSE_TYPE,
  DELETE_EXPENSE_TYPE,
  FETCH_EXPENSE_TYPE,
  UPDATE_EXPENSE_TYPE,
} from "./expenseTypeConstants";

export function loadExpenseType() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const expenseTypes = await fetchSampleDataExpenseTypes();
      dispatch({ type: FETCH_EXPENSE_TYPE, payload: expenseTypes });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
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
    try {
      await delay(1000);
      dispatch({ type: CREATE_EXPENSE_TYPE, payload: expenseType });
      dispatch(asyncActionFinish());
    } catch (error) {
      asyncActionError(error);
    }
  };
}

export function updateExpenseType(expenseType) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    try {
      await delay(1000);
      dispatch({ type: UPDATE_EXPENSE_TYPE, payload: expenseType });
      dispatch(asyncActionFinish());
    } catch (error) {
      asyncActionError(error);
    }
  };
}

export function deleteExpenseType(expenseTypeId) {
  return async function (dispatch) {
    try {
      await delay(1000);
      dispatch({ type: DELETE_EXPENSE_TYPE, payload: expenseTypeId });
      // dispatch(asyncActionFinish())
      toast.success("Uğurla silindi");
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
