import axios from "axios";
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

export function loadExpenseType(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());

    const document_types = await axios.get("/expense_type", {
      params: { ...data },
    });
    if (document_types.status === 200) {
      dispatch({
        type: FETCH_EXPENSE_TYPE,
        payload: document_types.data.data,
        totalCount: document_types.data.message,
      });
      dispatch(asyncActionFinish());
    } else {
      dispatch(asyncActionError());
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
    const data = await axios.post("expense_type/create", expenseType, {
      withCredentials: true,
    });

    if (data.status === 201) {
      toast.success("Uğurla əlavə edildi");
      dispatch({ type: CREATE_EXPENSE_TYPE, payload: data.data.data });
      dispatch(asyncActionFinish());
    } else {
      toast.danger("Xəta baş verdi, yenidən cəht edin.");
    }
  };
}

export function updateExpenseType(expenseType) {
  return async function (dispatch) {
    dispatch(asyncActionStart);

    const expenseTypeUpdated = await axios.put(
      "/expense_type/update",
      expenseType
    );
  
    if (expenseTypeUpdated.status === 200) {
      toast.success("Dəyişiklik uğurlar yerinə yetirildi");
      dispatch({
        type: UPDATE_EXPENSE_TYPE,
        payload: expenseTypeUpdated.data.data,
      });
      dispatch(asyncActionFinish());
    } else {
      asyncActionError();
    }
  };
}

export function deleteExpenseType(expenseTypeId) {
  return async function (dispatch) {
    const expenseTypeDeleted = await axios.delete(
      `/expense_type/delete?id=${expenseTypeId}`
    );
   
    if (expenseTypeDeleted.status === 200) {
      dispatch({ type: DELETE_EXPENSE_TYPE, payload: expenseTypeId });
      // dispatch(asyncActionFinish())
      toast.info("Uğurla silindi");
    } else {
      dispatch(asyncActionError());
    }
  };
}
