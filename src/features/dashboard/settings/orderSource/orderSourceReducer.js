import {
  CREATE_ORDER_SOURCE,
  DELETE_ORDER_SOURCE,
  FETCH_ORDER_SOURCE,
  UPDATE_ORDER_SOURCE,
} from "./orderSourceConstants";

const initialState = {
  orderSources: [],
};

export default function orderSourceReducer(
  state = initialState,
  { type, payload, totalCount }
) {
  switch (type) {
    case CREATE_ORDER_SOURCE:
      return {
        ...state,
        orderSources: [...state.orderSources, payload],
      };
    case UPDATE_ORDER_SOURCE:
      return {
        ...state,
        orderSources: [
          ...state.orderSources.filter(
            (orderSource) => orderSource.id !== payload.id
          ),
          payload,
        ],
      };

    case DELETE_ORDER_SOURCE:
      return {
        ...state,
        orderSources: [
          ...state.orderSources.filter(
            (orderSource) => orderSource.id !== payload
          ),
        ],
      };
    case FETCH_ORDER_SOURCE:
      return {
        ...state,
        orderSources: payload,
        totalCount: totalCount,
      };
    default:
      return state;
  }
}
