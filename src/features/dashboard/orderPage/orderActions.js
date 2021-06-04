import { toast } from "react-toastify";
import { fetchSampleDataOrder } from "../../../app/api/mockApi";
import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../app/async/asyncReducer";
import { delay } from "../../../app/util/util";
import { CREATE_ORDER, DELETE_ORDER, FETCH_ORDER, SEND_TO_OPERATION, UPDATE_ORDER } from "./orderConstants";

export function loadOrder() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const orders = await fetchSampleDataOrder();
      dispatch({ type: FETCH_ORDER, payload: orders });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
export function listenToOrder(orders){
    return {
        type:FETCH_ORDER,
        payload:orders
    }
}

export function createOrder(order){
    return async function(dispatch){
        dispatch(asyncActionStart());
        try {
            await delay(1000);
            dispatch({type:CREATE_ORDER,payload:order});
            dispatch(asyncActionFinish());

        } catch (error) {
            asyncActionError(error)
        }
    }
}

export function updateOrder(order){
    return async function(dispatch){
        dispatch(asyncActionStart)
        try {
            await delay(1000);
            dispatch({type:UPDATE_ORDER,payload:order});
            dispatch(asyncActionFinish());
        } catch (error) {
            asyncActionError(error);
        }
    }
}

export function deleteOrder(orderId){
    return async function(dispatch){
        try {
            await delay(1000)
            dispatch({type:DELETE_ORDER, payload:orderId});
            // dispatch(asyncActionFinish())
            toast.success("Uğurla silindi")
        } catch (error) {
            dispatch(asyncActionError(error))
        }
    }
}


export function sendToOperation(data){
    return async function (dispatch){
        dispatch(asyncActionStart)
        try {
            await delay(1000);
            dispatch({type:SEND_TO_OPERATION,payload:data});
            toast.success("Seçdiyiniz sifariş əməliyyarlar bölməsinə göndərildi")
            dispatch(asyncActionFinish());
        } catch (error) {
            asyncActionError(error);
        }
    }
}