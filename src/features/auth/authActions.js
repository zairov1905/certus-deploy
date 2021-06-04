import { Redirect } from "react-router";
import { asyncActionError, asyncActionFinish, asyncActionStart } from "../../app/async/asyncReducer";
import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";

export function signInUser(history,user) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    try {
    await   dispatch({ type: SIGN_IN_USER, payload: user });
      history.push("/dashboard");
      dispatch(asyncActionFinish)
      

    } catch (error) {
        dispatch(asyncActionError(error))
    }
  };

}

export function signOutUser(paylaod) {
  return {
    type: SIGN_OUT_USER,
    paylaod: paylaod,
  };
}
