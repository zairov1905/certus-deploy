import { toast } from "react-toastify";
import { fetchSampleDataProductService } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import { CREATE_PRODUCT_SERVICE, DELETE_PRODUCT_SERVICE, FETCH_PRODUCT_SERVICE, UPDATE_PRODUCT_SERVICE } from "./productServiceConstants";

export function loadProductService() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const productServices = await fetchSampleDataProductService();
      dispatch({ type: FETCH_PRODUCT_SERVICE, payload: productServices });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
export function listenToProductService(productServices){
    return {
        type:FETCH_PRODUCT_SERVICE,
        payload:productServices
    }
}

export function createProductService(productService){
    return async function(dispatch){
        dispatch(asyncActionStart());
        try {
            await delay(1000);
            dispatch({type:CREATE_PRODUCT_SERVICE,payload:productService});
            dispatch(asyncActionFinish());

        } catch (error) {
            asyncActionError(error)
        }
    }
}

export function updateProductService(productService){
    return async function(dispatch){
        dispatch(asyncActionStart)
        try {
            await delay(1000);
            dispatch({type:UPDATE_PRODUCT_SERVICE,payload:productService});
            dispatch(asyncActionFinish());
        } catch (error) {
            asyncActionError(error);
        }
    }
}

export function deleteProductService(productServiceId){
    return async function(dispatch){
        try {
            await delay(1000)
            dispatch({type:DELETE_PRODUCT_SERVICE, payload:productServiceId});
            // dispatch(asyncActionFinish())
            toast.success("Uğurla silindi")
        } catch (error) {
            dispatch(asyncActionError(error))
        }
    }
}