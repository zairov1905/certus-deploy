import axios from "axios";
import { toast } from "react-toastify";
import { fetchSampleDataSignOfLegalAct } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import { DELETE_SERVICE_TYPE } from "../serviceType/serviceTypeConstants";
import {
  CREATE_SIGN_OF_LEGAL_ACT,
  DELETE_SIGN_OF_LEGAL_ACT,
  FETCH_SIGN_OF_LEGAL_ACT,
  UPDATE_SIGN_OF_LEGAL_ACT,
} from "./signOfLegalActConstants";
const url = "legal_act";

export function loadSignOfLegalAct(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());

    const references = await axios.get(`/${url}`, {
      params: { ...data },
    });
    if (references.status === 200) {
      dispatch({
        type: FETCH_SIGN_OF_LEGAL_ACT,
        payload: references.data.data,
        totalCount: references.data.message,
      });
      dispatch(asyncActionFinish());
    } else {
      dispatch(asyncActionError());
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
    const data = await axios.post(`${url}/create`, signOfLegalAct, {
      withCredentials: true,
    });
    if (data.status === 201) {
      toast.success("Uğurla əlavə edildi");
      dispatch({ type: CREATE_SIGN_OF_LEGAL_ACT, payload: data.data.data });
      dispatch(asyncActionFinish());
    } else {
      toast.danger("Xəta baş verdi, yenidən cəht edin.");
    }
  };
}

export function updateSignOfLegalAct(signOfLegalAct) {
  return async function (dispatch) {
    dispatch(asyncActionStart);

    const signOfLegalActUpdated = await axios.put(
      `/${url}/update`,
      signOfLegalAct
    );
    if (signOfLegalActUpdated.status === 200) {
      toast.success("Dəyişiklik uğurlar yerinə yetirildi");
      dispatch({
        type: UPDATE_SIGN_OF_LEGAL_ACT,
        payload: signOfLegalActUpdated.data.data,
      });
      dispatch(asyncActionFinish());
    } else {
      asyncActionError();
    }
  };
}

export function deleteSignOfLegalAct(signOfLegalActId) {
  return async function (dispatch) {
    const signOfLegalActDeleted = await axios.delete(
      `/${url}/delete?id=${signOfLegalActId}`
    );
    if (signOfLegalActDeleted.status === 200) {
      dispatch({ type: DELETE_SIGN_OF_LEGAL_ACT, payload: signOfLegalActId });
      // dispatch(asyncActionFinish())
      toast.info("Uğurla silindi");
    } else {
      dispatch(asyncActionError());
    }
  };
}
