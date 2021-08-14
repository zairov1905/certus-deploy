import axios from "axios";
import { toast } from "react-toastify";
import { fetchSampleDataControlSystem } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import {
  CREATE_CONTROL_SYSTEM,
  DELETE_CONTROL_SYSTEM,
  FETCH_CONTROL_SYSTEM,
  UPDATE_CONTROL_SYSTEM,
} from "./controlSystemConstants";
const url = "control_sistem";
export function loadControlSystem(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());

    const controlSystem = await axios.get(`/${url}`, {
      params: { ...data },
    });

    console.log(controlSystem);
    if (controlSystem.status === 200) {
      dispatch({
        type: FETCH_CONTROL_SYSTEM,
        payload: controlSystem.data.data,
        totalCount: controlSystem.data.message,
      });
      dispatch(asyncActionFinish());
    } else {
      dispatch(asyncActionError());
    }
  };
}
export function listenToControlSystem(controlSystems) {
  return {
    type: FETCH_CONTROL_SYSTEM,
    payload: controlSystems,
  };
}

export function createControlSystem(controlSystem) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    console.log(controlSystem);

    const data = await axios.post(`${url}/create`, controlSystem, {
      withCredentials: true,
    });

    if (data.status === 201) {
      toast.success("Uğurla əlavə edildi");
      dispatch({ type: CREATE_CONTROL_SYSTEM, payload: data.data.data });
      dispatch(asyncActionFinish());
    } else {
      toast.danger("Xəta baş verdi, yenidən cəht edin.");
    }
  };
}

export function updateControlSystem(controlSystem) {
  return async function (dispatch) {
    dispatch(asyncActionStart);

    const controlSystemUpdated = await axios.put(
      `/${url}/update`,
      controlSystem
    );
    if (controlSystemUpdated.status === 200) {
      toast.success("Dəyişiklik uğurlar yerinə yetirildi");
      dispatch({
        type: UPDATE_CONTROL_SYSTEM,
        payload: controlSystemUpdated.data.data,
      });
      dispatch(asyncActionFinish());
    } else {
      asyncActionError();
    }
  };
}

export function deleteControlSystem(controlSystemId) {
  return async function (dispatch) {
    const controlSystemDeleted = await axios.delete(
      `/${url}/delete?id=${controlSystemId}`
    );
    if (controlSystemDeleted.status === 200) {
      dispatch({ type: DELETE_CONTROL_SYSTEM, payload: controlSystemId });
      // dispatch(asyncActionFinish())
      toast.info("Uğurla silindi");
    } else {
      dispatch(asyncActionError());
    }
  };
}
