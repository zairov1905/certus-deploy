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

export function loadOrderSource() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const orderSources = await fetchSampleDataOrderSource();
      dispatch({ type: FETCH_ORDER_SOURCE, payload: orderSources });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
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
    try {
      await delay(1000);
      dispatch({ type: CREATE_ORDER_SOURCE, payload: orderSource });
      dispatch(asyncActionFinish());
    } catch (error) {
      asyncActionError(error);
    }
  };
}

export function updateOrderSource(orderSource) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    try {
      await delay(1000);
      dispatch({ type: UPDATE_ORDER_SOURCE, payload: orderSource });
      dispatch(asyncActionFinish());
    } catch (error) {
      asyncActionError(error);
    }
  };
}

export function deleteOrderSource(orderSourceId) {
  return async function (dispatch) {
    try {
      await delay(1000);
      dispatch({ type: DELETE_ORDER_SOURCE, payload: orderSourceId });
      // dispatch(asyncActionFinish())
      toast.success("Uğurla silindi");
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
