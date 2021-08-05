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

    const orders = await axios.get(`/${url}`, {
      params: { ...data },
    });
    console.log(orders);
    if (orders.status === 200) {
      dispatch({
        type: FETCH_ORDER,
        payload: orders.data.data,
        totalCount: orders.data.message,
      });
      dispatch(asyncActionFinish());
    } else {
      dispatch(asyncActionError());
    }
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
    const data = await axios.post(`${url}/create`, order, {
      withCredentials: true,
    });
    if (data.status === 201) {
      toast.success("Uğurla əlavə edildi");
      dispatch({ type: CREATE_ORDER, payload: data.data.data });
      dispatch(asyncActionFinish());
    } else {
      toast.danger("Xəta baş verdi, yenidən cəht edin.");
    }
  };
}

export function updateOrder(order) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    console.log(order);
    const orderUpdated = await axios.put(`/${url}/update`, order);
    if (orderUpdated.status === 200) {
      toast.success("Dəyişiklik uğurlar yerinə yetirildi");
      dispatch({
        type: UPDATE_ORDER,
        payload: orderUpdated.data.data,
      });
      dispatch(asyncActionFinish());
    } else {
      asyncActionError();
    }
  };
}

export function deleteOrder(orderId) {
  return async function (dispatch) {
    const documentDeleted = await axios.delete(`/${url}/delete?id=${orderId}`);
    if (documentDeleted.status === 200) {
      dispatch({ type: DELETE_ORDER, payload: orderId });
      // dispatch(asyncActionFinish())
      toast.info("Uğurla silindi");
    } else {
      dispatch(asyncActionError());
    }
  };
}

export function sendToOperation(data) {
    return async function (dispatch) {
        dispatch(asyncActionStart);
        const sendToOperation = await axios.put(`/${url}/add_employee`, data);
        if (sendToOperation.status === 200) {
          toast.success("İcraçı təyin edildi və əməliyyatlar bölməsinə göndərildi");
          dispatch({
            type: SEND_TO_OPERATION,
            payload: sendToOperation.data.data,
          });
          dispatch(asyncActionFinish());
        } else {
          asyncActionError();
        }
      };
}
