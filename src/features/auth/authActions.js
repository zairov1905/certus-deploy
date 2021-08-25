import axios from "axios";
import { toast } from "react-toastify";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../app/async/asyncReducer";
import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";
const url = "login";
export function signInUser(history, user) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .post(url, user, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch({ type: SIGN_IN_USER, payload: data.data.data });
        dispatch(asyncActionFinish());
        history.push("/dashboard");

        window.location.reload()

      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("İstifadəçi adı və yaxud şifrə yanlışdır");
      });
  };
}

export function signOutUser(paylaod) {
  return {
    type: SIGN_OUT_USER,
    paylaod: paylaod,
  };
}
