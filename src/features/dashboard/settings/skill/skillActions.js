import { toast } from "react-toastify";
import { fetchSampleDataSkill } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import {
  CREATE_SKILL,
  DELETE_SKILL,
  FETCH_SKILL,
  UPDATE_SKILL,
} from "./skillConstants";

export function loadSkill() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const skills = await fetchSampleDataSkill();
      dispatch({ type: FETCH_SKILL, payload: skills });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
export function listenToSkill(skills) {
  return {
    type: FETCH_SKILL,
    payload: skills,
  };
}

export function createSkill(skill) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      await delay(1000);
      dispatch({ type: CREATE_SKILL, payload: skill });
      dispatch(asyncActionFinish());
    } catch (error) {
      asyncActionError(error);
    }
  };
}

export function updateSkill(skill) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    try {
      await delay(1000);
      dispatch({ type: UPDATE_SKILL, payload: skill });
      dispatch(asyncActionFinish());
    } catch (error) {
      asyncActionError(error);
    }
  };
}

export function deleteSkill(skillId) {
  return async function (dispatch) {
    try {
      await delay(1000);
      dispatch({ type: DELETE_SKILL, payload: skillId });
      // dispatch(asyncActionFinish())
      toast.success("Uğurla silindi");
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
