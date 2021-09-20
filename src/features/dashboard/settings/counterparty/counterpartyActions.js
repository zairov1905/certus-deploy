import axios from "axios";
import { toast } from "react-toastify";
import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import {
  CREATE_COUNTERPARTY,
  DELETE_COUNTERPARTY,
  FETCH_COUNTERPARTY,
  UPDATE_COUNTERPARTY,
} from "./counterpartyConstants";
const url = "contractor";
export function loadCounterparty(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${url}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_COUNTERPARTY,
          payload: datas.data.data,
          totalCount: datas.data.message,
        });
        dispatch(asyncActionFinish());
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi");
      });
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
    await axios
      .post(`${url}/create`, counterparty, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch({ type: CREATE_COUNTERPARTY, payload: data.data.data });
        dispatch(asyncActionFinish());
        toast.success("Kontragent uğurla əlavə edildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}

export function updateCounterparty(counterparty) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    await axios
      .put(`/${url}/update`, counterparty)
      .then((data) => {
        dispatch({
          type: UPDATE_COUNTERPARTY,
          payload: data.data.data,
        });
        dispatch(asyncActionFinish());
        toast.success("Dəyişiklik uğurlar yerinə yetirildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };

}

export function deleteCounterparty(counterpartyId) {
  return async function (dispatch) {
    await axios
      .delete(`/${url}/delete?id=${counterpartyId}`)
      .then((data) => {
        dispatch({ type: DELETE_COUNTERPARTY, payload: counterpartyId });
        dispatch(asyncActionFinish());
        toast.info("Uğurla silindi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}
