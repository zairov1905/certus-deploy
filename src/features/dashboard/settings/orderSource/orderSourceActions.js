import axios from "axios";
import { toast } from "react-toastify";
import { fetchSampleDataOrderSource } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import {
  CREATE_ORDER_SOURCE,
  DELETE_ORDER_SOURCE,
  FETCH_ORDER_SOURCE,
  UPDATE_ORDER_SOURCE,
} from "./orderSourceConstants";

export function loadOrderSource(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());

    const orderSources = await axios.get("/order_source", {
      params: { ...data },
    });
    if (orderSources.status === 200) {
      dispatch({
        type: FETCH_ORDER_SOURCE,
        payload: orderSources.data.data,
        totalCount: orderSources.data.message,
      });
      dispatch(asyncActionFinish());
    } else {
      dispatch(asyncActionError());
    }
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
    const data = await axios.post("order_source/create", orderSource, {
      withCredentials: true,
    });
    

    if (data.status === 201) {
      toast.success("Uğurla əlavə edildi");
      dispatch({ type: CREATE_ORDER_SOURCE, payload: data.data.data });
      dispatch(asyncActionFinish());
    } else {
      toast.danger("Xəta baş verdi, yenidən cəht edin.");
    }
  };
}

export function updateOrderSource(orderSource) {
  return async function (dispatch) {
    dispatch(asyncActionStart);

    const orderSourceUpdated = await axios.put(
      "/order_source/update",
      orderSource
    );
   
    if (orderSourceUpdated.status === 200) {
      toast.success("Dəyişiklik uğurlar yerinə yetirildi");
      dispatch({
        type: UPDATE_ORDER_SOURCE,
        payload: orderSourceUpdated.data.data,
      });
      dispatch(asyncActionFinish());
    } else {
      asyncActionError();
    }
  };
}

export function deleteOrderSource(orderSourceId) {
  return async function (dispatch) {
    const orderSourceDeleted = await axios.delete(
      `/order_source/delete?id=${orderSourceId}`
    );
    
    if (orderSourceDeleted.status === 200) {
      dispatch({ type: DELETE_ORDER_SOURCE, payload: orderSourceId });
      // dispatch(asyncActionFinish())
      toast.info("Uğurla silindi");
    } else {
      dispatch(asyncActionError());
    }
  };
}
