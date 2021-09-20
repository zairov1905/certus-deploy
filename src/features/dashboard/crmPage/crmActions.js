import axios from "axios";
import { toast } from "react-toastify";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../app/async/asyncReducer";
import { createCounterparty } from "../settings/counterparty/counterpartyActions";
import { CREATE_CRM, DELETE_CRM, FETCH_CRM, UPDATE_CRM } from "./crmConstants";
const url = "customer";
export function loadCrm(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${url}`, {
        params: { ...data },
      })
      .then((datas) => {
        console.log(datas)
        dispatch({
          type: FETCH_CRM,
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
        dispatch(
          createCounterparty({
            name:crm.customer_name ,
            about:"Müştəridən gələn kontragentdir",
            contact: crm.customer_phone,
          })
        );
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
