import axios from "axios";
import { toast } from "react-toastify";
import { fetchSampleDataReference } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import {
  CREATE_REFERENCE,
  DELETE_REFERENCE,
  FETCH_REFERENCE,
  UPDATE_REFERENCE,
} from "./referenceConstants";
const url = "rreference";
export function loadReference(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());

    const references = await axios.get(`/${url}`, {
      params: { ...data },
    });
    if (references.status === 200) {
      dispatch({
        type: FETCH_REFERENCE,
        payload: references.data.data,
        totalCount: references.data.message,
      });
      dispatch(asyncActionFinish());
    } else {
      dispatch(asyncActionError());
    }
  };
}
export function listenToReference(reference) {
  return {
    type: FETCH_REFERENCE,
    payload: reference,
  };
}

export function createReference(reference) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    const data = await axios.post(`${url}/create`, reference, {
      withCredentials: true,
    });
    if (data.status === 201) {
      toast.success("Uğurla əlavə edildi");
      dispatch({ type: CREATE_REFERENCE, payload: data.data.data });
      dispatch(asyncActionFinish());
    } else {
      toast.danger("Xəta baş verdi, yenidən cəht edin.");
    }
  };
}

export function updateReference(reference) {
  return async function (dispatch) {
    dispatch(asyncActionStart);

    const referenceUpdated = await axios.put(
      `/${url}/update`,
      reference
    );
    if (referenceUpdated.status === 200) {
      toast.success("Dəyişiklik uğurlar yerinə yetirildi");
      dispatch({
        type: UPDATE_REFERENCE,
        payload: referenceUpdated.data.data,
      });
      dispatch(asyncActionFinish());
    } else {
      asyncActionError();
    }
  };
}

export function deleteReference(referenceId) {
  return async function (dispatch) {
    const documentDeleted = await axios.delete(
      `/${url}/delete?id=${referenceId}`
    );
    if (documentDeleted.status === 200) {
      dispatch({ type: DELETE_REFERENCE, payload: referenceId });
      // dispatch(asyncActionFinish())
      toast.info("Uğurla silindi");
    } else {
      dispatch(asyncActionError());
    }
  };
}
