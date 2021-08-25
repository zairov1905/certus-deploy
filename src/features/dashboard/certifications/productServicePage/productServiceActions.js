import axios from "axios";
import { toast } from "react-toastify";

import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import {
  CREATE_PRODUCT_SERVICE,
  DELETE_PRODUCT_SERVICE,
  FETCH_PRODUCT_SERVICE,
  UPDATE_PRODUCT_SERVICE,
} from "./productServiceConstants";
const url = "product_certificate";

export function loadProductService(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .get(`/${url}`, {
        params: { ...data },
      })
      .then((datas) => {
        dispatch({
          type: FETCH_PRODUCT_SERVICE,
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
export function listenToProductService(productServices) {
  return {
    type: FETCH_PRODUCT_SERVICE,
    payload: productServices,
  };
}

export function createProductService(productService) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await axios
      .post(`${url}/create`, productService, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch({ type: CREATE_PRODUCT_SERVICE, payload: data.data.data });
        dispatch(asyncActionFinish());
        toast.success("Uğurla əlavə edildi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}

export function updateProductService(productService) {
  return async function (dispatch) {
    dispatch(asyncActionStart);
    await axios
      .put(`/${url}/update`, productService)
      .then((data) => {
        dispatch({
          type: UPDATE_PRODUCT_SERVICE,
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

export function deleteProductService(productServiceId) {
  return async function (dispatch) {
    await axios
      .delete(`/${url}/delete?id=${productServiceId}`)
      .then((data) => {
        dispatch({ type: DELETE_PRODUCT_SERVICE, payload: productServiceId });
        dispatch(asyncActionFinish());
        toast.info("Uğurla silindi");
      })
      .catch((err) => {
        dispatch(asyncActionError(err.message));
        toast.info("Xəta baş verdi, yenidən cəht edin.");
      });
  };
}
