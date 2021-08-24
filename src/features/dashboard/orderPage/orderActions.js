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
  CREATE_ORDER,
  DELETE_ORDER,
  FETCH_ORDER,
  SEND_TO_OPERATION,
  UPDATE_ORDER,
} from "./orderConstants";
const url = "order";
export function loadOrder(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${url}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_ORDER,
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
export function listenToOrder(orders) {
  return {
    type: FETCH_ORDER,
    payload: orders,
  };
}

export function createOrder(order) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .post(`${url}/create`, order, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch({ type: CREATE_ORDER, payload: data.data.data });
        dispatch(asyncActionFinish());
        toast.success("Uğurla əlavə edildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}

export function updateOrder(order) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    await axios
      .put(`/${url}/update`, order)
      .then((data) => {
        dispatch({
          type: UPDATE_ORDER,
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

export function deleteOrder(orderId) {
  return async function (dispatch) {
    await axios
      .delete(`/${url}/delete?id=${orderId}`)
      .then((data) => {
        dispatch({ type: DELETE_ORDER, payload: orderId });
        dispatch(asyncActionFinish());
        toast.info("Uğurla silindi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}

export function sendToOperation(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    await axios
      .put(`/${url}/add_employee`, data)
      .then((data) => {
        dispatch({
          type: SEND_TO_OPERATION,
          payload: data.data.data,
        });
        dispatch(asyncActionFinish());
        toast.success(
          "İcraçı təyin edildi və əməliyyatlar bölməsinə göndərildi"
        );
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}
