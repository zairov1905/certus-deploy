import axios from "axios";
import { toast } from "react-toastify";
import { fetchSampleDataDocumentTypes } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import {
  CREATE_DOCUMENTTYPE,
  DELETE_DOCUMENTTYPE,
  FETCH_DOCUMENTTYPE,
  UPDATE_DOCUMENTTYPE,
} from "./documentTypeConstants";

export function loadDocumentTypes(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());

    const document_types = await axios.get("/document_type", {
      params: { ...data },
    });
    if (document_types.status === 200) {
      dispatch({
        type: FETCH_DOCUMENTTYPE,
        payload: document_types.data.data,
        totalCount: document_types.data.message,
      });
      dispatch(asyncActionFinish());
    } else {
      dispatch(asyncActionError());
    }
  };
}
export function listenToDocumentType(documentTypes) {
  return {
    type: FETCH_DOCUMENTTYPE,
    payload: documentTypes,
  };
}

export function createDocumentType(documentType) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    const data = await axios.post("document_type/create", documentType, {
      withCredentials: true,
    });

    if (data.status === 201) {
      toast.success("Uğurla əlavə edildi");
      dispatch({ type: CREATE_DOCUMENTTYPE, payload: data.data.data });
      dispatch(asyncActionFinish());
    } else {
      toast.danger("Xəta baş verdi, yenidən cəht edin.");
    }
  };
}

export function updateDocumentType(documentType) {
  return async function (dispatch) {
    dispatch(asyncActionStart);

    const documentUpdated = await axios.put(
      "/document_type/update",
      documentType
    );
    console.log(documentUpdated.data.data)
    if (documentUpdated.status === 200) {
      toast.success("Dəyişiklik uğurlar yerinə yetirildi");
      dispatch({
        type: UPDATE_DOCUMENTTYPE,
        payload: documentUpdated.data.data,
      });
      dispatch(asyncActionFinish());
    } else {
      asyncActionError();
    }
  };
}

export function deleteDocumentType(documentTypeId) {
  return async function (dispatch) {
    const documentDeleted = await axios.delete(
      `/document_type/delete?id=${documentTypeId}`
    );
    console.log(documentDeleted);
    if (documentDeleted.status === 200) {
      dispatch({ type: DELETE_DOCUMENTTYPE, payload: documentTypeId });
      // dispatch(asyncActionFinish())
      toast.info("Uğurla silindi");
    } else {
      dispatch(asyncActionError());
    }
  };
}
