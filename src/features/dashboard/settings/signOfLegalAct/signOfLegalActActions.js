import { toast } from "react-toastify";
import { fetchSampleDataSignOfLegalAct } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import {
  CREATE_SIGN_OF_LEGAL_ACT,
  DELETE_SIGN_OF_LEGAL_ACT,
  FETCH_SIGN_OF_LEGAL_ACT,
  UPDATE_SIGN_OF_LEGAL_ACT,
} from "./signOfLegalActConstants";

export function loadSignOfLegalAct() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const signOfLegalActs = await fetchSampleDataSignOfLegalAct();
      dispatch({ type: FETCH_SIGN_OF_LEGAL_ACT, payload: signOfLegalActs });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
export function listenToSignOfLegalAct(counterparties) {
  return {
    type: FETCH_SIGN_OF_LEGAL_ACT,
    payload: counterparties,
  };
}

export function createSignOfLegalAct(signOfLegalAct) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      await delay(1000);
      dispatch({ type: CREATE_SIGN_OF_LEGAL_ACT, payload: signOfLegalAct });
      dispatch(asyncActionFinish());
    } catch (error) {
      asyncActionError(error);
    }
  };
}

export function updateSignOfLegalAct(signOfLegalAct) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    try {
      await delay(1000);
      dispatch({ type: UPDATE_SIGN_OF_LEGAL_ACT, payload: signOfLegalAct });
      dispatch(asyncActionFinish());
    } catch (error) {
      asyncActionError(error);
    }
  };
}

export function deleteSignOfLegalAct(signOfLegalActId) {
  return async function (dispatch) {
    try {
      await delay(1000);
      dispatch({ type: DELETE_SIGN_OF_LEGAL_ACT, payload: signOfLegalActId });
      // dispatch(asyncActionFinish())
      toast.success("Uğurla silindi");
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
