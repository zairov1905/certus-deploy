import axios from "axios";
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
const url = "skill";

export function loadSkill(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());

    const references = await axios.get(`/${url}`, {
      params: { ...data },
    });
    if (references.status === 200) {
      dispatch({
        type: FETCH_SKILL,
        payload: references.data.data,
        totalCount: references.data.message,
      });
      dispatch(asyncActionFinish());
    } else {
      dispatch(asyncActionError());
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
    const data = await axios.post(`${url}/create`, skill, {
      withCredentials: true,
    });
    if (data.status === 201) {
      toast.success("Uğurla əlavə edildi");
      dispatch({ type: CREATE_SKILL, payload: data.data.data });
      dispatch(asyncActionFinish());
    } else {
      toast.danger("Xəta baş verdi, yenidən cəht edin.");
    }
  };
}

export function updateSkill(skill) {
  return async function (dispatch) {
    dispatch(asyncActionStart);

    const skillUpdated = await axios.put(
      `/${url}/update`,
      skill
    );
    if (skillUpdated.status === 200) {
      toast.success("Dəyişiklik uğurlar yerinə yetirildi");
      dispatch({
        type: UPDATE_SKILL,
        payload: skillUpdated.data.data,
      });
      dispatch(asyncActionFinish());
    } else {
      asyncActionError();
    }
  };
}

export function deleteSkill(skillId) {
  return async function (dispatch) {
    const documentDeleted = await axios.delete(
      `/${url}/delete?id=${skillId}`
    );
    if (documentDeleted.status === 200) {
      dispatch({ type: DELETE_SKILL, payload: skillId });
      // dispatch(asyncActionFinish())
      toast.info("Uğurla silindi");
    } else {
      dispatch(asyncActionError());
    }
  };
}
