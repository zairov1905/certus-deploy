import { toast } from "react-toastify";
import { fetchSampleDataServiceTypes } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import {
  CREATE_SERVICE_TYPE,
  DELETE_SERVICE_TYPE,
  FETCH_SERVICE_TYPE,
  UPDATE_SERVICE_TYPE,
} from "./serviceTypeConstants";

export function loadServiceType(serviceTypes) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const serviceTypes = await fetchSampleDataServiceTypes();
      dispatch({ type: FETCH_SERVICE_TYPE, payload: serviceTypes });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
export function listenToServiceType(serviceTypes) {
  return {
    type: FETCH_SERVICE_TYPE,
    payload: serviceTypes,
  };
}

export function createServiceType(serviceTypes) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      await delay(1000);
      dispatch({ type: CREATE_SERVICE_TYPE, payload: serviceTypes });
      dispatch(asyncActionFinish());
    } catch (error) {
      asyncActionError(error);
    }
  };
}

export function updateServiceType(serviceTypes) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    try {
      await delay(1000);
      dispatch({ type: UPDATE_SERVICE_TYPE, payload: serviceTypes });
      dispatch(asyncActionFinish());
    } catch (error) {
      asyncActionError(error);
    }
  };
}

export function deleteServiceType(serviceTypeId) {
  return async function (dispatch) {
    try {
      await delay(1000);
      dispatch({ type: DELETE_SERVICE_TYPE, payload: serviceTypeId });
      // dispatch(asyncActionFinish())
      toast.success("Uğurla silindi");
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
