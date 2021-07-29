import axios from "axios";
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

export function loadCounterparty(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    const counterparties = await axios.get("/contractor", {
      params: { ...data },
    });
    if (counterparties.status === 200) {
      dispatch({
        type: FETCH_COUNTERPARTY,
        payload: counterparties.data.data,
        totalCount: counterparties.data.message,
      });
      dispatch(asyncActionFinish());
    } else {
      dispatch(asyncActionError());
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
    const data = await axios.post("contractor/create", counterparty, {
      withCredentials: true,
    });
    if (data.status === 201) {
      toast.success("Uğurla əlavə edildi");
      dispatch({ type: CREATE_COUNTERPARTY, payload: data.data.data });
      dispatch(asyncActionFinish());
    } else {
      toast.danger("Xəta baş verdi, yenidən cəht edin.");
    }
  };
}

export function updateCounterparty(counterparty) {
  return async function (dispatch) {
    dispatch(asyncActionStart);

    const counterpartyUptaded = await axios.put(
      "/contractor/update",
      counterparty
    );
    
    if (counterpartyUptaded.status === 200) {
      toast.success("Dəyişiklik uğurlar yerinə yetirildi");
      dispatch({
        type: UPDATE_COUNTERPARTY,
        payload: counterpartyUptaded.data.data,
      });
      dispatch(asyncActionFinish());
    } else {
      asyncActionError();
    }
  };
}

export function deleteCounterparty(counterpartyId) {
  return async function (dispatch) {
    const counterpartyDeleted = await axios.delete(
      `/contractor/delete?id=${counterpartyId}`
    );
    if (counterpartyDeleted.status === 200) {
      dispatch({ type: DELETE_COUNTERPARTY, payload: counterpartyId });
      // dispatch(asyncActionFinish())
      toast.info("Uğurla silindi");
    } else {
      dispatch(asyncActionError());
    }
  };
}
