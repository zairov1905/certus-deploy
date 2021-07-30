import axios from "axios";
import { toast } from "react-toastify";
import { fetchSampleDataTraining } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
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

    const trainings = await axios.get(`/${url}`, {
      params: { ...data },
    });
    console.log(trainings);
    if (trainings.status === 200) {
      dispatch({
        type: FETCH_TRAINING,
        payload: trainings.data.data,
        totalCount: trainings.data.message,
      });
      dispatch(asyncActionFinish());
    } else {
      dispatch(asyncActionError());
    }
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
    const data = await axios.post(`${url}/create`, training, {
      withCredentials: true,
    });
    console.log(data)
    if (data.status === 201) {
      toast.success("Uğurla əlavə edildi");
      dispatch({ type: CREATE_TRAINING, payload: data.data.data });
      dispatch(asyncActionFinish());
    } else {
      toast.danger("Xəta baş verdi, yenidən cəht edin.");
    }
  };
}

export function updateTraining(training) {
  return async function (dispatch) {
    dispatch(asyncActionStart);

    const trainingUpdated = await axios.put(
      `/${url}/update`,
      training
    );
    if (trainingUpdated.status === 200) {
      toast.success("Dəyişiklik uğurlar yerinə yetirildi");
      dispatch({
        type: UPDATE_TRAINING,
        payload: trainingUpdated.data.data,
      });
      dispatch(asyncActionFinish());
    } else {
      asyncActionError();
    }
  };
}

export function deleteTraining(trainingId) {
  return async function (dispatch) {
    const documentDeleted = await axios.delete(
      `/${url}/delete?id=${trainingId}`
    );
    if (documentDeleted.status === 200) {
      dispatch({ type: DELETE_TRAINING, payload: trainingId });
      // dispatch(asyncActionFinish())
      toast.info("Uğurla silindi");
    } else {
      dispatch(asyncActionError());
    }
  };
}
