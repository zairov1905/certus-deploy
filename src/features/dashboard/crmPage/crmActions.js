import axios from "axios";
import { toast } from "react-toastify";
import { fetchSampleDataCrm } from "../../../app/api/mockApi";
import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../app/async/asyncReducer";
import { delay } from "../../../app/util/util";
import { CREATE_CRM, DELETE_CRM, FETCH_CRM, UPDATE_CRM } from "./crmConstants";
const url = "customer";
export function loadCrm(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());

    const crms = await axios.get(`/${url}`, {
      params: { ...data },
    });
    console.log(crms);
    if (crms.status === 200) {
      dispatch({
        type: FETCH_CRM,
        payload: crms.data.data,
        totalCount: crms.data.message,
      });
      dispatch(asyncActionFinish());
    } else {
      dispatch(asyncActionError());
    }
  };
}
export function listenToCrm(crms) {
  return {
    type: FETCH_CRM,
    payload: crms,
  };
}

export function createCrm(crm) {
  console.log(crm);
  return async function (dispatch) {
    dispatch(asyncActionStart());

    const data = await axios.post(`${url}/create`, crm, {
      withCredentials: true,
    });

    if (data.status === 201) {
      toast.success("Uğurla əlavə edildi");
      dispatch({ type: CREATE_CRM, payload: data.data.data });
      dispatch(asyncActionFinish());
    } else {
      toast.danger("Xəta baş verdi, yenidən cəht edin.");
    }
  };
}

export function updateCrm(crm) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    console.log(crm,'sadasdad');
    const crmUpdated = await axios.put(`/${url}/update`, crm);
    if (crmUpdated.status === 200) {
      toast.success("Dəyişiklik uğurlar yerinə yetirildi");
      dispatch({
        type: UPDATE_CRM,
        payload: crmUpdated.data.data,
      });
      dispatch(asyncActionFinish());
    } else {
      asyncActionError();
    }
  };
}

export function deleteCrm(crmId) {
  return async function (dispatch) {
    const crmDeleted = await axios.delete(`/${url}/delete?id=${crmId}`);
    if (crmDeleted.status === 200) {
      dispatch({ type: DELETE_CRM, payload: crmId });
      // dispatch(asyncActionFinish())
      toast.info("Uğurla silindi");
    } else {
      dispatch(asyncActionError());
    }
  };
}
