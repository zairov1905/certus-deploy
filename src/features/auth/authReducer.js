import axios from "axios";
import jwtDecode from "jwt-decode";

import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";

const initialState = {
  authenticated: false,
  currentUser: {},
};
const getAuthState = () => {
  const auth = localStorage.getItem("currentUser");
  try {
    const authObj = JSON.parse(auth);
    const jwToken = authObj.currentUser.token;
    const decodedToken = jwtDecode(jwToken, {
      complete: true,
    });
    const expiresAt = decodedToken.exp;
    var now = new Date();
    let expiryDate = expiresAt * 1000 - now.getTime();

    if (new Date(expiresAt * 1000) > new Date()) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwToken}`;
      return authObj;
    }

    return initialState;
  } catch (error) {
    return initialState;
  }
};
let currentUser = getAuthState();

export default function authReducer(state = currentUser, { type, payload }) {
  switch (type) {
    case SIGN_IN_USER:
      var currentUser = {
        ...state,
        authenticated: true,
        currentUser: {
          ...payload,
        },
      };

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${payload.token}`;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      return currentUser;
    case SIGN_OUT_USER:
      localStorage.removeItem("currentUser");

      currentUser = {
        authenticated: false,
        currentUser: null,
      };
      return currentUser;

    default:
      return state;
  }
}
