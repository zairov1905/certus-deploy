import axios from "axios";
import { toast } from "react-toastify";
import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
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
    await axios
      .get(`/${url}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_SKILL,
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
export function listenToSkill(skills) {
  return {
    type: FETCH_SKILL,
    payload: skills,
  };
}

export function createSkill(skill) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .post(`${url}/create`, skill, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch({ type: CREATE_SKILL, payload: data.data.data });
        dispatch(asyncActionFinish());
        toast.success("Uğurla əlavə edildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}

export function updateSkill(skill) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    await axios
      .put(`/${url}/update`, skill)
      .then((data) => {
        dispatch({
          type: UPDATE_SKILL,
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

export function deleteSkill(skillId) {
  return async function (dispatch) {
    await axios
      .delete(`/${url}/delete?id=${skillId}`)
      .then((data) => {
        dispatch({ type: DELETE_SKILL, payload: skillId });
        dispatch(asyncActionFinish());
        toast.info("Uğurla silindi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}