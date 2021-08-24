import axios from "axios";
import { toast } from "react-toastify";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import {
  CREATE_TRAINING,
  DELETE_TRAINING,
  FETCH_TRAINING,
  UPDATE_TRAINING,
} from "./trainingConstants";
const url = "training";
export function loadTraining(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${url}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_TRAINING,
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
export function listenToTraining(trainings) {
  return {
    type: FETCH_TRAINING,
    payload: trainings,
  };
}

export function createTraining(training) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .post(`${url}/create`, training, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch({ type: CREATE_TRAINING, payload: data.data.data });
        dispatch(asyncActionFinish());
        toast.success("Uğurla əlavə edildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}

export function updateTraining(training) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    await axios
      .put(`/${url}/update`, training)
      .then((data) => {
        dispatch({
          type: UPDATE_TRAINING,
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

export function deleteTraining(trainingId) {
  return async function (dispatch) {
    await axios
      .delete(`/${url}/delete?id=${trainingId}`)
      .then((data) => {
        dispatch({ type: DELETE_TRAINING, payload: trainingId });
        dispatch(asyncActionFinish());
        toast.info("Uğurla silindi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}
