import {
  CREATE_PERSONAL,
  DELETE_PERSONAL,
  FETCH_PERSONAL,
  UPDATE_PERSONAL,
} from "./personalConstants";

const initialState = {
  personals: [],
};

export default function personalReducer(
  state = initialState,
  { type, payload, totalCount }
) {
  switch (type) {
    case CREATE_PERSONAL:
      return {
        ...state,
        personals: [...state.personals, payload],
      };
    case UPDATE_PERSONAL:
      return {
        ...state,
        personals: [
          ...state.personals.filter((personal) => personal.id !== payload.id),
          payload,
        ],
      };

    case DELETE_PERSONAL:
      return {
        ...state,
        personals: [
          ...state.personals.filter((personal) => personal.id !== payload),
        ],
      };
    case FETCH_PERSONAL:
      return {
        ...state,
        personals: payload,
        // totalCount: totalCount,
      };
    default:
      return state;
  }
}
