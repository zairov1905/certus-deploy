import axios from "axios";
import { toast } from "react-toastify";
import { fethcSampleDataDuties } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import {
  CREATE_DUTY,
  DELETE_DUTY,
  FETCH_DUTY,
  UPDATE_DUTY,
} from "./dutyConstants";

export function loadDuties(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());

    const duties = await axios.get("/position", {
      params: { ...data },
    });
    if (duties.status === 200) {
      dispatch({
        type: FETCH_DUTY,
        payload: duties.data.data,
        totalCount: duties.data.message,
      });
      dispatch(asyncActionFinish());
    } else {
      dispatch(asyncActionError());
    }
  };
}
export function listenToDuty(duties) {
  return {
    type: FETCH_DUTY,
    payload: duties,
  };
}

export function createDuty(duty) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    const data = await axios.post("position/create", duty, {
      withCredentials: true,
    });

    if (data.status === 201) {
      toast.success("Uğurla əlavə edildi");
      dispatch({ type: CREATE_DUTY, payload: data.data.data });
      dispatch(asyncActionFinish());
    } else {
      toast.danger("Xəta baş verdi, yenidən cəht edin.");
    }
  };
}

export function updateDuty(duty) {
  return async function (dispatch) {
    dispatch(asyncActionStart);

    const documentDuty = await axios.put("/position/update", duty);
    if (documentDuty.status === 200) {
      toast.success("Dəyişiklik uğurlar yerinə yetirildi");
      dispatch({
        type: UPDATE_DUTY,
        payload: documentDuty.data.data,
      });
      dispatch(asyncActionFinish());
    } else {
      asyncActionError();
    }
  };
}

export function deleteDuty(dutyId) {
    return async function (dispatch) {
        const documentDeleted = await axios.delete(
          `/position/delete?id=${dutyId}`
        );
        console.log(documentDeleted);
        if (documentDeleted.status === 200) {
          dispatch({ type: DELETE_DUTY, payload: dutyId });
          // dispatch(asyncActionFinish())
          toast.info("Uğurla silindi");
        } else {
          dispatch(asyncActionError());
        }
      };
}
