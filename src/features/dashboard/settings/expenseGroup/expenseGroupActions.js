import axios from "axios";
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

export function loadExpenseGroup(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());

    const expenseGroups = await axios.get("/income_expense_group", {
      params: { ...data },
    });
    if (expenseGroups.status === 200) {
      dispatch({
        type: FETCH_EXPENSE_GROUP,
        payload: expenseGroups.data.data,
        totalCount: expenseGroups.data.message,
      });
      dispatch(asyncActionFinish());
    } else {
      dispatch(asyncActionError());
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
    const data = await axios.post("income_expense_group/create", expenseGroup, {
      withCredentials: true,
    });

    if (data.status === 201) {
      toast.success("Uğurla əlavə edildi");
      dispatch({ type: CREATE_EXPENSE_GROUP, payload: data.data.data });
      dispatch(asyncActionFinish());
    } else {
      toast.danger("Xəta baş verdi, yenidən cəht edin.");
    }
  };
}

export function updateExpenseGroup(expenseGroup) {
  return async function (dispatch) {
    dispatch(asyncActionStart);

    const expenseGroupUptaded = await axios.put(
      "/income_expense_group/update",
      expenseGroup
    );
    if (expenseGroupUptaded.status === 200) {
      toast.success("Dəyişiklik uğurlar yerinə yetirildi");
      dispatch({
        type: UPDATE_EXPENSE_GROUP,
        payload: expenseGroupUptaded.data.data,
      });
      dispatch(asyncActionFinish());
    } else {
      asyncActionError();
    }
  };
}

export function deleteExpenseGroup(expenseGroupId) {
  return async function (dispatch) {
    const documentDeleted = await axios.delete(
      `/income_expense_group/delete?id=${expenseGroupId}`
    );
    if (documentDeleted.status === 200) {
      dispatch({ type: DELETE_EXPENSE_GROUP, payload: expenseGroupId });
      // dispatch(asyncActionFinish())
      toast.info("Uğurla silindi");
    } else {
      dispatch(asyncActionError());
    }
  };
}
