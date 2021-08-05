
import {
  CREATE_OPERATION,
  DELETE_OPERATION,
  FETCH_OPERATION,
  UPDATE_OPERATION,
} from "./operationConstants";

const initialState = {
  operations: []
};

export default function operationReducer(state = initialState, { type, payload,totalCount }) {
  switch (type) {
    // case CREATE_OPERATION:
    //   return {
    //     ...state,
    //     operations: [...state.operations, payload],
    //   };
    case UPDATE_OPERATION:
      return {
        ...state,
        operations: [
          ...state.operations.filter((operation) => operation.id !== payload.id),
          payload,
        ],
      };

    case DELETE_OPERATION:
      return {
        ...state,
        operations: [...state.operations.filter((operation) => operation.id !== payload)],
      };
    case FETCH_OPERATION:
      return {
        ...state,
        operations: payload.filter(operation => operation.employee_id != null),
      };
    default:
      return state;
  }
}
