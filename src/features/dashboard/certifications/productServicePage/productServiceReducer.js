import {
  CREATE_PRODUCT_SERVICE,
  DELETE_PRODUCT_SERVICE,
  FETCH_PRODUCT_SERVICE,
  UPDATE_PRODUCT_SERVICE,
} from "./productServiceConstants";

const initialState = {
  productServices: []
};

export default function productServiceReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_PRODUCT_SERVICE:
      return {
        ...state,
        productServices: [...state.productServices, payload],
      };
    case UPDATE_PRODUCT_SERVICE:
      return {
        ...state,
        productServices: [
          ...state.productServices.filter((productService) => productService.id !== payload.id),
          payload,
        ],
      };

    case DELETE_PRODUCT_SERVICE:
      return {
        ...state,
        productServices: [...state.productServices.filter((productService) => productService.id !== payload)],
      };
    case FETCH_PRODUCT_SERVICE:
      return {
        ...state,
        productServices: payload,
      };
    default:
      return state;
  }
}
