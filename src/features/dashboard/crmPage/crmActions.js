import axios from "axios";
import { toast } from "react-toastify";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../app/async/asyncReducer";
import { CREATE_CRM, DELETE_CRM, FETCH_CRM, UPDATE_CRM } from "./crmConstants";
const url = "customer";
export function loadCrm(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${url}`, {
        params: { ...data },
      })
      .then((crms) => {
        dispatch({
          type: FETCH_CRM,
          payload: crms.data.data,
          totalCount: crms.data.message,
        });
        dispatch(asyncActionFinish());
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi");
      });
  };
}
export function listenToCrm(crms) {
  return {
    type: FETCH_CRM,
    payload: crms,
  };
}

export function createCrm(crm) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .post(`${url}/create`, crm, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch({ type: CREATE_CRM, payload: data.data.data });
        dispatch(asyncActionFinish());
        toast.success("Uğurla əlavə edildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}

export function updateCrm(crm) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    await axios
      .put(`/${url}/update`, crm)
      .then((data) => {
        dispatch({
          type: UPDATE_CRM,
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

export function deleteCrm(crmId) {
  return async function (dispatch) {
    await axios
      .delete(`/${url}/delete?id=${crmId}`)
      .then((data) => {
        dispatch({ type: DELETE_CRM, payload: crmId });
        dispatch(asyncActionFinish());
        toast.info("Uğurla silindi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}
