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

export function loadTraining() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const trainings = await fetchSampleDataTraining();
      dispatch({ type: FETCH_TRAINING, payload: trainings });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
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
    try {
      await delay(1000);
      dispatch({ type: CREATE_TRAINING, payload: training });
      dispatch(asyncActionFinish());
    } catch (error) {
      asyncActionError(error);
    }
  };
}

export function updateTraining(training) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    try {
      await delay(1000);
      dispatch({ type: UPDATE_TRAINING, payload: training });
      dispatch(asyncActionFinish());
    } catch (error) {
      asyncActionError(error);
    }
  };
}

export function deleteTraining(trainingId) {
  return async function (dispatch) {
    try {
      await delay(1000);
      dispatch({ type: DELETE_TRAINING, payload: trainingId });
      // dispatch(asyncActionFinish())
      toast.success("Uğurla silindi");
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
