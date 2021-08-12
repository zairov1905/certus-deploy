import axios from "axios";
import { toast } from "react-toastify";
import { fetchSampleDataPersonal } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import {
  CREATE_PERSONAL,
  DELETE_PERSONAL,
  FETCH_PERSONAL,
  UPDATE_PERSONAL,
} from "./personalConstants";
const url = "personal_certificate";

export function loadPersonal(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());

    const personal = await axios.get(`/${url}`, {
      params: { ...data },
    });

    console.log(personal);
    if (personal.status === 200) {
      dispatch({
        type: FETCH_PERSONAL,
        payload: personal.data.data,
        totalCount: personal.data.message,
      });
      dispatch(asyncActionFinish());
    } else {
      dispatch(asyncActionError());
    }
  };
}
export function listenToPersonal(personals) {
  return {
    type: FETCH_PERSONAL,
    payload: personals,
  };
}

export function createPersonal(personal) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    console.log(personal);

    const data = await axios.post(`${url}/create`, personal, {
      withCredentials: true,
    });

    if (data.status === 201) {
      toast.success("Uğurla əlavə edildi");
      dispatch({ type: CREATE_PERSONAL, payload: data.data.data });
      dispatch(asyncActionFinish());
    } else {
      toast.danger("Xəta baş verdi, yenidən cəht edin.");
    }
  };
}

export function updatePersonal(personal) {
  return async function (dispatch) {
    dispatch(asyncActionStart);

    const personalUpdated = await axios.put(`/${url}/update`, personal);
    if (personalUpdated.status === 200) {
      toast.success("Dəyişiklik uğurlar yerinə yetirildi");
      dispatch({
        type: UPDATE_PERSONAL,
        payload: personalUpdated.data.data,
      });
      dispatch(asyncActionFinish());
    } else {
      asyncActionError();
    }
  };
}

export function deletePersonal(personalId) {
  return async function (dispatch) {
    const personalDeleted = await axios.delete(
      `/${url}/delete?id=${personalId}`
    );
    if (personalDeleted.status === 200) {
      dispatch({ type: DELETE_PERSONAL, payload: personalId });
      // dispatch(asyncActionFinish())
      toast.info("Uğurla silindi");
    } else {
      dispatch(asyncActionError());
    }
  };
}
