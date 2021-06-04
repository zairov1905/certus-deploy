import { sampleDataOrder } from "../../../app/api/sampleDataOrder";
import {
  CREATE_ORDER,
  DELETE_ORDER,
  FETCH_ORDER,
  SEND_TO_OPERATION,
  UPDATE_ORDER,
} from "./orderConstants";

const initialState = {
  orders: [],
};

export default function orderReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_ORDER:
      return {
        ...state,
        orders: [...state.orders, payload],
      };
    case UPDATE_ORDER:
      return {
        ...state,
        orders: [
          ...state.orders.filter((order) => order.id !== payload.id),
          payload,
        ],
      };

    case DELETE_ORDER:
      return {
        ...state,
        orders: [...state.orders.filter((order) => order.id !== payload)],
      };
    case FETCH_ORDER:
      // console.log(payload.filter(order=> order.executiveStatus == 0))
      return {
        ...state,
        orders: payload.filter((order) => order.executiveStatus == 0),
      };
    case SEND_TO_OPERATION:
      // console.log(payload)
      return {
        ...state,
        orders: [
          ...state.orders.filter((order) => order.orderNumber !== payload.orderNumber),
        ],
      };
    default:
      return state;
  }
}
