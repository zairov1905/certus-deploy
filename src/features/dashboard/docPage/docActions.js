import axios from "axios";
import { toast } from "react-toastify";
import { fethcSampleDataDocs } from "../../../app/api/mockApi";
import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../app/async/asyncReducer";
import { delay } from "../../../app/util/util";
import { CREATE_DOC, DELETE_DOC, FETCH_DOC, UPDATE_DOC } from "./docConstants";
const url = "document";

export function loadDocs(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${url}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_DOC,
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
export function listenToDoc(docs) {
  return {
    type: FETCH_DOC,
    payload: docs,
  };
}

export function createDoc(doc) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .post(`${url}/create`, doc, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch({ type: CREATE_DOC, payload: data.data.data });
        dispatch(asyncActionFinish());
        toast.success("Uğurla əlavə edildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}

export function updateDoc(doc) {
  return async function (dispatch) {
    dispatch(asyncActionStart);

    const docUpdated = await axios.put(`/${url}/update`, doc);
    if (docUpdated.status === 200) {
      toast.success("Dəyişiklik uğurlar yerinə yetirildi");
      dispatch({
        type: UPDATE_DOC,
        payload: docUpdated.data.data,
      });
      dispatch(asyncActionFinish());
    } else {
      asyncActionError();
    }
  };
}

export function deleteDoc(docId) {
  return async function (dispatch) {
    await axios
      .delete(`/${url}/delete?id=${docId}`)
      .then((data) => {
        dispatch({ type: DELETE_DOC, payload: docId });
        dispatch(asyncActionFinish());
        toast.info("Uğurla silindi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}
