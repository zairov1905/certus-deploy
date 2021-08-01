import axios from "axios";
import { toast } from "react-toastify";
import { fetchSampleDataLab } from "../../../app/api/mockApi";
import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../app/async/asyncReducer";
import { delay } from "../../../app/util/util";
import { DELETE_DOC } from "../docPage/docConstants";
import { CREATE_LAB, DELETE_LAB, FETCH_LAB, UPDATE_LAB } from "./labConstants";

const url = "lab";
export function loadLab(data) {
    return async function (dispatch) {
        dispatch(asyncActionStart());
    
        const labs = await axios.get(`/${url}`, {
          params: { ...data },
        });
        console.log(labs)
        if (labs.status === 200) {
          dispatch({
            type: FETCH_LAB,
            payload: labs.data.data,
            totalCount: labs.data.message,
          });
          dispatch(asyncActionFinish());
        } else {
          dispatch(asyncActionError());
        }
      };
}
export function listenToLab(labs){
    return {
        type:FETCH_LAB,
        payload:labs
    }
}

export function createLab(lab){
    return async function (dispatch) {
        dispatch(asyncActionStart());
        const data = await axios.post(`${url}/create`, lab, {
          withCredentials: true,
        });
        if (data.status === 201) {
          toast.success("Uğurla əlavə edildi");
          dispatch({ type: CREATE_LAB, payload: data.data.data });
          dispatch(asyncActionFinish());
        } else {
          toast.danger("Xəta baş verdi, yenidən cəht edin.");
        }
      };
}

export function updateLab(lab){
    return async function (dispatch) {
        dispatch(asyncActionStart);
    
        const labUpdated = await axios.put(
          `/${url}/update`,
          lab
        );
        if (labUpdated.status === 200) {
          toast.success("Dəyişiklik uğurlar yerinə yetirildi");
          dispatch({
            type: UPDATE_LAB,
            payload: labUpdated.data.data,
          });
          dispatch(asyncActionFinish());
        } else {
          asyncActionError();
        }
      };
}

export function deleteLab(labId){
    return async function (dispatch) {
        const documentDeleted = await axios.delete(
          `/${url}/delete?id=${labId}`
        );
        if (documentDeleted.status === 200) {
          dispatch({ type: DELETE_LAB, payload: labId });
          // dispatch(asyncActionFinish())
          toast.info("Uğurla silindi");
        } else {
          dispatch(asyncActionError());
        }
      };
}