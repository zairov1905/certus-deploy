import { toast } from "react-toastify";
import { fetchSampleDataCounterParty } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import {
  CREATE_COUNTERPARTY,
  DELETE_COUNTERPARTY,
  FETCH_COUNTERPARTY,
  UPDATE_COUNTERPARTY,
} from "./counterpartyConstants";

export function loadCounterparty() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const counterparties = await fetchSampleDataCounterParty();
      dispatch({ type: FETCH_COUNTERPARTY, payload: counterparties });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
export function listenToCounterparty(counterparties) {
  return {
    type: FETCH_COUNTERPARTY,
    payload: counterparties,
  };
}

export function createCounterparty(counterparty) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      await delay(1000);
      dispatch({ type: CREATE_COUNTERPARTY, payload: counterparty });
      dispatch(asyncActionFinish());
    } catch (error) {
      asyncActionError(error);
    }
  };
}

export function updateCounterparty(counterparty) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    try {
      await delay(1000);
      dispatch({ type: UPDATE_COUNTERPARTY, payload: counterparty });
      dispatch(asyncActionFinish());
    } catch (error) {
      asyncActionError(error);
    }
  };
}

export function deleteCounterparty(counterpartyId) {
  return async function (dispatch) {
    try {
      await delay(1000);
      dispatch({ type: DELETE_COUNTERPARTY, payload: counterpartyId });
      // dispatch(asyncActionFinish())
      toast.success("Uğurla silindi");
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
