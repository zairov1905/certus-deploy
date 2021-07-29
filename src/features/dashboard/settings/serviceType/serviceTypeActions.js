import axios from "axios";
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

export function loadServiceType(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());

    const serviceTypes = await axios.get("/service_type", {
      params: { ...data },
    });
    if (serviceTypes.status === 200) {
      dispatch({
        type: FETCH_SERVICE_TYPE,
        payload: serviceTypes.data.data,
        totalCount: serviceTypes.data.message,
      });
      dispatch(asyncActionFinish());
    } else {
      dispatch(asyncActionError());
    }
  };
}
export function listenToServiceType(serviceTypes) {
  return {
    type: FETCH_SERVICE_TYPE,
    payload: serviceTypes,
  };
}

export function createServiceType(serviceType) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    const data = await axios.post("service_type/create", serviceType, {
      withCredentials: true,
    });

    if (data.status === 201) {
      toast.success("Uğurla əlavə edildi");
      dispatch({ type: CREATE_SERVICE_TYPE, payload: data.data.data });
      dispatch(asyncActionFinish());
    } else {
      toast.danger("Xəta baş verdi, yenidən cəht edin.");
    }
  };
}

export function updateServiceType(serviceType) {
  return async function (dispatch) {
    dispatch(asyncActionStart);

    const serviceTypeUpdated = await axios.put(
      "/service_type/update",
      serviceType
    );
    console.log(serviceTypeUpdated.data.data)
    if (serviceTypeUpdated.status === 200) {
      toast.success("Dəyişiklik uğurlar yerinə yetirildi");
      dispatch({
        type: UPDATE_SERVICE_TYPE,
        payload: serviceTypeUpdated.data.data,
      });
      dispatch(asyncActionFinish());
    } else {
      asyncActionError();
    }
  };
}

export function deleteServiceType(serviceTypeId) {
  return async function (dispatch) {
    const serviceTypeDeleted = await axios.delete(
      `/service_type/delete?id=${serviceTypeId}`
    );
    
    if (serviceTypeDeleted.status === 200) {
      dispatch({ type: DELETE_SERVICE_TYPE, payload: serviceTypeId });
      // dispatch(asyncActionFinish())
      toast.info("Uğurla silindi");
    } else {
      dispatch(asyncActionError());
    }
  };
}
