import { toast } from "react-toastify";
import { fetchSampleDataExpenseGroups } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import {
  CREATE_EXPENSE_GROUP,
  DELETE_EXPENSE_GROUP,
  FETCH_EXPENSE_GROUP,
  UPDATE_EXPENSE_GROUP,
} from "./expenseGroupConstants";

export function loadExpenseGroup() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const expenseGroups = await fetchSampleDataExpenseGroups();
      dispatch({ type: FETCH_EXPENSE_GROUP, payload: expenseGroups });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
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
    try {
      await delay(1000);
      dispatch({ type: CREATE_EXPENSE_GROUP, payload: expenseGroup });
      dispatch(asyncActionFinish());
    } catch (error) {
      asyncActionError(error);
    }
  };
}

export function updateExpenseGroup(expenseGroup) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    try {
      await delay(1000);
      dispatch({ type: UPDATE_EXPENSE_GROUP, payload: expenseGroup });
      dispatch(asyncActionFinish());
    } catch (error) {
      asyncActionError(error);
    }
  };
}

export function deleteExpenseGroup(expenseGroupId) {
  return async function (dispatch) {
    try {
      await delay(1000);
      dispatch({ type: DELETE_EXPENSE_GROUP, payload: expenseGroupId });
      // dispatch(asyncActionFinish())
      toast.success("Uğurla silindi");
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
