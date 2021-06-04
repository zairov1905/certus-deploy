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

export function loadReference() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const references = await fetchSampleDataReference();
      dispatch({ type: FETCH_REFERENCE, payload: references });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
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
    try {
      await delay(1000);
      dispatch({ type: CREATE_REFERENCE, payload: reference });
      dispatch(asyncActionFinish());
    } catch (error) {
      asyncActionError(error);
    }
  };
}

export function updateReference(reference) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    try {
      await delay(1000);
      dispatch({ type: UPDATE_REFERENCE, payload: reference });
      dispatch(asyncActionFinish());
    } catch (error) {
      asyncActionError(error);
    }
  };
}

export function deleteReference(referenceId) {
  return async function (dispatch) {
    try {
      await delay(1000);
      dispatch({ type: DELETE_REFERENCE, payload: referenceId });
      // dispatch(asyncActionFinish())
      toast.success("Uğurla silindi");
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
