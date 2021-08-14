import {
  CREATE_CONTROL_SYSTEM,
  DELETE_CONTROL_SYSTEM,
  FETCH_CONTROL_SYSTEM,
  UPDATE_CONTROL_SYSTEM,
} from "./controlSystemConstants";

const initialState = {
  controlSystems: []
};

export default function controlSystemReducer(state = initialState, { type, payload, totalCount }) {
  switch (type) {
    case CREATE_CONTROL_SYSTEM:
      return {
        ...state,
        controlSystems: [...state.controlSystems, payload],
      };
    case UPDATE_CONTROL_SYSTEM:
      return {
        ...state,
        controlSystems: [
          ...state.controlSystems.filter((controlSystem) => controlSystem.id !== payload.id),
          payload,
        ],
      };

    case DELETE_CONTROL_SYSTEM:
      return {
        ...state,
        controlSystems: [...state.controlSystems.filter((controlSystem) => controlSystem.id !== payload)],
      };
    case FETCH_CONTROL_SYSTEM:
      return {
        ...state,
        controlSystems: payload,
        totalCount:totalCount
      };
    default:
      return state;
  }
}
