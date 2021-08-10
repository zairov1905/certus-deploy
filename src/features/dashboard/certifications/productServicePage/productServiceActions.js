import axios from "axios";
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
const url = "product_certificate";

export function loadProductService(data) {
    return async function (dispatch) {
        dispatch(asyncActionStart());
    
        const productService = await axios.get(`/${url}`, {
          params: { ...data },
        });

        console.log(productService)
        if (productService.status === 200) {
          dispatch({
            type: FETCH_PRODUCT_SERVICE,
            payload: productService.data.data,
            totalCount: productService.data.message,
          });
          dispatch(asyncActionFinish());
        } else {
          dispatch(asyncActionError());
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
    return async function (dispatch) {
        dispatch(asyncActionStart());
        console.log(productService);

        const data = await axios.post(`${url}/create`, productService, {
          withCredentials: true,
        });

        
        if (data.status === 201) {
          toast.success("Uğurla əlavə edildi");
          dispatch({ type: CREATE_PRODUCT_SERVICE, payload: data.data.data });
          dispatch(asyncActionFinish());
        } else {
          toast.danger("Xəta baş verdi, yenidən cəht edin.");
        }
      };
}

export function updateProductService(productService){
    return async function (dispatch) {
        dispatch(asyncActionStart);
    
        const productServiceUpdated = await axios.put(
          `/${url}/update`,
          productService
        );
        if (productServiceUpdated.status === 200) {
          toast.success("Dəyişiklik uğurlar yerinə yetirildi");
          dispatch({
            type: UPDATE_PRODUCT_SERVICE,
            payload: productServiceUpdated.data.data,
          });
          dispatch(asyncActionFinish());
        } else {
          asyncActionError();
        }
      };
}

export function deleteProductService(productServiceId){
    return async function (dispatch) {
        const productServiceDeleted = await axios.delete(
          `/${url}/delete?id=${productServiceId}`
        );
        if (productServiceDeleted.status === 200) {
          dispatch({ type: DELETE_PRODUCT_SERVICE, payload: productServiceId });
          // dispatch(asyncActionFinish())
          toast.info("Uğurla silindi");
        } else {
          dispatch(asyncActionError());
        }
      };
    }