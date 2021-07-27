import axios from "axios";
import { Redirect } from "react-router";
import { asyncActionError, asyncActionFinish, asyncActionStart } from "../../app/async/asyncReducer";
import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";

export function signInUser(history,user) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    const data = await axios.post("login", user, {
      withCredentials: true,
    });
    console.log(data)
    // if (data.data.succeeded) {
    //   // console.log(data.data.data);
    //   dispatch({ type: SIGN_IN_USER, payload: data.data.data });
    //   // console.log(cookies.get('refreshToken'));
    //   dispatch(asyncActionFinish());
    //   history.push("/dashboard");
    // } else {
    //   dispatch(asyncActionError(data.data.Message));
    // }
  };

}

export function signOutUser(paylaod) {
  return {
    type: SIGN_OUT_USER,
    paylaod: paylaod,
  };
}
