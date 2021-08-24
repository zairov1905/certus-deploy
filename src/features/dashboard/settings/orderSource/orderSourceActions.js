import axios from "axios";
import { toast } from "react-toastify";
import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import {
  CREATE_ORDER_SOURCE,
  DELETE_ORDER_SOURCE,
  FETCH_ORDER_SOURCE,
  UPDATE_ORDER_SOURCE,
} from "./orderSourceConstants";
const url = 'order_source'
export function loadOrderSource(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${url}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_ORDER_SOURCE,
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
export function listenToOrderSource(orderSource) {
  return {
    type: FETCH_ORDER_SOURCE,
    payload: orderSource,
  };
}

export function createOrderSource(orderSource) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .post(`${url}/create`, orderSource, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch({ type: CREATE_ORDER_SOURCE, payload: data.data.data });
        dispatch(asyncActionFinish());
        toast.success("Uğurla əlavə edildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}

export function updateOrderSource(orderSource) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    await axios
      .put(`/${url}/update`, orderSource)
      .then((data) => {
        dispatch({
          type: UPDATE_ORDER_SOURCE,
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

export function deleteOrderSource(orderSourceId) {
  return async function (dispatch) {
    await axios
      .delete(`/${url}/delete?id=${orderSourceId}`)
      .then((data) => {
        dispatch({ type: DELETE_ORDER_SOURCE, payload: orderSourceId });
        dispatch(asyncActionFinish());
        toast.info("Uğurla silindi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}
