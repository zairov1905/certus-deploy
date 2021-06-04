import { CREATE_SERVICE_TYPE, DELETE_SERVICE_TYPE, FETCH_SERVICE_TYPE, UPDATE_SERVICE_TYPE } from "./serviceTypeConstants";


const initialState = {
  serviceTypes: []
};

export default function serviceTypeReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_SERVICE_TYPE:
      return {
        ...state,
        serviceTypes: [...state.serviceTypes, payload],
      };
    case UPDATE_SERVICE_TYPE:
      return {
        ...state,
        serviceTypes: [
          ...state.serviceTypes.filter((serviceType) => serviceType.id !== payload.id),
          payload,
        ],
      };

    case DELETE_SERVICE_TYPE:
      return {
        ...state,
        serviceTypes: [...state.serviceTypes.filter((serviceType) => serviceType.id !== payload)],
      };
    case FETCH_SERVICE_TYPE:
      return {
        ...state,
        serviceTypes: payload,
      };
    default:
      return state;
  }
}
