import axios from "axios";
import { toast } from "react-toastify";
import { fetchSampleDataOrder } from "../../../app/api/mockApi";
import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../app/async/asyncReducer";
import { delay } from "../../../app/util/util";
import {
  CREATE_OPERATION,
  DELETE_OPERATION,
  FETCH_OPERATION,
  UPDATE_OPERATION,
} from "./operationConstants";
const url = "operation";

export function loadOperation(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${url}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_OPERATION,
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
export function listenToOperation(operations) {
  return {
    type: FETCH_OPERATION,
    payload: operations,
  };
}

export function createOperation(operation) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      await delay(1000);
      dispatch({ type: CREATE_OPERATION, payload: operation });
      dispatch(asyncActionFinish());
    } catch (error) {
      asyncActionError(error);
    }
  };
}

export function updateOperation(operation) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    await axios
      .put(`/${url}/update`, operation)
      .then((data) => {
        dispatch({
          type: UPDATE_OPERATION,
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

export function deleteOperation(operationId) {
  return async function (dispatch) {
    await axios
      .delete(`/${url}/delete?id=${operationId}`)
      .then((data) => {
        dispatch({ type: DELETE_OPERATION, payload: operationId });
        dispatch(asyncActionFinish());
        toast.info("Uğurla silindi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}
