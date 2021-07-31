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

    const docs = await axios.get(`/${url}`, {
      params: { ...data },
    });
    console.log(docs.data)
    if (docs.status === 200) {
      dispatch({
        type: FETCH_DOC,
        payload: docs.data.data,
        totalCount: docs.data.message,
      });
      dispatch(asyncActionFinish());
    } else {
      dispatch(asyncActionError());
    }
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
    console.log(doc);
    dispatch(asyncActionStart());
    const data = await axios.post(`${url}/create`, doc, {
      withCredentials: true,
    });
    if (data.status === 201) {
      toast.success("Uğurla əlavə edildi");
      dispatch({ type: CREATE_DOC, payload: data.data.data });
      dispatch(asyncActionFinish());
    } else {
      toast.danger("Xəta baş verdi, yenidən cəht edin.");
    }
  };
}

export function updateDoc(doc) {
  return async function (dispatch) {
    dispatch(asyncActionStart);

    const docUpdated = await axios.put(
      `/${url}/update`,
      doc
    );
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
    const documentDeleted = await axios.delete(
      `/${url}/delete?id=${docId}`
    );
    if (documentDeleted.status === 200) {
      dispatch({ type: DELETE_DOC, payload: docId });
      // dispatch(asyncActionFinish())
      toast.info("Uğurla silindi");
    } else {
      dispatch(asyncActionError());
    }
  };
}
