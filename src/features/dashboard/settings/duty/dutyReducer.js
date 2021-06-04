import { CREATE_DUTY, DELETE_DUTY, UPDATE_DUTY,FETCH_DUTY } from "./dutyConstants";


const initialState = {
  duties: []
};

export default function dutyReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_DUTY:
      return {
        ...state,
        duties: [...state.duties, payload],
      };
    case UPDATE_DUTY:
      return {
        ...state,
        duties: [
          ...state.duties.filter((duty) => duty.id !== payload.id),
          payload,
        ],
      };

    case DELETE_DUTY:
      return {
        ...state,
        duties: [...state.duties.filter((duty) => duty.id !== payload)],
      };
    case FETCH_DUTY:
      return {
        ...state,
        duties: payload,
      };
    default:
      return state;
  }
}
